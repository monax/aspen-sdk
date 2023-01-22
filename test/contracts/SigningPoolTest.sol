// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract SigningPoolTest is AccessControlEnumerable {
    uint256 sequence;

    struct Call {
        address caller;
        uint256 sequence;
    }

    Call[] calls;

    constructor() payable {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function issue() public onlyRole(DEFAULT_ADMIN_ROLE) {
        calls.push(Call({caller: msg.sender, sequence: sequence}));
        sequence++;
    }

    function getCalls() public view returns (Call[] memory) {
        return calls;
    }
}
