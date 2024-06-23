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
  });
});
