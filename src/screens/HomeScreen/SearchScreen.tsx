import React, { useEffect, useState } from 'react';
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
  FlatList,
  RefreshControl,
  ActivityIndicator,
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
import { useIsFocused } from '@react-navigation/native';
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

let limit = 1;

function getIndex(arr: string[] | Array<string>, key: string) {
  return arr.indexOf(key) != -1 ? arr.indexOf(key) : 10000;
}

function SearchScreen({ route }: Props) {
  const dispatch = useDispatch();
  const { user, assetsList } = route.params;
  const walletlist = useSelector(getAccountList);
  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)
  const { t } = useTranslation();
  const [coinName, setCoinName] = useState('');
  const [coinList, setCoinList] = useState([])
  const [defaultCoinList, setdefaultCoinList] = useState(assetsList)

  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (coinList) {
  //     let sortArr1: string[] = thisUser?.contracts;
  //     setCoinList(coinList.sort(function (a: responseItem, b: responseItem) {
  //       if (getIndex(sortArr1, a.token) == getIndex(coinList, b.token)) {
  //         return 0
  //       } else {
  //         return getIndex(sortArr1, a.token) > getIndex(sortArr1, b.token) ? 1 : -1
  //       }
  //     }))
  //   }
  // }, [coinList])
  useEffect(() => {
    if (isFocused) {
      seachName(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function seachName(isRefresh?: boolean) {
    let name = coinName;
    name = name.trim()

    if (!name) {
      return;
    }
    if (isFetching.current) {
      return;
    }
    if (!isRefresh && isEndReached.current) {
      return;
    }
    isFetching.current = true;
    setLoading(isRefresh ? 'refresh' : 'more');

    const data: any = await helper.get('/wallet/coin', {
      keyword: name,
      wallet: thisUser?.coinInfo?.wallet,
      pageNo: isRefresh ? 1 : limit
    })
    setLoading(null);
    if (data.length > 0) {
      if (isRefresh) {
        setCoinList(data)
      } else {
        setCoinList(coinList.concat(data));
      }
      
    }
    if (data.length < 30) {
      isEndReached.current = true;
    } else {
      limit++;
      isEndReached.current = false;
    }
    isFetching.current = false;
  }

  const addCoin = async (token: string) => {
    if (thisUser?.contracts?.length <= 200) {
      dispatch(walletAction.setContracts({ address: thisUser?.address, tokne: token, type: thisUser?.type }));
    } else {
      show('币种数量暂不支持200+')
    }
  }

  const Item = ({ item }) => {
    return (
      <TouchableOpacity style={styles.assetsList}>
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
              source={require('assets/icon_assets_added.png')}
            />
          ) : (
            <TouchableOpacity onPress={() => addCoin(item.token)}>
              <Image
                source={require('assets/icon_addassets.png')}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.coinNameContainer}>
            <Image
              style={styles.coinNameIcon}
              source={require('assets/icon_search.png')}
            />
            <View style={styles.coinNameView}>
              <TextInput
                placeholder={t("EnterTokenorcontractaddress")}
                value={coinName}
                style={styles.coinNameText}
                onChangeText={setCoinName}
                onSubmitEditing={() => {
                  limit = 1;
                  seachName(true)
                }}
              />
            </View>
          </View>
          <TouchableOpacity onPress={goBack} style={styles.goBlack}>
            <Text style={styles.goBlackText}>{t("cancel")}</Text>
          </TouchableOpacity>
        </View>
        {coinList?.length > 0 ? (
          <View style={styles.assetsContainer}>
            <View style={styles.assetsHeard}>
              <Text style={styles.assetsHeardTitle}>{t("searchresult")}</Text>
            </View>
            <FlatList
              style={{ margin: 0, padding: 0 }}
              data={coinList}
              renderItem={renderItem}
              keyExtractor={(item, i) => item?.token + i}
              initialNumToRender={10}
              refreshControl={
                <RefreshControl
                  title={t("loading")}
                  colors={['red', 'green', 'blue']}
                  refreshing={loading === 'refresh'}
                  onRefresh={() => seachName(true)}
                />
              }
              onEndReachedThreshold={0.1}
              onEndReached={() => seachName()}
              ListFooterComponent={() =>
                loading === 'more' ? <ActivityIndicator /> : null
              }
              ListFooterComponentStyle={{ height: 20 }}
            />
          </View>
        ) : (
          <View style={styles.assetsContainer}>
            <View style={styles.assetsHeard}>
              <Text style={styles.assetsHeardTitle}>{t("Myassets")}</Text>
            </View>
            <ScrollView>
              {defaultCoinList.map((item, i) => (
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
                      source={require('assets/icon_assets_added.png')}
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
    paddingTop: Platform.OS === 'ios' ? 50 : 50, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 88,
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
  coinNameView: {
    height: 34,
    marginRight: 5,
  },
  coinNameText: {
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
