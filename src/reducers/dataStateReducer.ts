import produce from 'immer';
import { createSelector } from 'reselect';
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


export default (originalState = initialState, walletAction: WalletAction) =>
  produce(originalState, (state) => {
    switch (walletAction.type) {
      case 'setUser':
        state.user = walletAction.payload;
        state.token = walletAction.payload.token;
        return;
      case 'setAccountList':
        state.accountList?.push(walletAction.payload);
        return;
      case 'getUser':
          return state.user;
    case "getAccountList":
        return state.accountList;
      case 'getToken':
          return state.accountList;
      default:
          return;
    }
  });
