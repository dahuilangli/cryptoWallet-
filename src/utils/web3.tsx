// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Pull in the shims (BEFORE importing ethers)
import '@ethersproject/shims';

// Import the ethers library
import { ethers } from 'ethers';

export function getAccount() {
  console.log('开始创建');

  //拿到生成的钱包信息
  let wallet = ethers.Wallet.createRandom();

  console.log();

  //获取助记词
  let mnemonic = wallet.mnemonic;
  console.log('钱包助记词：', mnemonic);

  //获取钱包的私钥
  let privateKey = wallet.privateKey;
  console.log('钱包私钥：', privateKey);

  //获取钱包地址
  let address = wallet.address;
  console.log('钱包地址：', address);
}
