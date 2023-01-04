import { describe, test } from '@jest/globals';
import { ChainAddress } from './address';
import { parse } from '../schema';
import {ChainId} from "./network";

describe('Networks', () => {
  test('Can parse ChainID', () => {
    parse(ChainId, 1)
    expect(() => parse(ChainAddress, '')).toThrow();
    expect(() => parse(ChainAddress, '1:xx')).toThrow();
    expect(() => parse(ChainAddress, 'a:0xeCf1EB393A57d5CB02f324FDF69c572F0EbE1557')).toThrow();
  });
});
