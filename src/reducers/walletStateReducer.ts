import produce from 'immer';
import { thisUser,  WalletAction, Account, ReduxState } from 'actions/types';
import { createSelector } from 'reselect';
import { Map } from 'immutable';

export interface walletState {
  user: thisUser,
  accountList: Map<string,Array<Account>>
}
const initialState: Readonly<walletState> = {
  accountList : Map({}),
  user: {
    address: '',
    type: ''
  }
}

export const selectDataState = (reduxState: ReduxState) => reduxState.walletState;

export const getAccountList = createSelector(
  selectDataState,
  (dataState) =>  {
    return dataState.accountList
  }
);

export const getUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export default (origin = initialState, walletAction: WalletAction) =>{
 return produce(origin, state => {
    switch (walletAction.type) {
      case 'createAccount':
        try {
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
        } catch (error) {
          console.log('========error===================');
          console.log(error);
          console.log('====================================');
        }
        
        return;
      case 'createUser':
        state.user = walletAction.payload;
        return;
      case 'setContracts':
        let payload = walletAction.payload;
        state.accountList.get(payload.type)?.find(x => x.address === payload.address)?.contracts.push(payload.tokne)
        return;
      case 'setWalletName':
        let payload1 = walletAction.payload;
        const WALLETName = state.accountList.get(payload1.type)?.find(x => x.address === payload1.address)
        var walletnameObject = Object(WALLETName)
        walletnameObject.walletName = payload1.walletName;
        
        return;
      case 'setPassWord':
        console.log(walletAction.payload);
        let payload2 = walletAction.payload;
        const WALLETName1  = state.accountList.get(payload2.type)?.find(x => x.address === payload2.address);
        var walletnameObject = Object(WALLETName1)
        walletnameObject.securityCode=payload2.securityCode;
        return;
      default:
        return
    }
  })
};
