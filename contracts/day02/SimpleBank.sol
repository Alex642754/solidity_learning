// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {
    // 存储：记录每个地址的账户余额（永久存在于链上 storage）
    mapping(address => uint256) private balances;

    // 合约拥有者（可选，用于管理或未来扩展）
    address public owner;

    // 事件：用于在链上记录日志，前端可以监听
    event DepositMade(address indexed user, uint256 amount);
    event WithdrawMade(address indexed user, uint256 amount);

    // 构造函数：合约部署时执行一次，设置 owner
    constructor() {
        owner = msg.sender;
    }

    // 辅助修饰符：检查数额必须大于 0
    modifier nonZero(uint256 amount) {
        require(amount > 0, "Amount must be > 0");
        _;
    }

    // 存款函数：payable 允许接收 ETH
    function deposit() external payable nonZero(msg.value) {
        // 把传入的 ETH 增加到调用者的余额（写 storage）
        balances[msg.sender] += msg.value;

        // 触发事件，记录存款行为
        emit DepositMade(msg.sender, msg.value);
    }

    // 取款函数：从合约中把指定金额发回给调用者
    function withdraw(uint256 amount) external nonZero(amount) {
        // 检查余额是否充足（读 storage）
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Checks-Effects-Interactions 模式：先修改状态（减余额）
        balances[msg.sender] -= amount;

        // 与外部地址交互（发送 ETH），使用 call 防止 gas 限制问题
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Transfer failed");

        // 触发事件，记录取款
        emit WithdrawMade(msg.sender, amount);
    }

    // 查询任意地址余额（只读，不消耗 gas）
    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }

    // 便捷：查询自己的余额
    function myBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    // 接收直接转账（例如用户直接向合约地址发送 ETH）
    receive() external payable {
        balances[msg.sender] += msg.value;
        emit DepositMade(msg.sender, msg.value);
    }

    // fallback：当调用不存在的函数时也能接收 ETH（可选）
    fallback() external payable {
        if (msg.value > 0) {
            balances[msg.sender] += msg.value;
            emit DepositMade(msg.sender, msg.value);
        }
    }
}
