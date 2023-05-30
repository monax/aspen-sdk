import { providers, Signer } from 'ethers';
import {
  CoreContractFactories,
  CoreContractNetworks,
  CoreContractsFamilyVersions,
  CurrentAspenCoreRegistryVersion,
  CurrentAspenDeployerVersion,
  CurrentAspenPaymentsNotaryVersion,
  CurrentCedarDeployerVersion,
  CurrentTermsRegistryVersion,
} from './core-factories.gen';
import { coreContracts } from './core.gen';

export type CoreContracts = typeof coreContracts;
export type CoreContract = CoreContracts[number];

export type CoreContractFactories = typeof CoreContractFactories;
export type CoreContractInterfaceId = keyof CoreContractFactories;

export type CoreContractsFamilyVersions = typeof CoreContractsFamilyVersions;
export type CoreContractFamilyId = keyof CoreContractsFamilyVersions;
export type CoreContractVersion = { major: number; minor: number; patch: number };

export function getAspenContract<
  F extends CoreContractFamilyId,
  V extends keyof CoreContractsFamilyVersions[F],
  I extends CoreContractsFamilyVersions[F][V] & CoreContractInterfaceId,
>(
  signerOrProvider: Signer | providers.Provider,
  network: CoreContractNetworks,
  family: F,
  version: V,
): ReturnType<CoreContractFactories[I]['connect']> {
  const interfaceId = CoreContractsFamilyVersions[family][version] as I;
  if (!interfaceId) throw new Error(`Contrac family ${family} doesn't have version ${version.toString()}`);

  const coreContract = coreContracts.reduce<CoreContract | null>((coreContract, d) => {
    if (d.network !== network || d.interfaceFamily !== family || d.version.major !== version) return coreContract;

    if (!coreContract || versionToNumber(d.version) >= versionToNumber(coreContract.version)) {
      coreContract = d;
    }

    return coreContract;
  }, null);

  if (!coreContract)
    throw new Error(`Contract family ${family}(version ${version.toString()}) isn't deployed on ${network} `);

  return CoreContractFactories[interfaceId].connect(coreContract.contractAddress, signerOrProvider) as ReturnType<
    CoreContractFactories[I]['connect']
  >;
}

const versionToNumber = ({ major, minor, patch }: CoreContractVersion): number => {
  return patch + minor * 1e2 + major * 1e4;
};

export function getCurrentCedarDeployer(signerOrProvider: Signer | providers.Provider, network: CoreContractNetworks) {
  return getAspenContract(signerOrProvider, network, 'CedarDeployer', CurrentCedarDeployerVersion);
}

export function getCurrentDeployer(signerOrProvider: Signer | providers.Provider, network: CoreContractNetworks) {
  return getAspenContract(signerOrProvider, network, 'AspenDeployer', CurrentAspenDeployerVersion);
}

export function getCurrentCoreRegistry(signerOrProvider: Signer | providers.Provider, network: CoreContractNetworks) {
  return getAspenContract(signerOrProvider, network, 'AspenCoreRegistry', CurrentAspenCoreRegistryVersion);
}

export function getCurrentPaymentsNotary(signerOrProvider: Signer | providers.Provider, network: CoreContractNetworks) {
  return getAspenContract(signerOrProvider, network, 'AspenPaymentsNotary', CurrentAspenPaymentsNotaryVersion);
}

export function getCurrentTermsRegistry(signerOrProvider: Signer | providers.Provider, network: CoreContractNetworks) {
  return getAspenContract(signerOrProvider, network, 'TermsRegistry', CurrentTermsRegistryVersion);
}
