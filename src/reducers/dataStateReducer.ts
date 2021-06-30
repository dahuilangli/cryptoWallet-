import {produce} from 'immer';
import { createSelector } from 'reselect';
import { User,  WalletAction, ReduxState, DappRecentItem,AddressBookItem, Account } from 'actions/types';
import { CHAINS } from 'config/constants';



export interface DataState {
  user?: User;
  token: string;
  dappSearchList: Array<DappRecentItem>;
  addressBookList: Array<AddressBookItem>;
  language: string,
}
export const initialState: Readonly<DataState> = {
  token: '',
  dappSearchList: [],
  addressBookList: [],
  language: 'en',
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

export const getLanguage = createSelector(
  selectDataState,
  (dataState) => dataState.language,
);

export const getDappSearchList = createSelector(
  selectDataState,
  (dataState) => dataState.dappSearchList,
);

const reducer = (originalState = initialState, walletAction: WalletAction) =>
  produce(originalState, state => {
    switch (walletAction.type) {
      case 'setUser':
        return;
      
      case 'setLanguage':
        state.language = walletAction.payload;
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
        console.log('11111111111111');
        console.log(payload1);
        
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
