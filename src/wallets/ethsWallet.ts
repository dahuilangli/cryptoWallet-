// Import the ethers library
import { ethers } from 'ethers';
import { Account } from "actions/types";

interface Wallet {
  address: string,
  privateKey: string,
}
//1010 ht
interface Coin {
  name: string;
  type: number;
}
export function getPath(type: any) {
  let coinType = 60;
  if (type == 'eth') {
    coinType = 60;
  } else if (type == 'ht') {
    coinType = 1010;
  } else if (type == 'bnb') {
    coinType = 714;
  }

  const path = "m/40'/{coinType}'/0'/0/0";

  return path;
}
export function genWallet() {
  let mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16))
  var wallet = ethers.utils.HDNode.fromMnemonic(mnemonic);
  const account = {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase,
    seed: ethers.utils.mnemonicToSeed(mnemonic)
  }
  return account;

}
export function importByMnemonic(mnemonic: string) {
  if (!ethers.utils.isValidMnemonic(mnemonic)) {
    throw "助记词错误"
  }
  let wallet = ethers.Wallet.fromMnemonic(mnemonic);
  let account = {
    privateKey: wallet.privateKey,
    address: wallet.address,
    mnemonic: mnemonic,
  };
  
  return account;

}
export function importByprivateKey(privateKey: any) {

  // let privateKey = ethers.utils.randomBytes(32);
  let wallet = new ethers.Wallet(privateKey);
  let account = {
    privateKey: privateKey,
    address: wallet.address,
  };
  
  return account;

}

export function transform() {
  var provider = ethers.getDefaultProvider("ropsten");

  let privateKey = ethers.utils.randomBytes(32);

  let wallet = new ethers.Wallet(privateKey);
  var activeWallet = wallet.connect(provider);

  activeWallet.sendTransaction({
    to: "xxx",
    value: "xxx",

  }).then(function (tx) {
    console.log(tx);
  });
}
// 乘法函数，用来得到精确的乘法结果
/**
 * javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * @param arg1 乘数1
 * @param arg2 乘数2
 * @returns arg1乘以arg2的精确结果
 */
export function Mul(arg1: any, arg2: any) {
  arg1 = parseFloat(arg1)
  arg2 = parseFloat(arg2)
  let m = 0

  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
    // console.log(e)
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
    // console.log(e)
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
};
// 除法函数，用来得到精确的除法结果
/**
 * javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * @param arg1 除数
 * @param arg2 被除数
 * @returns arg1除以arg2的精确结果
 */
export function Div(arg1: any, arg2: any) {
  arg1 = parseFloat(arg1)
  arg2 = parseFloat(arg2)
  let t1 = 0
  let t2 = 0
  let r1
  let r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {
    // console.log(e)
  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {
    // console.log(e)
  }
  // eslint-disable-next-line prefer-const
  r1 = Number(arg1.toString().replace('.', ''))
  // eslint-disable-next-line prefer-const
  r2 = Number(arg2.toString().replace('.', ''))
  return Mul(r1 / r2, Math.pow(10, t2 - t1))
};
// 加法函数，用来得到精确的加法结果
/**
 * javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * @param arg1 
 * @param arg2 
 * @returns arg1加上arg2的精确结果
 */
export function Add(arg1: any, arg2: any) {
  arg2 = parseFloat(arg2)
  let r1, r2
  let m = null
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(100, Math.max(r1, r2))
  return (Mul(arg1, m) + Mul(arg2, m)) / m
};

// 减法函数，用来得到精确的减法结果
/**
 * javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
 * @export
 * @param {*} arg1
 * @param {*} arg2
 * @return {*} 
 */
export function Sub(arg1: any, arg2: any) {
  arg1 = parseFloat(arg1)
  arg2 = parseFloat(arg2)
  var r1, r2, s, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  s = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((Mul(arg1, s) - Mul(arg2, s)) / s).toFixed(n)
}


export function transaction(privateKey: string, nonce: any, gasLimit: number, gasPrice: string, to: any, value: any) {

  return new Promise((resolve, reject) => {
    let wallet = new ethers.Wallet(privateKey);
    let transaction = {
      nonce: ethers.BigNumber.from(nonce),
      gasLimit: gasLimit,
      gasPrice: ethers.BigNumber.from(gasPrice),
      to: to,
      value: ethers.utils.parseEther(value),
    };
    wallet.signTransaction(transaction).then(signedTransaction => {
      resolve(signedTransaction)
      // 现在可以将其发送到以太坊网络
      // let provider = ethers.getDefaultProvider()
      // provider.sendTransaction(signedTransaction).then((tx) => {
      //   resolve(tx)
      // })
      //   .catch(e => {
      //     reject(e)
      //   });
    }).catch(e => {
      reject(e)
    })
  })
}
  export function contractTrans(privateKey: string, nonce: any, gasLimit: number, gasPrice: string, contract: any,to:any, value: any){
    return new Promise((resolve, reject) => {
      let wallet = new ethers.Wallet(privateKey);
      let transaction = {
        nonce: ethers.BigNumber.from(nonce),
        gasLimit: gasLimit,
        gasPrice: ethers.BigNumber.from(gasPrice),
        to: contract,
        value: 0,
        data: "0xa9059cbb"+to?.replace("0x","")?.padStart(64,"0")+ethers.utils.hexValue(value)?.replace("0x","")?.padStart(64,"0")
      };
      console.log('====================================');
      console.log(transaction);
      console.log('====================================');
      wallet.signTransaction(transaction).then(signedTransaction => {
        resolve(signedTransaction)
      
      }).catch(e => {
        reject(e)
      })
    
  })
}

