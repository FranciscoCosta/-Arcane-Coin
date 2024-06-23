import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("ArcaneCoin", function () {

  async function deployFixture() {
   
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const ArcaneCoin = await hre.ethers.getContractFactory("ArcaneCoin");
    const arcaneCoin = await ArcaneCoin.deploy();

    return { arcaneCoin, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should have correct name", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const name = await arcaneCoin.name();
      expect(name).to.equal("ArcaneCoin");
    });

    it("Should have correct symbol", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const symbol = await arcaneCoin.symbol();
      expect(symbol).to.equal("ARC");
    });

    it("Should have correct decimals", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const decimals = await arcaneCoin.decimals();
      expect(decimals).to.equal(18);
    });

    it("Should have correct total supply", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const totalSupply = await arcaneCoin.totalSupply();
      expect(totalSupply).to.equal(1000n * 10n ** 18n);
    });

    it("Should have correct initial balance", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balance = await arcaneCoin.balanceOf(owner.address);
      expect(balance).to.equal(1000n * 10n ** 18n);
    });

    it("Should transfer from owner to other account", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      
      const balanceOwnerBefore = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherBefore = await arcaneCoin.balanceOf(otherAccount.address);

      await arcaneCoin.transfer(otherAccount.address, 1n );

      const balanceOwnerAfter = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherAfter = await arcaneCoin.balanceOf(otherAccount.address);

      expect(balanceOwnerAfter).to.equal(balanceOwnerBefore - 1n);
      expect(balanceOtherAfter).to.equal(balanceOtherBefore + 1n);
    });

    it ("Should not transfer more than balance", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);

      const balanceOwnerBefore = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherBefore = await arcaneCoin.balanceOf(otherAccount.address);

      await expect(arcaneCoin.transfer(otherAccount.address, balanceOwnerBefore + 1n)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      const balanceOwnerAfter = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherAfter = await arcaneCoin.balanceOf(otherAccount.address);

      expect(balanceOwnerAfter).to.equal(balanceOwnerBefore);
      expect(balanceOtherAfter).to.equal(balanceOtherBefore);
    });

    it("Should approve ", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);

      await arcaneCoin.approve(otherAccount.address, 1n);

      const allowance = await arcaneCoin.allowance(owner.address, otherAccount.address);

      expect(allowance).to.equal(1n);
    });

    it("Should transfer from other account to another account", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherBefore = await arcaneCoin.balanceOf(otherAccount.address);

      await arcaneCoin.approve(otherAccount.address, 10n);

      const instance = arcaneCoin.connect(otherAccount);
      await instance.transferFrom(owner.address, otherAccount.address, 4n);

      const balanceOwnerAfter = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherAfter = await arcaneCoin.balanceOf(otherAccount.address);
      const allowance = await arcaneCoin.allowance(owner.address, otherAccount.address);

      expect(balanceOwnerAfter).to.equal(balanceOwnerBefore - 4n);
      expect(balanceOtherAfter).to.equal(balanceOtherBefore + 4n);
      expect(allowance).to.equal(6n);
    
    });

    it("Should not transfer from other account to another account more than allowance", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherBefore = await arcaneCoin.balanceOf(otherAccount.address);

      await arcaneCoin.approve(otherAccount.address, 10n);

      const instance = arcaneCoin.connect(otherAccount);
      await expect(instance.transferFrom(owner.address, otherAccount.address, 11n)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");

      const balanceOwnerAfter = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherAfter = await arcaneCoin.balanceOf(otherAccount.address);
      const allowance = await arcaneCoin.allowance(owner.address, otherAccount.address);

      expect(balanceOwnerAfter).to.equal(balanceOwnerBefore);
      expect(balanceOtherAfter).to.equal(balanceOtherBefore);
      expect(allowance).to.equal(10n);
    });

    it("Should not transfer from other account without approval", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherBefore = await arcaneCoin.balanceOf(otherAccount.address);

      const instance = arcaneCoin.connect(otherAccount);
      await expect(instance.transferFrom(owner.address, otherAccount.address, 4n)).to.be.revertedWith("ERC20: transfer amount exceeds allowance");

      const balanceOwnerAfter = await arcaneCoin.balanceOf(owner.address);
      const balanceOtherAfter = await arcaneCoin.balanceOf(otherAccount.address);

      expect(balanceOwnerAfter).to.equal(balanceOwnerBefore);
      expect(balanceOtherAfter).to.equal(balanceOtherBefore);
    });


  });


});
