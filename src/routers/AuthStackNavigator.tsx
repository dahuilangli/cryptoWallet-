import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import SelectWalletScreen from 'screens/SelectWalletScreen';
import SetWalletNameScreen from 'screens/CreateWallet/SetWalletNameScreen';
import SetWalletPwdScreen from 'screens/CreateWallet/SetWalletPwdScreen';
import SafetyTipsScreen from 'screens/CreateWallet/SafetyTipsScreen';
import BackupMnemonicScreen from 'screens/CreateWallet/BackupMnemonicScreen';
import React from 'react';
import {Image} from 'react-native'

export type AuthStackParamList = {
  LoginScreen: undefined;
  SelectWalletScreen: undefined;
  SetWalletNameScreen: undefined;
  SetWalletPwdScreen: undefined;
  SafetyTipsScreen: undefined;
  BackupMnemonicScreen: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerStyle:{backgroundColor:'#3D73DD'},
        headerBackTitleVisible:false,
        headerTitleStyle:{fontSize:18,fontWeight:'bold',color:'white'},
        headerBackImage:()=><Image source={require('../../assets/icon-24-返回-light.png')}/>,
        headerLeftContainerStyle:{marginLeft:20,},
      }}
    >
      <Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
     <Screen
        name="SelectWalletScreen"
        component={SelectWalletScreen}
        options={{ title: '选择钱包' }}
      />
      <Screen
        name="SetWalletNameScreen"
        component={SetWalletNameScreen}
        // options={({ route }) => ({
        //   title: `创建${route.params.title}钱包`,
        // })}
        options={{ title: '设置钱包名' }}
      />
      <Screen
        name="SetWalletPwdScreen"
        component={SetWalletPwdScreen}
        options={{ title: '设置安全密码' }}
      />
      <Screen
        name="SafetyTipsScreen"
        component={SafetyTipsScreen}
        options={{ title: '安全提示' }}
      />
    </Navigator>
  );
}
