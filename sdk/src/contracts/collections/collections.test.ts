import { Network } from '@ethersproject/providers';
import { beforeAll, describe, expect, test } from '@jest/globals';
import { BigNumber, ethers } from 'ethers';
import { URL } from 'url';
import { getProviderConfig, getSigner } from '../../apis';
import { parse } from '../../utils/schema';
import { Address } from '../address';
import { CollectionContract } from './collections';
import { SdkErrorCode } from './errors';

// FIXME: pull in from CI environment
const providersFile = new URL('../../../../examples/flows/secrets/providers.json', import.meta.url).pathname;

const PROVIDER_URL = 'http://localhost:8545';
const TESTNET: Network = {
  chainId: 63,
  name: 'classicMordor',
};

const CONTRACT_ADDRESS = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');
const USER_ADDRESS = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');

export class MockJsonRpcProvider extends ethers.providers.StaticJsonRpcProvider {
  // FIFO queue by method
  protected _mocks: Record<string, Array<unknown>> = {};

  send(method: string, params: Array<any>): Promise<unknown> {
    throw new Error(`Missing mock for method ${method} with params: ${JSON.stringify(params)}`);
  }

  async perform(method: string, params: any): Promise<any> {
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
  test('Token standard detection', async () => {
    const provider = new MockJsonRpcProvider(PROVIDER_URL, TESTNET);

    // contract expects at least one token standard to be supported
    expect(() => new CollectionContract(provider, 1, USER_ADDRESS, [])).toThrow(SdkErrorCode.EMPTY_TOKEN_STANDARD);

    const erc721 = new CollectionContract(provider, 1, USER_ADDRESS, ['standard/IERC721.sol:IERC721V0', 'xxx']);
    expect(erc721.standard.supported).toBe(true);
    expect(erc721.tokenStandard).toBe('ERC721');
    expect(erc721.supportedFeatures).toStrictEqual(['standard/IERC721.sol:IERC721V0']);
    expect(async () => await erc721.Token(0).exists()).rejects.toThrow(SdkErrorCode.FEATURE_NOT_SUPPORTED);

    const erc1155 = new CollectionContract(provider, 1, USER_ADDRESS, ['standard/IERC1155.sol:IERC1155V0', 'yyy']);
    expect(erc1155.standard.supported).toBe(true);
    expect(erc1155.tokenStandard).toBe('ERC1155');
    expect(erc1155.supportedFeatures).toStrictEqual(['standard/IERC1155.sol:IERC1155V0']);
  });

  test('ERC721 Token', async () => {
    const provider = new MockJsonRpcProvider(PROVIDER_URL, TESTNET);
    const erc721 = new CollectionContract(provider, 1, USER_ADDRESS, [
      'standard/IERC721.sol:IERC721V0',
      'issuance/INFTSupply.sol:INFTSupplyV0',
    ]);

    const iface = erc721.assumeFeature('issuance/INFTSupply.sol:INFTSupplyV0').interface;

    const exists = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [BigNumber.from(1)]);
    provider.addMock('call', exists);
    expect(await erc721.Token(0).exists()).toBe(true);

    // this shouldn't hit the chain as it's hardcoded as 1
    expect((await erc721.Token(0).totalSupply()).toNumber()).toBe(1);
  });

  test('ERC1155 Token', async () => {
    const provider = new MockJsonRpcProvider(PROVIDER_URL, TESTNET);
    const erc1155 = new CollectionContract(provider, 1, USER_ADDRESS, [
      'standard/IERC1155.sol:IERC1155V1',
      'standard/IERC1155.sol:IERC1155SupplyV2',
    ]);

    const iface = erc1155.assumeFeature('standard/IERC1155.sol:IERC1155SupplyV2').interface;

    const exists = iface.encodeFunctionResult(iface.functions['exists(uint256)'], [BigNumber.from(1)]);
    provider.addMock('call', exists);
    expect(await erc1155.Token(0).exists()).toBe(true);

    const supply = iface.encodeFunctionResult(iface.functions['totalSupply(uint256)'], [BigNumber.from(20)]);
    provider.addMock('call', supply);
    expect((await erc1155.Token(0).totalSupply()).toNumber()).toBe(20);
  });
});

// FIXME: unskip/refactor to integration test suite when available in CI
describe.skip('Collections', () => {
  let contract: CollectionContract;
  let account: Address;

  beforeAll(async () => {
    const address = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');
    const providerConfig = await getProviderConfig(providersFile);
    const signer = await getSigner('Mumbai', providerConfig);
    account = parse(Address, await signer.getAddress());
    contract = await CollectionContract.from(signer.provider, address);
  });

  test('User claim restrictions', async () => {
    const foo = await contract.agreements.getState(account);
    const tokenId = '0';
    const activeConditions = await contract.conditions.getActiveClaimConditions(tokenId);

    const userConditions = await contract.conditions.getUserClaimConditions(account, tokenId);

    if (!userConditions || !activeConditions) {
      throw new Error(`userConditions or activeConditions empty`);
    }

    const restrictions = await contract.conditions.getUserClaimRestrictions(userConditions, activeConditions, [], 0);
    console.log(restrictions);
  });
});
