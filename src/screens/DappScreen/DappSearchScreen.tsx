import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  TextInput,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { goBack, navigate } from 'components/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import * as helper from 'apis/helper'
import { useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
import { DappRecentItem } from 'actions/types'
import { parseURL, verifyURL } from 'utils';
import { useIsFocused } from '@react-navigation/native';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog'
interface Props { }

let start = 1;

function SearchScreen({ }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dappName, setDappName] = useState('');
  const [seachDataList, setSeachDataList] = useState([]);

  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      seachName(true);
    }
  }, [isFocused]);
  async function seachName(isRefresh?: boolean) {
    let name = dappName;
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
    // showLoadingModal()
    const data: any = await helper.get('/dapp/search', {
      keyword: name,
      pageNo: isRefresh ? 1 : start+=1,
    })
    setLoading(null);
    if (data && data.data) {
      let currentCount;
      if (isRefresh) {
        console.log('第一次');
        currentCount = data.data.length;
        start = 1
        setSeachDataList(data.data)
      } else {
        console.log('累加');
        currentCount = data.data.length + seachDataList.length;
        setSeachDataList(seachDataList.concat(data.data));
      }
      if (currentCount >= data.pageRecords) {
        isEndReached.current = true;
      } else {
        isEndReached.current = false;
      }
    } else {
      setSeachDataList([])
    }
    // closeLoadingModal()
    isFetching.current = false;
  }

  async function goWebView(item: DappRecentItem) {
    if (item)
    await dispatch(walletAction.setDappSearchList(item));
    
    navigate('DappWebScreen', {
      title: item?.name,
      uri: item?.deepLink,
      item: item
    })
  }
  async function onSubmit(name: string) {
    name = name.trim()
    if (name && verifyURL(name)) {
      let found: any = parseURL(name);
      let item: DappRecentItem = {
        category: found[2],
        deepLink: name,
        logo: '',
        name: found[2],
        protocol: '',
        defi: ''
      }
      console.log(item);
      
      await goWebView(item)
    } else {
      await seachName(true)
    }
  }
  const Item = ({ item }) => {
    return (
      <TouchableOpacity style={styles.assetsList} onPress={() => goWebView(item)}>
        <View style={styles.assetsListItem}>
          <Avatar
            rounded
            title={item?.name[0]}
            source={item?.logo ? { uri: item?.logo} : undefined}
            containerStyle={styles.itemAvatar}
          />
          <View style={styles.itemDesc}>
            <Text style={styles.descTitle}>{item.name}</Text>
            <Text style={styles.descInfo}>{item.deepLink}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
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
                placeholder={t("EnterDappname")}
                value={dappName}
                style={styles.coinNameText}
                onChangeText={(text) => setDappName(text)}
                onSubmitEditing={() => onSubmit(dappName)}
              />
            </View>

          </View>
          <TouchableOpacity onPress={goBack} style={styles.goBlack}>
            <Text style={styles.goBlackText}>{t("cancel")}</Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView style={styles.assetsContainer}>
          {seachDataList?.length > 0 ? (
            <View style={{ flex: 1 }}>
              <View style={styles.assetsHeard}>
                <Text style={styles.assetsHeardTitle}>{t("searchresult")}</Text>
              </View>
              <FlatList
                style={{ margin: 0, padding: 0 }}
                data={seachDataList}
                renderItem={renderItem}
                keyExtractor={(item) => item?.dappLink}
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
              />
            </View>

          ) : (<View style={styles.nodataContainer}><Image source={require('assets/seach_nodata.png')} /><Text style={styles.nodata}>{t('nodata')}</Text></View>)}
        </SafeAreaView>
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
    flex: 1,
  },
  coinNameText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    height: 34,
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

  nodataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
  },
  nodata: {
    fontSize: 16,
    color: '#9CA4B3',
    fontWeight: '500',
  }
});
export default SearchScreen;
