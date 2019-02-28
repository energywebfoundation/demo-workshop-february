const Foo = artifacts.require("Foo");

module.exports = function(deployer) {
  deployer.deploy(Foo, 5);
};
