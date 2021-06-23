import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from '../reducers';
import {createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['dataState'],
  },
  rootReducer,
);
export  const ReduxStore = createStore(persistedReducer, devToolsEnhancer({}));
export const persistor = persistStore(ReduxStore)
