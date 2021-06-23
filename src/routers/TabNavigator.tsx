import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  ProfileScreen from 'screens/MineScreen/ProfileScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import FlashExchangeScreen from 'screens/FlashExchangeScreen/FlashExchangeScreen';
import DappScreen from 'screens/DappScreen/DappScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export type TabParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  DappScreen:undefined;
  FlashExchangeScreen:undefined;
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
          }else if (routeName === 'FlashExchangeScreen') {
            iconName = 'flash';
          }else if (routeName === 'ProfileScreen') {
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
          tabBarLabel: '钱包',
        }}
      />
      <Screen
        name="FlashExchangeScreen"
        component={FlashExchangeScreen}
        options={{ 
          tabBarLabel: '闪兑',
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
          tabBarLabel: '我的'
        }}
      />
    </Navigator>
  );
}

export default TabNavigator;
