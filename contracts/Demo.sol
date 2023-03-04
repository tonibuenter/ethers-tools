pragma solidity 0.8;
// SPDX-License-Identifier: MIT
contract Demo {
    event Echo(string message);

    function echo(string calldata message) external {
        emit Echo(message);
    }
}
