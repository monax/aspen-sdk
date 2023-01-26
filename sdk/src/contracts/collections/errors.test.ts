import { describe, expect, test } from '@jest/globals';
import { SdkError, SdkErrorCode } from './errors';

describe('SdkError', () => {
  test('try/catch', () => {
    try {
      throw new SdkError(SdkErrorCode.EMPTY_TOKEN_STANDARD);
    } catch (err) {
      if (SdkError.is(err)) {
        // making sure TS doesn't complain here
        expect(err.name).toBe('SdkError');
        expect(err.message).toBe(SdkErrorCode.EMPTY_TOKEN_STANDARD);
        expect(err.error).toBe(null);
      } else {
        expect(1).toBe(0);
      }
    }
  });
});
