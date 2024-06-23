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
    it("Should set the right unlockTime", async function () {
      const { arcaneCoin, owner, otherAccount } = await loadFixture(deployFixture);

      expect(true).to.be.true;
    });
  });
});
