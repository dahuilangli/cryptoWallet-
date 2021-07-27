import React, { useEffect, useRef, useState } from 'react';
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
  RefreshControl,
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
import { getShowMoney, getCurrency, getChains } from 'reducers/dataStateReducer';
import { replaceMoney } from 'utils'
import * as helper from 'apis/helper'
import { useIsFocused } from '@react-navigation/native';
import { Account, AssetsList } from 'actions/types';

interface Props { }

const modelLeft = [
  {
    title: CHAINS.eth,
    img: require('assets/coins/img_coointype_eth.png'),
    img_off: require('assets/coins/img_coointype_eth_off.png'),
  },
  {
    title: CHAINS.bnb,
    img: require('assets/coins/icon_coointype_bian.png'),
    img_off: require('assets/coins/icon_coointype_bian_off.png'),
  },
  {
    title: CHAINS.ht,
    img: require('assets/coins/img_coointype_pk.png'),
    img_off: require('assets/coins/img_coointype_pk_off.png'),
  },
];

function HomeScreen({ }: Props) {
  const dispatch = useDispatch()
  const walletlist = useSelector(getAccountList);
  const user = useSelector(getUser);
  const chains = useSelector(getChains);
  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)
  const showMoney = useSelector(getShowMoney);
  const currenTUnit = useSelector(getCurrency);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(0);
  const [selectAddress, setSelectAddress] = useState(thisUser?.address);

  const [selectType, setSelectType] = useState(thisUser?.type);
  const [assetsList, setAssetsList] = useState([])
  const [assetsSum, setAssetsSum] = useState('-')
  const [refreshing, setRefreshing] = useState(false)
  const { t } = useTranslation();
  useEffect(() => {
    getAssetsList()
  }, [user, walletlist,currenTUnit])

  function switchWallet(item: Account) {
    setSelectAddress(item.address)
    setSelectType(item.type)
    dispatch(walletAction.createUser({ address: item.address, type: item.type }));
    setModalVisible(!modalVisible);
  }

  function getAssetsList() {
    setRefreshing(true);
    let params = {
      "address": thisUser?.address,
      "contracts": thisUser?.contracts,
      "wallet": thisUser?.coinInfo?.wallet
    }
    if(chains == ""){
      helper.get('/chain_info_list', {}).then((res: any) => {
        dispatch(walletAction.setChains(res));
      });
    }
   
    helper.post('/wallet/assets', params).then((res: any) => {
      setAssetsList(res)
      let a = 0;
      res.map((s: AssetsList) => {
        a += parseFloat(s.rate_price)
      })
      setAssetsSum(String(a))
    }).catch(e => {
      setAssetsList([])
      setAssetsSum('-')
    }).finally( () => {
      setRefreshing(false)
    })
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
              <Image style={styles.image} source={require('assets/icon_change_wallet_light.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("wallet")}</Text>
            <TouchableOpacity onPress={() => navigate('ScanQRCode', { title: 'HomeScreen', assetsList })}>
              <Image
                style={styles.image}
                source={require('assets/icon_sacn_light.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.subnav}>
            {user.type === 'ETH' ? (
              <Image
                style={styles.logo}
                source={require('assets/coins/img_indexcoin_eth.png')}
              />
            ) : user.type === 'BSC' ? (
              <Image
                style={styles.logo}
                source={require('assets/coins/img_indexcoin_bnb.png')}
              />
            ) : user.type === 'HECO' ? (
              <Image
                style={styles.logo}
                source={require('assets/coins/img_indexcoin_huobi.png')}
              />
            ) : undefined}
            <Text style={styles.wallName}>{thisUser?.walletName}</Text>
            <Text style={styles.address}>{subSplit(thisUser?.address, 4, 8)}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.dengyuText}>{showMoney ? '≈' : ''}</Text>
              <Text style={styles.amountText}>{showMoney ? currenTUnit === 'USDT' ? '$' : '¥' : '*'}{showMoney ? assetsSum : '*****'}</Text>
              <TouchableOpacity onPress={() => { hideOrShowMoney() }}>
                <Image
                  style={styles.eye}
                  source={showMoney ?  require('assets/icon_see_on.png') : require('assets/icon_see_off.png')}
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
                    source={require('assets/icon_transfer_blue.png')}
                  />
                }
                buttonStyle={styles.button}
                title={t("Transfer")}
                titleStyle={styles.buttonTitle}
                onPress={() => navigate('TransferScreen', { assetsList })}
              />
              <Button
                type="clear"
                ViewComponent={LinearGradient}
                icon={
                  <Image
                    style={styles.eye}
                    source={require('assets/icon_payment_blue.png')}
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
                source={require('assets/icon_addassets.png')}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getAssetsList}
                colors={['red','green','blue']}
                title={t("loading")}
              />
            }>
            {assetsList.map((item: AssetsList, i) => (
              <TouchableOpacity
                style={styles.assetsList}
                key={item?.token}
                onPress={() =>
                  navigate('CoinDetailScreen', { title: item.symbol, assetsList: item })
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
                    <Text style={styles.descTitle}>{showMoney ? item?.balance : '******'}</Text>
                    <Text style={styles.descInfo}>{showMoney ? '≈ ' : ''}{showMoney ? currenTUnit === 'USDT' ? '$' : '¥' : '*'}{showMoney ? item?.rate_price : '*****'}</Text>
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
                  source={require('assets/icon_wallet_manager.png')}
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
                  source={require('assets/icon_close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.groupView}>
              <View style={styles.menu}>
                {modelLeft.map((item, index) => (
                  <TouchableOpacity
                    key={item.title}
                    style={
                      index === selectItem ? styles.menuItemS : styles.menuItem
                    }
                    onPress={() => clickOnItem(index)}

                  >
                    <Image source={index === selectItem ? item.img : item.img_off} />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.submenu}>
                <Text style={styles.submenuHeader}>
                  {modelLeft[selectItem].title}
                </Text>
                {walletlist.get(modelLeft[selectItem].title).length>0?<ScrollView>
                  {walletlist.get(modelLeft[selectItem].title)?.map((item, index) => (
                    <TouchableOpacity
                      style={
                        selectAddress === item.address && selectType === item.type
                          ? styles.submenuItemS
                          : styles.submenuItem
                      }
                      key={item.address}
                      onPress={() => switchWallet(item)}
                    >
                      <View style={styles.itemName}>
                        <Text
                          style={
                            selectAddress === item.address && selectType === item.type
                              ? styles.itemNameTextS
                              : styles.itemNameText
                          }
                        >
                          {item?.walletName}
                        </Text>
                        {selectAddress === item.address && selectType === item.type ? (
                          <Image
                            style={styles.itemNameImage}
                            source={require('assets/icon_selected_wallet.png')}
                          />
                        ) : undefined}
                      </View>
                      <Text
                        style={
                          selectAddress === item.address && selectType === item.type
                            ? styles.itemAddressS
                            : styles.itemAddress
                        }
                      >
                        {subSplit(item?.address, 8, 8)}
                      </Text>
                      {/* <View style={styles.itemAmountContainer}>
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
                      </View> */}
                    </TouchableOpacity>
                  ))}
                </ScrollView>:<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 140, width: 240 }} source={require('assets/icon_nowallet.png')}></Image>
            <Text style={styles.notdata}>{t("nowallet")}</Text>
          </View>}
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
    paddingTop: Platform.OS === 'ios' ? 50 : 50, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 88, // 处理iOS状态栏
  },
  header: {
    paddingHorizontal: 10,
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
    marginHorizontal: 10,
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
  dengyuText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '200',
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
  dengyuInfo: {
    fontSize: 10,
    color: '#C4C8D2',
    fontWeight: '300',
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
    width: 24,
    height: 24,
    marginTop: 20,
  },
  textStyle: {
    width: 24,
    height: 24,

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
  notdata: {
    fontSize: 16,
    color: '#CCCFD9',
    fontWeight: '500',
  },
});
export default HomeScreen;

