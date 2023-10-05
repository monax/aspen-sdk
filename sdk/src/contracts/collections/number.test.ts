import { describe, expect, test } from 'vitest';
import { MaxUint256, MinInt256, bigIntRange, max, min } from './number';

describe('Number', () => {
  test('min/max', () => {
    expect(min(1, 2, 3, 4)).toEqual(BigInt(1));
    expect(min(1, 2, -3, 4)).toEqual(BigInt(-3));
    expect(max('242343242', 2, -3, 4)).toEqual(BigInt('242343242'));
    expect(max(2)).toEqual(BigInt(2));
    expect(max(Infinity, 2, 3)).toEqual(MaxUint256);
    expect(min(-Infinity, 1, 2)).toEqual(MinInt256);
  });

  test('bigIntRange', () => {
    const start = BigInt(5);

    // add
    expect(Array.from(bigIntRange(start, 7)).map((v) => Number(v))).toStrictEqual([5, 6, 7, 8, 9, 10, 11]);

    // // sub & negative numbers
    expect(Array.from(bigIntRange(start, -7)).map((v) => Number(v))).toStrictEqual([5, 4, 3, 2, 1, 0, -1]);
  });
});
