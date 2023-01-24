import { Provider } from '@ethersproject/providers';
import { BigNumber, BigNumberish, BytesLike, providers, Signer, Wallet } from 'ethers';
import { HDNode } from 'ethers/lib/utils.js';
import { Addressish, asAddress } from '../../contracts/address.js';
import { GasStrategy, getGasStrategy } from '../../contracts/gas.js';
import { AccessControl__factory } from '../../contracts/generated/factories/additional/AccessControl__factory.js';
import { hdWalletPath } from '../utils/accounts.js';
import { promiseAny } from './promise.js';

type Logger = (msg: string) => unknown;
export type SigningPoolArgs = {
  provider: Provider;
  seed: string;
  maxSize: number;
  replenish?: ReplenishmentConfig;
  // Idempotent initialisation function for a wallet - run each time the wallet is recycled
  init?: (wallet: Wallet, index: number, logger?: Logger) => Promise<void>;
  logger?: Logger;
};

export type ReplenishmentConfig = {
  // Account to transfer funds from (the bank)
  reserve: Signer;
  topUp: BigNumberish;
  lowWater: BigNumberish;
  gasStrategy?: GasStrategy;
};

export const DEFAULT_ADMIN_ROLE = '0x' + Buffer.alloc(32).toString('hex');
export const ISSUER_ROLE = '0x114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa122';

const RECYCLE_WAIT_MS = 1000;

export class SigningPool {
  private readonly slots: Promise<number>[] = [];
  private readonly wallets: (Wallet | null)[] = [];
  private readonly replenish?: ReplenishmentConfig;
  private readonly logger: (msg: string) => void;

  private readonly initialised: Promise<void>;
  private recycleLocked = false;

  static async fromAccessControlContract(
    adminPrivateKey: string,
    contractAddressish: Addressish,
    args: Omit<SigningPoolArgs, 'init'>,
    roleToGrant: BytesLike = DEFAULT_ADMIN_ROLE,
  ): Promise<SigningPool> {
    const contractAddress = await asAddress(contractAddressish);
    const adminWallet = new Wallet(adminPrivateKey, args.provider);
    const contract = AccessControl__factory.connect(contractAddress, adminWallet);
    const adminRole = await contract.getRoleAdmin(roleToGrant);
    const isAdmin = await contract.hasRole(adminRole, adminWallet.address);
    if (!isAdmin) {
      throw new Error(`Address: ${adminWallet.address} does not have admin role ${adminRole} to grant ${roleToGrant}`);
    }
    return new SigningPool({
      ...args,
      init: async (wallet, index, logger) => {
        if (!logger) {
          logger = () => null;
        }
        const address = await wallet.getAddress();
        try {
          const hasRole = await contract.hasRole(roleToGrant, address);
          if (!hasRole) {
            logger(
              `Signer ${address} (${index}/${args.maxSize}) does not have role ${roleToGrant} so attempting to grant that role`,
            );
            const tx = await contract.grantRole(roleToGrant, address);
            await tx.wait();
          }
        } catch (err: any) {
          throw new Error(`could not initialise ${address} by granting ${roleToGrant}: ${err.stack || err}`);
        }
      },
    });
  }
  // SigningPool initialises in the background, but `do` can be called immediately since it will wait for the first
  // slot to become initialised
  constructor({ provider, seed, maxSize, replenish, init, logger }: SigningPoolArgs) {
    const wallet = HDNode.fromSeed(seed);
    this.logger = logger ?? ((msg: string) => null);
    // When this returns we will have exactly 1 key ready for use so the pool can be used while the others initialise
    // Generate keys asynchronously
    this.initialised = this.generateRemainingKeys(wallet, provider, maxSize, init, logger);
    this.replenish = replenish;
  }

  async isInitialised(): Promise<boolean> {
    await this.initialised;
    return true;
  }

  // Check out a Signer from the pool, pass it to f, and return it to the pool once f returns
  do<T>(work: (s: Signer) => Promise<T>): Promise<T> {
    // Not using async/await in this function to avoid accidental interlacing during any future refactoring
    // Wait for a wallet to be free
    return promiseAny(this.slots)
      .then((index) => {
        const wallet = this.wallets[index];
        if (!wallet) {
          // If we hit this error it is a bug - it means we have an uninitialised wallet at index but did not push a
          // promise rejection
          throw new Error(`unexpected non-existent wallet at index ${index}`);
        }
        // Sequence the work after the current work is done (note: although we end up in this function when the present
        // slot is resolved it is possible for an interlaced call to do to enter first and attach to the promise before
        // us)
        const result = this.slots[index].then(() => this.recycle(wallet)).then(() => runWork(work, wallet));
        // Don't fail the slot on errors
        this.slots[index] = result.then(
          () => index,
          () => index,
        );
        // Return result or any WorkError to the work
        return result;
      })
      .catch((err) => Promise.reject(new Error(`all SigningPool slots are defunct: ${err.stack || err}`)));
  }

  // Sweep all funds back to reserve
  async sweep(): Promise<providers.TransactionRequest[]> {
    const replenish = this.replenish;
    if (!replenish) {
      return [];
    }
    const possibleSweepTxs = await Promise.all(
      this.wallets
        .filter((w): w is Wallet => Boolean(w))
        .map((w) => getSweepTx(w, replenish.reserve).then((request) => (request ? { request, wallet: w } : null))),
    );
    const sweepTxs = possibleSweepTxs.filter((p): p is { request: providers.TransactionRequest; wallet: Wallet } =>
      Boolean(p),
    );
    await Promise.all(sweepTxs.map(({ request, wallet }) => wallet.sendTransaction(request).then((tx) => tx.wait())));
    return sweepTxs.map(({ request }) => request);
  }

  getAddresses(): string[] {
    return this.wallets.filter((w): w is Wallet => Boolean(w)).map((w) => w.address);
  }

  async close(): Promise<void> {
    return Promise.all(this.slots).then();
  }

  private async recycle(wallet: Wallet): Promise<void> {
    try {
      const balance = await wallet.getBalance();
      this.log(`Recycling ${wallet.address} which has a balance of ${balance.toString()}`);
      if (this.replenish && balance.lte(this.replenish.lowWater)) {
        if (this.recycleLocked) {
          const waitMs = RECYCLE_WAIT_MS + (Math.random() * RECYCLE_WAIT_MS) / 10;
          this.log(`Waiting on recycle lock for ${waitMs}ms`);
          await wait(waitMs);
          return this.recycle(wallet);
        }
        this.recycleLocked = true;
        const walletAddress = await wallet.getAddress();
        const reserveBalance = await this.replenish.reserve.getBalance();
        this.log(`Topping up ${wallet.address} from reserve (reserve balance: ${reserveBalance.toString()})`);
        if (reserveBalance.lt(this.replenish.topUp)) {
          const reserveAddress = await this.replenish.reserve.getAddress();
          throw new Error(
            `could not top up SigningPool wallet at ${walletAddress}, reserve account (${reserveAddress}) only has ${reserveBalance.toString()} but topup amount is ${this.replenish.topUp.toString()}`,
          );
        }
        const topUp = BigNumber.from(this.replenish.topUp);
        const topUpJitter = Math.floor(Math.random() * 100);
        const receipt = await this.replenish.reserve.sendTransaction({
          to: walletAddress,
          // Add some jitter to transaction value to help evade stuck transactions
          value: topUp.add(topUpJitter),
          ...(this.replenish.gasStrategy || {}),
        });
        await receipt.wait();
      }
    } catch (err: any) {
      const address = await wallet.getAddress().catch(() => `[could not get wallet address]`);
      throw new Error(`could not recycle SigningPool wallet '${address}': ${formatError(err)}`);
    } finally {
      this.recycleLocked = false;
    }
  }

  private async generateRemainingKeys(
    node: HDNode,
    provider: Provider,
    remaining: number,
    init?: (wallet: Wallet, index: number, logger?: Logger) => Promise<void>,
    logger?: Logger,
  ): Promise<void> {
    const index = this.slots.length;
    const path = hdWalletPath(index);
    try {
      const wallet = new Wallet(node.derivePath(path)).connect(provider);
      if (init) {
        await init(wallet, index, logger);
      }
      this.slots.push(Promise.resolve(index));
      this.wallets.push(wallet);
      this.log(`Generated wallet with address ${wallet.address}`);
    } catch (err) {
      const wrapped = new Error(`could not generate SigningPool key '${path}': ${formatError(err)}`);
      this.log(`Error generating keys for signing pool: ${formatError(wrapped)}`);
      throw wrapped;
    }
    // Generate the rest of the keys asynchronously
    if (--remaining > 0) {
      return await this.generateRemainingKeys(node, provider, remaining, init, logger);
    } else {
      this.log(`Generated ${this.slots.length} signers in SigningPool`);
    }
  }

  private log(msg: string): void {
    this.logger(msg);
  }
}

export async function getSweepTx(from: Signer, to: Addressish): Promise<providers.TransactionRequest | undefined> {
  const fromAddress = await from.getAddress();
  const toAddress = await asAddress(to);
  if (toAddress == fromAddress) {
    throw new Error(`'from' wallet and 'to' wallet have the same address ${toAddress}.`);
  }
  const provider = from.provider;
  if (!provider) {
    throw new Error(`'from' Signer has no provider attached`);
  }
  const transferGas = 21_000;
  const balance = await from.getBalance();
  if (!balance.isZero()) {
    const gasStrategy = await getGasStrategy(provider);
    const block = await provider.getBlock('latest');
    const maxFeePerGas = block.baseFeePerGas?.add(gasStrategy?.maxPriorityFeePerGas || 1).sub(1) || BigNumber.from(1);
    const baseTx = {
      to: toAddress,
      value: balance.sub(maxFeePerGas?.mul(transferGas)),
      ...gasStrategy,
    };
    return await from.populateTransaction(baseTx);
  }
}

// Used to mark errors throw by functions passed to do that should not make a slot defunct
class WorkError extends Error {}

async function runWork<T>(work: (signer: Signer) => Promise<T>, wallet: Wallet): Promise<T> {
  try {
    return await work(wallet);
  } catch (err: any) {
    throw new WorkError(`error during in SigningPool work: ${err.stack || err}`);
  }
}
export function wait(waitMs: number) {
  return new Promise((resolve) => setTimeout(resolve, waitMs));
}

export function asyncYield() {
  return new Promise((resolve) => setImmediate(resolve));
}

function formatError(err: any): string {
  return err.stack || err;
}
