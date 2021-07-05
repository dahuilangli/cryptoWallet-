import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native';
import TabNavigator from './TabNavigator';
import WebScreen from 'screens/WebScreen';
import WebHtmlScreen from 'screens/WebHtmlScreen';
import AboutUsScreen from 'screens/MineScreen/AboutUsScreen';
import PostFeedScreen from 'screens/HomeScreen/PostFeedScreen';
import SuggestScreen from 'screens/MineScreen/SuggestScreen';
import AddressTypeScreen from 'screens/MineScreen/AddressTypeScreen';
import UpdateScreen from 'screens/MineScreen/UpdateScreen';
import LanguageSetScreen from 'screens/MineScreen/LanguageSetScreen';
import CurrencySetScreen from 'screens/MineScreen/CurrencySetScreen';
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
import ExportPrivateKeyScreen from 'screens/WalletBoardScreen/ExportPrivateKeyScreen';
import EditPwdScreen from 'screens/WalletBoardScreen/EditPwdScreen';

// 转账收款
import TransferScreen from 'screens/TransferScreen/TransferScreen';
import ReceivePaymentScreen from 'screens/ReceivePaymentScreen/ReceivePaymentScreen';
// import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';
import { goBack, navigate } from 'components/navigationService';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
import { Account, AddressBookItem, AssetsList, thisUser } from 'actions/types';
import { walletState } from 'reducers/walletStateReducer';
export type MainStackParamList = {
  TabNavigator: undefined;
  PostFeedScreen: undefined;
  AboutUsScreen: undefined;
  SuggestScreen: undefined;
  UpdateScreen: {item:Object;checkVersion:Boolean};
  MessageScreen: undefined;
  SetUpScreen: undefined;
  FlashRecordScreen: undefined;
  ScanQRCode: undefined;
  LanguageSetScreen: undefined;
  CurrencySetScreen: undefined;
  AddressBookScreen: { title: string; showMyself?: boolean };
  AddressBookEditorScreen: { title?: string; item: {} };
  AddressTypeScreen: { addType: string; setAddType: Function; typeLogo: string; setTypeLogo: Function };
  FeedListScreen: { title: string; showMyself?: boolean };
  WebScreen: { title?: any; uri: string };
  WebHtmlScreen: { title?: any; uri: string };
  SearchScreen: { user: thisUser, assetsList: Array<AssetsList> };
  DappSearchScreen: { coin: Array<string> };
  CoinDetailScreen: { title: string };
  WalletBoardScreen: undefined;
  WalletDetailScreen: undefined;
  TransferScreen: { address: string, assetsList: Array<AssetsList> };
  ReceivePaymentScreen: { address: string };
  ExportMnemonicScreen: undefined;
  ExportPrivateKeyScreen: undefined;
  EditPwdScreen: undefined;

  DappWebScreen: { title?: string; uri: string; item: {} }
};

const { Navigator, Screen } = createStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  async function addAddressBook(item: AddressBookItem) {
    await dispatch(walletAction.deleteAddressBookList(item));
  }
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
        name="WalletBoardScreen"
        component={WalletBoardScreen}
        options={{
          title: t("Walletmanagement"),
        }}
      />
      <Screen
        name="WalletDetailScreen"
        component={WalletDetailScreen}
        options={{
          title: t("walletdetails"),
        }}
      />
      <Screen
        name="ExportMnemonicScreen"
        component={ExportMnemonicScreen}
        options={{
          title: t("Backupmnemonic"),
        }}
      />
      <Screen
        name="ExportPrivateKeyScreen"
        component={ExportPrivateKeyScreen}
        options={{
          title: t("Backupprivatekey"),
        }}
      />
      <Screen
        name="EditPwdScreen"
        component={EditPwdScreen}
        options={{
          title: t("changePassword"),
        }}
      />
      <Screen
        name="TransferScreen"
        component={TransferScreen}
        options={{
          title: t("Transfer"),
        }}
      />
      <Screen
        name="ReceivePaymentScreen"
        component={ReceivePaymentScreen}
        options={{
          title: t("Receive"),
        }}
      />
      <Screen
        name="DappSearchScreen"
        component={DappSearchScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="ScanQRCode"
        component={ScanQRCode}
        options={{ title: t("Scan") }}
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
          title: t("flashrecord"),
        }}
      />


      <Screen
        name="AddressBookScreen"
        component={AddressBookScreen}
        options={{
          title: t("Addressbook"),
          headerBackTitle: 'flase',
          headerRight: () => <TouchableOpacity
            onPress={() => navigate('AddressBookEditorScreen', { item: {}, title: t("newpayee") })}
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
          headerRight: () => route.params.title === t("editpayee") && <TouchableOpacity
            onPress={() => {
              addAddressBook(route.params.item)
              goBack()
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>{t("delete")}</Text>
          </TouchableOpacity>,
          headerRightContainerStyle: { marginRight: 20 },
        })}


      />

      <Screen
        name="AddressTypeScreen"
        component={AddressTypeScreen}
        options={{
          title: t("chooseaddresstype"),
        }}
      />
      <Screen
        name="SetUpScreen"
        component={SetUpScreen}
        options={{
          title: t("Usesettings"),
        }}
      />
      <Screen
        name="LanguageSetScreen"
        component={LanguageSetScreen}
        options={({ route }) => ({
          title: t("languagesettings"),
        })}
      />
      <Screen
        name="CurrencySetScreen"
        component={CurrencySetScreen}
        options={({ route }) => ({
          title: t("currencyUnit"),
        })}
      />
      <Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          title: t("aboutus"),
        }}
      />
      <Screen
        name="SuggestScreen"
        component={SuggestScreen}
        options={{
          title: t("HelpFeedback"),
        }}
      />
      <Screen
        name="UpdateScreen"
        component={UpdateScreen}
        options={{
          title: t("versionupdate"),
        }}
      />
      <Screen
        name="PostFeedScreen"
        component={PostFeedScreen}
        options={{
          title: t("Message"),
        }}
      />
      <Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          title: t("Message"),
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
        name="WebHtmlScreen"
        component={WebHtmlScreen}
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
