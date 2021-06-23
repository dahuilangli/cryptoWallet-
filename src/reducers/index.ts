import dataStateReducer from './dataStateReducer';
import AsyncStorage from '@react-native-community/async-storage';
import settingsStateReducer from './settingsStateReducer';
import uiStateReducer from './uiStateReducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';


export const rootReducer = combineReducers({
        uiState: uiStateReducer,
        dataState: persistReducer(
          {
            key: 'root',
            storage: AsyncStorage,
            blacklist: ['location', 'mapLocation'],
          },
          dataStateReducer,
        ),
        settingsState: settingsStateReducer,
      });
   
