import { Network } from '@ethersproject/providers';
import { ethers } from 'ethers';

const PROVIDER_URL = 'http://localhost:8545';
const TESTNET: Network = {
  chainId: 63,
  name: 'classicMordor',
};

export class MockJsonRpcProvider extends ethers.providers.StaticJsonRpcProvider {
  // FIFO queue by method
  protected _mocks: Record<string, Array<unknown>> = {};

  constructor() {
    super(PROVIDER_URL, TESTNET);
  }

  send(method: string, params: Array<unknown>): Promise<unknown> {
    throw new Error(`Missing mock for method ${method} with params: ${JSON.stringify(params)}`);
  }

  async perform(method: string, params: unknown): Promise<unknown> {
    if (this._mocks[method] && this._mocks[method].length > 0) {
      return Promise.resolve(this._mocks[method].shift());
    }

    throw new Error(`Missing mock for perform method ${method} with params: ${JSON.stringify(params)}`);
  }

  addMock(method: string, ...returnValues: Array<unknown>) {
    this._mocks[method] = (this._mocks[method] || []).concat(returnValues);
  }
}
