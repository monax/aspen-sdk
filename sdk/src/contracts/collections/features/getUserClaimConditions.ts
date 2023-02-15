import { BigNumber, BigNumberish, CallOverrides, constants } from 'ethers';
import { Address, Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { Zero } from '../number';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';
import { CollectionContractClaimCondition } from './getClaimConditionById';

// Reasonably large number to compare with
export const SUPPLY_THRESHOLD = constants.MaxInt256;

const GetUserClaimConditionsFunctions = {
  // NFT
  activeNftV1:
    'getActiveClaimConditions()[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address),uint256,uint256,uint256]',
  activeNftV2:
    'getActiveClaimConditions()[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address),uint256,uint256,uint256,bool]',
  activeNftV3:
    'getActiveClaimConditions()[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address),uint256,uint256,uint256,uint256,bool]',
  activeNftV4:
    'getActiveClaimConditions()[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address,bytes32),uint256,uint256,uint256,uint256,bool]',
  userNftV1: 'getUserClaimConditions(address)[uint256,uint256,uint256,uint256]',
  userNftV2: 'getUserClaimConditions(address)[uint256,uint256,uint256,uint256,uint256]',
  // SFT
  activeSftV1:
    'getActiveClaimConditions(uint256)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address),uint256,uint256,uint256]',
  activeSftV2:
    'getActiveClaimConditions(uint256)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address),uint256,uint256,uint256,bool]',
  activeSftV3:
    'getActiveClaimConditions(uint256)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address),uint256,uint256,uint256,uint256,bool]',
  activeSftV4:
    'getActiveClaimConditions(uint256)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address,bytes32),uint256,uint256,uint256,uint256,bool]',
  userSftV1: 'getUserClaimConditions(uint256,address)[uint256,uint256,uint256,uint256]',
  userSftV2: 'getUserClaimConditions(uint256,address)[uint256,uint256,uint256,uint256,uint256]',
} as const;

const GetUserClaimConditionsPartitions = {
  // NFT conditions
  activeNftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV1].drop],
  activeNftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV2].drop],
  activeNftV3: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV3].drop],
  activeNftV4: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV4].drop],
  userNftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userNftV1].drop],
  userNftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userNftV2].drop],

  // SFT conditions
  activeSftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV1].drop],
  activeSftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV2].drop],
  activeSftV3: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV3].drop],
  activeSftV4: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV4].drop],
  userSftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userSftV1].drop],
  userSftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userSftV2].drop],
};
type GetUserClaimConditionsPartitions = typeof GetUserClaimConditionsPartitions;

const GetUserClaimConditionsInterfaces = Object.values(GetUserClaimConditionsPartitions).flat();
type GetUserClaimConditionsInterfaces = (typeof GetUserClaimConditionsInterfaces)[number];

export type GetUserClaimConditionsCallArgs = [
  userAddress: Addressish,
  tokenId: BigNumberish | null,
  overrides?: CallOverrides,
];
export type GetUserClaimConditionsResponse = UserClaimConditions;

export type UserClaimConditions = PartialUserClaimConditions &
  Omit<ActiveClaimConditions, 'activeClaimCondition'> &
  Omit<CollectionContractClaimCondition, 'phaseId'> & { isClaimingPaused: boolean; phaseId: string | null };

type ActiveClaimConditions = {
  maxWalletClaimCount: BigNumber;
  tokenSupply: BigNumber;
  maxTotalSupply: BigNumber;
  maxAvailableSupply: BigNumber;
  activeClaimConditionId: number;
  activeClaimCondition: Omit<CollectionContractClaimCondition, 'phaseId'> & {
    isClaimingPaused: boolean;
    phaseId: string | null;
  };
};

type PartialUserClaimConditions = {
  activeClaimConditionId: number;
  walletClaimCount: BigNumber;
  walletClaimedCountInPhase: BigNumber | null;
  lastClaimTimestamp: number;
  nextClaimTimestamp: number;
};

export class GetUserClaimConditions extends ContractFunction<
  GetUserClaimConditionsInterfaces,
  GetUserClaimConditionsPartitions,
  GetUserClaimConditionsCallArgs,
  GetUserClaimConditionsResponse
> {
  readonly functionName = 'getUserClaimConditions';

  constructor(base: CollectionContract) {
    super(base, GetUserClaimConditionsInterfaces, GetUserClaimConditionsPartitions, GetUserClaimConditionsFunctions);
  }

  call(...args: GetUserClaimConditionsCallArgs): Promise<GetUserClaimConditionsResponse> {
    return this.getUserClaimConditions(...args);
  }

  async getUserClaimConditions(
    userAddress: Addressish,
    tokenId: BigNumberish | null,
    overrides: CallOverrides = {},
  ): Promise<UserClaimConditions> {
    const address = await asAddress(userAddress);

    switch (this.base.tokenStandard) {
      case 'ERC1155': {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);

        const [activeConditions, userConditions] = await Promise.all([
          this.getActiveERC1155(tokenId, overrides),
          this.getForUserERC1155(address, tokenId, overrides),
        ]);

        const { activeClaimCondition, ...otherActiveConditions } = activeConditions;
        return { ...activeClaimCondition, ...otherActiveConditions, ...userConditions };
      }

      case 'ERC721': {
        this.base.rejectTokenId(tokenId, this.functionName);

        const [activeConditions, userConditions] = await Promise.all([
          this.getActiveERC721(overrides),
          this.getForUserERC721(address, overrides),
        ]);

        const { activeClaimCondition, ...otherActiveConditions } = activeConditions;
        return { ...activeClaimCondition, ...otherActiveConditions, ...userConditions };
      }
    }
  }

  protected async getActiveERC721(overrides: CallOverrides = {}): Promise<ActiveClaimConditions> {
    const { activeNftV1, activeNftV2, activeNftV3, activeNftV4 } = this.partitions;

    try {
      if (activeNftV1) {
        const nft = activeNftV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } = await nft.getActiveClaimConditions(
          overrides,
        );

        const tokenSupply = await this.base.totalSupply(null, overrides);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD) ? Zero : remainingSupply.add(tokenSupply);

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
      } else if (activeNftV2) {
        const nft = activeNftV2.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await nft.getActiveClaimConditions(overrides);

        const tokenSupply = await this.base.totalSupply(null, overrides);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD) ? Zero : remainingSupply.add(tokenSupply);

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
      } else if (activeNftV3) {
        const nft = activeNftV3.connectReadOnly();

        const {
          condition,
          conditionId,
          walletMaxClaimCount,
          isClaimPaused,
          tokenSupply: v1,
          maxTotalSupply: v2,
        } = await nft.getActiveClaimConditions(overrides);

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
      } else if (activeNftV4) {
        const nft = activeNftV4.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await nft.getActiveClaimConditions(overrides);

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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }

    this.notSupported();
  }

  protected async getForUserERC721(
    userAddress: Address,
    overrides: CallOverrides = {},
  ): Promise<PartialUserClaimConditions> {
    const { userNftV1, userNftV2 } = this.partitions;

    try {
      if (userNftV1) {
        const nft = userNftV1.connectReadOnly();

        const { conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp } =
          await nft.getUserClaimConditions(userAddress, overrides);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (userNftV2) {
        const nft = userNftV2.connectReadOnly();

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await nft.getUserClaimConditions(userAddress, overrides);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { userAddress });
    }

    this.notSupported();
  }

  protected async getActiveERC1155(tokenId: BigNumber, overrides: CallOverrides = {}): Promise<ActiveClaimConditions> {
    const { activeSftV1, activeSftV2, activeSftV3, activeSftV4 } = this.partitions;

    try {
      if (activeSftV1) {
        const sft = activeSftV1.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply } = await sft.getActiveClaimConditions(
          tokenId,
          overrides,
        );

        const tokenSupply = await this.base.totalSupply(tokenId, overrides);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD) ? Zero : remainingSupply.add(tokenSupply);

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
      } else if (activeSftV2) {
        const iSftIssuance = activeSftV2.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused } =
          await iSftIssuance.getActiveClaimConditions(tokenId, overrides);

        const tokenSupply = await this.base.totalSupply(tokenId, overrides);
        const maxTotalSupply = remainingSupply.gt(SUPPLY_THRESHOLD) ? Zero : remainingSupply.add(tokenSupply);

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
      } else if (activeSftV3) {
        const sft = activeSftV3.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await sft.getActiveClaimConditions(tokenId, overrides);

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
      } else if (activeSftV4) {
        const sft = activeSftV4.connectReadOnly();

        const { condition, conditionId, walletMaxClaimCount, isClaimPaused, tokenSupply, maxTotalSupply } =
          await sft.getActiveClaimConditions(tokenId, overrides);

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
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }

    this.notSupported();
  }

  protected async getForUserERC1155(
    userAddress: Address,
    tokenId: BigNumber,
    overrides: CallOverrides = {},
  ): Promise<PartialUserClaimConditions> {
    const { userSftV1, userSftV2 } = this.partitions;

    try {
      const tokenIdBn = BigNumber.from(tokenId);

      if (userSftV1) {
        const sft = userSftV1.connectReadOnly();

        const { conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp } =
          await sft.getUserClaimConditions(tokenIdBn, userAddress, overrides);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      } else if (userSftV2) {
        const sft = userSftV2.connectReadOnly();

        const {
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        } = await sft.getUserClaimConditions(tokenIdBn, userAddress, overrides);

        return {
          activeClaimConditionId: conditionId.toNumber(),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: lastClaimTimestamp.toNumber(),
          nextClaimTimestamp: nextValidClaimTimestamp.toNumber(),
        };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { userAddress, tokenId });
    }

    this.notSupported();
  }
}
