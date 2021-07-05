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
  setDappSearchList: createAction<DappRecentItem>(),
  setAddressBookList: createAction<AddressBookItem>(),
  deleteAddressBookList: createAction<AddressBookItem>(),
  setLanguage: StringAction,
  setShowMoney: createAction<boolean>(),
  setCurrency: StringAction,
  setLocation: createAction<Location>(),
  // 添加账户币种
  setContracts: createAction<{address: string | undefined, tokne: string, type: string | ''}>(),
  getAccountList: NoArgAction,
  getUser: NoArgAction,
  getToken: NoArgAction,
  getHelp: NoArgAction,
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


