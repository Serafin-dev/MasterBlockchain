//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "./IEscrow.sol";

contract Escrow is IEscrow {
    mapping(address => uint) public addressToBalance;

    function deposit(address withdrawerAddress) external payable override {
        require(msg.value > 0,"Your have to send a value");
        addressToBalance[withdrawerAddress] = msg.value;
    }
    function withdraw() external override {
        require(addressToBalance[msg.sender] > 0, "You have nothing to withdraw");
        address payable receiver = payable(msg.sender);
        uint256 amount = addressToBalance[msg.sender];
        receiver.transfer(amount);
    }
}
