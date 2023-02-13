import { Network } from '@ethersproject/providers';
import { describe, expect, test } from '@jest/globals';
import { BigNumber, ethers } from 'ethers';
import { URL } from 'url';
import { parse } from '../../utils/schema';
import { Address } from '../address';
import { CollectionContract } from './collections';
import { SdkErrorCode } from './errors';
import { ERC1155StandardInterfaces, ERC721StandardInterfaces, FeatureFunctionId, FeatureInterfaceId } from './features';
import { FeatureFactories } from './features/feature-factories.gen';
import { FeatureFunctionsMap } from './features/feature-functions.gen';
import { Token } from './objects';

// FIXME: pull in from CI environment
const providersFile = new URL('../../../../examples/flows/secrets/providers.json', import.meta.url).pathname;

const PROVIDER_URL = 'http://localhost:8545';
const TESTNET: Network = {
  chainId: 63,
  name: 'classicMordor',
};

const CONTRACT_ADDRESS = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');

export class MockJsonRpcProvider extends ethers.providers.StaticJsonRpcProvider {
  // FIFO queue by method
  protected _mocks: Record<string, Array<unknown>> = {};

  constructor() {
    super(PROVIDER_URL, TESTNET);
  }

  send(method: string, params: Array<unknown>): Promise<unknown> {
    throw new Error(`Missing mock for method ${method} with params: ${JSON.stringify(params)}`);
  }

  async perform(method: string, params: unknown): Promise<unknown> {
    if (this._mocks[method] && this._mocks[method].length > 0) {
      return Promise.resolve(this._mocks[method].shift());
    }

    throw new Error(`Missing mock for perform method ${method} with params: ${JSON.stringify(params)}`);
  }

  addMock(method: string, ...returnValues: Array<unknown>) {
    this._mocks[method] = (this._mocks[method] || []).concat(returnValues);
  }
}

describe('Collections - static tests', () => {
  test('Check token standard interface matchers', () => {
    expect([...ERC721StandardInterfaces, ...ERC1155StandardInterfaces]).toStrictEqual(
      FeatureFunctionsMap['isApprovedForAll(address,address)[bool]'].drop,
    );
  });

  test.only('Check that all functions are implemented', async () => {
    const provider = new MockJsonRpcProvider();

    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0', 'xxx']);

    const allImplementedFunctions = Object.values(erc721.getFunctionsProps('handledFunctions')).flat();

    const missingFeatures = Object.keys(FeatureFunctionsMap).filter(
      (f) => !allImplementedFunctions.includes(f as FeatureFunctionId),
    );

    // immediately show what's not implemened
    expect(missingFeatures).toStrictEqual([]);
  });

  test('Check that all features are implemented', async () => {
    const provider = new MockJsonRpcProvider();

    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0', 'xxx']);
    const allImplementedFeatures = Object.values(erc721.getFunctionsProps('handledFeatures')).flat();

    // The following interfaces don't relate to any drop contract and so they don't need implementing
    const nonDropContractFeatures = [
      'baseURI/ICedarUpgradeBaseURI.sol:ICedarUpgradeBaseURIV0',
      'ownable/IOwnable.sol:IOwnableEventV0', // this interface exposes only event
      'standard/IERC4906.sol:IRestrictedERC4906V0',
      'splitpayment/ISplitPayment.sol:IAspenSplitPaymentV1',
      'splitpayment/ISplitPayment.sol:ICedarSplitPaymentV0',
      'splitpayment/ICedarSplitPayment.sol:ICedarSplitPaymentV0',
      'subscriptions/IPaymentNotary.sol:IPaymentNotaryV0',
      'issuance/ICedarPremint.sol:ICedarPremintV0',
      'issuance/ICedarClaimable.sol:ICedarClaimableV0',
      'issuance/ICedarERC20Payable.sol:ICedarERC20PayableV0',
      'issuance/ICedarIssuance.sol:ICedarIssuanceV0',
      'issuance/ICedarIssuance.sol:ICedarIssuanceV1',
      'issuance/ICedarNativePayable.sol:ICedarNativePayableV0',
      'issuance/ICedarOrderFiller.sol:ICedarOrderFillerV0',
    ];

    const missingFeatures = Object.keys(FeatureFactories).filter(
      (f) => !(allImplementedFeatures.includes(f as FeatureInterfaceId) || nonDropContractFeatures.includes(f)),
    );

    // immediately show what's not implemened
    expect(missingFeatures).toStrictEqual([]);
  });

  test('Token standard detection', async () => {
    const provider = new MockJsonRpcProvider();

    // contract expects at least one token standard to be supported
    expect(() => new CollectionContract(provider, 1, CONTRACT_ADDRESS, [])).toThrow(SdkErrorCode.EMPTY_TOKEN_STANDARD);

    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0', 'xxx']);
    expect(erc721.tokenStandard).toBe('ERC721');
    expect(erc721.supportedFeatures).toStrictEqual(['standard/IERC721.sol:IERC721V0']);
    expect(async () => await new Token(erc721, 0).exists()).rejects.toThrow(SdkErrorCode.FEATURE_NOT_SUPPORTED);

    const erc1155 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC1155.sol:IERC1155V0', 'yyy']);
    expect(erc1155.tokenStandard).toBe('ERC1155');
    expect(erc1155.supportedFeatures).toStrictEqual(['standard/IERC1155.sol:IERC1155V0']);
  });

  test('ERC721 Token existence & supply', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC721.sol:IERC721V0',
      'issuance/INFTSupply.sol:INFTSupplyV0',
    ]);

    const iface = erc721.assumeFeature('issuance/INFTSupply.sol:INFTSupplyV0').interface;

    const exists = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [true]);
    provider.addMock('call', exists);
    expect(await new Token(erc721, 0).exists()).toBe(true);

    // for ERC721 the token supply is either 1 or 0 depending on its existence
    const doesntExist = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [false]);
    provider.addMock('call', doesntExist);
    expect((await new Token(erc721, 0).totalSupply()).toNumber()).toBe(0);
  });

  test('ERC1155 Token existence & supply', async () => {
    const provider = new MockJsonRpcProvider();
    const erc1155 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC1155.sol:IERC1155V1',
      'standard/IERC1155.sol:IERC1155SupplyV2',
    ]);

    const iface = erc1155.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2').interface;

    const exists = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [true]);
    provider.addMock('call', exists);
    expect(await new Token(erc1155, 0).exists()).toBe(true);

    const supply = iface.encodeFunctionResult(iface.functions['totalSupply(uint256)'], [BigNumber.from(20)]);
    provider.addMock('call', supply);
    expect((await new Token(erc1155, 0).totalSupply()).toNumber()).toBe(20);
  });

  test('ERC721 Token metadata', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC721.sol:IERC721V0',
      // Some of our old contracts didn't correctly support metadata interface,
      // so even if the contract doesn't explicitly support the interface
      // we should still be able to call 'tokenURI' function and get a result.
      // 'metadata/INFTMetadata.sol:IAspenNFTMetadataV1'
    ]);

    const ipfsUri = 'ipfs://QmWU5iKU65xY7bxYQgNLrmEBc3MRr5p8owmdFuk94XXTwS/0';
    const iface = erc721.assumeFeature('metadata/INFTMetadata.sol:IAspenNFTMetadataV1').interface;
    const supply = iface.encodeFunctionResult(iface.functions['tokenURI(uint256)'], [ipfsUri]);
    provider.addMock('call', supply);
    expect(await new Token(erc721, 0).getUri()).toBe(ipfsUri);
  });

  test('ERC1155 Token metadata', async () => {
    const provider = new MockJsonRpcProvider();
    const erc1155 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC1155.sol:IERC1155V1',
      // Some of our old contracts didn't correctly support metadata interface,
      // so even if the contract doesn't explicitly support the interface
      // we should still be able to call 'uri' function and get a result.
      // 'metadata/ISFTMetadata.sol:IAspenSFTMetadataV1',
    ]);

    const ipfsUri = 'ipfs://QmWU5iKU65xY7bxYQgNLrmEBc3MRr5p8owmdFuk94XXTwS/0';
    const iface = erc1155.assumeFeature('metadata/ISFTMetadata.sol:IAspenSFTMetadataV1').interface;
    const supply = iface.encodeFunctionResult(iface.functions['uri(uint256)'], [ipfsUri]);
    provider.addMock('call', supply);
    expect(await new Token(erc1155, 0).getUri()).toBe(ipfsUri);
  });
});

// FIXME: unskip/refactor to integration test suite when available in CI
describe.skip('Collections', () => {
  let contract: CollectionContract;
  let account: Address;

  // beforeAll(async () => {
  //   const address = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');
  //   const providerConfig = await getProviderConfig(providersFile);
  //   const signer = await getSigner('Mumbai', providerConfig);
  //   account = parse(Address, await signer.getAddress());
  //   contract = await CollectionContract.from(signer.provider, address);
  // });

  // test('User claim restrictions', async () => {
  //   const foo = await contract.agreements.getState(account);
  //   const tokenId = '0';
  //   const activeConditions = await contract.conditions.getActive(tokenId);

  //   const userConditions = await contract.conditions.getForUser(account, tokenId);

  //   if (!userConditions || !activeConditions) {
  //     throw new Error(`userConditions or activeConditions empty`);
  //   }

  //   const restrictions = await contract.conditions.getUserRestrictions(userConditions, activeConditions, [], 0);
  //   console.log(restrictions);
  // });
});
