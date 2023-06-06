import * as t from 'io-ts';

export const AspenContractVersion = t.type({
  major: t.number,
  minor: t.number,
  patch: t.number,
});

export type AspenContractVersion = t.TypeOf<typeof AspenContractVersion>;

export const AspenContractManifest = t.type({
  // The address where the deployer contract is deployed
  contractAddress: t.string,
  // The concrete interface that this deployer contract implements
  interfaceId: t.string,
  // The family lineage this contract belongs to (the contract name without its version suffix)
  interfaceFamily: t.string,
  // The name of the chain where the deployer contract is deployed
  network: t.string,
  // The id of the chain where the deployer contract is deployed
  chainId: t.number,
  // The version of this contract
  version: AspenContractVersion,
});

export type AspenContractManifest = t.TypeOf<typeof AspenContractManifest>;

export const AspenContractsManifest = t.array(AspenContractManifest);

export type AspenContractsManifest = t.TypeOf<typeof AspenContractsManifest>;
