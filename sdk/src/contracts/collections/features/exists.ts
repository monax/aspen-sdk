import { BigNumberish, CallOverrides } from 'ethers';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { CatchAllInterfaces, ContractFunction } from './features';

const ExistsFunctions = {
  v1: 'exists(uint256)[bool]',
} as const;

const ExistsPartitions = {
  v1: [...FeatureFunctionsMap[ExistsFunctions.v1].drop],
  // 'exists' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type ExistsPartitions = typeof ExistsPartitions;

const ExistsInterfaces = Object.values(ExistsPartitions).flat();
type ExistsInterfaces = (typeof ExistsInterfaces)[number];

export type ExistsCallArgs = [tokenId: BigNumberish, overrides?: CallOverrides];
export type ExistsResponse = boolean;

export class Exists extends ContractFunction<ExistsInterfaces, ExistsPartitions, ExistsCallArgs, ExistsResponse> {
  readonly functionName = 'exists';

  constructor(base: CollectionContract) {
    super(base, ExistsInterfaces, ExistsPartitions, ExistsFunctions);
  }

  /** Check if a token exists */
  call(...args: ExistsCallArgs): Promise<ExistsResponse> {
    return this.exists(...args);
  }

  async exists(tokenId: BigNumberish, overrides: CallOverrides = {}): Promise<boolean> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const token = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
      const exists = await token.connectReadOnly().exists(tokenId, overrides);
      return exists;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { tokenId });
    }
  }
}
