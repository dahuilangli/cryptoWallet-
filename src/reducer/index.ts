import dataStateReducer from './dataStateReducer';
import walletReducer from './walletStateReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { createKeychainStorage } from 'redux-persist-keychain-storage';
import settingsStateReducer from './settingsStateReducer';
import uiStateReducer from './uiStateReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const keychainStorage = createKeychainStorage();

export const rootReducer = combineReducers({
        uiState: uiStateReducer,
        dataState: persistReducer(
          {
            key: 'wallet',
            storage: AsyncStorage,
            blacklist: ['location', 'mapLocation'],
          },
          dataStateReducer,
        ),
        walletState: persistReducer(
          {
            key: 'com.wallet.persist.',
            storage: keychainStorage,
            whitelist: ["tds"],
          },
          walletReducer,
        ),
        settingsState: settingsStateReducer,
      });
