import axios from 'axios';
import { add } from 'date-fns';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import {
  Addressish,
  asAddress,
  ClaimConditionsState,
  CollectionUserClaimState,
  IPFS_GATEWAY_PREFIX,
  OperationStatus,
  Signerish,
  TokenMetadata,
  UserClaimRestrictions,
  WriteOverrides,
  ZERO_BYTES32,
} from '../..';
import { publishingChainFromChainId } from '../../../apis';
import { AllowlistStatus, getAllowlistStatus } from '../../../apis/publishing';
import { resolveIpfsUrl } from '../../../utils/ipfs';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { CollectionContractClaimCondition, UserClaimConditions } from '../features';
import { max, min } from '../number';
import { ContractObject } from './object';

export class Token extends ContractObject {
  public constructor(protected readonly base: CollectionContract, readonly tokenId: BigNumberish | null) {
    super(base);
  }

  async getUri(): Promise<string> {
    const tokenId = this.base.requireTokenId(this.tokenId);
    return await this.base.tokenUri(tokenId);
  }

  async totalSupply(): Promise<BigNumber> {
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
  async getFullUserClaimConditions(userAddress: Addressish): Promise<OperationStatus<ClaimConditionsState>> {
    return await this.run(async () => {
      const userConditions = await this.base.getUserClaimConditions(userAddress, this.tokenId);
      const address = await asAddress(userAddress);

      let allowlistStatus: AllowlistStatus = {
        status: 'no-allowlist',
        proofs: [],
        proofMaxQuantityPerTransaction: 0,
      };

      // @todo - update with Publishing API v2
      if (userConditions.merkleRoot !== ZERO_BYTES32) {
        allowlistStatus = await getAllowlistStatus(
          this.base.address,
          address,
          publishingChainFromChainId(this.base.chainId),
          this.tokenId,
        );
      }

      const userRestrictions = await getUserRestrictions(
        userConditions,
        allowlistStatus.proofs,
        allowlistStatus.proofMaxQuantityPerTransaction,
      );

      return { ...userConditions, ...userRestrictions, allowlistStatus };
    });
  }

  async setTokenURI(
    signer: Signerish,
    tokenUri: string,
    overrides: WriteOverrides = {},
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.run(async () => {
      const tokenId = this.base.requireTokenId(this.tokenId);
      return await this.base.setTokenUri(signer, tokenId, tokenUri, overrides);
    });
  }

  async setPermantentTokenURI(
    signer: Signerish,
    tokenUri: string,
    overrides: WriteOverrides = {},
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.run(async () => {
      const tokenId = this.base.requireTokenId(this.tokenId);
      return await this.base.setPermanentTokenUri(signer, tokenId, tokenUri, overrides);
    });
  }

  async setMaxTotalSupply(
    signer: Signerish,
    totalSupply: BigNumberish,
    overrides: WriteOverrides = {},
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.run(async () => {
      return await this.base.setMaxTotalSupply(signer, totalSupply, this.tokenId, overrides);
    });
  }

  async setClaimConditions(
    signer: Signerish,
    conditions: CollectionContractClaimCondition[],
    resetClaimEligibility: boolean,
    overrides: WriteOverrides = {},
  ): Promise<OperationStatus<ContractTransaction>> {
    return await this.run(async () => {
      const args = { conditions, resetClaimEligibility, tokenId: this.tokenId };
      return await this.base.setClaimConditions(signer, args, overrides);
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
    respectRemainingSupply && userConditions.maxTotalSupply.eq(0)
      ? Infinity
      : userConditions.maxTotalSupply.sub(userConditions.tokenSupply);

  const phaseClaimableSupply = userConditions.maxClaimableSupply.gt(0)
    ? userConditions.maxClaimableSupply.sub(userConditions.supplyClaimed)
    : Infinity;

  const remainingWalletAllocation = userConditions.maxWalletClaimCount.gt(0)
    ? userConditions.maxWalletClaimCount.sub(userConditions.walletClaimCount || 0)
    : Infinity;

  const allowlistRemainingAllocation = oneTimeAllowlistClaimUsed
    ? 0
    : allowlistEnabled && isAllowlisted && userConditions.walletClaimedCountInPhase !== null
    ? proofMaxQuantityPerTransaction - userConditions.walletClaimedCountInPhase.toNumber()
    : Infinity;

  const availableQuantity = max(
    0, // making sure it's not negative
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
    case remainingSupply === 0:
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
    case allowlistRemainingAllocation === 0:
      claimState = 'claimed-allowlist-allowance';
      break;
    case phaseClaimableSupply === 0:
      claimState = 'claimed-phase-allowance';
      break;
    case remainingWalletAllocation === 0:
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
