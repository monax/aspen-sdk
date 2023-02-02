import axios from 'axios';
import { add } from 'date-fns';
import { BigNumber, BigNumberish, constants, ContractTransaction } from 'ethers';
import { Address, ZERO_BYTES32 } from '../..';
import { AllowlistStatus, getAllowlistStatus } from '../../../apis/publishing';
import { publishingChainFromChainId } from '../../../apis/utils/chains';
import { parse } from '../../../utils';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import { max, min } from '../number';
import type {
  ActiveClaimConditions,
  ClaimConditionsState,
  CollectionContractClaimCondition,
  CollectionUserClaimConditions,
  CollectionUserClaimState,
  Signerish,
  SourcedOverrides,
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
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
  'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV3',
  // SFT
  // 'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV0', // very old
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV0',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV1',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV2',
  'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3',
] as const;

export type ConditionsFeatures = (typeof ConditionsFeatures)[number];

export type ConditionArgs = {
  conditions: CollectionContractClaimCondition[];
  tokenId: BigNumberish | null;
  resetClaimEligibility: boolean;
};

export class Conditions extends FeatureSet<ConditionsFeatures> {
  constructor(base: CollectionContract) {
    super(base, ConditionsFeatures);
  }

  protected readonly getPartition = this.makeGetPartition((partitioner) => {
    const conditions = partitioner({
      nftV0: [
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV1',
        'issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV2',
      ],
      nftV1: ['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV3'],
      nftV2: ['issuance/ICedarNFTIssuance.sol:ICedarNFTIssuanceV4'],
      nftP1: [
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV1',
      ],
      nftP2: ['issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2'],
      nftR1: [
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV0',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV1',
      ],
      nftR2: [
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV2',
        'issuance/ICedarNFTIssuance.sol:IRestrictedNFTIssuanceV3',
      ],
      sftV0: ['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV1'],
      sftV1: ['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV2'],
      sftV2: ['issuance/ICedarSFTIssuance.sol:ICedarSFTIssuanceV3'],
      sftP1: [
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV0',
        'issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV1',
      ],
      sftP2: ['issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2'],
      sftR1: [
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV0',
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV1',
      ],
      sftR2: [
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV2',
        'issuance/ICedarSFTIssuance.sol:IRestrictedSFTIssuanceV3',
      ],
    });

    return { conditions };
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
        this.getActive(tokenId),
        this.getForUser(userAddress, tokenId),
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

      const userClaimRestrictions = await this.getUserRestrictions(
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

  async getById(conditionId: BigNumberish, tokenId: BigNumberish | null): Promise<CollectionContractClaimCondition> {
    const c = this.getPartition('conditions');

    switch (this.base.tokenStandard) {
      case 'ERC1155':
        tokenId = this.base.requireTokenId(tokenId);
        if (c.sftV0 || c.sftV1 || c.sftV2 || c.sftP1 || c.sftP2) {
          const factory = this.base.assumeFeature('issuance/ICedarSFTIssuance.sol:IPublicSFTIssuanceV2');
          const condition = await factory.connectReadOnly().getClaimConditionById(tokenId, conditionId);
          return {
            startTimestamp: condition.startTimestamp.toNumber(),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            currency: parse(Address, condition.currency),
            phaseId: condition.phaseId ?? null, // 'phaseId' isn't returned by old interfaces
          };
        }
        break;

      case 'ERC721':
        if (c.nftV0 || c.nftV1 || c.nftV2 || c.nftP1 || c.nftP2) {
          const factory = this.base.assumeFeature('issuance/ICedarNFTIssuance.sol:IPublicNFTIssuanceV2');
          const condition = await factory.connectReadOnly().getClaimConditionById(conditionId);
          return {
            startTimestamp: condition.startTimestamp.toNumber(),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            waitTimeInSecondsBetweenClaims: condition.waitTimeInSecondsBetweenClaims.toNumber(),
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            currency: parse(Address, condition.currency),
            phaseId: condition.phaseId ?? null, // 'phaseId' isn't returned by old interfaces
          };
        }
        break;
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  async set(signer: Signerish, args: ConditionArgs, overrides?: SourcedOverrides): Promise<ContractTransaction> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.setERC1155(signer, args, overrides);
      case 'ERC721':
        return await this.setERC721(signer, args, overrides);
    }
  }

  async setERC1155(
    signer: Signerish,
    { conditions, tokenId, resetClaimEligibility }: ConditionArgs,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    tokenId = this.base.requireTokenId(tokenId);
    const { sftV0, sftV1, sftV2, sftR1, sftR2 } = this.getPartition('conditions');
    const factory = sftV0 ?? sftV1 ?? sftV2 ?? sftR1 ?? sftR2;

    try {
      if (factory) {
        const iface = factory.connectWith(signer);
        const tx = await iface.setClaimConditions(tokenId, conditions, resetClaimEligibility, overrides);
        return tx;
      }
    } catch (err) {
      const args = { conditions, tokenId, resetClaimEligibility };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  async setERC721(
    signer: Signerish,
    { conditions, resetClaimEligibility }: ConditionArgs,
    overrides?: SourcedOverrides,
  ): Promise<ContractTransaction> {
    const { nftV0, nftV1, nftV2, nftR1, nftR2 } = this.getPartition('conditions');
    const factory = nftV0 ?? nftV1 ?? nftV2 ?? nftR1 ?? nftR2;

    try {
      if (factory) {
        const iface = factory.connectWith(signer);
        const tx = await iface.setClaimConditions(conditions, resetClaimEligibility, overrides);
        return tx;
      }
    } catch (err) {
      const args = { conditions, resetClaimEligibility };
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  /**
   * @param tokenId Optional token id - use for ERC1155 contracts
   * @returns Token or Collection claim conditions
   */
  async getActive(tokenId: BigNumberish | null = null): Promise<ActiveClaimConditions> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return await this.getActiveERC1155(this.base.requireTokenId(tokenId));
      case 'ERC721':
        return await this.getActiveERC721();
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
  async getUserRestrictions(
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
  async getForUser(userAddress: Address, tokenId: BigNumberish | null = null): Promise<UserClaimConditions> {
    switch (this.base.tokenStandard) {
      case 'ERC1155':
        return this.getForUserERC1155(userAddress, this.base.requireTokenId(tokenId));
      case 'ERC721':
        return this.getForUserERC721(userAddress);
    }
  }

  protected async getActiveERC721(): Promise<ActiveClaimConditions> {
    const { nftV0, nftV1, nftV2, nftP1, nftP2 } = this.getPartition('conditions');
    const v3 = nftV2 ?? nftP1;

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
            phaseId: null,
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
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (v3) {
        const iNftIssuance = v3.connectReadOnly();

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
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (nftP2) {
        const iNftIssuance = nftP2.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iNftIssuance.getActiveClaimConditions();

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
            phaseId: condition.phaseId,
            isClaimingPaused: isClaimPaused,
          },
        };
      }
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, undefined, err as Error);
    }

    throw new SdkError(SdkErrorCode.FEATURE_NOT_SUPPORTED, { feature: 'conditions' });
  }

  protected async getForUserERC721(userAddress: Address): Promise<UserClaimConditions> {
    const { nftV0, nftV1, nftV2, nftP1, nftP2 } = this.getPartition('conditions');
    const v3 = nftV2 ?? nftP1 ?? nftP2;

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
      } else if (v3) {
        const iNftIssuance = v3.connectReadOnly();

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

  protected async getActiveERC1155(tokenId: BigNumber): Promise<ActiveClaimConditions> {
    const { sftV0, sftV1, sftV2, sftP1, sftP2 } = this.getPartition('conditions');
    const v3 = sftV2 ?? sftP1;

    try {
      if (sftV0) {
        const iSftIssuance = sftV0.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenId);

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
            phaseId: null,
            isClaimingPaused: false,
          },
        };
      } else if (sftV1) {
        const iSftIssuance = sftV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iSftIssuance.getActiveClaimConditions(tokenId);

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
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (v3) {
        const iSftIssuance = v3.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenId);

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
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (sftP2) {
        const iSftIssuance = sftP2.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await iSftIssuance.getActiveClaimConditions(tokenId);

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
            phaseId: condition.phaseId,
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

  protected async getForUserERC1155(userAddress: Address, tokenId: BigNumber): Promise<UserClaimConditions> {
    const { sftV0, sftV1, sftV2, sftP1, sftP2 } = this.getPartition('conditions');
    const v1 = sftV1 ?? sftV2 ?? sftP1 ?? sftP2;

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
      } else if (v1) {
        const iSftIssuance = v1.connectReadOnly();

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
