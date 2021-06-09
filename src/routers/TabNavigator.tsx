import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from 'screens/MineScreen/ProfileScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StatusBar} from 'react-native'
export type TabParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
  DiscoverScreen: undefined;
  ProfileScreen: undefined;
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
          } else if (routeName === 'ProfileScreen') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={size} color={color!} />;
        },
      })}
    >
      <Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: '钱包' }}
      />
      
      <Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ tabBarLabel: '我的' }}
      />
    </Navigator>
  );
}

export default TabNavigator;
