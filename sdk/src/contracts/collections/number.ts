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

export function* bnRange(start: BigNumber, length: BigNumberish) {
  const last = start.add(length);

  if (start.lt(last)) {
    for (let idx = start; idx.lt(last); idx = idx.add(1)) {
      yield idx;
    }
  } else {
    for (let idx = start; idx.gt(last); idx = idx.sub(1)) {
      yield idx;
    }
  }
}
