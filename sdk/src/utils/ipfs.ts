import { cid } from 'is-ipfs';

export function resolveIpfsUrl(hashOrUrl: string, gatewayPrefix: string): string {
  if (!gatewayPrefix) {
    return hashOrUrl;
  }

  // Raw hash
  if (cid(hashOrUrl)) {
    return gatewayPrefix + hashOrUrl;
  }

  // IPFS protocol
  if (!hashOrUrl.startsWith('ipfs://')) {
    return hashOrUrl;
  }

  const pathParts = hashOrUrl.slice(7).split('/');
  if (cid(pathParts[0])) {
    return gatewayPrefix + pathParts.join('/');
  }

  return hashOrUrl;
}
