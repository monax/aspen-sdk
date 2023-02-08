import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers';
import { Address, isSameAddress, ZERO_ADDRESS } from '../..';
import { CollectionContract } from '../collections';
import { SdkError, SdkErrorCode } from '../errors';
import type { Signerish, SourcedOverrides } from '../types';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { ContractFunction } from './features';
import { IssuedToken } from './issue';

const IssueWithTokenUriPartitions = {
  nft: [...FeatureFunctionsMap['issueWithTokenURI(address,string)[]'].drop],
};
type IssueWithTokenUriPartitions = typeof IssueWithTokenUriPartitions;

const IssueWithTokenUriInterfaces = Object.values(IssueWithTokenUriPartitions).flat();
type IssueWithTokenUriInterfaces = (typeof IssueWithTokenUriInterfaces)[number];

export type IssueWithTokenUriCallArgs = [signer: Signerish, args: IssueWithTokenUriArgs, overrides?: SourcedOverrides];
export type IssueWithTokenUriResponse = ContractTransaction;

export type IssueWithTokenUriArgs = {
  receiver: Address;
  tokenURI: string;
};

export class IssueWithTokenUri extends ContractFunction<
  IssueWithTokenUriInterfaces,
  IssueWithTokenUriPartitions,
  IssueWithTokenUriCallArgs,
  IssueWithTokenUriResponse
> {
  readonly functionName = 'issueWithTokenUri';

  constructor(base: CollectionContract) {
    super(base, IssueWithTokenUriInterfaces, IssueWithTokenUriPartitions);
  }

  call(...args: IssueWithTokenUriCallArgs): Promise<IssueWithTokenUriResponse> {
    return this.issueWithTokenUri(...args);
  }

  async issueWithTokenUri(
    signer: Signerish,
    args: IssueWithTokenUriArgs,
    overrides: SourcedOverrides = {},
  ): Promise<ContractTransaction> {
    this.validateArgs(args);
    const nft = this.partition('nft');

    try {
      const tx = await nft.connectWith(signer).issueWithTokenURI(args.receiver, args.tokenURI, overrides);
      return tx;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  async estimateGas(
    signer: Signerish,
    args: IssueWithTokenUriArgs,
    overrides: SourcedOverrides = {},
  ): Promise<BigNumber> {
    this.validateArgs(args);
    const nft = this.partition('nft');

    try {
      const gas = await nft.connectWith(signer).estimateGas.issueWithTokenURI(args.receiver, args.tokenURI, overrides);
      return gas;
    } catch (err) {
      throw new SdkError(SdkErrorCode.CHAIN_ERROR, args, err as Error);
    }
  }

  protected async validateArgs({ receiver }: IssueWithTokenUriArgs) {
    if (isSameAddress(receiver, ZERO_ADDRESS)) {
      throw new SdkError(SdkErrorCode.INVALID_DATA, undefined, new Error('Receiver cannot be an empty address'));
    }
  }

  async parseReceiptLogs(receipt: ContractReceipt): Promise<IssuedToken[]> {
    return this.base.issue.parseReceiptLogs(receipt);
  }
}
