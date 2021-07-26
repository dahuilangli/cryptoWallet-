import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants";
import { navigate } from 'components/navigationService';
import Swiper from 'react-native-swiper'
import { Avatar } from 'react-native-elements';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import { getChains, getDappSearchList } from 'reducers/dataStateReducer';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
import * as helper from 'apis/helper'
import { DappRecentItem } from 'actions/types';
import rnScript from 'helper/rn-script';

import RNFS from 'react-native-fs';
import { getAccountList, getUser } from 'reducers/walletStateReducer';

interface Props {
  jscontent: string
}
interface response {
  id: number,
  forward: any,
  img_pic: string,
  release: string
}


function DappScreen({ }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chains = useSelector(getChains)
  const user = useSelector(getUser);
  const walletlist = useSelector(getAccountList);
  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)
  const dppSearchList = useSelector(getDappSearchList)
  const [bannerlistData, setBannerListData] = useState([]);
  const isFocused = useIsFocused();
  const [jscontent, setJscontent] = useState("")
 
  useEffect(() => {
    if (isFocused) {
      getBanner();
    }

  }, [isFocused]);
  useEffect(() => {
    if(jscontent == ""){
      let filePath = "";
      if (Platform.OS === 'ios') {
        filePath = `${RNFS.MainBundlePath}/web3.min.js`
      } else {
        filePath = `web3.min.js`
      }
      RNFS.readFile(filePath, 'utf8')
      .then((content) => {
          const type: any = thisUser?.type
          
          const chainid =  chains[type].chain_id
          const chain =  chains[type].url
          
          // const chainid =  'ox3'
          // const chain = "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"

          const script = rnScript(thisUser?.address,chainid,chain)
          const jscotent =`
          ${content}
          ${script}
          `;
          setJscontent(jscotent)
        })
    }
  },[]);
  function getBanner() {
    helper.get('/dapp/banner', {}).then((res: any) => {
      setBannerListData(res)
    })

  }
  async function goWebView(item: DappRecentItem) {
    dispatch(walletAction.setDappSearchList(item));
    navigate('DappWebScreen', {
      title: item.name,
      uri: item.deepLink,
      item,
      jscontent
    })
  }
  const keyExtractor = (item: any, index: { toString: () => any; }) => index.toString()

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => goWebView(item)}
      >
        <View style={styles.itemView}>
          {
            item?.logo ? (
              <Avatar rounded size={40} title={item?.name[0]} source={{ uri: item.logo }} containerStyle={styles.leftIcon} />
            ) : (
              <Avatar rounded size={40} title={item?.name[0]} containerStyle={styles.leftIcon} />
            )
          }
          <View style={styles.contentView}>
            <Text style={{ height: 20, fontSize: 14, fontWeight: '500', color: '#394867' }}>{item.name}</Text>
            <Text style={{ height: 20, fontSize: 12, fontWeight: '400', color: '#9CA4B3' }}>{item.deepLink}</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, height: 0.5, backgroundColor: '#E9EDF1' }} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <View style={styles.banner} >
        <Swiper
          key={bannerlistData.length}
          style={styles.wrapper}
          // removeClippedSubviews={true}
          // showsButtons={false}         //显示控制按钮
          loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
          autoplay={true}                //自动轮播
          autoplayTimeout={3}          //每隔3秒切换
          dot={<View style={{           //未选中的圆点样式
            backgroundColor: 'rgba(255,255,255,0.5)',
            width: 4,
            height: 4,
            borderRadius: 2,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 9,
            marginBottom: 15,

          }} />}
          activeDot={<View style={{    //选中的圆点样式
            backgroundColor: '#FFFFFF',
            width: 8,
            height: 4,
            borderRadius: 2,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 9,
            marginBottom: 15,
          }} />}
          paginationStyle={{
            left: SCREENWIDTH - 52,
            right: 20,
          }}

        >
          {bannerlistData.map((item: response, index) => (
            <Image key={item.id} source={{ uri: item.img_pic }} style={styles.slide1} />
          ))}
        </Swiper>
      </View>
      <View style={styles.searchView}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {
            navigate('DappSearchScreen');
          }}
        >
          <Image style={styles.searchImage} source={require('assets/icon_search.png')} />
          <Text style={styles.searchInput}>{t("enterDappURL")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanImage} onPress={() => {
          navigate('ScanQRCode', { title: 'DappScreen', assetsList: [] });
        }}>
          <Image style={{ width: 20, height: 20 }} source={require('assets/icon_scan_wallet.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.recentText}>{t("recent")}</Text>
      <View style={styles.smallLine} />
      <View style={styles.bigLine} />
      {dppSearchList.length > 0 ? <FlatList
        keyExtractor={keyExtractor}
        data={dppSearchList}
        renderItem={renderItem}
      /> : (<View style={styles.nodataContainer}><Image source={require('assets/icon_norecord.png')} /><Text style={styles.nodata}>{t('norecord')}</Text></View>)}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
  },
  banner: {
    width: SCREENWIDTH,
    height: SCREENWIDTH * 240 / 375,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    padding: 10,
    position: 'absolute',
    right: '6%',
  },
  slide1: {
    flex: 1,
  },
  text: {
    color: '#ff6fa3',
    fontSize: 30,
    fontWeight: 'bold'
  },
  searchView: {
    marginTop: -30,
    marginHorizontal: 20,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.09,
    shadowOffset: { width: 4, height: 8 },
  },
  searchImage: {
    marginLeft: 15,
    width: 20,
    height: 20,
  },
  searchInput: {
    height: 20,
    marginLeft: 10,
    width: SCREENWIDTH - 120,
    fontSize: 13,
    fontWeight: '400',
    color: '#D4D8E1',
  },
  scanImage: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  recentText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    color: '#394867',
    marginHorizontal: 20,
  },
  smallLine: {
    backgroundColor: '#3D73DD',
    height: 3,
    width: 36,
    marginLeft: 20,
    marginTop: 17,
  },
  bigLine: {
    height: 0.5,
    backgroundColor: '#E9EDF1',
  },
  detailView: {
    marginHorizontal: 20,
  },
  itemStyle: {
    height: 70,
    width: SCREENWIDTH,
  },
  itemView: {
    height: 70,
    width: SCREENWIDTH,
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftIcon: {
    marginLeft: 20,
    marginVertical: 15,
  },
  contentView: {
    marginLeft: 10,
    height: 40,
  },
  nodataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  nodata: {
    fontSize: 16,
    color: '#9CA4B3',
    fontWeight: '500',
  }
});
export default DappScreen;
