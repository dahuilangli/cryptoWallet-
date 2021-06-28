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


export const getUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export const getSelectorToken = createSelector(
  selectDataState,
  (dataState) => dataState.token,
);

export const getAccountList = createSelector(
  selectDataState,
  (dataState) => dataState.accountList,
);

const reducer =  (originalState = initialState, walletAction: WalletAction) =>
  produce(originalState,  (state) => {
    switch (walletAction.type) {
      case 'setUser':
        return;
      case 'setAccountList':
        state.accountList?.push(walletAction.payload);
        return;
      case 'getHelp':
          console.log(walletAction.payload);
        return;
      case 'GET_TOKEN_SUCCESS':
       state.token = walletAction.payload;
      case 'GET_TOKEN_ERROR':
      default:
          return;
    }
  });
export default reducer;