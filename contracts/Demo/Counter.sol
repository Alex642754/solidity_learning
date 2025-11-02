// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    // 状态变量，可被外界读取
    uint256 public count;
    
    // 构造函数，部署时可初始化count值
    constructor(uint256 _initialCount) {
        count = _initialCount;
    }
    
    // count加1
    function increment() public {
        count += 1;
    }
    
    // count减1
    function decrement() public {
        count -= 1;
    }
    
    // 读取count值
    function getCount() public view returns (uint256) {
        return count;
    }
}