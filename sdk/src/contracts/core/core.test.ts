import { createTestClient, http, publicActions } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { describe, expect, test } from 'vitest';
import { getCedarDeployer, getCurrentAspenDeployer } from './core';

describe('Core Aspen contracts', () => {
  test('Confirm aspen contract functions work', () => {
    const expectedAddress = '0x335625857Ab64131B26bB7873454759dE7b38215';

    const publicClient = createTestClient({
      chain: polygonMumbai,
      mode: 'anvil',
      transport: http(),
    }).extend(publicActions);

    const cedarV8 = getCedarDeployer(publicClient, 8);
    expect(cedarV8.address).toBe(expectedAddress);

    const current = getCurrentAspenDeployer(publicClient);
    expect(current).not.toBeNull();
  });
});
