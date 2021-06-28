// Import the ethers library
import { ethers } from 'ethers';
import {Account} from "actions/types";

interface Wallet {
  address:  string,
  privateKey: string,
}

export function genWallet(){
  try{
    var privateKey = ethers.utils.randomBytes(32);
    var wallet = new ethers.Wallet(privateKey);
  console.log(wallet.mnemonic.phrase);
    const  account = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    }
    return account;
  }catch(error){
    console.log(error);
    return <Account>{};
  }
}
export function importByMnemonic(mnemonic: string){
  try {
    let mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    let account = {
      privateKey: wallet.privateKey,
      address: wallet.address,
      mnemonic: mnemonic,
    };
    console.log(account)
    return account;
  } catch (error) {
    console.log(error);
    return <Account>{};
  }
}
// export function importByMnemonic(){
//   try {
//     let seed = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
//     console.log(seed)
//     console.log(3123213)
//     // var mnemonic = ethers.utils.HDNode.fromMnemonic(seed);
//     let mnemonic = ethers.Wallet.fromMnemonic(seed);
//     let account = {
//       privateKey: mnemonic.privateKey,
//       address: new ethers.Wallet(mnemonic.privateKey).address,
//       mnemonic: seed,
//     };
//     console.log(account)
//     return account;
//   } catch (error) {
//     console.log(error);
//     return <Account>{};
//   }
// }
export function importByprivateKey(privateKey: any){
  try {
    let privateKey = ethers.utils.randomBytes(32);
    let wallet = new ethers.Wallet(privateKey);
    let account = {
      privateKey:ethers.utils.isHexString(privateKey),
      address: wallet.address,
    };
    return account;
  } catch (error) {
    console.log(error);
    return <Account>{};
  }
}
export function backupMnemonic(){


}
