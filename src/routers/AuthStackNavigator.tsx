import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import SelectWalletScreen from 'screens/SelectWalletScreen';
import SetWalletNameScreen from 'screens/CreateWalletScreen/SetWalletNameScreen';
import SetWalletPwdScreen from 'screens/CreateWalletScreen/SetWalletPwdScreen';
import SafetyTipsScreen from 'screens/CreateWalletScreen/SafetyTipsScreen';
import BackupMnemonicScreen from 'screens/CreateWalletScreen/BackupMnemonicScreen';
import VerifyMnemonicScreen from 'screens/CreateWalletScreen/VerifyMnemonicScreen';
import ScanQRCode from 'components/ScanQRCode';
import ImportPrivateKeyScreen from 'screens/CreateWalletScreen/ImportPrivateKeyScreen';
import ImportMnemonicScreen from 'screens/CreateWalletScreen/ImportMnemonicScreen';
import SuccessScreen from 'screens/SuccessScreen';
import { useTranslation } from 'react-i18next';
import { Image, Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { navigate } from 'components/navigationService';
import { AssetsList } from 'actions/types';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SuccessScreen: { title: string | undefined; accountInfo: object };
  SelectWalletScreen: {loginType: string};
  SetWalletNameScreen: { type: string; loginType?: string; coinInfo: object, desc?: string ,importWord?:object};
  SetWalletPwdScreen: { loginType?: string, desc?: string, accountInfo: object ,importWord?:object};
  SafetyTipsScreen: { accountInfo: object };
  BackupMnemonicScreen: { accountInfo: object };
  VerifyMnemonicScreen: { accountInfo: object };
  ImportPrivateKeyScreen: { type: string; coinInfo: object };
  ImportMnemonicScreen: { type: string; loginType: string, coinInfo: object };


  ScanQRCode: { title?: string, assetsList?: Array<AssetsList> };
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  const { t } = useTranslation();
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3D73DD', height: 88 },
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
        headerBackAllowFontScaling: true,
        headerTitleAlign: "center",
        headerBackImage: () => (
          <Image source={require('assets/icon_back_light.png')} />
        ),
        headerLeftContainerStyle: { paddingLeft: Platform.OS === 'ios' ? 20 : 10 },
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
        options={{ title: t('choosewallet') }}
      />
      <Screen
        name="SetWalletNameScreen"
        component={SetWalletNameScreen}
        options={{ title: t("setwalletname") }}
      />
      <Screen
        name="SetWalletPwdScreen"
        component={SetWalletPwdScreen}
        options={{ title: t("setsecurepassword") }}
      />
      <Screen
        name="SafetyTipsScreen"
        component={SafetyTipsScreen}
        options={{ title: t("Safetytips") }}
      />
      <Screen
        name="BackupMnemonicScreen"
        component={BackupMnemonicScreen}
        options={{ title: t("Backupmnemonic") }}
      />
      <Screen
        name="VerifyMnemonicScreen"
        component={VerifyMnemonicScreen}
        options={{ title: t("Verificationmnemonic") }}
      />
      <Screen
        name="ImportPrivateKeyScreen"
        component={ImportPrivateKeyScreen}
        options={{
          title: t("import"),
          // headerRight: () => (
          //   <TouchableOpacity onPress={() => navigate('ScanQRCode')}>
          //     <Image source={require('assets/icon_sacn_light.png')} />
          //   </TouchableOpacity>
          // ),
          // headerRightContainerStyle: { marginEnd: 20 },
        }}
      />
      <Screen
        name="ImportMnemonicScreen"
        component={ImportMnemonicScreen}
        options={{ title: t("mnemonicimport") }}
      />
      <Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />

      <Screen
        name="ScanQRCode"
        component={ScanQRCode}
        options={{ title: t("Scan") }}
      />
    </Navigator>
  );
}
