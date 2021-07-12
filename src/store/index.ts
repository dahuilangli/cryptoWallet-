import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from 'reducers';
import {createStore,applyMiddleware } from 'redux';
import { persistReducer, persistStore,createTransform } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
// import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
// import {sagas} from 'sagas';
import thunkMiddleware from "redux-thunk";
import { walletState } from 'reducers/walletStateReducer';

import { Map } from 'immutable';
import { Account } from 'actions/types';

// const sagaMiddleware = createSagaMiddleware()

// const MapTransform = createTransform(
//   (inboundState, key) => {
//     console.log(Array.from(inboundState.accountList))
//     return { ...inboundState, accountList: Array.from(inboundState.accountList) };
//   },
//   (outboundState, key) => {
//     console.log(Map(outboundState.accountList))
//     console.log(2222222222222222)
//     return { ...outboundState, accountList: Map(outboundState.accountList) };
//   },
//   { whitelist: ['walletState'] }
// );
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    // transforms: [MapTransform],
  },
  rootReducer,
);

// export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware,logger,sagaMiddleware)));
export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// sagaMiddleware.run(sagas);
export const persistor = persistStore(ReduxStore)
