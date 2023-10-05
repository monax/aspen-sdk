import { describe, expect, test } from 'vitest';
import { AggregateError, promiseAny } from './promise';

describe('promise', () => {
  test('promiseAny', async () => {
    // Reject when all dead
    await expect(() => promiseAny([Promise.reject('bad'), Promise.reject('hmm')])).rejects.toEqual(
      new AggregateError(['bad', 'hmm']),
    );
    let result = await promiseAny([Promise.reject('bad'), Promise.resolve('yay')]);
    expect(result).toEqual('yay');
    result = await promiseAny([Promise.resolve('hoorah'), Promise.resolve('yay')]);
    expect(result).toEqual('hoorah');
    result = await promiseAny([
      new Promise((resolve) => setTimeout(() => resolve('hoorah'), 100)),
      new Promise((resolve) => setTimeout(() => resolve('yay'), 1000)),
    ]);
    expect(result).toEqual('hoorah');
  });
});
