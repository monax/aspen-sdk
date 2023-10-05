import { describe, expect, test } from 'vitest';
import { looksLikeCid, resolveIpfsUrl } from './ipfs';

const CID = 'QmWU5iKU65xY7bxYQgNLrmEBc3MRr5p8owmdFuk94XXTwS';

describe('IPFS', () => {
  test('Test isCid', () => {
    [
      CID,
      'bafybeidyytktf4h2vsdnzfsd4mjesmh6xipsapvnohuejjxoqpzi3wza5u',
      'f01701220c3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a',
    ].forEach((cid) => expect(looksLikeCid(cid)).toBe(true));

    [`${CID}/0`].forEach((cid) => expect(looksLikeCid(cid)).toBe(false));
  });

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
