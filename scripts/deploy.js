const { ethers } = require("hardhat");

async function main() {
  console.log("开始部署 SimpleStorage 合约...");

  // 获取合约工厂
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  
  // 部署合约
  console.log("正在部署合约...");
  const simpleStorage = await SimpleStorage.deploy();
  
  // 等待部署完成
  await simpleStorage.waitForDeployment();
  
  const contractAddress = await simpleStorage.getAddress();
  console.log("SimpleStorage 合约已部署到:", contractAddress);
  
  // 验证部署
  console.log("验证合约部署...");
  const initialValue = await simpleStorage.get();
  console.log("初始存储值:", initialValue.toString());
  
  // 测试合约功能
  console.log("测试合约功能...");
  const tx = await simpleStorage.set(42);
  await tx.wait();
  
  const newValue = await simpleStorage.get();
  console.log("设置后的存储值:", newValue.toString());
  
  console.log("部署完成！");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("部署失败:", error);
    process.exit(1);
  });