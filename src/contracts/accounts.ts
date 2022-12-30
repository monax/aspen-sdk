import { Provider } from '@ethersproject/providers';
import { createHash, randomBytes } from 'crypto';
import { Wallet } from 'ethers';
import { HDNode } from 'ethers/lib/utils';

// BIP-44 standard HD wallet path
const purpose = `44'`;
// Ethereum coin_type
const coinType = `60'`;
// To separate accounts under same wallet root
const account = `0'`;
// Is this a internal change address, always 0 for ethereum
const change = `0`;
// m / purpose' / coin_type' / account' / change / address_index
const pathPrefix = `m/${purpose}/${coinType}/${account}/${change}/`;

export function hdWalletPath(addressIndex: number): string {
  return pathPrefix + addressIndex;
}

function indexFromNameElement(
  name: string,
  indexInList: number,
  { offset = 100, indexing = 'consecutive' }: GenerateAccountsOptions,
): number {
  if (indexing === 'consecutive') {
    return indexInList;
  }
  const buf = createHash('sha256').update(Buffer.from(name)).digest();
  return offset + buf.readUInt16BE();
}

export type GenerateAccountsOptions = {
  mnemonic: string;
  provider?: Provider;
  // HD wallet indices lower than offset are excluding from the generation process
  offset?: number;
  // Whether derive the account index (therefore address) based on consecutive indices from 0 or by a deterministic
  // hash of the name used so that the same name is always given the same address.
  // (the former is useful for tests where the first N addresses generated will correspond to the first N addresses from hardhat)
  // Default: consecutive
  indexing?: 'consecutive' | 'by-name';
};

export function generateNamedAccounts<K extends string>(names: K[], opts: GenerateAccountsOptions): Record<K, Wallet> {
  const namedAccounts = {} as Record<K, Wallet>;
  for (const [index, account] of iterateAccountsMnemonic(
    opts,
    names.map((n, i) => indexFromNameElement(n, i, opts)),
  )) {
    namedAccounts[names[index]] = account;
  }
  return namedAccounts;
}

export function generateAccounts(numAccounts: number, opts: GenerateAccountsOptions): Wallet[] {
  const accounts = [] as Wallet[];
  for (const [index, account] of iterateAccountsMnemonic(
    opts,
    new Array(numAccounts).fill(null).map((_, i) => i),
  )) {
    accounts.push(account);
  }
  return accounts;
}

export function* iterateAccountsMnemonic(
  { mnemonic, provider }: { mnemonic: string; provider?: Provider },
  addressIndices: number[],
): Generator<[number, Wallet]> {
  yield* iterateAccounts({ root: HDNode.fromMnemonic(mnemonic), provider }, addressIndices);
}

export function generateRandomWallet(): Wallet {
  return new Wallet(HDNode.fromSeed(randomBytes(64)).privateKey);
}

export function* iterateAccounts(
  { root, provider }: { root: HDNode; provider?: Provider },
  addressIndices: number[],
): Generator<[number, Wallet]> {
  for (let i = 0; i < addressIndices.length; i++) {
    const path = hdWalletPath(addressIndices[i]);
    let wallet = new Wallet(root.derivePath(path));
    if (provider) {
      wallet = wallet.connect(provider);
    }
    yield [i, wallet];
  }
}
