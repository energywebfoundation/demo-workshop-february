const Web3 =  require('web3');
const fs = require("fs");

// You need 2 things to reach a contract
// 1. JSON abi
const FooJSON = JSON.parse(fs.readFileSync(__dirname + '/build/contracts/Foo.json', 'utf-8'));
// 2. Contract's deployed address
const contractAddress = "0x8EF74FF9E02942b5dAb8201C88694641A5f1B454";

// The address you are making transactins from
const fromAddress = "0x0052569B2d787bB89d711e4aFB56F9C1E420a2a6";

// init web3 with your provider
const web3 = new Web3(Web3.providers.HttpProvider("http://127.0.0.1:8545"));

async function getX() {
    let contract = new web3.eth.Contract(FooJSON.abi, contractAddress);
    let res = await contract.methods.x().call();
    return res
}

async function setX(num) {
    let contract = new web3.eth.Contract(FooJSON.abi, contractAddress);
    let res = await contract.methods.setX(num).send({from: fromAddress, gas: 100000});
    return res
}

async function main() {
    console.log();
    console.log("X before: " + await getX());
    let transactionObject = await setX(86);
    console.log("Transaction object: " + JSON.stringify(transactionObject, null, 2));
    console.log("X after: " + await getX());
}

main();
