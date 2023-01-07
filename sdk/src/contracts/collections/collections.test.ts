import { beforeAll, describe, test } from '@jest/globals';
import { URL } from 'url';
import { getProviderConfig, getSigner } from '../../apis';
import { parse } from '../../utils/schema.js';
import { Address } from '../address';
import { CollectionContract } from './collections';

// FIXME: pull in from CI environment
const providersFile = new URL('../../../../examples/flows/secrets/providers.json', import.meta.url).pathname;

// FIXME: unskip/refactor to integration test suite when available in CI
describe.skip('Collections', () => {
  let contract: CollectionContract;
  let account: Address;

  beforeAll(async () => {
    const contractAddress = parse(Address, '0xB2Af02eC55E2ba5afe246Ed51b8aBdBBa5F7937C');
    const providerConfig = await getProviderConfig(providersFile);
    const signer = await getSigner('Mumbai', providerConfig);
    account = parse(Address, await signer.getAddress());
    contract = new CollectionContract(signer.provider, contractAddress);
    await contract.load();
  });

  test('User claim restrictions', async () => {
    const foo = await contract?.agreements.getState(account)
    const tokenId = '0';
    const activeConditions = await contract?.issuance.getActiveClaimConditions(tokenId);

    const userConditions = await contract?.issuance.getUserClaimConditions(account, tokenId);

    if (!userConditions || !activeConditions) {
      throw new Error(`userConditions or activeConditions empty`);
    }

    const restrictions = await contract?.issuance.getUserClaimRestrictions(userConditions, activeConditions, [], 0);
    console.log(restrictions)
  });
});
