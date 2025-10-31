1.使用solidity0.8.0的版本
2.声明SPDX的注释
3.合约名称
4.状态变量（是否可被外界读取）
5.constructor（参数初始化状态变量，如果状态变量从零开始的话则不需要初始化）
6.函数（读or写操作）（读操作不需要gas费，而写需要）


可以思考的角度：
可见性：
修饰符	    外部账户可调用	       合约内部可调用	       合约可调用	
public	        ✅	                  ✅	               ✅	
private	        ❌	                  ✅（当前合约内部）	  ❌	 
internal	      ❌	                  ✅	               ✅	 
external	      ✅（通过交易）	        ❌（内部不能直接调用）✅（需显式调用）	 

存储数据位置

数据位置	生命周期	   是否可修改	   存储位置	    Gas    成本	    典型用途
storage	 永久保存	       ✅	     区块链上	     💰     高	     状态变量（合约数据）
memory	 函数执行期间	    ✅	      临时内存	    💸     中	      临时计算、函数参数
calldata 函数执行期间	    ❌      	临时内存	    💎     低	      外部函数参数


Counter提示词：
请帮我用 Solidity 写一个简单的计数器合约。
要求如下：
1. 合约名称为 Counter
2. 有一个状态变量 count（uint256 类型），部署时可初始化
3. 提供三个函数：
   - increment(): count 增加 1
   - decrement(): count 减少 1
   - getCount(): 返回 count
4. 状态变量 count 可以被外部读取
5. 使用 Solidity 0.8.x 版本
6. 请加上 SPDX-License-Identifier 注释

SimpleBank提示词：
请用 Solidity (pragma ^0.8.0) 编写一个名为 SimpleBank 的合约，要求如下：
1) 状态：
   - 在 storage 中用 mapping(address => uint256) balances 存每个用户余额
   - 保存合约拥有者 owner（public）
2) 功能函数：
   - deposit(): external payable，接收 ETH，增加调用者 balances[msg.sender]，并 emit DepositMade 事件
   - withdraw(uint256 amount): external，检查余额足够，遵循 Checks-Effects-Interactions 模式扣减 balances，然后使用 (bool sent, ) = payable(msg.sender).call{value: amount}("") 发送 ETH 并 require 返回值，最后 emit WithdrawMade 事件
   - getBalance(address user): public view returns (uint256)
   - myBalance(): external view returns (uint256)
3) 事件：
   - event DepositMade(address indexed user, uint256 amount);
   - event WithdrawMade(address indexed user, uint256 amount);
4) 其他：
   - 实现 receive() 和 fallback()，当收到 ETH 时把金额加入 sender 的 balances 并 emit DepositMade
   - 在合约头部添加 SPDX-License-Identifier: MIT 和 pragma solidity ^0.8.0
   - 在 withdraw 前后遵循安全模式：检查 -> 修改状态 -> 交互
5) 另外，请生成一个简单的 Hardhat 测试脚本（JavaScript）来测试：
   - deposit 增加余额
   - withdraw 成功发送
   - withdraw 余额不足报错
6) 代码中每个函数和关键行添加简短注释，方便我逐行阅读

函数的提示词：
1.每个函数都先给出名称，让ai知道我要怎么样的函数，函数修饰符
2.功能概述
3.关联逻辑，明确每个操作的目的
4.事件涉及
5.重要的规则
整理为类似自然语言的指令


