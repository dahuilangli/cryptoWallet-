import React, { useState } from 'react';
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
import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
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
function WalletBoardScreen({}: Props) {
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
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.menu}>
          {modelLeft.map((item, index) => (
            <TouchableHighlight
              underlayColor="transparent"
              style={index === selectItem ? styles.menuItemS : styles.menuItem}
              onPress={() => clickOnItem(index)}
            >
              <Image source={item.img} />
            </TouchableHighlight>
          ))}
        </View>
        <View style={styles.submenu}>
          <Text style={styles.submenuHeader}>{DATA[selectItem]?.title}</Text>
          <ScrollView scrollIndicatorInsets={{ right: -6 }}>
            {DATA[selectItem]?.data.map((item, index) => (
              <TouchableOpacity
                style={styles.submenuItem}
                key={index}
                onPress={() => navigate('WalletDetailScreen')}
              >
                <Text style={styles.itemNameText}>{item?.walletName}</Text>
                <View style={styles.itemName}>
                  <Text style={styles.itemAddress}>{item?.address}</Text>

                  <Image
                    style={styles.itemNameImage}
                    source={require('assets/icon-20-arrow-right.png')}
                  />
                </View>
                <View style={styles.itemAmountContainer}>
                  <Text style={styles.itemAmount}>可用余额</Text>
                  <Text style={styles.itemAmountText}>{item?.amount}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title={i18n.t("Createwallet")}
          onPress={() => navigate('SelectWalletScreen', { loginType: 'new' })}
          titleStyle={styles.buttonTitle}
        />
        <Button
          buttonStyle={styles.buttonOne}
          title={i18n.t("Importwallet")}
          onPress={() => navigate('SelectWalletScreen')}
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
    width: (screenWidth - (40 + 15)) / 2,
    paddingVertical: 15,
  },
  buttonOne: {
    backgroundColor: '#263C75',
    borderRadius: 8,
    width: (screenWidth - (40 + 15)) / 2,
    paddingVertical: 15,
    marginLeft: 15,
  },
  buttonTitle: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default WalletBoardScreen;
