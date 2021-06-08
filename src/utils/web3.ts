const Web3Accounts = require('web3-eth-accounts');

let account = new Web3Accounts().create();
//do not do this on prd env
console.log(
  `account generated. address: ${account.address}, private key: ${account.privateKey}`,
);
