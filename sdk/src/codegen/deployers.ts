import * as t from 'io-ts';

export const DeployerVersion = t.type({
  major: t.number,
  minor: t.number,
  patch: t.number,
});

export type DeployerVersion = t.TypeOf<typeof DeployerVersion>;

export const DeployerManifest = t.type({
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
  version: DeployerVersion,
});

export type DeployerManifest = t.TypeOf<typeof DeployerManifest>;

export const DeployersManifest = t.array(DeployerManifest);

export type DeployersManifest = t.TypeOf<typeof DeployersManifest>;
