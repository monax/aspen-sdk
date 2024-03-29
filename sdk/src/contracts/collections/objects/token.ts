import { Addressish, asAddress, ChainId } from '@monaxlabs/phloem/dist/types';
import axios from 'axios';
import { add } from 'date-fns';
import { GetTransactionReceiptReturnType } from 'viem';
import {
  BigIntish,
  ClaimConditionsState,
  CollectionUserClaimState,
  IPFS_GATEWAY_PREFIX,
  OperationStatus,
  Signer,
  TokenId,
  TokenMetadata,
  UserClaimRestrictions,
  WriteParameters,
  ZERO_BYTES32,
} from '../..';
import { resolveIpfsUrl } from '../../../utils/ipfs';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { LooseCollectionContractClaimCondition, UserClaimConditions } from '../features';
import { max, MaxUint256, min, Zero } from '../number';
import { ContractObject } from './object';

export type AllowlistStatusGetter = {
  (
    chain: ChainId,
    contractAddress: Addressish,
    walletAddress: Addressish,
    tokenId: TokenId | null,
  ): Promise<AllowlistStatus>;
};

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: TokenId | null) {
    super(base);
  }

  async getUri(): Promise<string> {
    const tokenId = this.base.requireTokenId(this.tokenId);
    return await this.base.tokenUri(tokenId);
  }

  async totalSupply(): Promise<bigint> {
    return await this.base.totalSupply(this.tokenId);
  }

  async exists(): Promise<boolean> {
    const tokenId = this.base.requireTokenId(this.tokenId);
    return await this.base.exists(tokenId);
  }

  async getMetadata(): Promise<OperationStatus<{ uri: string; metadata: TokenMetadata }>> {
    return await this.run(async () => {
      const tokenId = this.base.requireTokenId(this.tokenId);
      const uri = await this.base.tokenUri(tokenId);
      const metadata = await Token.getMetadataFromUri(uri);

      return { uri, metadata };
    });
  }

  static async getMetadataFromUri(ipfsUri: string): Promise<TokenMetadata> {
    try {
      const url = resolveIpfsUrl(ipfsUri, IPFS_GATEWAY_PREFIX);
      const meta = await axios.get(url).then((r) => r.data);

      return resolveTokenIpfsUris(meta);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new SdkError(SdkErrorCode.WEB_REQUEST_FAILED, undefined, err);
      } else {
        throw new SdkError(SdkErrorCode.UNKNOWN_ERROR, { ipfsUri }, err as Error);
      }
    }
  }

  /** Requires authenticated Publishing API */
  async getFullUserClaimConditions(
    userAddress: Addressish,
    allowlistStatusGetter: AllowlistStatusGetter,
  ): Promise<OperationStatus<ClaimConditionsState>> {
    return await this.run(async () => {
      const userConditions = await this.base.getUserClaimConditions(userAddress, this.tokenId);
      const address = await asAddress(userAddress);

      let allowlist: AllowlistStatus = {
        enabled: false,
        status: 'no-allowlist',
        proofs: [],
        proofMaxQuantityPerTransaction: 0,
      };

      // TODO - update with Publishing API v2
      if (userConditions.merkleRoot !== ZERO_BYTES32) {
        try {
          allowlist = await allowlistStatusGetter(this.base.chainId, this.base.address, address, this.tokenId);
        } catch {
          allowlist.enabled = true;
          allowlist.status = 'excluded';
        }
      }

      const userRestrictions = await getUserRestrictions(
        userConditions,
        allowlist.proofs,
        allowlist.proofMaxQuantityPerTransaction,
      );

      return { ...userConditions, ...userRestrictions, allowlist };
    });
  }

  async setTokenURI(
    walletClient: Signer,
    tokenUri: string,
    params?: WriteParameters,
  ): Promise<OperationStatus<GetTransactionReceiptReturnType>> {
    return await this.run(async () => {
      const tokenId = this.base.requireTokenId(this.tokenId);
      return await this.base.setTokenUri(walletClient, tokenId, tokenUri, params);
    });
  }

  async setPermantentTokenURI(
    walletClient: Signer,
    tokenUri: string,
    params?: WriteParameters,
  ): Promise<OperationStatus<GetTransactionReceiptReturnType>> {
    return await this.run(async () => {
      const tokenId = this.base.requireTokenId(this.tokenId);
      return await this.base.setPermanentTokenUri(walletClient, tokenId, tokenUri, params);
    });
  }

  async setMaxTotalSupply(
    walletClient: Signer,
    totalSupply: BigIntish,
    params?: WriteParameters,
  ): Promise<OperationStatus<GetTransactionReceiptReturnType>> {
    return await this.run(async () => {
      return await this.base.setMaxTotalSupply(walletClient, totalSupply, this.tokenId, params);
    });
  }

  async setClaimConditions(
    walletClient: Signer,
    conditions: LooseCollectionContractClaimCondition[],
    resetClaimEligibility: boolean,
    params?: WriteParameters,
  ): Promise<OperationStatus<GetTransactionReceiptReturnType>> {
    return await this.run(async () => {
      const args = { conditions, resetClaimEligibility, tokenId: this.tokenId };
      return await this.base.setClaimConditions(walletClient, args, params);
    });
  }
}

/**
 * Apply some logic on the user and token/collection claim conditions
 * to identify whether the user can actually claim and how much
 *
 * @param userConditions user claim conditions
 * @param merkleProofs Allowlist proofs
 * @param proofMaxQuantityPerTransaction Allowlist allocation
 * @param respectRemainingSupply Used to support old contracts
 * @returns Extra user claim conditions
 */
const getUserRestrictions = async (
  userConditions: UserClaimConditions,
  merkleProofs: string[],
  proofMaxQuantityPerTransaction: number,
  respectRemainingSupply = true,
): Promise<UserClaimRestrictions> => {
  const allowlistEnabled = userConditions.merkleRoot !== ZERO_BYTES32;
  const isAllowlisted = allowlistEnabled && merkleProofs.length > 0;

  // NOTE: in old contracts allowlisted addresses can only mint once in a phase
  const oneTimeAllowlistClaimUsed =
    allowlistEnabled &&
    userConditions.lastClaimTimestamp > userConditions.startTimestamp &&
    userConditions.walletClaimedCountInPhase === null;

  const remainingSupply =
    respectRemainingSupply && userConditions.maxTotalSupply === Zero
      ? MaxUint256
      : userConditions.maxTotalSupply - userConditions.tokenSupply;

  const phaseClaimableSupply =
    userConditions.maxClaimableSupply > Zero
      ? userConditions.maxClaimableSupply - userConditions.supplyClaimed
      : MaxUint256;

  const remainingWalletAllocation =
    userConditions.maxWalletClaimCount > Zero
      ? userConditions.maxWalletClaimCount - userConditions.walletClaimCount
      : MaxUint256;

  const allowlistRemainingAllocation = oneTimeAllowlistClaimUsed
    ? Zero
    : allowlistEnabled && isAllowlisted && userConditions.walletClaimedCountInPhase !== null
    ? BigInt(proofMaxQuantityPerTransaction) - userConditions.walletClaimedCountInPhase
    : MaxUint256;

  const availableQuantity = max(
    Zero, // making sure it's not negative
    min(
      remainingSupply,
      phaseClaimableSupply,
      remainingWalletAllocation,
      allowlistRemainingAllocation,
      userConditions.quantityLimitPerTransaction,
    ),
  );

  const canMintAfterSeconds = Math.max(
    0,
    userConditions.lastClaimTimestamp === 0
      ? 0 // adding 3 seconds to prevent early calls to the contract
      : 3 + userConditions.nextClaimTimestamp - Math.floor(new Date().getTime() / 1000),
  );
  const canMintAfter = add(new Date(), { seconds: canMintAfterSeconds });

  let claimState: CollectionUserClaimState = 'ok';
  switch (true) {
    case remainingSupply === Zero:
      claimState = 'no-token-supply';
      break;
    case userConditions.isClaimingPaused:
      claimState = 'paused';
      break;
    case allowlistEnabled && !isAllowlisted:
      claimState = 'not-allowlisted';
      break;
    case canMintAfterSeconds > 0:
      claimState = 'minting-throttled';
      break;
    case allowlistRemainingAllocation === Zero:
      claimState = 'claimed-allowlist-allowance';
      break;
    case phaseClaimableSupply === Zero:
      claimState = 'claimed-phase-allowance';
      break;
    case remainingWalletAllocation === Zero:
      claimState = 'claimed-wallet-allowance';
      break;
  }

  return {
    availableQuantity,
    canClaimTokens: claimState === 'ok',
    canMintAfter,
    claimState,
  };
};

const resolveTokenIpfsUris = (tokenMeta: TokenMetadata): TokenMetadata => {
  const newMeta: TokenMetadata = { ...tokenMeta };

  if (newMeta.image) {
    newMeta.image = resolveIpfsUrl(newMeta.image, IPFS_GATEWAY_PREFIX);
  }
  if (newMeta.image_ipfs) {
    newMeta.image_ipfs = resolveIpfsUrl(newMeta.image_ipfs, IPFS_GATEWAY_PREFIX);
  }
  if (newMeta.animation_url) {
    newMeta.animation_url = resolveIpfsUrl(newMeta.animation_url, IPFS_GATEWAY_PREFIX);
  }

  return newMeta;
};

export type AllowlistStatus =
  | {
      enabled: true;
      status: 'included';
      proofs: string[];
      proofMaxQuantityPerTransaction: number;
    }
  | {
      enabled: true;
      status: 'excluded';
      proofs: [];
      proofMaxQuantityPerTransaction: 0;
    }
  | {
      enabled: false;
      status: 'no-active-phase';
      proofs: [];
      proofMaxQuantityPerTransaction: 0;
    }
  | {
      enabled: false;
      status: 'no-allowlist';
      proofs: [];
      proofMaxQuantityPerTransaction: 0;
    };
