import {
  asyncYield,
  DEFAULT_ADMIN_ROLE,
  SigningPool,
  wait,
} from '@monaxlabs/aspen-sdk/dist/apis/utils/signing-pool.js';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { Wallet } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import hardhat from 'hardhat';
const { ethers } = hardhat;

describe('SigningPool', function () {
  const admin = new Wallet('0x25c48894badac0c0c0d1b5cc5b9e9cba711ae5bec20787fa8946f60f3bf03c3e', ethers.provider);
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTestContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const factory = await ethers.getContractFactory('SigningPoolTest');
    const contract = await factory.deploy();
    const tx = await contract.grantRole(DEFAULT_ADMIN_ROLE, admin.address);
    await tx.wait();

    return { contract, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should send transactions from pool', async function () {
      const { contract } = await loadFixture(deployTestContract);

      const [owner] = await ethers.getSigners();
      const tx = await owner.sendTransaction({
        to: admin.address,
        value: parseEther('111'),
      });
      await tx.wait();
      const maxSize = 10;

      const topUp = parseEther('0.1');
      const pool = await SigningPool.fromAccessControlContract(admin.privateKey, contract.address, {
        provider: ethers.provider,
        seed: '0x303af788d4200da2c2918709ee3b6f871a108f0b42aaebb8b761077aa2c634c6',
        maxSize,
        replenish: {
          reserve: admin,
          topUp,
          lowWater: parseEther('0.001'),
        },
      });

      // Keys are generated lazily
      await pool.isInitialised();

      const promises = [];
      for (let i = 0; i < maxSize; i++) {
        // Otherwise we end up entering within the same tick and locking up slot 0 permanently
        await asyncYield();
        promises.push(
          pool.do(async (signer) => {
            // In order to call 'issue' the signing pool must have successfully granted the admin role to each slot signer
            const tx = await contract.connect(signer).issue();
            await tx.wait();
            // Lock up the pool slot, so it doesn't get reused
            await wait(1000);
          }),
        );
      }
      await Promise.all(promises);

      const calls = await contract.getCalls();
      const callers = new Set(calls.map((c) => c.caller));
      // We should check out every slot in the pool
      expect(callers.size).to.equal(maxSize);

      const balances = await Promise.all(Array.from(callers.values()).map((c) => ethers.provider.getBalance(c)));
      for (const balance of balances) {
        expect(topUp.sub(balance).lt(parseEther('0.001'))).to.be.true;
      }
    });
  });
});

