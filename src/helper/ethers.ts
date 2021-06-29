// Import the ethers library
import { ethers } from 'ethers';
import {Account} from "actions/types";

interface Wallet {
  address:  string,
  privateKey: string,
}

export function genWallet(){
    let mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16))
    var wallet =  ethers.utils.HDNode.fromMnemonic(mnemonic);
    const  account = {
      address: wallet.address,
      privateKey: wallet.privateKey,
    }
    return account;
 
}
export function importByMnemonic(mnemonic: string){
    if (!ethers.utils.isValidMnemonic(mnemonic)) {
      return <Account>{}
    }
    let wallet = ethers.Wallet.fromMnemonic(mnemonic);
    let account = {
      privateKey: wallet.privateKey,
      address: wallet.address,
      mnemonic: mnemonic,
    };
    return account;
 
}
export function importByprivateKey(privateKey: any){

    // let privateKey = ethers.utils.randomBytes(32);
    let wallet = new ethers.Wallet(privateKey);
    let account = {
      privateKey:ethers.utils.isHexString(privateKey),
      address: wallet.address,
    };
    return account;
  
}
export function backupMnemonic(){


}
