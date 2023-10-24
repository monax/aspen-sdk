import { ChainNames } from '@monaxlabs/phloem/dist/types';
import { getContract, GetContractReturnType, Hex } from 'viem';
import { Provider, Signer } from '../..';
import {
  AspenContractChainId,
  AspenContractFactories,
  AspenContractFamilyId,
  AspenContractInterfaceId,
  AspenContractsFamilyVersions,
  CurrentAspenCoreRegistryVersion,
  CurrentAspenDeployerVersion,
  CurrentAspenPaymentsNotaryVersion,
  CurrentCedarDeployerVersion,
  CurrentTermsRegistryVersion,
} from './core-factories.gen';
import { AspenContracts } from './core.gen';

export type AspenContract = (typeof AspenContracts)[number];

const versionToNumber = ({ major, minor, patch }: AspenContract['version']): number => {
  return patch + minor * 1e2 + major * 1e4;
};

export function getAspenContractInfo<F extends AspenContractFamilyId, V extends keyof AspenContractsFamilyVersions[F]>(
  chainId: AspenContractChainId,
  family: F,
  version: V,
): AspenContract {
  const network = ChainNames[chainId];
  const contract = AspenContracts.reduce<AspenContract | null>((aspenContract, d) => {
    if (d.network !== network || d.interfaceFamily !== family || d.version.major !== version) return aspenContract;

    if (!aspenContract || versionToNumber(d.version) >= versionToNumber(aspenContract.version)) {
      aspenContract = d;
    }

    return aspenContract;
  }, null);

  if (!contract)
    throw new Error(`Contract family ${family}(version ${version.toString()}) isn't deployed on chain #${chainId}`);

  return contract;
}

export type AspenContractInstance<
  F extends AspenContractFamilyId,
  V extends keyof AspenContractsFamilyVersions[F],
  C extends Provider | Signer,
  I extends AspenContractsFamilyVersions[F][V] & AspenContractInterfaceId = AspenContractsFamilyVersions[F][V] &
    AspenContractInterfaceId,
> = GetContractReturnType<
  AspenContractFactories[I],
  C extends Provider ? Provider : unknown,
  C extends Signer ? Signer : unknown
>;

export function getAspenContract<
  F extends AspenContractFamilyId,
  V extends keyof AspenContractsFamilyVersions[F],
  I extends AspenContractsFamilyVersions[F][V] & AspenContractInterfaceId,
  C extends Provider | Signer,
>(client: C, family: F, version: V): AspenContractInstance<F, V, C> {
  const chainId = client.chain.id;
  if (!chainId) throw new Error('No chainId provided');

  const interfaceId = AspenContractsFamilyVersions[family][version] as I;
  if (!interfaceId) throw new Error(`Contract family ${family} doesn't have version ${version.toString()}`);

  const aspenContract = getAspenContractInfo(chainId as AspenContractChainId, family, version);
  if (!aspenContract)
    throw new Error(`Contract family ${family}(version ${version.toString()}) isn't deployed on chain #${chainId}`);

  return getContract({
    address: aspenContract.contractAddress as Hex,
    abi: AspenContractFactories[interfaceId],
    publicClient: client.type === 'publicClient' ? (client as Provider) : undefined,
    walletClient: client.type === 'walletClient' ? (client as Signer) : undefined,
  }) as AspenContractInstance<F, V, C>;
}

export function getCurrentAspenDeployer<C extends Provider | Signer>(client: C) {
  return getAspenDeployer(client, CurrentAspenDeployerVersion);
}

// FIXME: Make this type saner
type IAspenDeployer<
  V extends keyof AspenContractsFamilyVersions['AspenDeployer'],
  C extends Provider | Signer,
> = AspenContractInstance<'AspenDeployer', V, C>;

export function getAspenDeployer<
  C extends Provider | Signer,
  V extends keyof AspenContractsFamilyVersions['AspenDeployer'],
>(client: C, version: V): IAspenDeployer<V, C> {
  return getAspenContract(client, 'AspenDeployer', version);
}

export function getCurrentAspenCoreRegistry<C extends Provider | Signer>(client: C) {
  return getAspenCoreRegistry(client, CurrentAspenCoreRegistryVersion);
}
export function getAspenCoreRegistry<
  C extends Provider | Signer,
  V extends keyof AspenContractsFamilyVersions['AspenCoreRegistry'],
>(client: C, version: V) {
  return getAspenContract(client, 'AspenCoreRegistry', version);
}

export function getCurrentAspenPaymentsNotary<C extends Provider | Signer>(client: C) {
  return getAspenPaymentsNotary(client, CurrentAspenPaymentsNotaryVersion);
}
export function getAspenPaymentsNotary<
  C extends Provider | Signer,
  V extends keyof AspenContractsFamilyVersions['AspenPaymentsNotary'],
>(client: C, version: V) {
  return getAspenContract(client, 'AspenPaymentsNotary', version);
}

export function getCurrentTermsRegistry<C extends Provider | Signer>(client: C) {
  return getTermsRegistry(client, CurrentTermsRegistryVersion);
}
export function getTermsRegistry<
  C extends Provider | Signer,
  V extends keyof AspenContractsFamilyVersions['TermsRegistry'],
>(client: C, version: V) {
  return getAspenContract(client, 'TermsRegistry', version);
}

export function getCurrentCedarDeployer<C extends Provider | Signer>(client: C) {
  return getCedarDeployer(client, CurrentCedarDeployerVersion);
}
export function getCedarDeployer<
  C extends Provider | Signer,
  V extends keyof AspenContractsFamilyVersions['CedarDeployer'],
>(client: C, version: V) {
  return getAspenContract(client, 'CedarDeployer', version);
}
