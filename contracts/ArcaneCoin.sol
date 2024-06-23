// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ArcaneCoin {
    
    string public name = "ArcaneCoin";
    string public symbol = "ARC";
    uint8 public decimals = 18;
    uint256 public totalSupply =  1000 * 10 ** 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}
