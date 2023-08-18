import { TransactionHash } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData } from 'viem';
import { CollectionContract, RequiredTokenId, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetTokenUriFunctions = {
  v1: 'setTokenURI(uint256,string)[]',
} as const;

const SetTokenUriPartitions = {
  v1: [...FeatureFunctionsMap[SetTokenUriFunctions.v1].drop],
};
type SetTokenUriPartitions = typeof SetTokenUriPartitions;

const SetTokenUriInterfaces = Object.values(SetTokenUriPartitions).flat();
type SetTokenUriInterfaces = (typeof SetTokenUriInterfaces)[number];

export type SetTokenUriCallArgs = [
  walletClient: Signer,
  tokenId: RequiredTokenId,
  tokenUri: string,
  params?: WriteParameters,
];
export type SetTokenUriResponse = TransactionHash;

export class SetTokenUri extends ContractFunction<
  SetTokenUriInterfaces,
  SetTokenUriPartitions,
  SetTokenUriCallArgs,
  SetTokenUriResponse
> {
  readonly functionName = 'setTokenUri';

  constructor(base: CollectionContract) {
    super(base, SetTokenUriInterfaces, SetTokenUriPartitions, SetTokenUriFunctions);
  }

  execute(...args: SetTokenUriCallArgs): Promise<SetTokenUriResponse> {
    return this.setTokenUri(...args);
  }

  async setTokenUri(
    walletClient: Signer,
    tokenId: RequiredTokenId,
    tokenUri: string,
    params?: WriteParameters,
  ): Promise<TransactionHash> {
    const v1 = this.partition('v1');
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTokenURI([tokenId, tokenUri], params);
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
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setTokenURI([tokenId, tokenUri], fullParams);
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(tokenId: RequiredTokenId, tokenUri: string, params?: WriteParameters): Promise<string> {
    const v1 = this.partition('v1');
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setTokenURI([tokenId, tokenUri], params);
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setTokenUri = asCallableClass(SetTokenUri);
