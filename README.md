# Solidity & Hardhat 学习记录

> 🎯 记录我在 Solidity 与 Hardhat 学习过程中的所有思考、笔记与代码实践。  
> 本项目旨在持续积累区块链开发能力，构建从合约编写、测试到部署的完整理解体系。

---

## 📘 项目简介

本仓库用于记录我在学习 **Solidity 智能合约** 与 **Hardhat 框架** 过程中的代码与心得。  
内容包括智能合约的语法理解、EVM 执行逻辑、合约部署与交互、测试脚本编写等。  
每一个学习节点都会在 `contracts/` 目录中以 **DayX_主题.sol** 的形式保存对应的合约文件。
所有的思考都会在 `notes/` 目录中以 **主题.md** 的形式保存。

## 🪶 备注

- 所有代码与文档均为个人学习笔记，不代表生产级实现。  
- 记录重点在于**理解与表达逻辑**，而非复杂度。  
- 本仓库会长期更新，逐步扩展到测试网部署等方向。  

---

## 📚 学习记录

> 以下为我在学习过程中每天的进展，持续更新中。
当前已经完成合约的编写部署，并且测试通过。

### 🗓️ Day 1
- 理解区块链的状态机模型与 EVM 工作原理  
- 熟悉 Solidity 的基本结构（状态变量、函数、constructor）  
- 编写第一个计数器合约（`Counter.sol`）  
- 学习状态变量的存储方式与可见性修饰符 `public`  
- 理解 constructor 参数在部署时如何初始化状态变量  
- 了解 Solidity 版本声明和 SPDX-License-Identifier 注释的作用  
- 掌握提示词设计思路，让 AI 生成合约代码

Day 2

- 理解 Solidity 中 event 的作用，用于记录日志及其与 Solana 的区别
- 掌握 emit 关键字的使用方法，触发事件并传递参数
- 理解事件参数声明（如 address indexed user, uint amount）只在事件内部定义，不需外部声明
- 学会 require 语句的用法：条件判断、回滚交易及返回错误信息
- 掌握低级函数调用 .call 的用法，理解 (bool sent, ) = payable(msg.sender).call{value: amount}(""); 的语法
- 理解 payable(msg.sender) 的作用：将地址转换为可接收 ETH 的地址类型
- 学会 .call{value: amount}("") 实现安全转账，并理解 {value: amount} 的附加功能
- 理解 .call 与 transfer/send 的区别，以及为什么使用 .call 可以避免 gas 限制问题
- 学会 view 函数修饰符的作用：只读、不修改状态、可进行链下查询，不消耗 gas
- 理解“链下查询（off-chain call）”概念，区分交易调用与链下查询
- 掌握 receive() 特殊函数的用法，用于直接接收 ETH，并理解其与普通函数和 fallback() 的区别
- 实战练习：通过 receive() 函数实现用户充值并触发 DepositMade 事件记录日志

 Day 3

- 彻底理解 Solidity 合约的核心语法与逻辑结构（以 SimpleBank 为例）
- 掌握 mapping、modifier、external / public 等关键语法的使用场景与设计意图
- 理解 SimpleBank 的功能设计：状态变量、事件、核心函数及安全校验逻辑
- 初步掌握合约部署流程与 Hardhat 框架核心概念
- 学习 scripts/deploy.js 文件的结构与执行原理
- 了解 hre（Hardhat Runtime Environment）与 ethers 的作用
- 理解 async/await 的异步执行机制，掌握合约部署的异步流程
- 掌握 getContractFactory() 与 .deploy() 的原理与作用
- 成功使用 Hardhat 本地环境部署 SimpleBank 合约
- 执行命令：npx hardhat compile → npx hardhat run scripts/deploy.js
- 输出结果：SimpleBank deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
- ✅ 标志着首次成功将合约部署到本地链上 

Day 4（项目理解篇）
- 完成了对部署的深度理解
- 彻底分析了 SimpleBank 合约功能设计
- 理解各函数可见性：
external 面向用户/EVM
public 方便合约内部复用
- 掌握关键修饰符：
payable：接收 ETH
view / pure：只读或纯计算
- 理解事件 (emit) 用于通知前端和记录状态
- 理解 EVM 特殊入口：
receive() 自动接收 ETH
fallback() 处理未知函数调用
- 完成功能设计思路梳理，为测试和验证做准备

Day 5

- 学习并实践了 Hardhat 的测试框架流程
- 理解了 describe() 与 it() 的结构逻辑：模块化组织与单元测试划分
- 掌握了 Chai 断言库的核心语法：expect(actual).to.equal(expected)
- 了解了 Mocha 的作用：作为底层测试运行器，自动执行 describe/it 结构
- 理解了合约在测试中的部署机制：每个测试自动部署独立实例
- 掌握了 ethers.getSigners() 获取测试账户、getContractFactory() 加载合约模板、deploy() 部署的流程
- 理解了 .connect(signer) 的作用：以特定账户身份调用合约函数
- 学会使用 .to.emit() 测试事件触发与参数验证
- 区分了 getBalance(address) 与 ethers.provider.getBalance(contractAddress)：前者是映射余额，后者是链上账户余额
- 掌握了完整的存款与取款测试逻辑，从功能验证到状态断言
- 初步建立了测试设计思维：验证逻辑正确性与边界条件，而非仅关注语法实现