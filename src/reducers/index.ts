import dataStateReducer from './dataStateReducer';
import walletReducer from './walletStateReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { createKeychainStorage } from 'redux-persist-keychain-storage';
import settingsStateReducer from './settingsStateReducer';
import uiStateReducer from './uiStateReducer';
import { combineReducers } from 'redux';
import { enableMapSet} from 'immer'
import { persistReducer } from 'redux-persist';
import { PersistorAction } from 'redux-persist';

enableMapSet()
export type DefaultPersistorAction = PersistorAction & {
  payload: any;
};
const keychainStorage = createKeychainStorage();

export const rootReducer = combineReducers({
  uiState: uiStateReducer,
  dataState: persistReducer(
    {
      key: 'data',
      storage: AsyncStorage,
    },
    dataStateReducer,
  ),
  walletState: persistReducer(
    {
      key: '@wallet',
      storage: AsyncStorage,
    },
    walletReducer,
  ),
  settingsState: settingsStateReducer,
});


