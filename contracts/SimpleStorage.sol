// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title SimpleStorage
 * @dev 一个简单的存储合约示例
 */
contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 indexed newValue, address indexed sender);
    
    /**
     * @dev 存储一个数值
     * @param x 要存储的数值
     */
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x, msg.sender);
    }
    
    /**
     * @dev 获取存储的数值
     * @return 存储的数值
     */
    function get() public view returns (uint256) {
        return storedData;
    }
    
    /**
     * @dev 增加存储的数值
     * @param x 要增加的数值
     */
    function increment(uint256 x) public {
        storedData += x;
        emit DataStored(storedData, msg.sender);
    }
}