import { describe, expect, test } from '@jest/globals';
import { exhaustiveUnionPartitioner } from './features';

describe('Features', () => {
  test('Cover', () => {
    const map = { tree: 1, flower: 2, cactus: 9, vine: 6 } as const;
    const partitioner = exhaustiveUnionPartitioner(map, 'tree', 'cactus', 'vine');
    // This is a compile-time error if we do not have every string on the line above in some subset
    const { one, two } = partitioner({ one: ['cactus'], two: ['vine', 'tree'] });
    expect(one).toEqual(9);
    expect(two).toEqual(6);
  });
});
