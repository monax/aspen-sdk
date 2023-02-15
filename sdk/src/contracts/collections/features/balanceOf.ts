import { BigNumber, BigNumberish, CallOverrides } from 'ethers';
import { Addressish, asAddress, CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';

const BalanceOfFunctions = {
  nft: 'balanceOf(address)[uint256]',
  sft: 'balanceOf(address,uint256)[uint256]',
} as const;

const BalanceOfPartitions = {
  nft: [...FeatureFunctionsMap[BalanceOfFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[BalanceOfFunctions.sft].drop],
};
type BalanceOfPartitions = typeof BalanceOfPartitions;

const BalanceOfInterfaces = Object.values(BalanceOfPartitions).flat();
type BalanceOfInterfaces = (typeof BalanceOfInterfaces)[number];

export type BalanceOfCallArgs = [address: Addressish, tokenId: BigNumberish | null, overrides?: CallOverrides];
export type BalanceOfResponse = BigNumber;

export class BalanceOf extends ContractFunction<
  BalanceOfInterfaces,
  BalanceOfPartitions,
  BalanceOfCallArgs,
  BalanceOfResponse
> {
  readonly functionName = 'balanceOf';

  constructor(base: CollectionContract) {
    super(base, BalanceOfInterfaces, BalanceOfPartitions, BalanceOfFunctions);
  }

  /** Get the token supply owned by a wallet [ERC721: across the collection] [ERC1155: for specific token] */
  call(...args: BalanceOfCallArgs): Promise<BalanceOfResponse> {
    return this.balanceOf(...args);
  }

  async balanceOf(
    address: Addressish,
    tokenId: BigNumberish | null = null,
    overrides: CallOverrides = {},
  ): Promise<BigNumber> {
    const { nft, sft } = this.partitions;

    try {
      if (sft) {
        tokenId = this.base.requireTokenId(tokenId, this.functionName);
        const balance = await sft.connectReadOnly().balanceOf(asAddress(address), tokenId, overrides);
        return balance;
      } else if (nft) {
        this.base.rejectTokenId(tokenId, this.functionName);
        const balance = await nft.connectReadOnly().balanceOf(asAddress(address), overrides);
        return balance;
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR, { address, tokenId });
    }

    this.notSupported();
  }
}
