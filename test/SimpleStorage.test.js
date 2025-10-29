const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner;
  let addr1;

  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1] = await ethers.getSigners();
    
    // 部署合约
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
  });

  describe("部署", function () {
    it("应该正确部署合约", async function () {
      expect(await simpleStorage.getAddress()).to.be.properAddress;
    });

    it("初始值应该为0", async function () {
      expect(await simpleStorage.get()).to.equal(0);
    });
  });

  describe("存储功能", function () {
    it("应该能够存储数值", async function () {
      const value = 42;
      await simpleStorage.set(value);
      expect(await simpleStorage.get()).to.equal(value);
    });

    it("存储时应该触发事件", async function () {
      const value = 100;
      await expect(simpleStorage.set(value))
        .to.emit(simpleStorage, "DataStored")
        .withArgs(value, owner.address);
    });

    it("应该能够增加数值", async function () {
      await simpleStorage.set(10);
      await simpleStorage.increment(5);
      expect(await simpleStorage.get()).to.equal(15);
    });

    it("不同账户都能调用合约", async function () {
      await simpleStorage.connect(addr1).set(123);
      expect(await simpleStorage.get()).to.equal(123);
    });
  });
});