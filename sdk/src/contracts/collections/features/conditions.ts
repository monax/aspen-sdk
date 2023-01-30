import axios from 'axios';
import { add } from 'date-fns';
import { BigNumber, BigNumberish, constants } from 'ethers';
import { Address, ZERO_BYTES32 } from '../..';
import { AllowlistStatus, getAllowlistStatus } from '../../../apis/publishing';
import { publishingChainFromChainId } from '../../../apis/utils/providers';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { max, min } from '../number';
import type {
  ActiveClaimConditions,
  ClaimConditionsState,
  CollectionUserClaimConditions,
  CollectionUserClaimState,
  UserClaimConditions,
} from '../types';
import { FeatureSet } from './features';

// Reasonably large number to compare with
export const SUPPLY_THRESHOLD = constants.MaxInt256;

export const ConditionsFeatures = [
  // NFT
  // 'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV0', // very old
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3',
  'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2',
  // SFT
  // 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV0', // very old
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2',
] as const;

export type ConditionsFeatures = (typeof ConditionsFeatures)[number];

export class Conditions extends FeatureSet<ConditionsFeatures> {
  constructor(base: CollectionContract) {
    super(base, ConditionsFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const getActiveConditions = partitioner({
      nftV0: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
      ],
      nftV1: ['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'],
      nftV2: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2',
      ],
      sftV0: ['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'],
      sftV1: ['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'],
      sftV2: [
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2',
      ],
    });

    const getUserConditions = partitioner({
      nftV0: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
      ],
      nftV1: ['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'],
      nftV2: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2',
      ],
      sftV0: ['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'],
      sftV1: [
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
        'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2',
      ],
    });

    return { getActiveConditions, getUserConditions };
  });

  /**
   * Get the claim conditions for a given user (wallet address) & token
   *
   * @param userAddress
   * @param tokenId
   * @returns All claim conditions
   */
  async getState(userAddress: Address, tokenId: BigNumberish | null = null): Promise<ClaimConditionsState> {
    try {
      const [activeClaimConditions, userClaimConditions] = await Promise.all([
        this.getActiveClaimConditions(tokenId),
        this.getUserClaimConditions(userAddress, tokenId),
      ]);

      if (!activeClaimConditions || !userClaimConditions) {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR);
      }

      const { activeClaimCondition, ...otherActiveConditions } = activeClaimConditions;

      let allowlistStatus: AllowlistStatus = {
        status: 'no-allowlist',
        proofs: [],
        proofMaxQuantityPerTransaction: 0,
      };

      if (activeClaimCondition.merkleRoot !== ZERO_BYTES32) {
        allowlistStatus = await getAllowlistStatus(
          this.base.address,
          userAddress,
          publishingChainFromChainId(this.base.chainId),
          tokenId,
        );
      }

      const userClaimRestrictions = await this.getUserClaimRestrictions(
        userClaimConditions,
        activeClaimConditions,
        allowlistStatus.proofs,
        allowlistStatus.proofMaxQuantityPerTransaction,
      );

      return {
        ...activeClaimCondition,
        ...otherActiveConditions,
        ...userClaimConditions,
        ...userClaimRestrictions,
        allowlistStatus,
      };
    } catch (err) {
      if (SdkError.is(err)) {
        throw err;
      } else if (axios.isAxiosError(err)) {
        throw new SdkError(SdkErrorCode.WEB_REQUEST_FAILED, undefined, err);
      } else {
        // @todo try to parse the chain error here
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
      }
    }
  }

  /**
   * @param tokenId Optional token id - use for ERC1155 contracts
   * @returns Token or Collection claim conditions
   */
  async getActiveClaimConditions(tokenId: BigNumberish | null = null): Promise<ActiveClaimConditions> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getActiveClaimConditionsERC1155(this.base.requireTokenId(tokenId));
      case 'ERC721':
        return await this.getActiveClaimConditionsERC721();
    }
  }

  /**
   * Apply some logic on the user and token/collection claim conditions
   * to identify whether the user can actually claim and how much
   *
   * @param userClaimInfo user claim conditions
   * @param claimInfo Token or collection claim conditions
   * @param merkleProofs Allowlist proofs
   * @param proofMaxQuantityPerTransaction Allowlist allocation
   * @param respectRemainingSupply Used to support old contracts
   * @returns Extra user claim conditions
   */
  async getUserClaimRestrictions(
    userClaimInfo: UserClaimConditions,
    claimInfo: ActiveClaimConditions,
    merkleProofs: string[],
    proofMaxQuantityPerTransaction: number,
    respectRemainingSupply = true,
  ): Promise<CollectionUserClaimConditions> {
    const phase = claimInfo.activeClaimCondition;
    const allowlistEnabled = phase.merkleRoot !== ZERO_BYTES32;
    const isAllowlisted = allowlistEnabled && merkleProofs.length > 0;

    // NOTE: in old contracts allowlisted addresses can only mint once in a phase
    const oneTimeAllowlistClaimUsed =
      allowlistEnabled &&
      userClaimInfo.lastClaimTimestamp > phase.startTimestamp &&
      userClaimInfo.walletClaimedCountInPhase === null;

    const remainingSupply =
      respectRemainingSupply && claimInfo.maxTotalSupply.eq(0)
        ? Infinity
        : claimInfo.maxTotalSupply.sub(claimInfo.tokenSupply);

    const phaseClaimableSupply = phase.maxClaimableSupply.gt(0)
      ? phase.maxClaimableSupply.sub(phase.supplyClaimed)
      : Infinity;

    const remainingWalletAllocation = claimInfo.maxWalletClaimCount.gt(0)
      ? claimInfo.maxWalletClaimCount.sub(userClaimInfo.walletClaimCount || 0)
      : Infinity;

    const allowlistRemainingAllocation = oneTimeAllowlistClaimUsed
      ? 0
      : allowlistEnabled && isAllowlisted && userClaimInfo.walletClaimedCountInPhase !== null
      ? proofMaxQuantityPerTransaction - userClaimInfo.walletClaimedCountInPhase.toNumber()
      : Infinity;

    const availableQuantity = max(
      0, // making sure it's not negative
      min(
        remainingSupply,
        phaseClaimableSupply,
        remainingWalletAllocation,
        allowlistRemainingAllocation,
        phase.quantityLimitPerTransaction,
      ),
    );

    const canMintAfterSeconds = Math.max(
      0,
      userClaimInfo.lastClaimTimestamp === 0
        ? 0 // adding 3 seconds to prevent early calls to the contract
        : 3 + userClaimInfo.nextClaimTimestamp - Math.floor(new Date().getTime() / 1000),
    );
    const canMintAfter = add(new Date(), { seconds: canMintAfterSeconds });

    let claimState: CollectionUserClaimState = 'ok';
    switch (true) {
      case remainingSupply === 0:
        claimState = 'no-token-supply';
        break;
      case phase.isClaimingPaused:
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
  }

  /**
   * Get the claim conditions for a given user (wallet address)
   *
   * @param userAddress
   * @param tokenId
   * @returns User claim conditions
   */
  async getUserClaimConditions(
    userAddress: Address,
    tokenId: BigNumberish | null = null,
  ): Promise<UserClaimConditions> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getUserClaimConditionsERC1155(userAddress, this.base.requireTokenId(tokenId));
      case 'ERC721':
        return this.getUserClaimConditionsERC721(userAddress);
    }
  }

  protected async getActiveClaimConditionsERC721(): Promise<ActiveClaimConditions> {
    const { nftV0, nftV1, nftV2 } = this.getPartition('getActiveConditions')(this.base.interfaces);
    if (!nftV0 && !nftV1 && !nftV2) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
    }

    try {
      if (nftV0) {
        const iNftIssuance = nftV0.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iNftIssuance.getActiveClaimConditions();

        const tokenSupply = await this.base.standard.getTokensCount();
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: false,
          },
        };
      } else if (nftV1) {
        const iNftIssuance = nftV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iNftIssuance.getActiveClaimConditions();

        const tokenSupply = await this.base.standard.getTokensCount();
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (nftV2) {
        const iNftIssuance = nftV2.connectReadOnly();

        const {
          condition,
          conditionId,
          walletMaxClaimCount,
          isClaimPaused,
          tokenSupply: v1,
          maxTotalSupply: v2,
        } = await iNftIssuance.getActiveClaimConditions();

        // TEMP HACK: to fix the issue where the tokenSupply and maxTotalSupply can be switched
        const [tokenSupply, maxTotalSupply] = v1.lt(v2) ? [v1, v2] : [v2, v1];

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_THRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  protected async getUserClaimConditionsERC721(userAddress: Address): Promise<UserClaimConditions> {
    const { nftV0, nftV1, nftV2 } = this.getPartition('getUserConditions')(this.base.interfaces);
    if (!nftV0 && !nftV1 && !nftV2) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
    }

    try {
      if (nftV0) {
        const iNftIssuance = nftV0.connectReadOnly();

        const { conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp } =
          await iNftIssuance.getUserClaimConditions(userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (nftV1) {
        const iNftIssuance = nftV1.connectReadOnly();

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await iNftIssuance.getUserClaimConditions(userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (nftV2) {
        const iNftIssuance = nftV2.connectReadOnly();

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await iNftIssuance.getUserClaimConditions(userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      }
    } catch (err) {
      const args = { userAddress };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  protected async getActiveClaimConditionsERC1155(tokenId: BigNumberish): Promise<ActiveClaimConditions> {
    const { sftV0, sftV1, sftV2 } = this.getPartition('getActiveConditions')(this.base.interfaces);
    if (!sftV0 && !sftV1 && !sftV2) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
    }

    try {
      const tokenIdBn = BigNumber.from(tokenId);

      if (sftV0) {
        const iSftIssuance = sftV0.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const tokenSupply = await this.base.standard.getTokenSupply(tokenId);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: false,
          },
        };
      } else if (sftV1) {
        const iSftIssuance = sftV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const tokenSupply = await this.base.standard.getTokenSupply(tokenId);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD)
          ? BigNumber.from(0)
          : remainingSupply.add(tokenSupply);

        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (sftV2) {
        const iSftIssuance = sftV2.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenIdBn);

        const remainingSupply = maxTotalSupply.eq(0) ? SUPPLY_THRESHOLD : maxTotalSupply.sub(tokenSupply);
        const claimableSupply = condition.maxClaimableSupply.eq(0)
          ? SUPPLY_THRESHOLD
          : condition.maxClaimableSupply.sub(condition.supplyClaimed);
        const maxAvailableSupply = claimableSupply.gt(remainingSupply) ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: conditionId.toNumber(),
          activeClaimCondition: {
            currency: condition.currency as Address,
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: condition.startTimestamp.toNumber(),
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            isClaimingPaused: isClaimPaused,
          },
        };
      }
    } catch (err) {
      const args = { tokenId };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  protected async getUserClaimConditionsERC1155(
    userAddress: Address,
    tokenId: BigNumber,
  ): Promise<UserClaimConditions> {
    const { sftV0, sftV1 } = this.getPartition('getUserConditions')(this.base.interfaces);
    if (!sftV0 && !sftV1) {
      throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
    }

    try {
      const tokenIdBn = BigNumber.from(tokenId);

      if (sftV0) {
        const iSftIssuance = sftV0.connectReadOnly();

        const { conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp } =
          await iSftIssuance.getUserClaimConditions(tokenIdBn, userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (sftV1) {
        const iSftIssuance = sftV1.connectReadOnly();

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await iSftIssuance.getUserClaimConditions(tokenIdBn, userAddress);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      }
    } catch (err) {
      const args = { userAddress, tokenId };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }
}
