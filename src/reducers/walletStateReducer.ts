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
  (dataState) =>  dataState.accountList
);
export default (origin=initialState, walletAction: WalletAction) =>{
 const copy: Readonly<walletState> = {
  accountList : new Map<string,Array<Account>>()
}
  return produce(copy, state => {
    switch (walletAction.type) {
      case 'createAccount':
        state.accountList.set(walletAction.payload.type,[walletAction.payload])
        console.log(state);
        if(state.accountList.has(walletAction.payload.type)){
          const accounts = state.accountList.get(walletAction.payload.type);
          const finded = accounts?.findIndex((value,index,arr)=>{
            return value.address == walletAction.payload.address
          })
          if(finded == -1 || finded == undefined){
            accounts?.push(walletAction.payload);
          }
        }else{
          state.accountList.set(walletAction.payload.type,[walletAction.payload])
        }
        return;
    }
  })
};
