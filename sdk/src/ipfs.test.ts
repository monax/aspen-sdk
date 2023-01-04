import { describe, expect, test } from '@jest/globals';
import { resolveIpfsUrl } from './ipfs';

const CID = 'QmWU5iKU65xY7bxYQgNLrmEBc3MRr5p8owmdFuk94XXTwS';

describe('IPFS', () => {
  test('Resolves IPFS', () => {
    expect(resolveIpfsUrl(`ipfs://${CID}`, '')).toBe(CID);
    expect(resolveIpfsUrl(`ipfs://${CID}/0`, '')).toBe(`${CID}/0`);
    expect(resolveIpfsUrl(`ipfs://${CID}`, 'https://ipfs.io/')).toBe(`https://ipfs.io/${CID}`);
  });

  test('Leaves anything non-IPFS untouched', () => {
    expect(resolveIpfsUrl(CID, '')).toBe(CID);
    expect(resolveIpfsUrl(CID, 'prefix')).toBe(CID);
  });
});
