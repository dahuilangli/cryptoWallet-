// Import the ethers library
import { ethers } from 'ethers';
import {Account} from "actions/types";

interface Wallet {
  address:  string,
  privateKey: string,
}
//1010 ht
interface Coin {
  name: string;
  type: number; 
}
export function getPath(type: any){
  let coinType = 60;
  if(type == 'eth'){
    coinType = 60;
  }else if( type == 'ht'){
    coinType = 1010;
  }else if( type == 'bnb'){
    coinType = 714;
  }

  const path = "m/40'/{coinType}'/0'/0/0";

  return path;
}
export function genWallet(){
    let mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16))
    var wallet =  ethers.utils.HDNode.fromMnemonic(mnemonic);
    const  account = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase,
      seed: ethers.utils.mnemonicToSeed(mnemonic)
    }
    console.log(account)
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

export function transform(){
  var provider =  ethers.getDefaultProvider("ropsten");

  let privateKey = ethers.utils.randomBytes(32);

  let wallet = new ethers.Wallet(privateKey);
  var activeWallet = wallet.connect(provider);

  activeWallet.sendTransaction({
    to:"xxx",
    value: "xxx",

  }).then(function(tx) {
            console.log(tx);
        });
}
