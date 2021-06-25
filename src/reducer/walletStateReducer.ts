import produce from 'immer';

import {WalletAction} from 'actions/types';

export interface SettingsState {}
export const initialState: Readonly<SettingsState> = {};

export default (originalState = initialState, action: WalletAction) =>
  produce(originalState, state => {
    switch (action.type) {
    }
  });
