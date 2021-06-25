import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from 'screens/MineScreen/ProfileScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import FlashExchangeScreen from 'screens/FlashExchangeScreen/FlashExchangeScreen';
import DappScreen from 'screens/DappScreen/DappScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from "i18n";
export type TabParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  DappScreen: undefined;
  FlashExchangeScreen: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const routeName = route.name;
          let iconName = '';
          if (routeName === 'HomeScreen') {
            iconName = 'home';
          } else if (routeName === 'FlashExchangeScreen') {
            iconName = 'flash';
          } else if (routeName === 'ProfileScreen') {
            iconName = 'user';
          } else if (routeName === 'DappScreen') {
            iconName = 'thrid';
          }
          return <Icon name={iconName} size={size} color={color!} />;
        },
      })}
    >
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          tabBarLabel: i18n.t("wallet"),
        }}
      />
      <Screen
        name="FlashExchangeScreen"
        component={FlashExchangeScreen}
        options={{ 
          tabBarLabel: i18n.t("flash"),
        }}
      />
      <Screen
        name="DappScreen"
        component={DappScreen}
        options={{
          tabBarLabel: 'Dapp',
        }}
      />
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ 
          tabBarLabel: i18n.t("Mine")
        }}
      />
    </Navigator>
  );
}

export default TabNavigator;
