import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { navigate } from 'utils/navigationService';

import TabNavigator from './TabNavigator';
import WebScreen from 'screens/WebScreen';
import AboutUsScreen from 'screens/MineScreen/AboutUsScreen';
import SuggestScreen from 'screens/MineScreen/SuggestScreen';
import UpdateScreen from 'screens/MineScreen/UpdateScreen';
import MessageScreen from 'screens/MineScreen/MessageScreen';
import AddressBookScreen from 'screens/MineScreen/AddressBookScreeen';
import AddressBookEditorScreen from 'screens/MineScreen/AddressBookEditorScreen';
import SetUpScreen from 'screens/MineScreen/SetUpScreen';
import SearchScreen from 'screens/HomeScreen/SearchScreen';
import CoinDetailScreen from 'screens/CoinDetailScreen/CoinDetailScreen';
import WalletBoardScreen from 'screens/WalletBoardScreen/WalletBoardScreen';
// import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';

export type MainStackParamList = {
  TabNavigator: undefined;
  PostFeedScreen: undefined;
  AboutUsScreen: undefined;
  SuggestScreen: undefined;
  UpdateScreen: undefined;
  MessageScreen: undefined;
  SetUpScreen: undefined;
  DappScreen: undefined;
  AddressBookScreen: { title: string; showMyself?: boolean };
  AddressBookEditorScreen: { title?: string; item: {} };
  FeedListScreen: { title: string; showMyself?: boolean };
  WebScreen: { title?: string; uri: string };
  SearchScreen: { coin: Array<string> };
  CoinDetailScreen: { title: string };
  WalletBoardScreen: undefined;
};

const { Navigator, Screen } = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3D73DD' },
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
        headerBackImage: () => (
          <Image source={require('assets/icon-24-返回-light.png')} />
        ),
        headerLeftContainerStyle: { marginLeft: 20 },
      }}
    >
      <Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="CoinDetailScreen"
        component={CoinDetailScreen}
        options={({ route }) => ({
          title: route.params.title || '',
          // headerTitleContainerStyle: {
          //   marginHorizontal: 80,
          // },
        })}
      />
      <Screen
        name="WalletBoardScreen"
        component={WalletBoardScreen}
        options={{
          title: '钱包管理',
        }}
      />

      <Screen
        name="AddressBookScreen"
        component={AddressBookScreen}
        options={{
          title: '地址本',
          headerBackTitle: 'flase',
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigate('AddressBookEditorScreen', {
                  item: {},
                  title: '新建收款人',
                })
              }
            >
              <Image source={require('assets/icon-24-添加-light.png')} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: { marginRight: 20 },
        }}
      />
      <Screen
        name="AddressBookEditorScreen"
        component={AddressBookEditorScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Screen
        name="SetUpScreen"
        component={SetUpScreen}
        options={{
          title: '使用设置',
        }}
      />
      <Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          title: '关于我们',
        }}
      />
      <Screen
        name="SuggestScreen"
        component={SuggestScreen}
        options={{
          title: '帮助反馈',
        }}
      />
      <Screen
        name="UpdateScreen"
        component={UpdateScreen}
        options={{
          title: '版本更新',
        }}
      />
      <Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          title: '消息通知',
        }}
      />
      <Screen
        name="WebScreen"
        component={WebScreen}
        options={({ route }) => ({
          title: route.params.title || '',
          headerTitleContainerStyle: {
            marginHorizontal: 80,
          },
        })}
      />
    </Navigator>
  );
}
