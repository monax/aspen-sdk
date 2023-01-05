import * as t from 'io-ts';

export const ContractManifest = t.intersection([
  t.type({
    // A unique path-dependent identifier for the contract
    id: t.string,
    // The ERC165 identifier (note this is less strongly specified than our id)
    erc165Identifier: t.string,
    // The relative API path of the solidity file from the apis dir
    file: t.string,
    // The relative directory path containing the solidity file from the apis dir
    dir: t.string,
    // The literal Solidity contract name
    name: t.string,
    // The family lineage this contract belongs to (the contract name without its version suffix)
    family: t.string,
    // The version (always a _major_ version) of this contract
    version: t.number,
    // The ABI of this contract
    abi: t.readonlyArray(t.unknown),
    // The hash of the contract (currently just the hash of the ABI, TBD if anything else matters)
    hash: t.string,
  }),
  t.partial({
    // Deprecated interfaces no longer have their Solidity source in-repo and may be removed at a later date
    deprecated: t.boolean,
    delegated: t.boolean,
  }),
]);

export type ContractManifest = t.TypeOf<typeof ContractManifest>;

export const ContractsManifest = t.record(t.string, ContractManifest);

export type ContractsManifest = t.TypeOf<typeof ContractsManifest>;
