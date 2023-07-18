import { Chain, ChainNames } from '@monaxlabs/phloem/dist/types';
import { Signerish } from '../collections';
import {
  AspenContractFactories,
  AspenContractFamilyId,
  AspenContractInterfaceId,
  AspenContractNetworks,
  AspenContractsFamilyVersions,
  CurrentAspenCoreRegistryVersion,
  CurrentAspenDeployerVersion,
  CurrentAspenPaymentsNotaryVersion,
  CurrentCedarDeployerVersion,
  CurrentTermsRegistryVersion,
} from './core-factories.gen';
import { AspenContracts } from './core.gen';

export type AspenContractChainId = (typeof Chain)[AspenContractNetworks];
export type AspenContract = (typeof AspenContracts)[number];

const versionToNumber = ({ major, minor, patch }: AspenContract['version']): number => {
  return patch + minor * 1e2 + major * 1e4;
};

export function getAspenContractInfo<F extends AspenContractFamilyId, V extends keyof AspenContractsFamilyVersions[F]>(
  chainId: AspenContractChainId,
  family: F,
  version: V,
): AspenContract | null {
  const network = ChainNames[chainId];
  return AspenContracts.reduce<AspenContract | null>((aspenContract, d) => {
    if (d.network !== network || d.interfaceFamily !== family || d.version.major !== version) return aspenContract;

    if (!aspenContract || versionToNumber(d.version) >= versionToNumber(aspenContract.version)) {
      aspenContract = d;
    }

    return aspenContract;
  }, null);
}

export function getAspenContract<
  F extends AspenContractFamilyId,
  V extends keyof AspenContractsFamilyVersions[F],
  I extends AspenContractsFamilyVersions[F][V] & AspenContractInterfaceId,
>(
  signerOrProvider: Signerish,
  chainId: AspenContractChainId,
  family: F,
  version: V,
): ReturnType<AspenContractFactories[I]['connect']> {
  const interfaceId = AspenContractsFamilyVersions[family][version] as I;
  if (!interfaceId) throw new Error(`Contract family ${family} doesn't have version ${version.toString()}`);

  const aspenContract = getAspenContractInfo(chainId, family, version);
  if (!aspenContract)
    throw new Error(`Contract family ${family}(version ${version.toString()}) isn't deployed on chain #${chainId}`);

  const contract = AspenContractFactories[interfaceId].connect(aspenContract.contractAddress, signerOrProvider);
  return contract as ReturnType<AspenContractFactories[I]['connect']>;
}

export function getCurrentCedarDeployer(signerOrProvider: Signerish, chainId: AspenContractChainId) {
  return getAspenContract(signerOrProvider, chainId, 'CedarDeployer', CurrentCedarDeployerVersion);
}

export function getCurrentDeployer(signerOrProvider: Signerish, chainId: AspenContractChainId) {
  return getAspenContract(signerOrProvider, chainId, 'AspenDeployer', CurrentAspenDeployerVersion);
}

export function getCurrentCoreRegistry(signerOrProvider: Signerish, chainId: AspenContractChainId) {
  return getAspenContract(signerOrProvider, chainId, 'AspenCoreRegistry', CurrentAspenCoreRegistryVersion);
}

export function getCurrentPaymentsNotary(signerOrProvider: Signerish, chainId: AspenContractChainId) {
  return getAspenContract(signerOrProvider, chainId, 'AspenPaymentsNotary', CurrentAspenPaymentsNotaryVersion);
}

export function getCurrentTermsRegistry(signerOrProvider: Signerish, chainId: AspenContractChainId) {
  return getAspenContract(signerOrProvider, chainId, 'TermsRegistry', CurrentTermsRegistryVersion);
}
