import produce from 'immer';
import { User, Account,WalletAction } from 'actions/types';

export interface DataState {
  user?: User;
  accountList: Array<Account>;
  token: string;
}
export const initialState: Readonly<DataState> = {
  token: '',
  accountList: [],
};

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
    }
  });
