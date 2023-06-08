import { describe, expect, test } from '@jest/globals';
import { parse } from '@monaxlabs/phloem/dist/schema';
import { Address } from '@monaxlabs/phloem/dist/types';
import { BigNumber } from 'ethers';
import { CollectionContract } from './collections';
import { SdkErrorCode } from './errors';
import {
  asExecutable,
  ContractFunctionId,
  ERC1155StandardInterfaces,
  ERC721StandardInterfaces,
  ExperimentalFeatureInterfaceId,
  FeatureFunctionId,
  FeatureInterfaceId,
  HasAcceptedTerms,
  hasAcceptedTerms,
} from './features';
import { ExperimentalFeatures } from './features/experimental-features.gen';
import { FeatureFactories } from './features/feature-factories.gen';
import { FeatureFunctionsMap } from './features/feature-functions.gen';
import { Token } from './objects';
import { MockJsonRpcProvider } from './utils.testing';

const CONTRACT_ADDRESS = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');

const NON_DROP_CONTRACT_INTERFACE_FILES = [
  // Standards
  'standard/IERC20.sol',
  'standard/IERC4906.sol',
  // Payment Notary
  'payments/IPaymentNotary.sol',
  'subscriptions/IPaymentNotary.sol',
  // Core Registry
  'registry/ICoreRegistry.sol',
  // Config
  'config/IGlobalConfig.sol',
  'config/ITieredPricing.sol',
  'config/IOperatorFilterersConfig.sol',
  'registry/ICoreRegistry.sol',
  // Error interfaces
  'errors/ICoreErrors.sol',
  'errors/IDropErrors.sol',
  'errors/IPaymentsErrors.sol',
  'errors/ISplitPaymentErrors.sol',
  'errors/ITermsErrors.sol',
  'errors/IUUPSUpgradeableErrors.sol',
  'errors/IAspenFactoryErrors.sol',
  // Other
  'pausable/ICedarPausable.sol',
  'splitpayment/ISplitPayment.sol',
  'splitpayment/ICedarSplitPayment.sol',
  'issuance/ICedarPremint.sol',
  'issuance/ICedarERC20Payable.sol',
  'issuance/ICedarIssuance.sol',
  'issuance/ICedarOrderFiller.sol',
  'issuance/ICedarNativePayable.sol',
  'issuance/ICedarClaimable.sol',
  'agreement/IAgreementsRegistry.sol',
  'baseURI/ICedarUpgradeBaseURI.sol',
];

// The following interfaces don't relate to any drop contract and so they don't need implementing
const NON_DROP_CONTRACT_INTERFACES: FeatureInterfaceId[] = ['ownable/IOwnable.sol:IOwnableEventV0'];

const NOT_IMPLEMENTED_FUNCTIONS: FeatureFunctionId[] = [
  // Note: add here any unimplemented functions that will be implemented later.
];

const isDropInterface = (iface: FeatureInterfaceId, allowExperimental: boolean): boolean => {
  const file = iface.split(/[:]/).shift() as string;
  const isExperimental = ExperimentalFeatures.includes(iface as ExperimentalFeatureInterfaceId);
  return !NON_DROP_CONTRACT_INTERFACE_FILES.includes(file) && (allowExperimental || !isExperimental);
};

const isDropFunction = (func: FeatureFunctionId, allowExperimental: boolean): boolean => {
  const interfaces = Object.values(FeatureFunctionsMap[func].drop);
  return interfaces.filter((f) => isDropInterface(f, allowExperimental)).length !== 0;
};

describe('Collections - static tests', () => {
  test('Check token standard interface matchers', () => {
    const combinedActual = [...ERC721StandardInterfaces, ...ERC1155StandardInterfaces];
    const combinedExpected = [
      ...FeatureFunctionsMap['isApprovedForAll(address,address)[bool]'].drop,
      ...FeatureFunctionsMap['exists(uint256)[bool]'].drop,
      ...FeatureFunctionsMap['totalSupply()[uint256]'].drop,
      ...FeatureFunctionsMap['totalSupply(uint256)[uint256]'].drop,
    ].filter((id) => /(ERC721|NFT|ERC1155|SFT)/.test(id));

    expect(Array.from(new Set(combinedActual)).sort()).toStrictEqual(Array.from(new Set(combinedExpected)).sort());

    const overlap = ERC721StandardInterfaces.filter((f) => ERC1155StandardInterfaces.includes(f));
    expect(overlap).toStrictEqual([]);
  });

  test('Check that all released functions are implemented', () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFunctions: FeatureFunctionId[] = Object.values(erc721.getFunctionsProps('handledFunctions'))
      .map(Object.values)
      .flat();

    const missingFunctions = (Object.keys(FeatureFunctionsMap) as FeatureFunctionId[]).filter(
      (f) =>
        isDropFunction(f, false) && !(allImplementedFunctions.includes(f) || NOT_IMPLEMENTED_FUNCTIONS.includes(f)),
    );

    // immediately show what's not implemened
    expect(missingFunctions).toStrictEqual([]);
  });

  test('Check that all experimental functions are implemented', () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFunctions: FeatureFunctionId[] = Object.values(erc721.getFunctionsProps('handledFunctions'))
      .map(Object.values)
      .flat();

    const missingFunctions = (Object.keys(FeatureFunctionsMap) as FeatureFunctionId[]).filter(
      (f) => isDropFunction(f, true) && !(allImplementedFunctions.includes(f) || NOT_IMPLEMENTED_FUNCTIONS.includes(f)),
    );

    // We endeavour to implement all experimental features, but if we choose to deviate make it an explicit decision
    // to update snapshot
    expect(missingFunctions).toMatchSnapshot();
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
      // We endeavour to implement all experimental features, but if we choose to deviate make it an explicit decision
      // to update snapshot
      expect(missingInterfaces).toMatchSnapshot();
    });
  });

  test('Check that all released features are implemented', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFeatures = Object.values(erc721.getFunctionsProps('handledFeatures')).flat();

    const missingFeatures = (Object.keys(FeatureFactories) as FeatureInterfaceId[]).filter(
      (f) =>
        isDropInterface(f, false) && !(allImplementedFeatures.includes(f) || NON_DROP_CONTRACT_INTERFACES.includes(f)),
    );

    // We endeavour to implement all experimental features, but if we choose to deviate make it an explicit decision
    // to update snapshot
    expect(missingFeatures).toMatchSnapshot();
  });

  test('Check that all experimental features are implemented', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, ['standard/IERC721.sol:IERC721V0']);

    const allImplementedFeatures = Object.values(erc721.getFunctionsProps('handledFeatures')).flat();

    const missingFeatures = (Object.keys(FeatureFactories) as FeatureInterfaceId[]).filter(
      (f) =>
        isDropInterface(f, true) && !(allImplementedFeatures.includes(f) || NON_DROP_CONTRACT_INTERFACES.includes(f)),
    );

    // We endeavour to implement all experimental features, but if we choose to deviate make it an explicit decision
    // to update snapshot
    expect(missingFeatures).toMatchSnapshot();
  });

  test('Experimental flag', async () => {
    const provider = new MockJsonRpcProvider();
    const regular = ['standard/IERC721.sol:IERC721V0'];
    const combinedInterfaces = [...regular, ...ExperimentalFeatures];

    const contractRegular = new CollectionContract(provider, 1, CONTRACT_ADDRESS, combinedInterfaces);
    expect(contractRegular.supportedFeaturesList).toStrictEqual([...regular]);

    const contractExperimental = new CollectionContract(provider, 1, CONTRACT_ADDRESS, combinedInterfaces, true);
    expect(contractExperimental.supportedFeaturesList).toStrictEqual(combinedInterfaces);
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

  test('Callable class instance', async () => {
    const provider = new MockJsonRpcProvider();
    const erc721 = new CollectionContract(provider, 1, CONTRACT_ADDRESS, [
      'standard/IERC721.sol:IERC721V0',
      'agreement/IAgreement.sol:IPublicAgreementV1',
    ]);

    const iface = erc721.assumeFeature('agreement/IAgreement.sol:IPublicAgreementV1').interface;
    const doesExist = iface.encodeFunctionResult(iface.functions['hasAcceptedTerms(address)'], [true]);
    provider.addMock('call', doesExist);
    provider.addMock('call', doesExist);
    provider.addMock('call', doesExist);

    const callable = asExecutable(new HasAcceptedTerms(erc721));
    const applyTrap = hasAcceptedTerms(erc721);
    const constructTrap = new hasAcceptedTerms(erc721);
    expect(await callable(CONTRACT_ADDRESS)).toBe(true);
    expect(await applyTrap(CONTRACT_ADDRESS)).toBe(true);
    expect(await constructTrap(CONTRACT_ADDRESS)).toBe(true);
  });
});
