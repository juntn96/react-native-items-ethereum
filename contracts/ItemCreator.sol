pragma solidity 0.4.18;


contract ItemCreator {

    event Log(uint itemProp);

    uint private itemPropDigits = 15;
    uint private itemPropModulus = 10 ** itemPropDigits;

    struct Item {
        uint itemProp;
    }

    Item[] private items;

    mapping(uint => address) private itemToOwner;
    mapping (address => Item[]) private ownerToItems;

    function test(string timestamp) public {
        uint randProps = _randomItemProps(timestamp);
        Item memory item = Item(randProps);
        uint id = items.push(item) - 1;
        itemToOwner[id] = msg.sender;
        ownerToItems[msg.sender].push(item);
        Log(randProps);
    }

    function getOwnerByItemId(uint itemId) public view returns (address) {
        return itemToOwner[itemId];
    }

    function getItemsByOwner(address owner) public view returns (Item[]) {
        return ownerToItems[owner];
    }

    function getItems() public view returns (Item[]) {
        return items;
    }

    function _randomItemProps(string timestamp) private view returns (uint) {
        uint rand = uint(sha256(timestamp));
        return rand % itemPropModulus;
    }
}