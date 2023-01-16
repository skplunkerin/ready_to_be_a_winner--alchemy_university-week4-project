// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Winner {
    address public owner;
    address public attemptContract;

    constructor(address _attemptContract) {
        owner = msg.sender;
        attemptContract = _attemptContract;
    }

    function win() external {
        (bool s, ) = attemptContract.call(abi.encodeWithSignature("attempt()"));
        require(s);
    }
}
