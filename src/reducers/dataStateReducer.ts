import produce from 'immer';
import { createSelector } from 'reselect';
import { User, Account, WalletAction, ReduxState } from 'actions/types';


export interface DataState {
  user?: User;
  accountList: Array<Account>;
  token: string;
  dappSearchList: Array<any>;
}
export const initialState: Readonly<DataState> = {
  token: '',
  accountList: [],
  dappSearchList: []
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

export const getSelectorToken = createSelector(
  selectDataState,
  (dataState) => dataState.token,
);

export const getDappSearchList = createSelector(
  selectDataState,
  (dataState) => dataState.dappSearchList,
);

const reducer = (originalState = initialState, walletAction: WalletAction) =>
  produce(originalState, (state) => {
    switch (walletAction.type) {
      case 'setUser':
        return;
      case 'setAccountList':
        state.accountList?.push(walletAction.payload);
        return;
      case 'setDappSearchList':
        state.dappSearchList?.push(walletAction.payload);
        console.log('===========setDappSearchList==============');
        console.log(state);
        console.log('====================================');
        return;
      case 'getHelp':
        console.log(walletAction.payload);
        return;
      case 'GET_TOKEN_SUCCESS':
        state.token = walletAction.payload;
        return;
      case 'GET_TOKEN_ERROR':
      default:
        return;
    }
  });
export default reducer;
