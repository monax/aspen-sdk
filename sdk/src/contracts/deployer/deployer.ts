import { providers, Signer } from 'ethers';
import {
  CurrentInterfaceFamily,
  CurrentInterfaceVersion,
  DeployerFactories,
  DeployerFamilyVersions,
  DeployerNetworks,
} from './deployer-factories.gen';
import { deployers } from './deployers.gen';

export type Deployers = typeof deployers;
export type Deployer = Deployers[number];

export type DeployerFactories = typeof DeployerFactories;
export type DeployerIterfaceId = keyof DeployerFactories;

export type DeployerFamilyVersions = typeof DeployerFamilyVersions;
export type DeployerFamilyId = keyof DeployerFamilyVersions;
export type DeployerVersion = { major: number; minor: number; patch: number };

export function getDeployer<
  F extends DeployerFamilyId,
  V extends keyof DeployerFamilyVersions[F],
  I extends DeployerFamilyVersions[F][V] & DeployerIterfaceId,
>(
  signerOrProvider: Signer | providers.Provider,
  network: DeployerNetworks,
  family: F,
  version: V,
): ReturnType<DeployerFactories[I]['connect']> {
  const interfaceId = DeployerFamilyVersions[family][version] as I;
  if (!interfaceId) throw new Error(`Deployer family ${family} doesn't have version ${version.toString()}`);

  const deployer = deployers.reduce<Deployer | null>((deployer, d) => {
    if (d.network !== network || d.interfaceFamily !== family || d.version.major !== version) return deployer;

    if (!deployer || versionToNumber(d.version) >= versionToNumber(deployer.version)) {
      deployer = d;
    }

    return deployer;
  }, null);

  if (!deployer)
    throw new Error(`Deployer family ${family}(version ${version.toString()}) isn't deployed on ${network} `);

  return DeployerFactories[interfaceId].connect(deployer.contractAddress, signerOrProvider) as ReturnType<
    DeployerFactories[I]['connect']
  >;
}

export function getCurrentDeployer(signerOrProvider: Signer | providers.Provider, network: DeployerNetworks) {
  return getDeployer(signerOrProvider, network, CurrentInterfaceFamily, CurrentInterfaceVersion);
}

const versionToNumber = ({ major, minor, patch }: DeployerVersion): number => {
  return patch + minor * 1e2 + major * 1e4;
};
