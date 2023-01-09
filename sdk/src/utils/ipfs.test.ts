import { describe, expect, test } from '@jest/globals';
import { resolveIpfsUrl } from './ipfs';

const CID = 'QmWU5iKU65xY7bxYQgNLrmEBc3MRr5p8owmdFuk94XXTwS';

describe('IPFS', () => {
  test('Resolves IPFS', () => {
    // empty gateway is a no-op
    expect(resolveIpfsUrl(`ipfs://${CID}/0`, '')).toBe(`ipfs://${CID}/0`);

    // raw hash should be supported
    expect(resolveIpfsUrl(CID, 'https://ipfs.io/')).toBe(`https://ipfs.io/${CID}`);

    // raw paths paths are not supported
    expect(resolveIpfsUrl(`${CID}/0`, 'https://ipfs.io/')).toBe(`${CID}/0`);

    // IPFS protocol should support both hash & path
    expect(resolveIpfsUrl(`ipfs://${CID}`, 'https://ipfs.io/')).toBe(`https://ipfs.io/${CID}`);
    // notice the missing slash at the end of the gateway
    expect(resolveIpfsUrl(`ipfs://${CID}/2`, 'http://someipfs.io/ipfs')).toBe(`http://someipfs.io/ipfs${CID}/2`);
  });
});
