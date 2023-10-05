import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address, Addressish, asAddress, MaxUint256n } from '@monaxlabs/phloem/dist/types';
import { Hex } from 'viem';
import { CollectionContract, CollectionContractClaimCondition, ReadParameters, TokenId } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { Zero } from '../number';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

// Reasonably large number to compare with
export const SUPPLY_THRESHOLD = MaxUint256n;

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
  userNftV3:
    'getUserClaimConditions(address)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address,bytes32),uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool]',
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
  userSftV3:
    'getUserClaimConditions(uint256,address)[(uint256,uint256,uint256,uint256,uint256,bytes32,uint256,address,bytes32),uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool]',
} as const;

const GetUserClaimConditionsPartitions = {
  // NFT conditions
  activeNftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV1].drop],
  activeNftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV2].drop],
  activeNftV3: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV3].drop],
  activeNftV4: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeNftV4].drop],
  userNftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userNftV1].drop],
  userNftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userNftV2].drop],
  userNftV3: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userNftV3].drop],

  // SFT conditions
  activeSftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV1].drop],
  activeSftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV2].drop],
  activeSftV3: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV3].drop],
  activeSftV4: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.activeSftV4].drop],
  userSftV1: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userSftV1].drop],
  userSftV2: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userSftV2].drop],
  userSftV3: [...FeatureFunctionsMap[GetUserClaimConditionsFunctions.userSftV3].drop],
};
type GetUserClaimConditionsPartitions = typeof GetUserClaimConditionsPartitions;

const GetUserClaimConditionsInterfaces = Object.values(GetUserClaimConditionsPartitions).flat();
type GetUserClaimConditionsInterfaces = (typeof GetUserClaimConditionsInterfaces)[number];

export type GetUserClaimConditionsCallArgs = [userAddress: Addressish, tokenId: TokenId, params?: ReadParameters];
export type GetUserClaimConditionsResponse = UserClaimConditions;

export type UserClaimConditions = PartialUserClaimConditions &
  Omit<ActiveClaimConditions, 'activeClaimCondition'> &
  Omit<CollectionContractClaimCondition, 'phaseId'> & { isClaimingPaused: boolean; phaseId: string | null };

type ActiveClaimConditions = {
  maxWalletClaimCount: bigint;
  tokenSupply: bigint;
  maxTotalSupply: bigint;
  maxAvailableSupply: bigint;
  activeClaimConditionId: number;
  activeClaimCondition: Omit<CollectionContractClaimCondition, 'phaseId'> & {
    isClaimingPaused: boolean;
    phaseId: string | null;
  };
};

type PartialUserClaimConditions = {
  activeClaimConditionId: number;
  walletClaimCount: bigint;
  walletClaimedCountInPhase: bigint | null;
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

  execute(...args: GetUserClaimConditionsCallArgs): Promise<GetUserClaimConditionsResponse> {
    return this.getUserClaimConditions(...args);
  }

  async getUserClaimConditions(
    userAddress: Addressish,
    tokenId: TokenId,
    params?: ReadParameters,
  ): Promise<UserClaimConditions> {
    const address = await asAddress(userAddress);
    const { userNftV3, userSftV3 } = this.partitions;

    switch (this.base.tokenStandard) {
      case 'ERC1155': {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);

        if (userSftV3) {
          return await this.getForUserERC1155V2(address, tokenId, params);
        }

        const [activeConditions, userConditions] = await Promise.all([
          this.getActiveERC1155(tokenId, params),
          this.getForUserERC1155(address, tokenId, params),
        ]);

        const { activeClaimCondition, ...otherActiveConditions } = activeConditions;
        return { ...activeClaimCondition, ...otherActiveConditions, ...userConditions };
      }

      case 'ERC721': {
        this.base.rejectTokenId(tokenId, this.functionName);

        if (userNftV3) {
          return await this.getForUserERC721V2(address, params);
        }

        const [activeConditions, userConditions] = await Promise.all([
          this.getActiveERC721(params),
          this.getForUserERC721(address, params),
        ]);

        const { activeClaimCondition, ...otherActiveConditions } = activeConditions;
        return { ...activeClaimCondition, ...otherActiveConditions, ...userConditions };
      }
    }
  }

  protected async getActiveERC721(params?: ReadParameters): Promise<ActiveClaimConditions> {
    const { activeNftV1, activeNftV2, activeNftV3, activeNftV4 } = this.partitions;

    try {
      if (activeNftV1) {
        const nft = this.reader(this.abi(activeNftV1));

        const [condition, conditionId, walletMaxClaimCount, remainingSupply] = await nft.read.getActiveClaimConditions(
          params,
        );

        const tokenSupply = await this.base.totalSupply(null, params);
        const maxTotalSupply = remainingSupply > SUPPLY_THRESHOLD ? Zero : remainingSupply + tokenSupply;

        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
            phaseId: null,
            isClaimingPaused: false,
          },
        };
      } else if (activeNftV2) {
        const nft = this.reader(this.abi(activeNftV2));

        const [condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused] =
          await nft.read.getActiveClaimConditions(params);

        const tokenSupply = await this.base.totalSupply(null, params);
        const maxTotalSupply = remainingSupply > SUPPLY_THRESHOLD ? Zero : remainingSupply + tokenSupply;

        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (activeNftV3) {
        const nft = this.reader(this.abi(activeNftV3));

        const [condition, conditionId, walletMaxClaimCount, v1, v2, isClaimPaused] =
          await nft.read.getActiveClaimConditions(params);

        // TEMP HACK: to fix the issue where the tokenSupply and maxTotalSupply can be switched
        const [tokenSupply, maxTotalSupply] = v1 < v2 ? [v1, v2] : [v2, v1];

        const remainingSupply = maxTotalSupply === Zero ? SUPPLY_THRESHOLD : maxTotalSupply - tokenSupply;
        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (activeNftV4) {
        const nft = this.reader(this.abi(activeNftV4));

        const [condition, conditionId, walletMaxClaimCount, tokenSupply, maxTotalSupply, isClaimPaused] =
          await nft.read.getActiveClaimConditions(params);

        const remainingSupply = maxTotalSupply === Zero ? SUPPLY_THRESHOLD : maxTotalSupply - tokenSupply;
        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
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

  protected async getForUserERC721(userAddress: Address, params?: ReadParameters): Promise<PartialUserClaimConditions> {
    const { userNftV1, userNftV2 } = this.partitions;

    try {
      if (userNftV1) {
        const nft = this.reader(this.abi(userNftV1));

        const [conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp] =
          await nft.read.getUserClaimConditions([userAddress as Hex], params);

        return {
          activeClaimConditionId: Number(conditionId),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: Number(lastClaimTimestamp),
          nextClaimTimestamp: Number(nextValidClaimTimestamp),
        };
      } else if (userNftV2) {
        const nft = this.reader(this.abi(userNftV2));

        const [
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        ] = await nft.read.getUserClaimConditions([userAddress as Hex], params);

        return {
          activeClaimConditionId: Number(conditionId),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: Number(lastClaimTimestamp),
          nextClaimTimestamp: Number(nextValidClaimTimestamp),
        };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { userAddress });
    }

    this.notSupported();
  }

  protected async getActiveERC1155(tokenId: bigint, params?: ReadParameters): Promise<ActiveClaimConditions> {
    const { activeSftV1, activeSftV2, activeSftV3, activeSftV4 } = this.partitions;

    try {
      if (activeSftV1) {
        const sft = this.reader(this.abi(activeSftV1));

        const [condition, conditionId, walletMaxClaimCount, remainingSupply] = await sft.read.getActiveClaimConditions(
          [tokenId],
          params,
        );

        const tokenSupply = await this.base.totalSupply(tokenId, params);
        const maxTotalSupply = remainingSupply > SUPPLY_THRESHOLD ? Zero : remainingSupply + tokenSupply;

        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
            phaseId: null,
            isClaimingPaused: false,
          },
        };
      } else if (activeSftV2) {
        const iSftIssuance = this.reader(this.abi(activeSftV2));

        const [condition, conditionId, walletMaxClaimCount, remainingSupply, isClaimPaused] =
          await iSftIssuance.read.getActiveClaimConditions([tokenId], params);

        const tokenSupply = await this.base.totalSupply(tokenId, params);
        const maxTotalSupply = remainingSupply > SUPPLY_THRESHOLD ? Zero : remainingSupply + tokenSupply;

        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (activeSftV3) {
        const sft = this.reader(this.abi(activeSftV3));

        const [condition, conditionId, walletMaxClaimCount, tokenSupply, maxTotalSupply, isClaimPaused] =
          await sft.read.getActiveClaimConditions([tokenId], params);

        const remainingSupply = maxTotalSupply === Zero ? SUPPLY_THRESHOLD : maxTotalSupply - tokenSupply;
        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
            phaseId: null,
            isClaimingPaused: isClaimPaused,
          },
        };
      } else if (activeSftV4) {
        const sft = this.reader(this.abi(activeSftV4));

        const [condition, conditionId, walletMaxClaimCount, tokenSupply, maxTotalSupply, isClaimPaused] =
          await sft.read.getActiveClaimConditions([tokenId], params);

        const remainingSupply = maxTotalSupply === Zero ? SUPPLY_THRESHOLD : maxTotalSupply - tokenSupply;
        const claimableSupply =
          condition.maxClaimableSupply === Zero
            ? SUPPLY_THRESHOLD
            : condition.maxClaimableSupply - condition.supplyClaimed;
        const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

        return {
          maxWalletClaimCount: walletMaxClaimCount,
          tokenSupply: tokenSupply,
          maxTotalSupply: maxTotalSupply,
          maxAvailableSupply: maxAvailableSupply,
          activeClaimConditionId: Number(conditionId),
          activeClaimCondition: {
            currency: parse(Address, condition.currency),
            maxClaimableSupply: condition.maxClaimableSupply,
            supplyClaimed: condition.supplyClaimed,
            merkleRoot: condition.merkleRoot,
            pricePerToken: condition.pricePerToken,
            quantityLimitPerTransaction: condition.quantityLimitPerTransaction,
            startTimestamp: Number(condition.startTimestamp),
            waitTimeInSecondsBetweenClaims: Number(condition.waitTimeInSecondsBetweenClaims),
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

  protected async getForUserERC721V2(userAddress: Address, params?: ReadParameters): Promise<UserClaimConditions> {
    const userNftV3 = this.partition('userNftV3');

    const [
      condition,
      conditionId,
      walletMaxClaimCount,
      tokenSupply,
      maxTotalSupply,
      walletClaimedCount,
      walletClaimedCountInPhase,
      lastClaimTimestamp,
      nextValidClaimTimestamp,
      isClaimPaused,
    ] = await this.reader(this.abi(userNftV3)).read.getUserClaimConditions([userAddress as Hex], params);

    const {
      startTimestamp,
      maxClaimableSupply,
      supplyClaimed,
      quantityLimitPerTransaction,
      waitTimeInSecondsBetweenClaims,
      merkleRoot,
      pricePerToken,
      currency,
      phaseId,
    } = condition;

    const remainingSupply = maxTotalSupply === Zero ? SUPPLY_THRESHOLD : maxTotalSupply - tokenSupply;
    const claimableSupply =
      condition.maxClaimableSupply === Zero ? SUPPLY_THRESHOLD : condition.maxClaimableSupply - condition.supplyClaimed;
    const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

    return {
      startTimestamp: Number(startTimestamp),
      waitTimeInSecondsBetweenClaims: Number(waitTimeInSecondsBetweenClaims),
      currency: parse(Address, currency),
      maxClaimableSupply,
      supplyClaimed,
      quantityLimitPerTransaction,
      merkleRoot,
      pricePerToken,
      phaseId,
      tokenSupply,
      maxTotalSupply,
      maxAvailableSupply,
      maxWalletClaimCount: walletMaxClaimCount,
      activeClaimConditionId: Number(conditionId),
      walletClaimCount: walletClaimedCount,
      walletClaimedCountInPhase,
      lastClaimTimestamp: Number(lastClaimTimestamp),
      nextClaimTimestamp: Number(nextValidClaimTimestamp),
      isClaimingPaused: isClaimPaused,
    };
  }

  protected async getForUserERC1155V2(
    userAddress: Address,
    tokenId: bigint,
    params?: ReadParameters,
  ): Promise<UserClaimConditions> {
    const userSftV3 = this.partition('userSftV3');

    const [
      condition,
      conditionId,
      walletMaxClaimCount,
      tokenSupply,
      maxTotalSupply,
      walletClaimedCount,
      walletClaimedCountInPhase,
      lastClaimTimestamp,
      nextValidClaimTimestamp,
      isClaimPaused,
    ] = await this.reader(this.abi(userSftV3)).read.getUserClaimConditions([tokenId, userAddress as Hex], params);

    const {
      startTimestamp,
      maxClaimableSupply,
      supplyClaimed,
      quantityLimitPerTransaction,
      waitTimeInSecondsBetweenClaims,
      merkleRoot,
      pricePerToken,
      currency,
      phaseId,
    } = condition;

    const remainingSupply = maxTotalSupply === Zero ? SUPPLY_THRESHOLD : maxTotalSupply - tokenSupply;
    const claimableSupply =
      condition.maxClaimableSupply === Zero ? SUPPLY_THRESHOLD : condition.maxClaimableSupply - condition.supplyClaimed;
    const maxAvailableSupply = claimableSupply > remainingSupply ? remainingSupply : claimableSupply;

    return {
      startTimestamp: Number(startTimestamp),
      waitTimeInSecondsBetweenClaims: Number(waitTimeInSecondsBetweenClaims),
      currency: parse(Address, currency),
      maxClaimableSupply,
      supplyClaimed,
      quantityLimitPerTransaction,
      merkleRoot,
      pricePerToken,
      phaseId,
      tokenSupply,
      maxTotalSupply,
      maxAvailableSupply,
      maxWalletClaimCount: walletMaxClaimCount,
      activeClaimConditionId: Number(conditionId),
      walletClaimCount: walletClaimedCount,
      walletClaimedCountInPhase,
      lastClaimTimestamp: Number(lastClaimTimestamp),
      nextClaimTimestamp: Number(nextValidClaimTimestamp),
      isClaimingPaused: isClaimPaused,
    };
  }

  protected async getForUserERC1155(
    userAddress: Address,
    tokenId: bigint,
    params?: ReadParameters,
  ): Promise<PartialUserClaimConditions> {
    const { userSftV1, userSftV2 } = this.partitions;

    try {
      if (userSftV1) {
        const sft = this.reader(this.abi(userSftV1));

        const [conditionId, walletClaimedCount, lastClaimTimestamp, nextValidClaimTimestamp] =
          await sft.read.getUserClaimConditions([tokenId, userAddress as Hex], params);

        return {
          activeClaimConditionId: Number(conditionId),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: null,
          lastClaimTimestamp: Number(lastClaimTimestamp),
          nextClaimTimestamp: Number(nextValidClaimTimestamp),
        };
      } else if (userSftV2) {
        const sft = this.reader(this.abi(userSftV2));

        const [
          conditionId,
          walletClaimedCount,
          walletClaimedCountInPhase,
          lastClaimTimestamp,
          nextValidClaimTimestamp,
        ] = await sft.read.getUserClaimConditions([tokenId, userAddress as Hex], params);

        return {
          activeClaimConditionId: Number(conditionId),
          walletClaimCount: walletClaimedCount,
          walletClaimedCountInPhase: walletClaimedCountInPhase,
          lastClaimTimestamp: Number(lastClaimTimestamp),
          nextClaimTimestamp: Number(nextValidClaimTimestamp),
        };
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { userAddress, tokenId });
    }

    this.notSupported();
  }
}

export const getUserClaimConditions = asCallableClass(GetUserClaimConditions);
