import { produce } from 'immer';
import { createSelector } from 'reselect';
import { User, WalletAction, ReduxState, DappRecentItem, AddressBookItem, Account } from 'actions/types';

export interface DataState {
  user?: object;
  token: string;
  dappSearchList: Array<DappRecentItem>;
  addressBookList: Array<AddressBookItem>;
  language: string;
  currency: string;
}
export const initialState: Readonly<DataState> = {
  user: {},
  token: '',
  dappSearchList: [],
  addressBookList: [],
  language: 'en',
  currency: 'CNY',
};

export const selectDataState = (reduxState: ReduxState) => reduxState.dataState;

export const getUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export const getToken = createSelector(
  selectDataState,
  (dataState) => dataState.token,
);

export const getLanguage = createSelector(
  selectDataState,
  (dataState) => dataState.language,
);

export const getCurrency = createSelector(
  selectDataState,
  (dataState) => dataState.currency,
);

export const getDappSearchList = createSelector(
  selectDataState,
  (dataState) => dataState.dappSearchList,
);

export const getAddressBookList = createSelector(
  selectDataState,
  (dataState) => dataState.addressBookList,
);

const reducer = (originalState = initialState, walletAction: WalletAction) =>
  produce(originalState, state => {
    switch (walletAction.type) {
      case 'setUser':
        state.user = walletAction.payload;
        return;
      case 'setToken':
        state.token = walletAction.payload;
        return;
      case 'setLanguage':
        state.language = walletAction.payload;
        return;
      case 'setLanguage':
        state.language = walletAction.payload;
        return;
      case 'setCurrency':
        state.currency = walletAction.payload;
        return;
      case 'setDappSearchList':
        let payload = walletAction.payload;
        let list = state.dappSearchList;
        if (list.length > 0) {
          list.map((x, i) => {
            if (x.deep_link === payload.deep_link) {
              list.splice(i, 1);
            }
          })
          list.unshift(payload);
        } else {
          list.unshift(payload);
        }
        return;
      case 'setAddressBookList':
        let payload1 = walletAction.payload;
        let list1 = state.addressBookList;
        if (list1.length > 0) {
          list1.map((x, i) => {
            if (x.walletaddress === payload1.walletaddress) {
              list1.splice(i, 1);
            }
          })
          list1.unshift(payload1);
        } else {
          list1.unshift(payload1);
        }
        return;
      case 'deleteAddressBookList':
        let payload2 = walletAction.payload;
        let list2 = state.addressBookList;
        list2.map((x, i) => {
          if (x.walletaddress === payload2.walletaddress) {
            list2.splice(i, 1)
          }
        })
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
