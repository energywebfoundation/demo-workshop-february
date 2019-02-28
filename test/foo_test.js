let FooMock = artifacts.require('./mockContracts/FooMock');
let Foo = artifacts.require('./Foo');

console.log(web3.version);

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bn')(web3.utils.BN))
  .should();


contract('Foo', function (accounts) {
    
    describe('original foo', async function() {

        let foo;

        beforeEach(async function() {
            deployer = accounts[0];
            console.log("new deployment");
            foo = await Foo.new([5], {from: deployer});
            console.log(JSON.stringify(foo.methods, null, 2));
            console.log(JSON.stringify(foo.x, null, 2));
        });
        
        it('should return 5 for x', async function() {
            
            let x = await foo.x();
            console.log(x);
            x.should.be.bignumber.equal("5");
        });
    });


    describe('mock foo', async function() {

        let fooMock;

        beforeEach(async function() {
            deployer = accounts[0];
            fooMock = await FooMock.new([5], {from: deployer}).should.be.fulfilled;
        });

        it('should return 6 for x', async function() {
            let x = await fooMock.x();
            x.should.be.bignumber.equal("6");
        });
    });
});
