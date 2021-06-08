import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ProfileScreen from 'screens/ProfileScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
// import DappScreen from 'screens/DappScreen/DappScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export type TabParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
  DiscoverScreen: undefined;
  ProfileScreen: undefined;
  DappScreen: undefined;
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
          } else if (routeName === 'MapScreen') {
            iconName = 'map-marker';
          } else if (routeName === 'ProfileScreen') {
            iconName = 'user';
          } else if (routeName === 'DiscoverScreen') {
            iconName = 'compass';
          } else if (routeName === 'DappScreen') {
            iconName = 'th-large';
          }
          return <Icon name={iconName} size={size} color={color!} />;
        },
      })}
    >
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: '首页' }}
      />
      {/* <Screen
        name="MapScreen"
        component={MapScreen}
        options={{ tabBarLabel: '附近' }}
      />
      <Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{ tabBarLabel: '发现' }}
      />
      <Screen
        name="DappScreen"
        component={DappScreen}
        options={{ tabBarLabel: 'Dapp' }}
      />
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ tabBarLabel: '我的' }}
      /> */}
    </Navigator>
  );
}

export default TabNavigator;
