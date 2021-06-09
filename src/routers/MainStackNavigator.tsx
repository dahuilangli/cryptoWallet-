import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import WebScreen from 'screens/WebScreen';
import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';
import AboutUsScreen from 'screens/MineScreen/AboutUsScreen';
import SuggestScreen from 'screens/MineScreen/SuggestScreen';
import UpdateScreen from 'screens/MineScreen/UpdateScreen';
import MessageScreen from 'screens/MineScreen/MessageScreen';
import AddressBookScreen from 'screens/MineScreen/AddressBookScreeen';
import SetUpScreen from 'screens/MineScreen/SetUpScreen'
import React from 'react';
import { Button, Image, View , Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type MainStackParamList = {
  TabNavigator: undefined;
  ReportListScreen: undefined;
  PostFeedScreen: undefined;
  AboutUsScreen:undefined;
  SuggestScreen:undefined;
  UpdateScreen:undefined;
  MessageScreen:undefined;
  SetUpScreen:undefined;
  AddressBookScreen:{title:string; showMyself?:boolean};
  FeedListScreen: { title: string; showMyself?: boolean };
  WebScreen: { title?: string; uri: string };
};

const { Navigator, Screen } = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerStyle:{backgroundColor:'#3D73DD'},
        headerBackTitleVisible:false,
        headerTitleStyle:{fontSize:18,fontWeight:'bold',color:'white'},
        headerBackImage:()=><Image source={require('../../assets/icon-24-返回-light.png')}/>,
        headerLeftContainerStyle:{marginLeft:20,},
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
        name="AddressBookScreen"
        component={AddressBookScreen}
        options={{
          title: '地址本',
          headerBackTitle:'flase',
          headerRight:()=><TouchableOpacity 
            onPress={() => Alert.alert('Simple Button pressed')}
          >
            <Image source = {require('../../assets/icon-24-添加-light.png')}/>
          </TouchableOpacity>,
          headerRightContainerStyle:{marginRight:20},
        }}
      />
      <Screen
        name="SetUpScreen"
        component={SetUpScreen}
        options={{
          title: '使用设置',
        }}
      />
      <Screen
        name="FeedListScreen"
        component={FeedListScreen}
        options={{
          title: '我的动态',
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
