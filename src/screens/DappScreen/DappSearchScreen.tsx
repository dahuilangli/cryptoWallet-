import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { goBack, navigate } from 'components/navigationService';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import * as helper from 'apis/helper'
import { useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
import { DappRecentItem } from 'actions/types'
import { parseURL, verifyURL } from 'utils';
interface Props { }

function SearchScreen({ }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dappName, setDappName] = useState('');
  const [seachDataList, setSeachDataList] = useState([]);

  async function seachName(name: string) {
    if (name) {
      let params = {
        keyword: name
      }
      helper.get('/dapp/search', params).then((res: any) => {
        if (res?.data && res?.data.length) {
          setSeachDataList(res.data)
        } else {
          setSeachDataList([])
        }
      })
    }
    return
  }

  async function goWebView(item: DappRecentItem) {
    await dispatch(walletAction.setDappSearchList(item));
    navigate('DappWebScreen', {
      title: item.name,
      uri: item.deep_link,
      item: item
    })
  }
  async function onSubmit(name: string) {
    name = name.trim()
    if (name && verifyURL(name)) {
      let found: any = parseURL(name);
      let item: DappRecentItem = {
        category: found[2],
        deep_link: name,
        logo: '',
        name: found[2],
        protocol: '',
        defi: ''
      }
      await goWebView(item)
    } else {
      await seachName(name)
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
              placeholder={t("EnterDappname")}
              value={dappName}
              style={styles.coinNameText}
              onChangeText={(text) => setDappName(text)}
              onSubmitEditing={() => onSubmit(dappName)}
            />
          </View>
          <TouchableOpacity onPress={goBack} style={styles.goBlack}>
            <Text style={styles.goBlackText}>{t("cancel")}</Text>
          </TouchableOpacity>
        </View>
        
        <SafeAreaView style={styles.assetsContainer}>
          {seachDataList?.length > 0 ? (
            <View style={{flex: 1}}>
              <View style={styles.assetsHeard}>
                <Text style={styles.assetsHeardTitle}>{t("searchresult")}</Text>
              </View>
              <ScrollView>
                {seachDataList.map((item: DappRecentItem, i) => (
                  <TouchableOpacity style={styles.assetsList} key={item.name + i} onPress={() => goWebView(item)}>
                    <View style={styles.assetsListItem}>
                      <Avatar
                        rounded
                        title={item.name[0]}
                        source={{ uri: item.logo }}
                        containerStyle={styles.itemAvatar}
                      />
                      <View style={styles.itemDesc}>
                        <Text style={styles.descTitle}>{item.name}</Text>
                        <Text style={styles.descInfo}>{item.deep_link}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

          ) : (<View style={styles.nodataContainer}><Image source={require('assets/seach-nodata.png')} /><Text style={styles.nodata}>{t('nodata')}</Text></View>)}
        </SafeAreaView>
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
