pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ItemCreator.sol";


contract TestItemCreator {

    ItemCreator itemCreator = ItemCreator(DeployedAddresses.ItemCreator());

    function test() public {
        bool result = itemCreator.test(2);
        Assert.equal(true, result, "Test success");
    }
}