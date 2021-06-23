import React, { useState } from 'react';
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
  SectionList,
  TouchableHighlight,
} from 'react-native';
import { Button } from 'react-native-elements';
import { screenWidth } from 'utils/constants';
import { navigate } from 'utils/navigationService';
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
  const [selectAddress, setSelectAddress] = useState(null);

  const renderSectionItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={
          selectAddress === item.address
            ? styles.submenuItemS
            : styles.submenuItem
        }
        key={index}
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
    );
  };
  function clickOnItem(index: number) {
    console.log('index = ', index);
    setSelectItem(index);
    if (sectionList) {
      sectionList.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        viewPosition: 0,
      });
    }
  }
  function getItemLayout(data: any, index: number) {
    let sectioinIndex = 0;
    let offset = -180;
    interface Item {
      type: string;
      index?: number;
    }
    let item: Item = { type: 'header' };
    for (let i = 0; i < index; ++i) {
      switch (item.type) {
        case 'header':
          {
            let sectionData = data[sectioinIndex].data;
            offset += 50;
            sectionData.length === 0
              ? (item = { type: 'footer' })
              : (item = { type: 'row', index: 0 });
          }
          break;
        case 'row':
          {
            let sectionData = data[sectioinIndex].data;
            offset += 100;
            ++item.index;
            if (item.index === sectionData.length) {
              item = { type: 'footer' };
            }
          }
          break;
        case 'footer':
          item = { type: 'header' };
          ++sectioinIndex;
          break;
        default:
          console.log('err');
      }
    }

    let length = 0;
    switch (item.type) {
      case 'header':
        length = 50;
        break;
      case 'row':
        length = 100;
        break;
      case 'footer':
        length = 0;
        break;
    }
    return { length: length, offset: offset, index };
  }
  function itemOnChanged({ viewableItems, changed }) {
    let firstItem = viewableItems[0];
    if (firstItem && firstItem.section) {
      // 这里可以直接取到section的title
      let name = firstItem.section.title;
      let idx = DATA.findIndex((x) => x.title === name);
      setSelectItem(idx);
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
        <SectionList
          ref={(o) => (sectionList = o)}
          style={styles.submenu}
          sections={DATA}
          keyExtractor={(item) => item.address}
          renderItem={renderSectionItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.submenuHeader}>{title}</Text>
          )}
          getItemLayout={getItemLayout}
          onViewableItemsChanged={itemOnChanged}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title="创建钱包"
          onPress={() => navigate('SelectWalletScreen', { loginType: 'new' })}
          titleStyle={styles.buttonTitle}
        />
        <Button
          buttonStyle={styles.buttonOne}
          title="导入钱包"
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
