import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { encodeFunctionData, GetTransactionReceiptReturnType, Hex } from 'viem';
import { CollectionContract, RequiredTokenId, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const SetRoyaltyInfoForTokenFunctions = {
  v1: 'setRoyaltyInfoForToken(uint256,address,uint256)[]',
} as const;

const SetRoyaltyInfoForTokenPartitions = {
  v1: [...FeatureFunctionsMap[SetRoyaltyInfoForTokenFunctions.v1].drop],
};
type SetRoyaltyInfoForTokenPartitions = typeof SetRoyaltyInfoForTokenPartitions;

const SetRoyaltyInfoForTokenInterfaces = Object.values(SetRoyaltyInfoForTokenPartitions).flat();
type SetRoyaltyInfoForTokenInterfaces = (typeof SetRoyaltyInfoForTokenInterfaces)[number];

export type SetRoyaltyInfoForTokenCallArgs = [
  walletClient: Signer,
  tokenId: RequiredTokenId,
  royaltyRecipient: Addressish,
  basisPoints: bigint | number,
  params?: WriteParameters,
];
export type SetRoyaltyInfoForTokenResponse = GetTransactionReceiptReturnType;

export class SetRoyaltyInfoForToken extends ContractFunction<
  SetRoyaltyInfoForTokenInterfaces,
  SetRoyaltyInfoForTokenPartitions,
  SetRoyaltyInfoForTokenCallArgs,
  SetRoyaltyInfoForTokenResponse
> {
  readonly functionName = 'setRoyaltyInfoForToken';

  constructor(base: CollectionContract) {
    super(base, SetRoyaltyInfoForTokenInterfaces, SetRoyaltyInfoForTokenPartitions, SetRoyaltyInfoForTokenFunctions);
  }

  execute(...args: SetRoyaltyInfoForTokenCallArgs): Promise<SetRoyaltyInfoForTokenResponse> {
    return this.setRoyaltyInfoForToken(...args);
  }

  async setRoyaltyInfoForToken(
    walletClient: Signer,
    tokenId: RequiredTokenId,
    royaltyRecipient: Addressish,
    basisPoints: bigint | number,
    params?: WriteParameters,
  ): Promise<SetRoyaltyInfoForTokenResponse> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setRoyaltyInfoForToken(
        [tokenId, wallet as Hex, BigInt(basisPoints)],
        params,
      );
      const hash = await walletClient.writeContract(request);
      return this.base.publicClient.waitForTransactionReceipt({
        hash,
      });
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async estimateGas(
    walletClient: Signer,
    tokenId: RequiredTokenId,
    royaltyRecipient: Addressish,
    basisPoints: bigint | number,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);
    const fullParams = { account: walletClient.account, ...params };
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setRoyaltyInfoForToken(
        [tokenId, wallet as Hex, BigInt(basisPoints)],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    tokenId: RequiredTokenId,
    royaltyRecipient: Addressish,
    basisPoints: bigint | number,
    params?: WriteParameters,
  ): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(royaltyRecipient);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setRoyaltyInfoForToken(
        [tokenId, wallet as Hex, BigInt(basisPoints)],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setRoyaltyInfoForToken = asCallableClass(SetRoyaltyInfoForToken);
