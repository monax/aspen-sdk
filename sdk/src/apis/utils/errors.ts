import { ErrorDescription } from '@ethersproject/abi/lib/interface';
import { utils } from 'ethers';

type Obj = Record<string, unknown>;

// TODO: deal with extracting contract addresses and other
export function getInnermostError<T>(err: T): Obj | undefined {
  while (err) {
    const innerErr = (err as Obj).error;
    if (typeof innerErr !== 'object') {
      return err;
    }
  }
}

// Try to extract and decode a CustomError thrown from an interaction with the given ethers Interface. Returns undefined
// if none is found.
export function decodeCustomError<T>(iface: utils.Interface, err: T): ErrorDescription | void {
  const innerError = getInnermostError(err);
  if (!innerError) {
    return;
  }
  const revertData = innerError.data;
  if (typeof revertData !== 'string') {
    return;
  }
  const decodedError = iface.parseError(revertData);
  if (decodedError) {
    return decodedError;
  }
}

export function formatCustomError({ name, signature, args, sighash }: ErrorDescription): Error {
  return new Error(`Solidity error [${signature}](${args.map((v) => JSON.stringify(v)).join(', ')})`);
}

export function extractCustomError<T>(iface: utils.Interface, err: T): Error | void {
  const errorDescription = decodeCustomError(iface, err);
  if (errorDescription) {
    return formatCustomError(errorDescription);
  }
}
