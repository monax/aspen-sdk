import { describe, expect, test } from '@jest/globals';
import { BigNumber, constants } from 'ethers';
import { max, min } from './number.js';

describe('Number', () => {
  test('min/max', () => {
    expect(min(1, 2, 3, 4)).toEqual(BigNumber.from(1));
    expect(min(1, 2, -3, 4)).toEqual(BigNumber.from(-3));
    expect(max('242343242', 2, -3, 4)).toEqual(BigNumber.from('242343242'));
    expect(max(2)).toEqual(BigNumber.from(2));
    expect(max(Infinity, 2, 3)).toEqual(constants.MaxUint256);
    expect(min(-Infinity, 1, 2)).toEqual(constants.MinInt256);
  });
});
