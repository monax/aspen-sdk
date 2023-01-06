import { cid } from 'is-ipfs';

export function resolveIpfsUrl(hashOrUrl: string, gatewayPrefix: string): string {
  if (!gatewayPrefix) {
    return hashOrUrl;
  }
  if (cid(hashOrUrl)) {
    return gatewayPrefix + hashOrUrl;
  }
  const url = new URL(hashOrUrl);
  if (cid(url.hostname)) {
    return gatewayPrefix + url.hostname + url.pathname;
  }
  return hashOrUrl;
}