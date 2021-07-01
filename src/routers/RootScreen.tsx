import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'reducers/dataStateReducer';
// getAccountList
import walletAction from 'actions/wallet'
import * as helper from "apis/helper"
import DeviceInfo from 'react-native-device-info';
import {enableMapSet,produce} from "immer";
import { CHAINS } from 'config/constants';
import { Account } from 'actions/types';
import { getAccountList } from 'reducers/walletStateReducer';
enableMapSet()

function RootScreen() {
  const dispatch = useDispatch();
  const accountlist = useSelector(getAccountList);
  const token = useSelector(getToken);
  
  React.useEffect(() => {
    findToken();
    SplashScreen.hide();
  }, []);
  async function findToken() {
    if (!token) {
      const params = {
        device_id: DeviceInfo.getUniqueId(),
        mobile_model: DeviceInfo.getModel(),
        mobile_type: DeviceInfo.getSystemName(),
        sys_version: DeviceInfo.getSystemVersion()
      };
      await helper.post('/sys/device_authorization', params).then((res: any) => {
        let data = res.data;
        if (data) {
          dispatch(walletAction.setToken(data.token))
        }
      })
    }
  }
  return (
    <NavigationContainer ref={navigationRef}>
      {accountlist.size > 0 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
