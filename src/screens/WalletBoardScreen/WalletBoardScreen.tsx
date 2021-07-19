import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { Button, Badge } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { CHAINS } from "config/constants"
import { useDispatch, useSelector } from 'react-redux';
import walletAction from 'actions/wallet';
import { getAccountList, getUser } from 'reducers/walletStateReducer';
import { subSplit } from 'utils'
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

function WalletBoardScreen({ }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const walletlist = useSelector(getAccountList);
  const user = useSelector(getUser);
  
  
  let sectionList: any;
  const [selectItem, setSelectItem] = useState(0);
  function clickOnItem(index: number) {
    setSelectItem(index);
    if (sectionList) {
      sectionList.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        viewPosition: 0,
      });
    }
  }

  async function setImportType(type: string) {
    navigate('SecondSelectWalletScreen', { loginType: type })
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.menu}>
          {modelLeft.map((item, index) => (
            <TouchableHighlight
              key={index}
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
          <Text style={styles.submenuHeader}>{modelLeft[selectItem]?.title}</Text>

          {walletlist.get(modelLeft[selectItem].title).length > 0 ? <ScrollView>
            {walletlist.get(modelLeft[selectItem].title)?.map((item, index) => (
              <TouchableOpacity
                style={styles.submenuItem}
                key={index}
                onPress={() => navigate('WalletDetailScreen', { addressMessage: item })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.itemNameText}>{item?.walletName}</Text>
                  {item?.address === user.address && item?.type === user.type ? (
                    <Badge badgeStyle={{ marginLeft: 2 }} value={t("current")} textStyle={{fontSize: 12}} />
                  ) : null}
                </View>
                <View style={styles.itemName}>
                  <Text style={styles.itemAddress}>{subSplit(item?.address, 8, 8)}</Text>

                  <Image
                    style={styles.itemNameImage}
                    source={require('assets/icon_arrow_right.png')}
                  />
                </View>
                {/* <View style={styles.itemAmountContainer}>
                  <Text style={styles.itemAmount}>{t("AvailableBalance")}</Text>
                  <Text style={styles.itemAmountText}>{item?.amount}</Text>
                </View> */}
              </TouchableOpacity>
            ))}
          </ScrollView> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 140, width: 240 }} source={require('assets/icon_nowallet.png')}></Image>
            <Text style={styles.notdata}>{t("nowallet")}</Text>
          </View>}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title={t("Createwallet")}
          onPress={() => setImportType('new')}
          titleStyle={styles.buttonTitle}
        />
        <Button
          buttonStyle={styles.buttonOne}
          title={t("Importwallet")}
          onPress={() => setImportType('old')}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
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
    marginBottom: 20,
    flex: 1,
  },
  submenuHeader: {
    paddingVertical: 15,
    fontSize: 14,
    color: '#394867',
    backgroundColor: '#FFFFFF',
    fontWeight: '500',
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
    width: 8.2,
    height: 20,
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

  buttonContainer: {
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopColor: '#FFFFFF',
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    width: (SCREENWIDTH - (40 + 15)) / 2,
    paddingVertical: 15,
  },
  buttonOne: {
    backgroundColor: '#263C75',
    borderRadius: 8,
    width: (SCREENWIDTH - (40 + 15)) / 2,
    paddingVertical: 15,
    marginLeft: 15,
  },
  buttonTitle: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  notdata: {
    fontSize: 16,
    color: '#CCCFD9',
    fontWeight: '500',
  },
});

export default WalletBoardScreen;
