import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import apis from 'apis';
import { useSelector } from 'react-redux';
import { getAccountList } from 'reducers/dataStateReducer';

function RootScreen() {
  React.useEffect(() => {
    SplashScreen.hide();
    apis.common.getToken();
  });

  const accountlist = useSelector(getAccountList)
  return (
    <NavigationContainer ref={navigationRef}>
      {accountlist.length > 0 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
