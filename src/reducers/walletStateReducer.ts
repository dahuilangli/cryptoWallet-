import produce from 'immer';
import { User,  WalletAction, Account, ReduxState } from 'actions/types';
import { createSelector } from 'reselect';
// import {WalletAction} from 'actions/types';

export interface walletState {
  accountList: Map<string,Array<Account>>
}
export const initialState: Readonly<walletState> = {
  accountList : new Map<string,Array<Account>>()
}

export const selectDataState = (reduxState: ReduxState) => reduxState.walletState;

export const getAccountList = createSelector(
  selectDataState,
  (dataState) =>  {
    return dataState.accountList  }
);
export default (origin = {
  accountList : new Map<string,Array<Account>>()
}, walletAction: WalletAction) =>
  // console.log(typeof(origin));
  // console.log(origin.accountList instanceof Map);
  // if(origin.accountList instanceof Map == false){
  //   origin.accountList =  new Map<string,Array<Account>>()
  // }
 produce(origin, state => {
    switch (walletAction.type) {
      case 'createAccount':
        state.accountList.set(walletAction.payload.type,[walletAction.payload])
        console.log(state);
        // if(state.accountList.has(walletAction.payload.type)){
        //   const accounts = state.accountList.get(walletAction.payload.type);
        //   const finded = accounts?.findIndex((value,index,arr)=>{
        //     return value.address == walletAction.payload.address
        //   })
        //   if(finded == -1 || finded == undefined){
        //     accounts?.push(walletAction.payload);
        //   }
        // }else{
        //   state.accountList.set(walletAction.payload.type,[walletAction.payload])
        // }
        return state;
      default:
         return;
    }
  })
;
