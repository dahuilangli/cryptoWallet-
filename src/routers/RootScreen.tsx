import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import apis from 'apis';
import { User } from 'actions/types';
import wallet from 'actions/wallet';

function RootScreen() {
  const dispatch = useDispatch();
  let user: User;

  
  // const accountList = useSelector(wallet.getAccountList);
  const accountList = dispatch(wallet.getAccountList());
  React.useEffect(() => {
    SplashScreen.hide();
    apis.common.getToken();
  });
  
  return (
    <NavigationContainer ref={navigationRef}>
      {accountList > 0 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
