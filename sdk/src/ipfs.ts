import { cid } from 'is-ipfs';

export function resolveIpfsUrl(hashOrUrl: string, gatewayPrefix: string): string {
  const maybeCid = chompLeft(hashOrUrl, 'ipfs://');
  return cid(maybeCid) ? gatewayPrefix + maybeCid : hashOrUrl;
}

function chompLeft(str: string, prefix: string): string {
  if (str.indexOf(prefix) === 0) {
    return str.slice(prefix.length);
  }
  return str;
}
