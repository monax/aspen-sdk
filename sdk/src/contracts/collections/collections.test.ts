import { beforeAll, describe, expect, test } from '@jest/globals';
import { ethers } from 'ethers';
import { URL } from 'url';
import { getProviderConfig, getSigner } from '../../apis';
import { parse } from '../../utils/schema';
import { Address } from '../address';
import { CollectionContract } from './collections';
import { SdkErrorCode } from './errors';

// FIXME: pull in from CI environment
const providersFile = new URL('../../../../examples/flows/secrets/providers.json', import.meta.url).pathname;

describe('Collections - static tests', () => {
  const address = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');

  test('Token standard detection', () => {
    const provider = new ethers.providers.JsonRpcProvider();
    expect(() => new CollectionContract(provider, 1, address, [])).toThrowError(SdkErrorCode.EMPTY_TOKEN_STANDARD);

    const erc721 = new CollectionContract(provider, 1, address, ['standard/IERC721.sol:IERC721V0', 'xxx']);
    expect(erc721.tokenStandard).toBe('ERC721');
    expect(erc721.supportedFeatures).toStrictEqual(['standard/IERC721.sol:IERC721V0']);

    const erc1155 = new CollectionContract(provider, 1, address, ['standard/IERC1155.sol:IERC1155V0', 'yyy']);
    expect(erc1155.tokenStandard).toBe('ERC1155');
    expect(erc1155.supportedFeatures).toStrictEqual(['standard/IERC1155.sol:IERC1155V0']);
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
