import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from 'reducers';
import {createStore,applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import axiosMiddleware from 'redux-axios-middleware';
import {sagas} from 'sagas';
import {client} from "apis";
import thunkMiddleware from "redux-thunk";

const sagaMiddleware = createSagaMiddleware()



const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['dataState'],
  },
  rootReducer,
);

export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware,axiosMiddleware(client),sagaMiddleware,logger)));

sagaMiddleware.run(sagas);
export const persistor = persistStore(ReduxStore)
