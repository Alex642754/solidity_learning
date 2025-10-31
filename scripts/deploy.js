const hre = require("hardhat");

async function main() {
  // 1. 获取合约“工厂”（ContractFactory）
  const SimpleBank = await hre.ethers.getContractFactory("SimpleBank");

  // 2. 部署合约（发送部署交易）
  const bank = await SimpleBank.deploy();

  // 3. 等待部署被区块链确认
  await bank.waitForDeployment();

  // 4. 打印合约地址
  console.log("SimpleBank deployed to:", await bank.getAddress());
}

// 捕获任何错误并把进程返回码设为非 0（表示失败）
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
