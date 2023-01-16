// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Winner2 {
    address public owner;

    constructor(address _attemptContract) {
        owner = msg.sender;
        (bool s, ) = _attemptContract.call(
            abi.encodeWithSignature("attempt()")
        );
        require(s);
    }
}
