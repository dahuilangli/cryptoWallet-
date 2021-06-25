// Import the ethers library
import { ethers } from 'ethers';

//生成随机ID：GUID
function genId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
}

export function getAccount() {
  try {
    let wallet = ethers.Wallet.createRandom();
    let account = {
      id: genId(),
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
    return account;
  } catch (error) {
    throw '错误' + error;
  }
}

export function recoverAccountToMnemonic(monic: string) {
  try {
    let mnemonic = ethers.Wallet.fromMnemonic(monic);
    let account = {
      id: genId(),
      privateKey: mnemonic.privateKey,
      address: new ethers.Wallet(mnemonic.privateKey).address,
      mnemonic: monic,
    };
    return account;
  } catch (error) {
    throw '错误' + error;
  }
}

export function recoverAccountToPrivateKey(privateKey: string) {
  try {
    let wallet = new ethers.Wallet(privateKey);
    let account = {
      id: genId(),
      privateKey,
      address: wallet.address,
    };
    return account;
  } catch (error) {
    throw '错误' + error;
  }
}
