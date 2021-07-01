import AsyncStorage from '@react-native-community/async-storage';
import {rootReducer} from 'reducers';
import {createStore,applyMiddleware } from 'redux';
import { persistReducer, persistStore,createTransform } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {sagas} from 'sagas';
import thunkMiddleware from "redux-thunk";
import { Account } from 'actions/types';
import { walletState } from 'reducers/walletStateReducer';

const sagaMiddleware = createSagaMiddleware()


const SetTransform = createTransform(
  (inboundState: walletState, key) => {
    return { ...inboundState, accountList: new Map(inboundState.accountList) };
  },
  (outboundState: any, key) => {
    return { ...outboundState, accountList: new Map(outboundState.accountList) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['walletReducer'] }
);
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    transforms: [SetTransform],
  },
  rootReducer,
);

// export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware,sagaMiddleware,logger)));
export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware,sagaMiddleware)));

sagaMiddleware.run(sagas);
export const persistor = persistStore(ReduxStore)
