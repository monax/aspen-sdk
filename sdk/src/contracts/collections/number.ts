import { BigNumber, BigNumberish, constants } from 'ethers';

export function min(...xs: BigNumberish[]): BigNumber {
  return xs.map(normalise).reduce((m, x) => (m.gt(x) ? BigNumber.from(x) : m));
}

export function max(...xs: BigNumberish[]): BigNumber {
  return xs.map(normalise).reduce((m, x) => (m.gt(x) ? m : BigNumber.from(x)));
}

export function normalise(x: BigNumberish): BigNumber {
  if (x === Infinity) {
    return constants.MaxUint256;
  }
  if (x === -Infinity) {
    return constants.MinInt256;
  }
  return BigNumber.from(x);
}
