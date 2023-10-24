import { Addressish, asAddress } from '@monaxlabs/phloem/dist/types';
import { GetTransactionReceiptReturnType, Hex, encodeFunctionData } from 'viem';
import { CollectionContract, RequiredTokenId, Signer, WriteParameters } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction, asCallableClass } from './features';

const SetSaleRecipientForTokenFunctions = {
  v1: 'setSaleRecipientForToken(uint256,address)[]',
} as const;

const SetSaleRecipientForTokenPartitions = {
  v1: [...FeatureFunctionsMap[SetSaleRecipientForTokenFunctions.v1].drop],
};
type SetSaleRecipientForTokenPartitions = typeof SetSaleRecipientForTokenPartitions;

const SetSaleRecipientForTokenInterfaces = Object.values(SetSaleRecipientForTokenPartitions).flat();
type SetSaleRecipientForTokenInterfaces = (typeof SetSaleRecipientForTokenInterfaces)[number];

export type SetSaleRecipientForTokenCallArgs = [
  walletClient: Signer,
  tokenId: RequiredTokenId,
  saleRecipient: Addressish,
  params?: WriteParameters,
];
export type SetSaleRecipientForTokenResponse = GetTransactionReceiptReturnType;

export class SetSaleRecipientForToken extends ContractFunction<
  SetSaleRecipientForTokenInterfaces,
  SetSaleRecipientForTokenPartitions,
  SetSaleRecipientForTokenCallArgs,
  SetSaleRecipientForTokenResponse
> {
  readonly functionName = 'setSaleRecipientForToken';

  constructor(base: CollectionContract) {
    super(
      base,
      SetSaleRecipientForTokenInterfaces,
      SetSaleRecipientForTokenPartitions,
      SetSaleRecipientForTokenFunctions,
    );
  }

  execute(...args: SetSaleRecipientForTokenCallArgs): Promise<SetSaleRecipientForTokenResponse> {
    return this.setSaleRecipientForToken(...args);
  }

  async setSaleRecipientForToken(
    walletClient: Signer,
    tokenId: RequiredTokenId,
    saleRecipient: Addressish,
    params?: WriteParameters,
  ): Promise<SetSaleRecipientForTokenResponse> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(saleRecipient);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);
    const fullParams = { account: walletClient.account, ...params };

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setSaleRecipientForToken(
        [tokenId, wallet as Hex],
        fullParams,
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
    saleRecipient: Addressish,
    params?: WriteParameters,
  ): Promise<bigint> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(saleRecipient);
    const fullParams = { account: walletClient.account, ...params };
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const estimate = await this.reader(this.abi(v1)).estimateGas.setSaleRecipientForToken(
        [tokenId, wallet as Hex],
        fullParams,
      );
      return estimate;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }

  async populateTransaction(
    tokenId: RequiredTokenId,
    saleRecipient: Addressish,
    params?: WriteParameters,
  ): Promise<string> {
    const v1 = this.partition('v1');
    const wallet = await asAddress(saleRecipient);
    tokenId = this.base.requireTokenId(tokenId, this.functionName);

    try {
      const { request } = await this.reader(this.abi(v1)).simulate.setSaleRecipientForToken(
        [tokenId, wallet as Hex],
        params,
      );
      return encodeFunctionData(request);
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const setSaleRecipientForToken = asCallableClass(SetSaleRecipientForToken);
