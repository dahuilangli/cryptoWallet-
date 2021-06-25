import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { goBack } from 'utils/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import i18next from 'i18n';
interface Props {}

function SearchScreen({}: Props) {
  const [coinName, setCoinName] = useState('');
  // for (let index = 0; index < 10; index++) {
  //   setGenericPassword(index.toString(), '密码' + index);
  // }
  // getGenericPassword();
  let obj = {
    title: i18n.t("searchresult"),
    data: [
      {
        name: 'Etherscan',
        content: 'ETH区块链浏览器',
        avatar_url: require('assets/img-40-coointype-eth.png'),
      },
      {
        name: 'Gas Now',
        content: '基于以太坊交易内存池预测',
        avatar_url: require('assets/img-40-coointype-币安.png'),
      },
    ],
  };

  async function seachName(name: string) {
    if (name) {
      obj.title = '搜索结果';
    }
  }

  function HeardsOption() {
    return (
      <View style={styles.header}>
        <View style={styles.coinNameContainer}>
          <Image
            style={styles.coinNameIcon}
            source={require('assets/icon-20-搜索.png')}
          />
          <TextInput
            placeholder={i18n.t("EnterDappname")}
            value={coinName}
            style={styles.coinNameText}
            onChangeText={setCoinName}
            onSubmitEditing={() => seachName(coinName)}
          />
        </View>
        <TouchableOpacity onPress={goBack} style={styles.goBlack}>
          <Text style={styles.goBlackText}>{i18n.t("cancel")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <View style={styles.main}>
        <HeardsOption />
        <View style={styles.assetsContainer}>
          <View style={styles.assetsHeard}>
            <Text style={styles.assetsHeardTitle}>{obj.title}</Text>
          </View>
          <ScrollView>
            {obj.data.map((item, i) => (
              <TouchableOpacity style={styles.assetsList} key={i}>
                <View style={styles.assetsListItem}>
                  <Avatar
                    rounded
                    source={item.avatar_url}
                    containerStyle={styles.itemAvatar}
                  />
                  <View style={styles.itemDesc}>
                    <Text style={styles.descTitle}>{item.name}</Text>
                    <Text style={styles.descInfo}>{item.content}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
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
    paddingHorizontal: 10,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinNameContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 8,
    height: 34,
    alignItems: 'center',
  },
  coinNameIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  coinNameText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  goBlack: {
    paddingStart: 15,
    paddingEnd: 5,
  },
  goBlackText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  main: {
    flex: 1,
  },
  assetsContainer: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  assetsHeard: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9EDF1',
  },
  assetsHeardTitle: {
    fontSize: 14,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  assetsHeardImage: {
    width: 20,
    height: 20,
  },
  assetsList: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  assetsListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9EDF1',
  },
  itemAvatar: {
    width: 40,
    height: 40,
  },
  itemDesc: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
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
});
export default SearchScreen;
