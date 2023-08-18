import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { Wallet } from 'ethers';
import hardhat from 'hardhat';
import { describe } from "vitest"

const { ethers } = hardhat;

export const DEFAULT_ADMIN_ROLE = '0x' + Buffer.alloc(32).toString('hex');

// TODO: Leaving this here as a stub for how to get hardhat vaguely working with ESMs
describe('Stub Test', function () {
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
    it('Reference', async function () {
      const { contract } = await loadFixture(deployTestContract);

      const [owner] = await ethers.getSigners();
    });
  });
});
