import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { describe, test } from 'vitest';
// import { MockJsonRpcProvider } from '../utils.testing';

const CONTRACT_ADDRESS = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');
const AGREEMENT_INTERFACE = 'agreement/IAgreement.sol:IPublicAgreementV1';

describe.skip('Collection - Terms details', () => {
  test('Terms details - enabled', async () => {
    // const provider = new MockJsonRpcProvider();
    // const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
    //   'standard/IERC721.sol:IERC721V0',
    //   AGREEMENT_INTERFACE,
    // ]);
    // const iface = erc721.assumeFeature(AGREEMENT_INTERFACE).interface;
    // const termsInfo = iface.encodeFunctionResult(iface.functions['getTermsDetails()'], ['ipfs://Qmxxxx', 0, true]);
    // provider.addMock('call', termsInfo);
    // const acceptedTerms = iface.encodeFunctionResult(iface.functions['hasAcceptedTerms(address)'], [true]);
    // provider.addMock('call', acceptedTerms);
    // expect(new Collection(erc721).getTermsState(ZERO_ADDRESS)).resolves.toStrictEqual({
    //   success: true,
    //   result: {
    //     termsRequired: true,
    //     termsLink: 'ipfs://Qmxxxx',
    //     termsAccepted: true,
    //     userAddress: ZERO_ADDRESS,
    //   },
    //   error: null,
    // });
  });

  test('Terms details - disabled', async () => {
    // const provider = new MockJsonRpcProvider();
    // const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
    //   'standard/IERC721.sol:IERC721V0',
    //   AGREEMENT_INTERFACE,
    // ]);
    // const iface = erc721.assumeFeature(AGREEMENT_INTERFACE).interface;
    // const termsInfo = iface.encodeFunctionResult(iface.functions['getTermsDetails()'], ['', 0, false]);
    // provider.addMock('call', termsInfo);
    // expect(new Collection(erc721).getTermsState(ZERO_ADDRESS)).resolves.toStrictEqual({
    //   success: true,
    //   result: {
    //     termsRequired: false,
    //     termsLink: null,
    //     termsAccepted: false,
    //     userAddress: ZERO_ADDRESS,
    //   },
    //   error: null,
    // });
  });

  test('Terms details - chain call fail', async () => {
    // const provider = new MockJsonRpcProvider();
    // const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
    //   'standard/IERC721.sol:IERC721V0',
    //   AGREEMENT_INTERFACE,
    // ]);
    // const shouldFail = await new Collection(erc721).getTermsState(ZERO_ADDRESS);
    // expect(shouldFail.success).toBe(false);
    // expect(shouldFail.result).toBe(null);
    // expect(SdkError.is(shouldFail.error)).toBe(true);
    // if (SdkError.is(shouldFail.error)) {
    //   expect(shouldFail.error.message).toBe(SdkErrorCode.CHAIN_ERROR);
    // }
  });
});
