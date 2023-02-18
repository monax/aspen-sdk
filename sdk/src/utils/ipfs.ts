export function resolveIpfsUrl(hashOrUrl: string, gatewayPrefix: string): string {
  if (!gatewayPrefix) {
    return hashOrUrl;
  }

  // Raw hash
  if (!hashOrUrl.includes('://')) {
    return gatewayPrefix + hashOrUrl;
  }

  // IPFS protocol
  if (!hashOrUrl.startsWith('ipfs://')) {
    return hashOrUrl;
  }

  const pathParts = hashOrUrl.slice(7).split('/');
  if (pathParts[0]) {
    return gatewayPrefix + pathParts.join('/');
  }

  return hashOrUrl;
}
