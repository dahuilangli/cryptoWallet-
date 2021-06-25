import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from '../reducer';
import {createStore,applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {sagas} from 'sagas';

const sagaMiddleware = createSagaMiddleware()


const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['dataState'],
  },
  rootReducer,
);

export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware,logger)));

sagaMiddleware.run(sagas);
export const persistor = persistStore(ReduxStore)
