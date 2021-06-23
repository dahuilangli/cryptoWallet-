import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import SelectWalletScreen from 'screens/SelectWalletScreen';
import SetWalletNameScreen from 'screens/CreateWalletScreen/SetWalletNameScreen';
import SetWalletPwdScreen from 'screens/CreateWalletScreen/SetWalletPwdScreen';
import SafetyTipsScreen from 'screens/CreateWalletScreen/SafetyTipsScreen';
import BackupMnemonicScreen from 'screens/CreateWalletScreen/BackupMnemonicScreen';
import VerifyMnemonicScreen from 'screens/CreateWalletScreen/VerifyMnemonicScreen';
import ImportPrivateKeyScreen from 'screens/CreateWalletScreen/ImportPrivateKeyScreen';
import ImportMnemonicScreen from 'screens/CreateWalletScreen/ImportMnemonicScreen';
import SuccessScreen from 'screens/SuccessScreen';
import CameraScreen from 'components/Camera';

import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { navigate } from 'utils/navigationService';

export type AuthStackParamList = {
  CameraScreen: undefined;
  LoginScreen: undefined;
  SuccessScreen: { title: string; accountInfo: object };
  SelectWalletScreen: { loginType: string };
  SetWalletNameScreen: { type: string; loginType?: string; desc?: string };
  SetWalletPwdScreen: { accountInfo: object; loginType?: string };
  SafetyTipsScreen: { accountInfo: object };
  BackupMnemonicScreen: { accountInfo: object };
  VerifyMnemonicScreen: { accountInfo: object };
  ImportPrivateKeyScreen: { type: string; loginType: string };
  ImportMnemonicScreen: { type: string; loginType: string };
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3D73DD' },
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
        headerBackImage: () => (
          <Image source={require('../../assets/icon-24-返回-light.png')} />
        ),
        headerLeftContainerStyle: { marginLeft: 20 },
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
        name="ImportPrivateKeyScreen"
        component={ImportPrivateKeyScreen}
        options={{
          title: '私钥导入',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate('CameraScreen')}>
              <Image source={require('assets/icon-24-扫一扫-light.png')} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: { marginEnd: 20 },
        }}
      />
      <Screen
        name="ImportMnemonicScreen"
        component={ImportMnemonicScreen}
        options={{ title: '助记词导入' }}
      />
      <Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: undefined }}
      />
    </Navigator>
  );
}
