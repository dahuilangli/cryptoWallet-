import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import {GET_TOKEN} from "actions/wallet"
import { getAccountList } from 'reducers/dataStateReducer';

function RootScreen() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    SplashScreen.hide();
    dispatch(GET_TOKEN());
  },[dispatch]);

  // const accountlist = useSelector(getAccountList)
  const accountlist:any = []
  console.log(accountlist);
  return (
    <NavigationContainer ref={navigationRef}>
      {accountlist.length > 0 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
