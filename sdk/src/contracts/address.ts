import { utils } from 'ethers';
import { tryCatch } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { parse } from '../utils';
import { ZERO_ADDRESS } from './constants';

export interface AddressBrand {
  readonly Address: unique symbol;
}

// Signal an address is wanted but be willing to parse it later
export type Addressish = Address | string;

export function asAddress(address: Addressish): Address {
  return parse(Address, address);
}

export const Address = t.string
  .pipe(
    new t.Type<string, string, string>(
      'Address',
      t.string.is,
      (value, context) =>
        tryCatch(
          // This function returns a EIP-55 checksummed address, if the input has mixed case it throws if the the casing
          // does not encode proper checksum, otherwise it just converts
          () => utils.getAddress(value),
          (err) => [{ value, context, message: String(err) || undefined }],
        ),
      t.identity,
    ),
  )
  .pipe(t.brand(t.string, (s): s is t.Branded<string, AddressBrand> => true, `Address`));

export type Address = t.TypeOf<typeof Address>;

export type AddressOrName = t.TypeOf<typeof Address> | string;

export function isZeroAddress(address = ''): boolean {
  return isSameAddress(address, ZERO_ADDRESS);
}

export function isSameAddress(address1 = '', address2 = ''): boolean {
  try {
    return utils.getAddress(address1) === utils.getAddress(address2);
  } catch {
    return false;
  }
}

export interface ChainAddressBrand {
  readonly ChainAddress: unique symbol;
}
export const ChainAddress = t.brand(
  t.string,
  (s): s is t.Branded<string, ChainAddressBrand> => isChainAddress(s),
  `ChainAddress`,
);

export type ChainAddress = t.TypeOf<typeof ChainAddress>;

export function isChainAddress(str: string): boolean {
  try {
    const [chainIdText, address] = str.split(':');
    utils.getAddress(address);
    if (isNaN(parseInt(chainIdText))) return false;
    return true;
  } catch {
    return false;
  }
}
