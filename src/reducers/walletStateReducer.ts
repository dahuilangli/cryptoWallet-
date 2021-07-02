import produce from 'immer';
import { User,  WalletAction, Account, ReduxState } from 'actions/types';
import { createSelector } from 'reselect';
import { Map } from 'immutable';

export interface walletState {
  accountList: Map<string,Array<Account>>
}
const initialState: Readonly<walletState> = {
  accountList : Map({})
}

export const selectDataState = (reduxState: ReduxState) => reduxState.walletState;

export const getAccountList = createSelector(
  selectDataState,
  (dataState) =>  {
    return dataState.accountList }
);
export default (origin = initialState, walletAction: WalletAction) =>{
 return produce(origin, state => {
    switch (walletAction.type) {
      case 'createAccount':
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
