import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { Zero, normalise } from '../number';
import type { BigIntish, Signer, WriteParameters } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { CatchAllInterfaces, ContractFunction, asCallableClass } from './features';

const BurnFunctions = {
  nft: 'burn(uint256)[]',
  sft: 'burn(address,uint256,uint256)[]',
} as const;

const BurnPartitions = {
  nft: [...FeatureFunctionsMap[BurnFunctions.nft].drop],
  sft: [...FeatureFunctionsMap[BurnFunctions.sft].drop],
  // 'burn' has always been present but not actually exposed by the old interfaces
  catchAll: CatchAllInterfaces,
};
type BurnPartitions = typeof BurnPartitions;

const BurnInterfaces = Object.values(BurnPartitions).flat();
type BurnInterfaces = (typeof BurnInterfaces)[number];

export type BurnCallArgs = [
  walletClient: Signer,
  tokenId: BigIntish,
  wallet?: Addressish,
  amount?: BigIntish,
  params?: WriteParameters,
];
export type BurnResponse = GetTransactionReceiptReturnType;

export class Burn extends ContractFunction<BurnInterfaces, BurnPartitions, BurnCallArgs, BurnResponse> {
  readonly functionName = 'burn';

  constructor(base: CollectionContract) {
    super(base, BurnInterfaces, BurnPartitions, BurnFunctions);
  }

  execute(...args: BurnCallArgs): Promise<BurnResponse> {
    return this.burn(...args);
  }

  async burn(
    walletClient: Signer,
    tokenId: BigIntish,
    wallet?: Addressish,
    amount?: BigIntish,
    params?: WriteParameters,
  ): Promise<BurnResponse> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const fullParams = { account: walletClient.account, ...params };

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const account = await asAddress(wallet || '');
          const { request } = await this.reader(this.abi(sft)).simulate.burn(
            [account as Hex, tokenId, normalise(amount || Zero)],
            fullParams,
          );
          const hash = await walletClient.writeContract(request);
          return this.base.publicClient.waitForTransactionReceipt({
            hash,
          });
        }

        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const { request } = await this.reader(this.abi(nft)).simulate.burn([tokenId], fullParams);
          const hash = await walletClient.writeContract(request);
          return this.base.publicClient.waitForTransactionReceipt({
            hash,
          });
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    tokenId: BigIntish,
    wallet?: Addressish,
    amount?: BigIntish,
    params?: WriteParameters,
  ): Promise<bigint> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const fullParams = { account: walletClient.account, ...params };

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const account = await asAddress(wallet || '');
          const estimate = await this.reader(this.abi(sft)).estimateGas.burn(
            [account as Hex, tokenId, normalise(amount || Zero)],
            fullParams,
          );
          return estimate;
        }

        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const estimate = await this.reader(this.abi(nft)).estimateGas.burn([tokenId], fullParams);
          return estimate;
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    tokenId: BigIntish,
    wallet?: Addressish,
    amount?: BigIntish,
    params?: WriteParameters,
  ): Promise<string> {
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      switch (this.base.tokenStandard) {
        case 'ERC1155': {
          const sft = this.base.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2');
          const account = await asAddress(wallet || '');
          const { request } = await this.reader(this.abi(sft)).simulate.burn(
            [account as Hex, tokenId, normalise(amount || Zero)],
            params,
          );
          return encodeFunctionData(request);
        }

        case 'ERC721': {
          const nft = this.base.assumeFeature('standard/IERC721.sol:IERC721V2');
          const { request } = await this.reader(this.abi(nft)).simulate.burn([tokenId], params);
          return encodeFunctionData(request);
        }
      }
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const burn = asCallableClass(Burn);
