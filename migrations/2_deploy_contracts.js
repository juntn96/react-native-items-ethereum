var ItemCreator = artifacts.require("ItemCreator");

module.exports = function(deployer) {
  deployer.deploy(ItemCreator);
};