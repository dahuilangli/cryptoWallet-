import produce from 'immer';
import { thisUser,  WalletAction, Account, ReduxState } from 'actions/types';
import { createSelector } from 'reselect';
import { Map } from 'immutable';

export interface walletState {
  user: thisUser,
  ethaccountList: Array<Account>
  bscaccountList: Array<Account>
  htaccountList: Array<Account>
}
const initialState: Readonly<walletState> = {
  ethaccountList : [],
  bscaccountList : [],
  htaccountList : [],
  user: {
    address: '',
    type: ''
  }
}

export const selectDataState = (reduxState: ReduxState) => reduxState.walletState;

export const getAccountList = createSelector(
  selectDataState,
  (dataState) =>  {
    return Map({"ETH":dataState.ethaccountList,"BSC":dataState.bscaccountList,"HECO":dataState.htaccountList})
  }
);

export const getUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

const reducer = (origin = initialState, walletAction: WalletAction) =>{
 return produce(origin, state => {
    switch (walletAction.type) {
      case 'createAccount':
        try {
          if(walletAction.payload.type == "ETH"){
            const finded = state.ethaccountList.findIndex((value,index,arr)=>{
              return value.address == walletAction.payload.address
            })
            if(finded == -1 || finded == undefined){
              state.ethaccountList.push(walletAction.payload);
            }
          }else if(walletAction.payload.type == "BSC"){
            const finded = state.bscaccountList.findIndex((value,index,arr)=>{
            return value.address == walletAction.payload.address
            })
            if(finded == -1 || finded == undefined){
              state.bscaccountList.push(walletAction.payload);
            }
          }else if(walletAction.payload.type == "HECO"){
            const finded = state.htaccountList.findIndex((value,index,arr)=>{
              return value.address == walletAction.payload.address
              })
              if(finded == -1 || finded == undefined){
                state.htaccountList.push(walletAction.payload);
              }
          }
        } catch (error) {
          console.log('========error===================');
          console.log(error);
          console.log('====================================');
        }
        
        return;
      case 'createUser':
        state.user = walletAction.payload;
        console.log("2222222222222")
        console.log(walletAction.payload)
        return;
      case 'setContracts':
        let payload = walletAction.payload;
        if(walletAction.payload.type == "ETH"){
          state.ethaccountList.find(x => x.address === payload.address)?.contracts.push(payload.tokne)
        }else if(walletAction.payload.type == "BSC"){
          state.bscaccountList.find(x => x.address === payload.address)?.contracts.push(payload.tokne)
        }else if(walletAction.payload.type == "HT"){
          state.htaccountList.find(x => x.address === payload.address)?.contracts.push(payload.tokne)
        }
        return;
      case 'setWalletName':
        let payload1 = walletAction.payload;
        let WALLETName: any = [];
        if(walletAction.payload.type == "ETH"){
          WALLETName = state.ethaccountList.find(x => x.address === payload1.address)
        }else if(walletAction.payload.type == "BSC"){
          WALLETName = state.bscaccountList.find(x => x.address === payload1.address)
        }else if(walletAction.payload.type == "HT"){
          WALLETName = state.htaccountList.find(x => x.address === payload1.address)
        }
        var walletnameObject = Object(WALLETName)
        walletnameObject.walletName = payload1.walletName;
        
        return;
      case 'setPassWord':
        console.log(walletAction.payload);
        let payload2 = walletAction.payload;
        let WALLETName1: any = [];
        if(walletAction.payload.type == "ETH"){
          WALLETName = state.ethaccountList.find(x => x.address === payload2.address)
        }else if(walletAction.payload.type == "BSC"){
          WALLETName = state.bscaccountList.find(x => x.address === payload2.address)
        }else if(walletAction.payload.type == "HT"){
          WALLETName = state.htaccountList.find(x => x.address === payload2.address)
        }
        var walletnameObject = Object(WALLETName1)
        walletnameObject.securityCode=payload2.securityCode;
        return;
      default:
        return
    }
  })
};

export default reducer;