import { describe, test } from '@jest/globals';
import { ChainAddress } from './address';
import { parse } from '../schema';

describe('Address', () => {
  test('Can parse ChainAddress', () => {
    parse(ChainAddress, '1:0xeCf1EB393A57d5CB02f324FDF69c572F0EbE1557');
    expect(() => parse(ChainAddress, '')).toThrow();
    expect(() => parse(ChainAddress, '1:xx')).toThrow();
    expect(() => parse(ChainAddress, 'a:0xeCf1EB393A57d5CB02f324FDF69c572F0EbE1557')).toThrow();
  });
});
