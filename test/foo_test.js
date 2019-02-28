let Foo = artifacts.require('./Foo');

console.log("web3: " + web3.version);

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bn')(web3.utils.BN))
  .should();


contract('Foo', function (accounts) {
    describe('original foo', async function() {

        let foo;

        beforeEach(async function() {
            deployer = accounts[0];
            foo = await Foo.new([5], {from: deployer});
        });
        
        it('should return 5 for x', async function() {
            
            let x = await foo.x();
            x.should.be.bignumber.equal("5");
        });
    });
});
