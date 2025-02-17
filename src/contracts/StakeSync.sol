// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StakeSync {
    mapping(address => uint256) public stakedAmounts;

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than 0");
        stakedAmounts[msg.sender] += _amount;
    }

    function getStakedBalance(address _user) public view returns (uint256) {
        return stakedAmounts[_user];
    }
}
