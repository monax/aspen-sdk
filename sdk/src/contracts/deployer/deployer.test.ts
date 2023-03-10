import { describe, expect, test } from '@jest/globals';
import { providers } from 'ethers';
import { ICedarDeployerV8__factory } from '../generated';
import { getCurrentDeployer, getDeployer } from './deployer';

describe('Deployer functions', () => {
  test('Confirm deployer functions work', () => {
    const expectedAddress = '0x335625857Ab64131B26bB7873454759dE7b38215';
    const provider = new providers.JsonRpcProvider();

    const cedarV8 = getDeployer(provider, 'Mumbai', 'CedarDeployer', 8);
    expect(cedarV8.address).toBe(expectedAddress);

    const cedarV8expected = ICedarDeployerV8__factory.connect(expectedAddress, provider);
    expect(Object.keys(cedarV8.functions)).toStrictEqual(Object.keys(cedarV8expected.functions));

    const current = getCurrentDeployer(provider, 'Mumbai');
    expect(current).not.toBeNull();
  });
});
