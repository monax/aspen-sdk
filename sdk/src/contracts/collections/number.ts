import { BigIntish } from './types';

export const Zero = BigInt(0);
export const One = BigInt(1);
export const MinInt256 = BigInt('0x8000000000000000000000000000000000000000000000000000000000000000') * BigInt(-1);
export const MaxUint256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export function min(...xs: BigIntish[]): bigint {
  return xs.map(normalise).reduce((m, x) => (m > x ? x : m));
}

export function max(...xs: BigIntish[]): bigint {
  return xs.map(normalise).reduce((m, x) => (m > x ? m : x));
}

export function normalise(x: BigIntish): bigint {
  if (x === Infinity) {
    return MaxUint256;
  }
  if (x === -Infinity) {
    return MinInt256;
  }
  return BigInt(x);
}

export function* bigIntRange(start: bigint, length: BigIntish) {
  const lengthBI = normalise(length);

  const last = start + lengthBI;

  let idx = start;

  if (start < last) {
    while (idx < last) {
      yield idx;
      idx = idx + One;
    }
  } else {
    while (idx > last) {
      yield idx;
      idx = idx - One;
    }
  }
}
