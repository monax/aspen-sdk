const CID_REGEX =
  /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|[bB][A-Za-z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|[fF][0-9A-Fa-f]{50,})$/;
export const looksLikeCid = (hash: string): boolean => {
  return Boolean(hash.match(CID_REGEX));
};

export function resolveIpfsUrl(hashOrUrl: string, gatewayPrefix: string): string {
  if (!gatewayPrefix) {
    return hashOrUrl;
  }

  // Raw hash
  if (looksLikeCid(hashOrUrl)) {
    return gatewayPrefix + hashOrUrl;
  }

  // IPFS protocol
  if (!hashOrUrl.startsWith('ipfs://')) {
    return hashOrUrl;
  }

  const pathParts = hashOrUrl.slice(7).split('/');
  if (looksLikeCid(pathParts[0])) {
    return gatewayPrefix + pathParts.join('/');
  }

  return hashOrUrl;
}
