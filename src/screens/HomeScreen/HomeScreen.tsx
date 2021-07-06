import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

import { SCREENHEIGHT, SCREENWIDTH } from "config/constants";
import { Avatar, Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { subSplit } from 'utils'
import { CHAINS } from "config/constants"
import { useSelector, useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
import { getUser, getAccountList } from 'reducers/walletStateReducer';
import { getShowMoney ,getCurrency} from 'reducers/dataStateReducer';
import { replaceMoney } from 'utils'
import * as helper from 'apis/helper'
import { useIsFocused } from '@react-navigation/native';
import { AssetsList } from 'actions/types';

interface Props { }

const modelLeft = [
  {
    title: CHAINS.eth,
    img: require('assets/coins/img-40-coointype-eth.png'),
    img_off: require('assets/coins/img-40-coointype-eth-off.png'),
  },
  {
    title: CHAINS.bnb,
    img: require('assets/coins/img-40-coointype-币安.png'),
    img_off: require('assets/coins/img-40-coointype-币安-off.png'),
  },
  {
    title: CHAINS.ht,
    img: require('assets/coins/img-40-coointype-pk.png'),
    img_off: require('assets/coins/img-40-coointype-pk-off.png'),
  },
];
let defatltCoin: Map<string, object> = new Map();
defatltCoin.set('ETH', {
  name: 'USDT',
  contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7'
})
defatltCoin.set('BNB', {
  name: 'BUSD',
  contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
})
defatltCoin.set('HT', {
  name: 'HUSD',
  contractAddress: '0x0298c2b32eae4da002a15f36fdf7615bea3da047'
})
function HomeScreen({ }: Props) {
  const dispatch = useDispatch()
  const isFocused = useIsFocused();
  const walletlist = useSelector(getAccountList);
  const user = useSelector(getUser);
  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)
  const showMoney = useSelector(getShowMoney);
  const currenTUnit = useSelector(getCurrency);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(0);
  const [selectAddress, setSelectAddress] = useState(thisUser?.address);
  const [assetsList, setAssetsList] = useState([])
  const [assetsSum, setAssetsSum] = useState('-')
  const { t } = useTranslation();
  useEffect(() => {
    if (isFocused) {
      getAssetsList()
    }
  }, [isFocused])
  async function getAssetsList() {
    let params = {
      "address": thisUser?.address,
      "contracts": thisUser?.contracts,
      "wallet": thisUser?.coinInfo?.wallet
    }
    const { data } = await helper.post('/wallet/assets', params)
    if (data && data.length > 0) {
      setAssetsList(data)
      let a = 0;
      data.map((s: AssetsList) => {
        a += parseFloat(s.rate_price)
      })
      setAssetsSum(String(a))
    } else {
      setAssetsList([])
      setAssetsSum('-')
    }
  }
  async function hideOrShowMoney() {
    await dispatch(walletAction.setShowMoney(!showMoney));
  }
  function clickOnItem(index: number) {
    setSelectItem(index);
  }
  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.nav}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() =>
              setModalVisible(true)}>
              <Image source={require('assets/icon-24-切换钱包-light.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("wallet")}</Text>
            <TouchableOpacity onPress={() => navigate('ScanQRCode',{title:'HomeScreen',assetsList})}>
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
            <Text style={styles.wallName}>{thisUser?.walletName}</Text>
            <Text style={styles.address}>{subSplit(thisUser?.address, 4, 8)}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>{currenTUnit === 'USDT'?'$':'¥'}{showMoney ? assetsSum : replaceMoney(assetsSum)}</Text>
              <TouchableOpacity onPress={() => { hideOrShowMoney() }}>
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
                title={t("Transfer")}
                titleStyle={styles.buttonTitle}
                onPress={() => navigate('TransferScreen', { address: '', assetsList })}
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
                title={t("Receive")}
                titleStyle={styles.buttonTitle}
                onPress={() => navigate('ReceivePaymentScreen', { address: thisUser?.address })}
              />
            </View>
          </View>
        </View>
        <View style={styles.assetsContainer}>
          <View style={styles.assetsHeard}>
            <Text style={styles.assetsHeardTitle}>{t("assets")}</Text>
            <TouchableOpacity
              onPress={() => navigate('SearchScreen', { user, assetsList })}
            >
              <Image
                style={styles.assetsHeardImage}
                source={require('assets/icon-20-添加资产.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {assetsList.map((item: AssetsList, i) => (
              <TouchableOpacity
                style={styles.assetsList}
                key={item?.token}
                onPress={() =>
                  navigate('CoinDetailScreen', { title: item.symbol })
                }
              >
                <View style={styles.assetsListItem}>
                  <Avatar
                    rounded
                    title={item.symbol[0]}
                    source={{ uri: item?.icon }}
                    containerStyle={styles.itemAvatar}
                  />
                  <Text style={styles.itemText}>{item?.symbol}</Text>
                  <View style={styles.itemDesc}>
                    <Text style={styles.descTitle}>{showMoney ? item?.balance : replaceMoney(item?.balance)}</Text>
                    <Text style={styles.descInfo}>{currenTUnit === 'USDT'?'$':'¥'}{showMoney ? item?.rate_price : replaceMoney(item?.rate_price)}</Text>
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
              <Text style={styles.headText}>{t("choosewallet")}</Text>
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
                    <Image source={index === selectItem ? item.img : item.img_off} />
                  </TouchableHighlight>
                ))}
              </View>
              <View style={styles.submenu}>
                <Text style={styles.submenuHeader}>
                  {modelLeft[selectItem].title}
                </Text>
                <ScrollView>
                  {walletlist.get(modelLeft[selectItem].title)?.map((item, index) => (
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
                        {subSplit(item?.address, 8, 8)}
                      </Text>
                      <View style={styles.itemAmountContainer}>
                        <Text
                          style={
                            selectAddress === item.address
                              ? styles.itemAmountS
                              : styles.itemAmount
                          }
                        >
                          {t("AvailableBalance")}
                        </Text>
                        <Text
                          style={
                            selectAddress === item.address
                              ? styles.itemAmountTextS
                              : styles.itemAmountText
                          }
                        >
                          {item?.amount | 20000}
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
    paddingTop: Platform.OS === 'ios' ? 50 : 0, // 处理iOS状态栏
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
  },
  assetsHeard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
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
  assetsList: {
    paddingHorizontal: 20,
  },
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
    marginTop: 20,
  },
  textStyle: {
    width: 20,
    height: 20,

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
