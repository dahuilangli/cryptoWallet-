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


// const sagaMiddleware = createSagaMiddleware()

const MapTransform = createTransform(
  (inboundState: walletState, key:any) => {
    return { ...inboundState, accountList: Array.from(inboundState.accountList) };
  },
  (outboundState: any, key) => {
    return { ...outboundState, accountList: new Map(outboundState.accountList) };
  },
  { whitelist: ['walletState'] }
);
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    transforms: [MapTransform],
  },
  rootReducer,
);

// export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware,logger,sagaMiddleware)));
export  const ReduxStore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware,logger)));

// sagaMiddleware.run(sagas);
export const persistor = persistStore(ReduxStore)
