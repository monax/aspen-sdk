import { BigNumber, BigNumberish, CallOverrides } from 'ethers';
import { Addressish, asAddress, CollectionContract, isSameAddress } from '../..';
import { SdkError, SdkErrorCode } from '../errors';
import { FeatureFunctionsMap } from './feature-functions.gen';
import { asCallableClass, ContractFunction } from './features';

const GetClaimPaymentDetailsFunctions = {
  v1: 'getClaimPaymentDetails(uint256,uint256,address)[address,uint256,uint256,address,uint256]',
} as const;

const GetClaimPaymentDetailsPartitions = {
  v1: [...FeatureFunctionsMap[GetClaimPaymentDetailsFunctions.v1].drop],
};
type GetClaimPaymentDetailsPartitions = typeof GetClaimPaymentDetailsPartitions;

const GetClaimPaymentDetailsInterfaces = Object.values(GetClaimPaymentDetailsPartitions).flat();
type GetClaimPaymentDetailsInterfaces = (typeof GetClaimPaymentDetailsInterfaces)[number];

export type GetClaimPaymentDetailsCallArgs = [
  quantity: BigNumberish,
  pricePerToken: BigNumberish,
  currency: Addressish,
  overrides?: CallOverrides,
];
export type GetClaimPaymentDetailsResponse = {
  claimCurrency: string;
  claimPrice: BigNumber;
  claimFee: BigNumber;
  collectorFeeCurrency: string;
  collectorFee: BigNumber;
};

export class GetClaimPaymentDetails extends ContractFunction<
  GetClaimPaymentDetailsInterfaces,
  GetClaimPaymentDetailsPartitions,
  GetClaimPaymentDetailsCallArgs,
  GetClaimPaymentDetailsResponse
> {
  readonly functionName = 'getClaimPaymentDetails';

  constructor(base: CollectionContract) {
    super(base, GetClaimPaymentDetailsInterfaces, GetClaimPaymentDetailsPartitions, GetClaimPaymentDetailsFunctions);
  }

  execute(...args: GetClaimPaymentDetailsCallArgs): Promise<GetClaimPaymentDetailsResponse> {
    return this.getClaimPaymentDetails(...args);
  }

  async getClaimPaymentDetails(
    quantity: BigNumberish,
    pricePerToken: BigNumberish,
    currency: Addressish,
    overrides: CallOverrides = {},
  ): Promise<GetClaimPaymentDetailsResponse> {
    const v1 = this.partition('v1');
    const currencyAddress = await asAddress(currency);

    try {
      const { claimCurrency, claimFee, claimPrice, collectorFee, collectorFeeCurrency } = await v1
        .connectReadOnly()
        .getClaimPaymentDetails(quantity, pricePerToken, currencyAddress, overrides);

      const paymentDetails = { claimCurrency, claimFee, claimPrice, collectorFee, collectorFeeCurrency };

      if (!isSameAddress(paymentDetails.claimCurrency, claimCurrency)) {
        throw new SdkError(SdkErrorCode.CHAIN_ERROR, {
          message: 'Claim currency mismatch',
          paymentDetails,
          arguments: { quantity, pricePerToken, currency },
        });
      }

      return paymentDetails;
    } catch (err) {
      throw SdkError.from(err, SdkErrorCode.CHAIN_ERROR);
    }
  }
}

export const getClaimPaymentDetails = asCallableClass(GetClaimPaymentDetails);
