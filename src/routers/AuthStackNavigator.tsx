import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import SelectWalletScreen from 'screens/SelectWalletScreen';
import SetWalletNameScreen from 'screens/CreateWallet/SetWalletNameScreen';
import SetWalletPwdScreen from 'screens/CreateWallet/SetWalletPwdScreen';
import SafetyTipsScreen from 'screens/CreateWallet/SafetyTipsScreen';
import BackupMnemonicScreen from 'screens/CreateWallet/BackupMnemonicScreen';
import VerifyMnemonicScreen from 'screens/CreateWallet/VerifyMnemonicScreen';
import SuccessScreen from 'screens/SuccessScreen';

import React from 'react';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SuccessScreen: { title: string };
  SelectWalletScreen: undefined;
  SetWalletNameScreen: undefined;
  SetWalletPwdScreen: undefined;
  SafetyTipsScreen: undefined;
  BackupMnemonicScreen: undefined;
  VerifyMnemonicScreen: { mnemonic: string[] };
  CreateWalletSuccessScreen: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Navigator screenOptions={{ headerBackTitle: '返回' }}>
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
      <Screen
        name="BackupMnemonicScreen"
        component={BackupMnemonicScreen}
        options={{ title: '备份助记词' }}
      />
      <Screen
        name="VerifyMnemonicScreen"
        component={VerifyMnemonicScreen}
        options={{ title: '验证助记词' }}
      />
      <Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}
