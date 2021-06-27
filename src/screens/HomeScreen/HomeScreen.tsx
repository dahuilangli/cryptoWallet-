import React, { useState } from 'react';
import i18n from "i18n";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {SCREENHEIGHT,SCREENWIDTH} from "config/constants";
import { Avatar, Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableHighlight } from 'react-native-gesture-handler';
interface Props {}

const modelLeft = [
  {
    title: 'ETH',
    img: require('assets/img-40-coointype-eth.png'),
  },
  {
    title: 'ETH',
    img: require('assets/img-40-coointype-币安-off.png'),
  },
  {
    title: 'ETH',
    img: require('assets/img-40-coointype-pk-off.png'),
  },
];
const DATA = [
  {
    title: 'ETH',
    data: [
      {
        walletName: '钱包1',
        address: '0x32be34….8c102d81',
        amount: 0,
      },
      {
        walletName: '钱包2',
        address: '0x32be34….8c102d82',
        amount: 0,
      },
      {
        walletName: '钱包3',
        address: '0x32be34….8c102d83',
        amount: 0,
      },
      {
        walletName: '钱包4',
        address: '0x32be34….8c102d84',
        amount: 0,
      },
      {
        walletName: '钱包5',
        address: '0x32be35….8c102d84',
        amount: 0,
      },
      {
        walletName: '钱包6',
        address: '0x32be36….8c102d84',
        amount: 0,
      },
      {
        walletName: '钱包7',
        address: '0x32be37….8c102d84',
        amount: 0,
      },
    ],
  },
  {
    title: 'OKEX',
    data: [
      {
        walletName: '钱包1',
        address: '0x32be34….8c102d85',
        amount: 0,
      },
      {
        walletName: '钱包2',
        address: '0x32be34….8c102d86',
        amount: 0,
      },
      {
        walletName: '钱包3',
        address: '0x32be34….8c102d87',
        amount: 0,
      },
      {
        walletName: '钱包4',
        address: '0x32be34….8c102d88',
        amount: 0,
      },
    ],
  },
  {
    title: 'HUOBI',
    data: [
      {
        walletName: '钱包1',
        address: '0x32be34….8c102d89',
        amount: 0,
      },
      {
        walletName: '钱包2',
        address: '0x32be34….8c102d10',
        amount: 0,
      },
      {
        walletName: '钱包3',
        address: '0x32be34….8c102d11',
        amount: 0,
      },
      {
        walletName: '钱包4',
        address: '0x32be34….8c102d12',
        amount: 0,
      },
    ],
  },
];
function HomeScreen({}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(0);
  const [selectAddress, setSelectAddress] = useState('');
  // for (let index = 0; index < 10; index++) {
  //   setGenericPassword(index.toString(), '密码' + index);
  // }
  // getGenericPassword();
  function clickOnItem(index: number) {
    setSelectItem(index);
  }
  const list = [
    {
      name: 'ETH',
      avatar_url: require('assets/img-40-coointype-eth.png'),
    },
  ];

  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.nav}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require('assets/icon-24-切换钱包-light.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{i18n.t("wallet")}</Text>
            <TouchableOpacity onPress={() => navigate('PostFeedScreen')}>
              <Image
                style={styles.image}
                source={require('assets/icon-24-扫一扫-light.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.subnav}>
            <Image
              style={styles.logo}
              source={require('assets/img-40-coointype-eth.png')}
            />
            <Text style={styles.wallName}>STO-001</Text>
            <Text style={styles.address}>0x4k...33245da4</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>¥12758.62</Text>
              <TouchableOpacity onPress={() => Alert.alert('点击eye')}>
                <Image
                  style={styles.eye}
                  source={require('assets/icon-20-see-off.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                type="clear"
                ViewComponent={LinearGradient}
                linearGradientProps={{
                  colors: ['rgba(255,255,255,.8)', 'rgba(255,255,255,1)'],
                  start: { x: 0, y: 0 },
                  end: { x: 0, y: 1 },
                }}
                icon={
                  <Image
                    style={styles.eye}
                    source={require('assets/icon-20-转账-blue.png')}
                  />
                }
                buttonStyle={styles.button}
                title={i18n.t("Transfer")}
                titleStyle={styles.buttonTitle}
                onPress={() => navigate('TransferScreen')}
              />
              <Button
                type="clear"
                ViewComponent={LinearGradient}
                icon={
                  <Image
                    style={styles.eye}
                    source={require('assets/icon-20-收款-blue.png')}
                  />
                }
                linearGradientProps={{
                  colors: ['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)'],
                  start: { x: 0, y: 0 },
                  end: { x: 0, y: 1 },
                }}
                buttonStyle={styles.buttonOne}
                title={i18n.t("Receive")}
                titleStyle={styles.buttonTitle}
                onPress={() => navigate('ReceivePaymentScreen')}
              />
            </View>
          </View>
        </View>
        <View style={styles.assetsContainer}>
          <View style={styles.assetsHeard}>
            <Text style={styles.assetsHeardTitle}>{i18n.t("assets")}</Text>
            <TouchableOpacity
              onPress={() => navigate('SearchScreen', { coin: ['ETH'] })}
            >
              <Image
                style={styles.assetsHeardImage}
                source={require('assets/icon-20-添加资产.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {list.map((item, i) => (
              <TouchableOpacity
                style={styles.assetsList}
                key={item.name}
                onPress={() =>
                  navigate('CoinDetailScreen', { title: item.name })
                }
              >
                <View style={styles.assetsListItem}>
                  <Avatar
                    rounded
                    source={item.avatar_url}
                    containerStyle={styles.itemAvatar}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                  <View style={styles.itemDesc}>
                    <Text style={styles.descTitle}>213.74</Text>
                    <Text style={styles.descInfo}>￥546.76</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={{ ...styles.outView }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.outContair} />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <View style={styles.headView}>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigate('WalletBoardScreen');
                }}
              >
                <Image
                  style={styles.textStyle}
                  source={require('assets/icon-24-钱包管理.png')}
                />
              </TouchableOpacity>
              <Text style={styles.headText}>{i18n.t("choosewallet")}</Text>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  style={styles.textStyle}
                  source={require('assets/icon-20-close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.groupView}>
              <View style={styles.menu}>
                {modelLeft.map((item, index) => (
                  <TouchableHighlight
                    key={item.title}
                    underlayColor="transparent"
                    style={
                      index === selectItem ? styles.menuItemS : styles.menuItem
                    }
                    onPress={() => clickOnItem(index)}
                  >
                    <Image source={item.img} />
                  </TouchableHighlight>
                ))}
              </View>
              <View style={styles.submenu}>
                <Text style={styles.submenuHeader}>
                  {DATA[selectItem]?.title}
                </Text>
                <ScrollView scrollIndicatorInsets={{ right: -6 }}>
                  {DATA[selectItem]?.data.map((item, index) => (
                    <TouchableOpacity
                      style={
                        selectAddress === item.address
                          ? styles.submenuItemS
                          : styles.submenuItem
                      }
                      key={item.address}
                      onPress={() => setSelectAddress(item.address)}
                    >
                      <View style={styles.itemName}>
                        <Text
                          style={
                            selectAddress === item.address
                              ? styles.itemNameTextS
                              : styles.itemNameText
                          }
                        >
                          {item?.walletName}
                        </Text>
                        {selectAddress === item.address ? (
                          <Image
                            style={styles.itemNameImage}
                            source={require('assets/icon-16-选中钱包.png')}
                          />
                        ) : undefined}
                      </View>
                      <Text
                        style={
                          selectAddress === item.address
                            ? styles.itemAddressS
                            : styles.itemAddress
                        }
                      >
                        {item?.address}
                      </Text>
                      <View style={styles.itemAmountContainer}>
                        <Text
                          style={
                            selectAddress === item.address
                              ? styles.itemAmountS
                              : styles.itemAmount
                          }
                        >
                          可用余额
                        </Text>
                        <Text
                          style={
                            selectAddress === item.address
                              ? styles.itemAmountTextS
                              : styles.itemAmountText
                          }
                        >
                          {item?.amount}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 35 : 0, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 48, // 处理iOS状态栏
  },
  header: {
    paddingHorizontal: 20,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  image: {
    width: 24,
    height: 24,
  },
  main: {
    flex: 1,
  },
  nav: {},
  subnav: {
    paddingTop: 10,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  wallName: {
    paddingTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  address: {
    opacity: 0.5,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  amountContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  eye: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 8,
    width: (SCREENWIDTH - (40 + 15)) / 2,
    paddingVertical: 15,
  },
  buttonOne: {
    borderRadius: 8,
    width: (SCREENWIDTH - (40 + 15)) / 2,
    paddingVertical: 15,
    marginLeft: 15,
  },
  buttonTitle: {
    fontSize: 16,
    color: '#3D73DD',
    fontWeight: '500',
  },
  assetsContainer: {
    flex: 1,
    backgroundColor: '#F2F5F8',
    paddingHorizontal: 20,
  },
  assetsHeard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  assetsHeardTitle: {
    fontSize: 18,
    color: '#394867',
    fontWeight: '500',
  },
  assetsHeardImage: {
    width: 20,
    height: 20,
  },
  assetsList: {},
  assetsListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
  },
  itemAvatar: {
    width: 40,
    height: 40,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  itemDesc: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  descTitle: {
    fontSize: 16,
    color: '#394867',
    fontWeight: '500',
  },
  descInfo: {
    fontSize: 14,
    color: '#C4C8D2',
    fontWeight: '500',
  },

  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  outView: {
    // height: SCREENHEIGHT - 214,
  },
  outContair: {
    flex: 1,
    width: SCREENWIDTH,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: SCREENWIDTH,
    height: (SCREENHEIGHT * 2) / 3,
  },
  headView: {
    flexDirection: 'row',
    marginTop: 0,
    height: 60,
    justifyContent: 'space-between',
    borderBottomColor: '#E9EDF1',
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
  },
  headText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#616D86',
    textAlign: 'center',
  },
  openButton: {
    width: 20,
    height: 20,
  },
  textStyle: {
    width: 20,
    height: 20,
    marginTop: 20,
  },
  groupView: {
    flexDirection: 'row',
    flex: 1,
  },
  menu: {
    backgroundColor: '#F2F5F8',
  },
  menuItem: {
    padding: 15,
  },
  menuItemS: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  itemImage: {
    width: 40,
    height: 40,
  },
  submenu: {
    paddingHorizontal: 15,
    flex: 1,
  },
  submenuHeader: {
    paddingVertical: 15,
    fontSize: 14,
    color: '#394867',
    backgroundColor: '#FFFFFF',
    fontWeight: '500',
  },
  submenuItemS: {
    backgroundColor: '#3D73DD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  submenuItem: {
    backgroundColor: '#F2F5F8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  itemName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemNameImage: {
    width: 16,
    height: 16,
  },
  itemAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#394867',
  },
  itemAddress: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA4B3',
  },
  itemAmount: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA4B3',
  },
  itemAmountText: {
    paddingStart: 5,
    fontSize: 12,
    fontWeight: '400',
    color: '#3D73DD',
  },
  itemNameTextS: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  itemAddressS: {
    opacity: 0.5,
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  itemAmountS: {
    opacity: 0.5,
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  itemAmountTextS: {
    paddingStart: 5,
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
export default HomeScreen;
