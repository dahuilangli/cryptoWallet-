import produce from 'immer';
import { createSelector } from 'reselect';
import Wallet from "actions/wallet";
import  apis from 'apis';
import {createDraft, finishDraft} from "immer"
import { User, Account,WalletAction,ReduxState } from 'actions/types';

export interface DataState {
  user?: User;
  accountList: Array<Account>;
  token: string;
}
export const initialState: Readonly<DataState> = {
  token: '',
  accountList: [],
};

export const selectDataState = (reduxState: ReduxState) => reduxState.dataState;


export const getUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export const getAccountList = createSelector(
  selectDataState,
  (dataState) => dataState.accountList,
);

const  draft  = createDraft(initialState)
const reducer =  (originalState = initialState, walletAction: WalletAction) =>
  produce(originalState,  (state) => {
    switch (walletAction.type) {
      case 'setUser':
        return;
      case 'setAccountList':
        state.accountList?.push(walletAction.payload);
        return;
      case 'GET_TOKEN_SUCCESS':
       state.token = walletAction.payload;
       console.log(state);
      case 'GET_TOKEN_ERROR':
       console.log(state);
      default:
          return;
    }
  });
export default reducer;