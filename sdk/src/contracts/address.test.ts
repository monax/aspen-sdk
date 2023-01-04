import { describe, expect, test } from '@jest/globals';
import { parse } from '../schema';
import { ChainAddress } from './address';

describe('Address', () => {
  test('Can parse ChainAddress', () => {
    parse(ChainAddress, '1:0xeCf1EB393A57d5CB02f324FDF69c572F0EbE1557');
    expect(() => parse(ChainAddress, '')).toThrow();
    expect(() => parse(ChainAddress, '1:xx')).toThrow();
    expect(() => parse(ChainAddress, 'a:0xeCf1EB393A57d5CB02f324FDF69c572F0EbE1557')).toThrow();
  });
});
