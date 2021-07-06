import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { getToken ,getLanguage} from 'reducers/dataStateReducer';
import { getAccountList } from 'reducers/walletStateReducer';
import i18n from "i18n";
// getAccountList
import walletAction from 'actions/wallet'
import * as helper from "apis/helper"
import DeviceInfo from 'react-native-device-info';

function RootScreen() {
  const dispatch = useDispatch();
  const accountList = useSelector(getAccountList);
  const CurrentLanguage = useSelector(getLanguage);
  const token = useSelector(getToken);
  console.log('========accountList=================');
  console.log(accountList);
  console.log('====================================');
  
  React.useEffect(() => {
    findToken();
    i18n.changeLanguage(CurrentLanguage);
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
      {accountList.size > 0 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
