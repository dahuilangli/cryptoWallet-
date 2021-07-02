export { Dispatch } from 'redux';
import { DataState } from 'reducers/dataStateReducer';
import { SettingsState } from 'reducers/settingsStateReducer';
import { UIState } from 'reducers/uiStateReducer';
export { UIState, DataState, SettingsState };
import {ActionValue} from 'redux-type-actions';

import { MainStackParamList } from 'routers/MainStackNavigator';
import { TabParamList } from 'routers/TabNavigator';
import { AuthStackParamList } from 'routers/AuthStackNavigator';
import walletAction from './wallet';
import {ethers} from 'ethers';
import { getType } from 'react-native-device-info';
import { walletState } from 'reducers/walletStateReducer';

export type ScreensParamList = MainStackParamList &
  TabParamList &
  AuthStackParamList;

export interface Account {
  address: string;
  mnemonic?: ethers.utils.Mnemonic;
  privateKey: string;
  securityCode?: string;
  walletName?: string;
  password?:string;
  type:string;
  coinInfo: object
}

export interface DappRecentItem {
  category?: string,
  defi?: string,
  deep_link: string,
  logo?: string,
  name: string,
  protocol?: string,
}

export interface AddressBookItem {
  add_type: string,
  add_name: string,
  remarks?: string,
  logo: any,
  walletaddress: string,
}

export interface Token {
  id: string;
  address: string;
  mnemonic?: string;
  privateKey: string;
  securityCode?: string;
  walletName?: string;
}


interface WithTimeStamp {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ReduxState {
  uiState: UIState;
  dataState: DataState;
  settingsState: SettingsState;
  walletState: walletState;
}

export interface User extends WithTimeStamp {
  token: string;
  expirationTime: Number;
}

export interface FeedLike extends WithTimeStamp {
  id: number;
  userId: number;
}

export interface Feed extends WithTimeStamp {
  id: string;
  images?: number[];
  desc?: string;
  feedLikes?: FeedLike[];
  user: User;
}

export interface Location {
  lat: number;
  lon: number;
}

export interface MapLocation extends Location {
  latDelta: number;
  lonDelta: number;
}

export interface ReportResult {
  name: string;
  score: number;
  baike_info: {
    baike_url?: string;
    image_url?: string;
    description?: string;
  };
  user?: User;
}

export type ReportType = 'plant';

export type WalletAction = ActionValue<typeof walletAction>;

export interface Report extends WithTimeStamp {
  id: string;
  image: number;
  desc: string;
  extra?: ReportResult;
  user: User;
  type: ReportType;
  lat: number;
  lon: number;
}
