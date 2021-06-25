import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';

import TabNavigator from './TabNavigator';
import WebScreen from 'screens/WebScreen';
import AboutUsScreen from 'screens/MineScreen/AboutUsScreen';
import PostFeedScreen from 'screens/HomeScreen/PostFeedScreen';
import SuggestScreen from 'screens/MineScreen/SuggestScreen';
import AddressTypeScreen from 'screens/MineScreen/AddressTypeScreen';
import UpdateScreen from 'screens/MineScreen/UpdateScreen';
import LanguageSetScreen from 'screens/MineScreen/LanguageSetScreen';
import MessageScreen from 'screens/MineScreen/MessageScreen';
import AddressBookScreen from 'screens/MineScreen/AddressBookScreeen';
import AddressBookEditorScreen from 'screens/MineScreen/AddressBookEditorScreen';
import SetUpScreen from 'screens/MineScreen/SetUpScreen';
import ScanQRCode from 'screens/DappScreen/ScanQRCode';
import DappWebScreen from 'screens/DappScreen/DappWebScreen';
import DappSearchScreen from 'screens/DappScreen/DappSearchScreen';
import SearchScreen from 'screens/HomeScreen/SearchScreen';
import FlashRecordScreen from 'screens/FlashExchangeScreen/FlashRecordScreen';
import CoinDetailScreen from 'screens/CoinDetailScreen/CoinDetailScreen';
// 钱包管理
import WalletBoardScreen from 'screens/WalletBoardScreen/WalletBoardScreen';
import WalletDetailScreen from 'screens/WalletBoardScreen/WalletDetailScreen';
import ExportMnemonicScreen from 'screens/WalletBoardScreen/ExportMnemonicScreen';
// 转账收款
import TransferScreen from 'screens/TransferScreen/TransferScreen';
import ReceivePaymentScreen from 'screens/ReceivePaymentScreen/ReceivePaymentScreen';
// import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';
import { navigate } from 'components/navigationService';

export type MainStackParamList = {
  TabNavigator: undefined;
  PostFeedScreen: undefined;
  AboutUsScreen: undefined;
  SuggestScreen: undefined;
  UpdateScreen: undefined;
  MessageScreen: undefined;
  SetUpScreen: undefined;
  FlashRecordScreen: undefined;
  ScanQRCode: undefined;
  LanguageSetScreen: { title?: string; };
  AddressBookScreen: { title: string; showMyself?: boolean };
  AddressBookEditorScreen: { title?: string; item: {} };
  AddressTypeScreen: { type?: string };
  FeedListScreen: { title: string; showMyself?: boolean };
  WebScreen: { title?: string; uri: string };
  SearchScreen: { coin: Array<string> };
  CoinDetailScreen: { title: string };
  WalletBoardScreen: undefined;
  WalletDetailScreen: undefined;
  TransferScreen: undefined;
  ReceivePaymentScreen: undefined;
  ExportMnemonicScreen: undefined;
  DappWebScreen: { title?: string; uri: string; item: {} }
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
        name="DappSearchScreen"
        component={DappSearchScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="ScanQRCode"
        component={ScanQRCode}
        options={{ title : '扫一扫' }}
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
        name="FlashRecordScreen"
        component={FlashRecordScreen}
        options={{
          title: i18n.t("flashrecord"),
        }}
      />
      <Screen
        name="WalletBoardScreen"
        component={WalletBoardScreen}
        options={{
          title: i18n.t("Walletmanagement"),
        }}
      />
      <Screen
        name="TransferScreen"
        component={TransferScreen}
        options={{
          title: i18n.t("Transfer"),
        }}
      />
      <Screen
        name="AddressBookScreen"
        component={AddressBookScreen}
        options={{
          title: i18n.t("Addressbook"),
          headerBackTitle: 'flase',
          headerRight: () => <TouchableOpacity
            onPress={() => navigate('AddressBookEditorScreen', { item: {}, title: i18n.t("newpayee") })}
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
          headerRight: () => route.params.title === i18n.t("editpayee") && <TouchableOpacity
            onPress={() => navigate('AddressBookScreen')}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>{i18n.t("delete")}</Text>
          </TouchableOpacity>,
          headerRightContainerStyle: { marginRight: 20 },
        })}


      />

      <Screen
        name="AddressTypeScreen"
        component={AddressTypeScreen}
        options={{
          title: i18n.t("chooseaddresstype"),
        }}
      />
      <Screen
        name="SetUpScreen"
        component={SetUpScreen}
        options={{
          title: i18n.t("Usesettings"),
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
          title: i18n.t("aboutus"),
        }}
      />
      <Screen
        name="SuggestScreen"
        component={SuggestScreen}
        options={{
          title: i18n.t("HelpFeedback"),
        }}
      />
      <Screen
        name="UpdateScreen"
        component={UpdateScreen}
        options={{
          title: i18n.t("versionupdate"),
        }}
      />
      <Screen
        name="PostFeedScreen"
        component={PostFeedScreen}
        options={{
          title: i18n.t("Message"),
        }}
      />
      <Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          title: i18n.t("Message"),
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
