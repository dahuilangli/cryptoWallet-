import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { goBack } from 'components/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import * as helper from 'apis/helper'
import { AssetsList, thisUser } from 'actions/types';
import { useDispatch, useSelector } from 'react-redux';
import walletAction from 'actions/wallet';
import { getAccountList } from 'reducers/walletStateReducer';
import { Alert } from 'react-native';
import { show } from 'utils';
interface Props {
  route: {
    params: {
      user: thisUser,
      assetsList: Array<AssetsList>
    }
  }
}

interface responseItem {
  "token": string | '',
  "wallet": string,
  "icon": string,
  "symbol": string,
  "decimals": number,
  "info": string,
  "name": string
}
function getIndex(arr: string[] | Array<string>, key: string){
  return arr.indexOf(key) != -1 ? arr.indexOf(key) : 10000;
}

function SearchScreen({ route }: Props) {
  const dispatch = useDispatch();
  const { user, assetsList } = route.params;
  const walletlist = useSelector(getAccountList);
  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)
  const { t } = useTranslation();
  const [coinName, setCoinName] = useState('');
  const [coinList, setCoinList] = useState({ title: '', data: [] })
  const [defaultCoinList, setdefaultCoinList] = useState({ title: t("Myassets"), data: assetsList })
  
  async function seachName(name: string) {
    if (name) {
      name = name.trim()
      const { data } = await helper.get('/wallet/coin', { keyword: name, wallet: thisUser?.coinInfo?.wallet })
      if (data.length > 0) {
        let sortArr1: string[] = thisUser?.contracts;
        setCoinList({ title: '搜索结果', data: data.sort(function (a: responseItem, b: responseItem) {
          if (getIndex(sortArr1, a.token) == getIndex(data, b.token)) {
            return 0
          } else {
            return getIndex(sortArr1, a.token) > getIndex(sortArr1, b.token) ? 1 : -1
          }
        })})
      }
    }
  }

  const addCoin = async (token: string) => {
    if (thisUser?.contracts?.length <= 200) {
      dispatch(walletAction.setContracts({ address: thisUser?.address, tokne: token, type: thisUser?.type }));
    } else {
      show('币种数量暂不支持200+')
    }
  }


  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.coinNameContainer}>
            <Image
              style={styles.coinNameIcon}
              source={require('assets/icon-20-搜索.png')}
            />
            <TextInput
              placeholder={t("EnterTokenorcontractaddress")}
              value={coinName}
              style={styles.coinNameText}
              onChangeText={setCoinName}
              onSubmitEditing={() => seachName(coinName)}
            />
          </View>
          <TouchableOpacity onPress={goBack} style={styles.goBlack}>
            <Text style={styles.goBlackText}>{t("cancel")}</Text>
          </TouchableOpacity>
        </View>
        {coinList?.data?.length > 0 ? (
          <View style={styles.assetsContainer}>
            <View style={styles.assetsHeard}>
              <Text style={styles.assetsHeardTitle}>{coinList?.title}</Text>
            </View>
            <ScrollView>
              {coinList?.data.map((item: responseItem, i) => (
                <TouchableOpacity style={styles.assetsList} key={i}>
                  <View style={styles.assetsListItem}>
                    <Avatar
                      rounded
                      title={item?.symbol[0]}
                      source={{ uri: item?.icon }}
                      containerStyle={styles.itemAvatar}
                    />
                    <View style={styles.itemDesc}>
                      <Text style={styles.descTitle}>{item?.symbol}</Text>
                    </View>
                    {thisUser?.contracts?.indexOf(item.token) !== -1 ? (
                      <Image
                        source={require('assets/icon-20-添加资产-已添加.png')}
                      />
                    ) : (
                      <TouchableOpacity onPress={() => addCoin(item.token)}>
                        <Image
                          source={require('assets/icon-20-添加资产.png')}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.assetsContainer}>
            <View style={styles.assetsHeard}>
              <Text style={styles.assetsHeardTitle}>{defaultCoinList.title}</Text>
            </View>
            <ScrollView>
              {defaultCoinList.data.map((item, i) => (
                <TouchableOpacity style={styles.assetsList} key={i}>
                  <View style={styles.assetsListItem}>
                    <Avatar
                      rounded
                      title={item.symbol[0]}
                      source={{ uri: item.icon }}
                      containerStyle={styles.itemAvatar}
                    />
                    <View style={styles.itemDesc}>
                      <Text style={styles.descTitle}>{item.symbol}</Text>
                    </View>
                    <Image
                      source={require('assets/icon-20-添加资产-已添加.png')}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

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
