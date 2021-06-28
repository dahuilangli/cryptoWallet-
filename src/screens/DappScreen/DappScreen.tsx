import React, { useState } from 'react';
import i18n from "i18n";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants";
import { navigate } from 'components/navigationService';
import Swiper from 'react-native-swiper'
import { ListItem, Avatar } from 'react-native-elements';
import { Image } from 'react-native-elements/dist/image/Image';
import { FlatList, TextInput } from 'react-native-gesture-handler';

import * as helper from 'apis/helper'
interface Props {

}

const list = [
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-etherscan.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-heco.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-gasnow.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-heco.png'),
    content: 'ETH区块链浏览器',
  }, {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-etherscan.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-heco.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-gasnow.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-heco.png'),
    content: 'ETH区块链浏览器',
  }, {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-etherscan.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-heco.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-gasnow.png'),
    content: 'ETH区块链浏览器',
  },
  {
    name: 'Etherscan',
    aver_url: require('assets/icon-40-heco.png'),
    content: 'ETH区块链浏览器',
  }
]

function DappScreen({ }: Props) {
  async function getBanner(){
      const result: any = await helper.jwtGet('/dapp/banner', {})
      console.log('==============banner=================');
      console.log(JSON.stringify(result,null, 5));
      console.log('====================================');
  }
  getBanner()
  const keyExtractor = (item: any, index: { toString: () => any; }) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() => navigate('DappWebScreen', { title: item.name, item: item, uri: 'https://reactnative.cn/docs/next/webview#onloadstart' })}
    >
      <View style={styles.itemView}>
        <Avatar source={item.aver_url} containerStyle={styles.leftIcon} />
        <View style={styles.contentView}>
          <Text style={{ height: 20, fontSize: 14, fontWeight: '500', color: '#394867' }}>{item.name}</Text>
          <Text style={{ height: 20, fontSize: 12, fontWeight: '400', color: '#9CA4B3' }}>{item.content}</Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, height: 0.5, backgroundColor: '#E9EDF1' }} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <View style={styles.banner} >
        <Swiper
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
          <View style={styles.slide1}>
            <Text style={styles.text}>青衣</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>冷秋</Text>
          </View>
          <View style={styles.slide1}>
            <Text style={styles.text}>听雨</Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.searchView}>
        <TouchableOpacity
          style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}
          onPress={() => {
            navigate('DappSearchScreen');
          }}
        >
          <Image style={styles.searchImage} source={require('assets/icon-20-搜索.png')} />
          <Text style={styles.searchInput}>{i18n.t("enterDappURL")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanImage} onPress={() => {
            navigate('ScanQRCode');
          }}>
        <Image style={{width:20,height:20}} source={require('assets/icon-20-扫一扫.png')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.recentText}>{i18n.t("recent")}</Text>
      <View style={styles.smallLine} />
      <View style={styles.bigLine} />
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9bebe5'
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
    width: 40,
    height: 40,
  },
  contentView: {
    marginLeft: 10,
    height: 40,
  },

});
export default DappScreen;
