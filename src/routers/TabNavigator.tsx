import React from 'react';
import {Image} from 'react-native';
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
        tabBarIcon: ({focused, color, size }) => {
          const routeName = route.name;
          let selectImage;
          let normalImage;
          if (routeName === 'HomeScreen') {
            selectImage = require('assets/icon-24-wallet-selected.png');
            normalImage = require('assets/icon-24-wallet-normal.png');
          } else if (routeName === 'FlashExchangeScreen') {
            selectImage = require('assets/icon-24-闪兑-selected.png');
            normalImage = require('assets/icon-24-闪兑-normal.png');
          } else if (routeName === 'ProfileScreen') {
            selectImage = require('assets/icon-24-我的-selected.png');
            normalImage = require('assets/icon-24-我的-normal.png');
          } else if (routeName === 'DappScreen') {
            selectImage = require('assets/icon-24-dapp-selected.png');
            normalImage = require('assets/icon-24-dapp-normal.png');
          }
          return <Image source = {focused?selectImage:normalImage} />;
        },
      })}
      tabBarOptions = {{
        activeTintColor:'#3B6ED5',
        inactiveTintColor:'#263C75',
      }}
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
