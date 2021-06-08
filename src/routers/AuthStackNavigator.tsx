import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import CreateWalletScreen from 'screens/CreateWalletScreen';
import SelectWalletScreen from 'screens/SelectWalletScreen';
import React from 'react';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SelectWalletScreen: undefined;
  CreateWalletScreen: { title: string };
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
        name="CreateWalletScreen"
        component={CreateWalletScreen}
        options={({ route }) => ({
          title: `创建${route.params.title}钱包`,
        })}
      />
    </Navigator>
  );
}
