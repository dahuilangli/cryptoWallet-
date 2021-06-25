import produce from 'immer';
import {WalletAction} from 'actions/types';
export interface UIState {}
export const initialState: Readonly<UIState> = {};

export default (originalState = initialState, action: WalletAction) =>
  produce(originalState, state => {
    switch (action.type) {
    }
  });
