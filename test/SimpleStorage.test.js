const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleBank", function () {
  it("should deposit and update balance correctly", async function () {
    const [owner] = await ethers.getSigners();

    const SimpleBank = await ethers.getContractFactory("SimpleBank");
    const simpleBank = await SimpleBank.deploy();
    await simpleBank.waitForDeployment();

    // 存入 1 ETH
    const depositAmount = ethers.parseEther("1.0");
    await simpleBank.connect(owner).deposit({ value: depositAmount });

    // ✅ 正确调用：传入 address 参数
    const balance = await simpleBank.getBalance(owner.address);

    expect(balance).to.equal(depositAmount);
  });

  it("should withdraw and update balance correctly", async function () {
    const [owner] = await ethers.getSigners();

    const SimpleBank = await ethers.getContractFactory("SimpleBank");
    const simpleBank = await SimpleBank.deploy();
    await simpleBank.waitForDeployment();

    // 先存入 1 ETH
    const depositAmount = ethers.parseEther("1.0");
    await simpleBank.connect(owner).deposit({ value: depositAmount });

    // 使用 getBalance 查询余额
    const afterDepositUserBal = await simpleBank.getBalance(owner.address);
    expect(afterDepositUserBal).to.equal(depositAmount);

    // 取出 0.4 ETH，函数应正常执行
    const withdrawAmount = ethers.parseEther("0.4");
    await simpleBank.connect(owner).withdraw(withdrawAmount);

    // 使用 getBalance 查询余额变化
    const afterWithdrawUserBal = await simpleBank.getBalance(owner.address);
    expect(afterWithdrawUserBal).to.equal(depositAmount - withdrawAmount);
  });
});
