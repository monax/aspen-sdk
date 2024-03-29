import { describe, expect, test } from 'vitest';
import { exhaustiveUnionPartitioner } from './features';

describe('Features', () => {
  test('Cover', () => {
    const map = { tree: 1, flower: 2, cactus: 9, vine: 6 } as const;
    const partitioner = exhaustiveUnionPartitioner(map, 'tree', 'cactus', 'vine', 'reed');
    // This is a compile-time error if we do not have every string on the line above in some subset
    const { one, two, three } = partitioner({ one: ['cactus'], two: ['vine', 'tree'], three: ['reed'] });
    expect(one).toEqual(9);
    expect(two).toEqual(6);
    expect(three).toEqual(undefined);
  });
});
