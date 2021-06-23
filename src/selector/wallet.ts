import { createSelector } from 'reselect';
import { ReduxState } from 'actions/types';

export const selectDataState = (reduxState: ReduxState) => reduxState.dataState;

export const getUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export const getToken = createSelector(
  selectDataState,
  (dataState) => dataState.token,
);

export const getAccountList = createSelector(
  selectDataState,
  (dataState) => dataState.accountList,
);
