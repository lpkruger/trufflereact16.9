const BeerFridge = artifacts.require("BeerFridge");

module.exports = function(deployer) {
  deployer.deploy(BeerFridge);
};
