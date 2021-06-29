import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import {GET_TOKEN} from "actions/wallet"
import { getAccountList } from 'reducers/dataStateReducer';
import { clearAll } from 'helper/test';

function RootScreen() {
  const dispatch = useDispatch();
  const accountlist = useSelector(getAccountList);

  React.useEffect(() => {
    SplashScreen.hide();
    dispatch(GET_TOKEN());
  },[]);
  console.log(accountlist)
  return (
    <NavigationContainer ref={navigationRef}>
      {accountlist.length > 5 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
