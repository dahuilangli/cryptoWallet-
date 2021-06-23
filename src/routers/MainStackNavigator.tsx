import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
// import ReportListScreen from 'screens/ReportListScreen/ReportListScreen';
import WebScreen from 'screens/WebScreen';
// import PostFeedScreen from 'screens/HomeScreen/PostFeedScreen';
import AboutUsScreen from 'screens/MineScreen/AboutUsScreen';
import SuggestScreen from 'screens/MineScreen/SuggestScreen';
import UpdateScreen from 'screens/MineScreen/UpdateScreen';
import MessageScreen from 'screens/MineScreen/MessageScreen';
import AddressBookScreen from 'screens/MineScreen/AddressBookScreeen';
import AddressBookEditorScreen from 'screens/MineScreen/AddressBookEditorScreen'
import AddressTypeScreen from 'screens/MineScreen/AddressTypeScreen';
import SetUpScreen from 'screens/MineScreen/SetUpScreen';
import DappWebScreen from 'screens/DappScreen/DappWebScreen';
import LanguageSetScreen from 'screens/MineScreen/LanguageSetScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Alert } from 'react-native';
import React from 'react';
import { navigate } from 'utils/navigationService';
import { Text } from 'react-native-elements';


export type MainStackParamList = {
  TabNavigator: undefined;
  PostFeedScreen: undefined;
  AboutUsScreen: undefined;
  SuggestScreen: undefined;
  UpdateScreen: undefined;
  MessageScreen: undefined;
  SetUpScreen: undefined;
  LanguageSetScreen:{title?:string;};
  AddressBookScreen: { title: string; showMyself?: boolean };
  AddressBookEditorScreen: { title?: string; item: {} };
  AddressTypeScreen: { type?: string };
  FeedListScreen: { title: string; showMyself?: boolean };
  WebScreen: { title?: string; uri: string };
  DappWebScreen:{title?:string;uri:string;item:{}}
};

const { Navigator, Screen } = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3D73DD' },
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
        headerBackImage: () => <Image source={require('assets/icon-24-返回-light.png')} />,
        headerLeftContainerStyle: { marginLeft: 20, },

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
          headerBackTitle: 'flase',
          headerRight: () => <TouchableOpacity
            onPress={() => navigate('AddressBookEditorScreen', { item: {}, title: '新建收款人' })}
          >
            <Image source={require('assets/icon-24-添加-light.png')} />
          </TouchableOpacity>,
          headerRightContainerStyle: { marginRight: 20 },
        }}
      />
      <Screen
        name="AddressBookEditorScreen"
        component={AddressBookEditorScreen}
        
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () =>route.params.title === '编辑收款人' && <TouchableOpacity
            onPress={() => navigate('AddressBookScreen')}
          >
            <Text style={{ color: 'white' ,fontSize:14,fontWeight:'500'}}>删除</Text>
          </TouchableOpacity>,
          headerRightContainerStyle: { marginRight: 20 },
        })}

        
      />
    
      <Screen
        name="AddressTypeScreen"
        component={AddressTypeScreen}
        options={{
          title: '选择地址类型',
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
        name="LanguageSetScreen"
        component={LanguageSetScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
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
      <Screen
        name="DappWebScreen"
        component={DappWebScreen}
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
