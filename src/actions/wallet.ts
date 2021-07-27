import {
  ActionValue,
  createAction,
  createActions,
  NoArgAction,
  StringAction
} from 'redux-type-actions';

import { Account, thisUser, Location, User, DappRecentItem, AddressBookItem } from 'actions/types';


import apis from 'apis';
const Wallet = createActions({
  setToken: StringAction,
  createUser: createAction<thisUser>(),
  createAccount: createAction<Account>(),
  deleteAccount: createAction<{address: string, type: string}>(),
  setDappSearchList: createAction<DappRecentItem>(),
  setAddressBookList: createAction<AddressBookItem>(),
  deleteAddressBookList: createAction<AddressBookItem>(),
  setLanguage: StringAction,
  setShowMoney: createAction<boolean>(),
  setShowRisk: createAction<boolean>(),
  setCurrency: StringAction,
  setLocation: createAction<Location>(),
  setWalletStatus: createAction<boolean>(),
  // 添加账户币种
  setContracts: createAction<{address: string | undefined, tokne: string, type: string | ''}>(),
  setWalletName:createAction<{address:string | undefined,walletName:string,type: string | ''}>(),
  setPassWord:createAction<{address:string | undefined,securityCode:string ,type: string | ''}>(),
  setChains: createAction<any>(),
  getAccountList: NoArgAction,
  getUser: NoArgAction,
  getToken: NoArgAction,
  getWalletStatus: NoArgAction,
  getHelp: NoArgAction,
  getShowRisk: NoArgAction,
  GET_TOKEN_SUCCESS: StringAction,
  GET_TOKEN_ERROR: NoArgAction,
});

// export const GET_TOKEN = ()=>async (dispath: any)=>{
//   // try{
//   apis.common.getToken().then(data =>{
//     console.log('==========GET_TOKEN===================');
//     console.log(data);
//     console.log('====================================');
//     if(data != null){
//       dispath(Wallet.GET_TOKEN_SUCCESS(data.token))}
//     }).catch(function(error) {
//       console.log(error);
//       dispath(Wallet.GET_TOKEN_ERROR());
//     });

// }
export const GETHELP = () => async (dispath: any) => {
  try {
    apis.common.help().then(data => {
      //  console.log(data)
    })
  } catch (error) {
    dispath(Wallet.GET_TOKEN_ERROR())
  }
}
export default Wallet;


