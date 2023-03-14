import { Network } from '@ethersproject/providers';
import { describe, expect, test } from '@jest/globals';
import { BigNumber, ethers } from 'ethers';
import { parse } from '../../utils';
import { Address } from '../address';
import { CollectionContract } from './collections';
import { SdkErrorCode } from './errors';
import {
  ContractFunctionId,
  ERC1155StandardInterfaces,
  ERC721StandardInterfaces,
  FeatureFunctionId,
  FeatureInterfaceId,
} from './features';
import { FeatureFactories } from './features/feature-factories.gen';
import { FeatureFunctionsMap } from './features/feature-functions.gen';
import { Token } from './objects';

export const PROVIDER_URL = 'http://localhost:8545';
export const TESTNET: Network = {
  chainId: 63,
  name: 'classicMordor',
};

export const CONTRACT_ADDRESS = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');

const NON_DROP_CONTRACT_INTERFACE_FILES = [
  'standard/IERC4906.sol',
  'pausable/ICedarPausable.sol',
  'splitpayment/ISplitPayment.sol',
  'splitpayment/ICedarSplitPayment.sol',
  'issuance/ICedarPremint.sol',
  'issuance/ICedarERC20Payable.sol',
  'issuance/ICedarIssuance.sol',
  'issuance/ICedarOrderFiller.sol',
  'issuance/ICedarNativePayable.sol',
  'issuance/ICedarClaimable.sol',
  'subscriptions/IPaymentNotary.sol',
  'agreement/IAgreementsRegistry.sol',
  'baseURI/ICedarUpgradeBaseURI.sol',
];

const isDropInterface = (iface: FeatureInterfaceId): boolean => {
  const file = iface.split(/[:]/).shift() as string;
  return !NON_DROP_CONTRACT_INTERFACE_FILES.includes(file);
};

const isDropFunction = (func: FeatureFunctionId): boolean => {
  return Object.values(FeatureFunctionsMap[func].drop).filter(isDropInterface).length !== 0;
};

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
    const combinedActual = [...ERC721StandardInterfaces, ...ERC1155StandardInterfaces];
    const combinedExpected = [
      ...FeatureFunctionsMap['isApprovedForAll(address,address)[bool]'].drop,
      ...FeatureFunctionsMap['exists(uint256)[bool]'].drop,
    ];
    expect(Array.from(new Set(combinedActual)).sort()).toStrictEqual(Array.from(new Set(combinedExpected)).sort());

    const overlap = ERC721StandardInterfaces.filter((f) => ERC1155StandardInterfaces.includes(f));
    expect(overlap).toStrictEqual([]);
  });

  test('Check that all functions are implemented', () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFunctions: FeatureFunctionId[] = Object.values(erc721.getFunctionsProps('handledFunctions'))
      .map(Object.values)
      .flat();

    // @todo - those need implementing
    const notImplementedStandardFunctions: FeatureFunctionId[] = [
      'balanceOfBatch(address[],uint256[])[uint256[]]',
      'isApprovedForAll(address,address)[bool]',
      'approve(address,uint256)[]',
      'getApproved(uint256)[address]',
      'setApprovalForAll(address,bool)[]',
      'burnBatch(address,uint256[],uint256[])[]',
      'transferFrom(address,address,uint256)[]',
      'safeTransferFrom(address,address,uint256)+[]',
      'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)[]',
    ];

    const missingFunctions = Object.keys(FeatureFunctionsMap).filter(
      (f) =>
        isDropFunction(f as FeatureFunctionId) &&
        !(
          allImplementedFunctions.includes(f as FeatureFunctionId) ||
          notImplementedStandardFunctions.includes(f as FeatureFunctionId)
        ),
    );

    // immediately show what's not implemened
    expect(missingFunctions).toStrictEqual([]);
  });

  test('Check that every function lists at least the interfaces of the functions it states to implemenst', () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFeatures = erc721.getFunctionsProps('handledFeatures');

    Object.entries(erc721.getFunctionsProps('handledFunctions')).map(([func, handledFunctions]) => {
      const expectedInterfaces = Object.values(handledFunctions)
        .map((f) => FeatureFunctionsMap[f].drop)
        .flat();
      const listedInterfaces = allImplementedFeatures[func as ContractFunctionId];
      const missingInterfaces = expectedInterfaces.filter((i) => !listedInterfaces.includes(i));
      expect(missingInterfaces).toStrictEqual([]);
    });
  });

  test('Check that all features are implemented', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFeatures = Object.values(erc721.getFunctionsProps('handledFeatures')).flat();

    // The following interfaces don't relate to any drop contract and so they don't need implementing
    const nonDropContractFeatures: FeatureInterfaceId[] = ['ownable/IOwnable.sol:IOwnableEventV0'];

    const missingFeatures = Object.keys(FeatureFactories).filter(
      (f) =>
        isDropInterface(f as FeatureInterfaceId) &&
        !(
          allImplementedFeatures.includes(f as FeatureInterfaceId) ||
          nonDropContractFeatures.includes(f as FeatureInterfaceId)
        ),
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
    expect(erc721.supportedFeaturesList).toStrictEqual(['standard/IERC721.sol:IERC721V0']);
    expect(async () => await new Token(erc721, 0).exists()).rejects.toThrow(SdkErrorCode.CHAIN_ERROR);

    const erc1155 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC1155.sol:IERC1155V0', 'yyy']);
    expect(erc1155.tokenStandard).toBe('ERC1155');
    expect(erc1155.supportedFeaturesList).toStrictEqual(['standard/IERC1155.sol:IERC1155V0']);
  });

  test('ERC721 Token existence & supply', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC721.sol:IERC721V0',
      'issuance/INFTSupply.sol:INFTSupplyV0',
    ]);

    expect(erc721.totalSupply.supported).toBe(true);

    const iface = erc721.assumeFeature('issuance/INFTSupply.sol:INFTSupplyV0').interface;

    const exists = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [true]);
    provider.addMock('call', exists);
    expect(await new Token(erc721, 0).exists()).toBe(true);

    // for ERC721 the token supply is either 1 or 0 depending on its existence
    const doesntExist = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [false]);
    provider.addMock('call', doesntExist);
    expect((await new Token(erc721, null).totalSupply()).toNumber()).toBe(0);
  });

  test('ERC1155 Token existence & supply', async () => {
    const provider = new MockJsonRpcProvider();
    const erc1155 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC1155.sol:IERC1155V1',
      'standard/IERC1155.sol:IERC1155SupplyV2',
    ]);

    expect(erc1155.totalSupply.supported).toBe(true);

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

  test('ERC721 Contract name and symbol', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V2']);

    const contractName = 'Aspen T&Cs Demo';
    const contractSymbol = 'ATD';
    const iface = erc721.assumeFeature('standard/IERC721.sol:IERC721V2').interface;

    const nameResponse = iface.encodeFunctionResult(iface.functions['name()'], [contractName]);
    provider.addMock('call', nameResponse);
    expect(await erc721.name()).toBe(contractName);

    const symbolResponse = iface.encodeFunctionResult(iface.functions['symbol()'], [contractSymbol]);
    provider.addMock('call', symbolResponse);
    expect(await erc721.symbol()).toBe(contractSymbol);
  });
});
