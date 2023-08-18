import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract, RequiredTokenId, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetPermanentTokenUriFunctions = {
  v1: 'setPermantentTokenURI(uint256,string)[]',
} as const;

const SetPermanentTokenUriPartitions = {
  v1: [...FeatureFunctionsMap[SetPermanentTokenUriFunctions.v1].drop],
};
type SetPermanentTokenUriPartitions = typeof SetPermanentTokenUriPartitions;

const SetPermanentTokenUriInterfaces = Object.values(SetPermanentTokenUriPartitions).flat();
type SetPermanentTokenUriInterfaces = (typeof SetPermanentTokenUriInterfaces)[number];

export type SetPermanentTokenUriCallArgs = [
  walletClient: Signer,
  tokenId: RequiredTokenId,
  tokenUri: string,
  params?: WriteParameters,
];
export type SetPermanentTokenUriResponse = TransactionHash;

export class SetPermanentTokenUri extends ContractFunction<
  SetPermanentTokenUriInterfaces,
  SetPermanentTokenUriPartitions,
  SetPermanentTokenUriCallArgs,
  SetPermanentTokenUriResponse
> {
  readonly functionName = 'setPermanentTokenUri';

  constructor(base: CollectionContract) {
    super(base, SetPermanentTokenUriInterfaces, SetPermanentTokenUriPartitions, SetPermanentTokenUriFunctions);
  }

  execute(...args: SetPermanentTokenUriCallArgs): Promise<SetPermanentTokenUriResponse> {
    return this.setPermanentTokenUri(...args);
  }

  async setPermanentTokenUri(
    walletClient: Signer,
    tokenId: RequiredTokenId,
    tokenUri: string,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setPermantentTokenURI(
        [BigInt(tokenId), tokenUri],
        params,
      );
      const tx = await walletClient.sendTransaction(request);
      return tx as TransactionHash;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    tokenId: RequiredTokenId,
    tokenUri: string,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const fullParams = { account: walletClient.account, ...params };

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setPermantentTokenURI(
        [BigInt(tokenId), tokenUri],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(tokenId: RequiredTokenId, tokenUri: string, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setPermantentTokenURI(
        [BigInt(tokenId), tokenUri],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setPermanentTokenUri = asCallableClass(SetPermanentTokenUri);
