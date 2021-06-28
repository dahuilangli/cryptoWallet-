import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity,Image  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import {  SCREENWIDTH } from 'config/constants';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import i18n from "i18n";
import * as helper from 'apis/helper'


type MessageScreenRouteProp = RouteProp<ScreensParamList, 'MessageScreen'>;
interface Props { }



const list1 = [
  {
    id: 1,
    title: '请警惕骗子',
    describe: '安全提醒',
    time: '2021-5-1 23:55',
    content: '近期有不法份子开始行动，骗局不断刷新不断刷新不断刷新不断刷...近期有不法份子开始行动，骗局不断刷新不断刷新不断刷新不断刷...',
  },
  {
    id: 1,
    title: '请警惕骗子',
    describe: '安全提醒',
    time: '2021-5-1 23:55',
    content: '近期有不法份子开始行动，骗局不断刷新不断刷新不断刷新不断刷...近期有不法份子开始行动，骗局不断刷新不断刷新不断刷新不断刷...',
  }
];

const list2 = [
  {
    id: '1',//分页表示
    form: '1111',//当前地址
    to: '11111',//目标地址
    amount: '111',//数量
    gas: '0.003948',//矿工费
    gas_unit: 'ETH',//矿工费单位
    time: '2021-5-1 23:55',//交易时间
    nonce: '111',//交易序号
    hash: '111',//交易哈希
    browser: '1111',//哈希查询跳转
  },
  {
    id: '1',//分页表示
    form: '1111',//当前地址
    to: '1111',//目标地址
    amount: '111',//数量
    gas: '0.003948',//矿工费
    gas_unit: 'ETH',//矿工费单位
    time: '2021-5-1 23:55',//交易时间
    nonce: '111',//交易序号
    hash: '111',//交易哈希
    browser: '1111',//哈希查询跳转
  },
]

function HomeScreen() {
  
  const Item1 = ({ item1, onPress1, style1 }) => (
    <TouchableOpacity onPress={onPress1} style={[styles.background, style1]}>
      <View style={styles.headView}>
        <Text style={styles.titleStyle}>{item1.title}</Text>
        <Text style={styles.timeStyle}>{item1.time}</Text>
      </View>
      <Text style={styles.desStyle}>{item1.describe}</Text>
      <Text numberOfLines={2} style={styles.conStyle}>{item1.content}</Text>
    </TouchableOpacity>
  )

  const renderItem1 = ({ item }) => {
    return (
      <Item1
        item1={item}
        style1={styles.itemStyle}
        onPress1={() => navigate('AboutUsScreen')}
      >

      </Item1>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list1}
        style={styles.background}
        renderItem={renderItem1}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    </SafeAreaView>
  );
}

function SettingsScreen() {

  const Item2 = ({ item2, onPress2, style2 }) => (
    <TouchableOpacity onPress={onPress2} style={[styles.background, style2]}>
      <View style = {styles.headView}>
        <Text style={styles.titleStyle}>{item2.form === item2.to ?'转入通知' :'转出通知'}</Text>
        <Text style={styles.timeStyle}>{item2.time}</Text>
      </View>
      <View style = {styles.centerView}>
        <Text style={styles.desStyle1}>{item2.form}</Text>
        <Text style={{
          fontSize: 18,
          fontWeight: '400',
          color: (item2.form === item2.to)?'#3DDD94':'#DD3D50',
        }}>{(item2.form === item2.to) ? '+ ' :'- ' }{item2.gas} {item2.gas_unit} </Text>
      </View>
      <View style = {styles.lineView}></View>
      <View style = {styles.centerView}>
        <Text style={styles.hashStyle1}>HASH:{item2.hash}</Text>
        <Image
          source = {require('assets/icon-20-arrow-right.png')}
          style = {styles.rightBtn}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => {
    return (
      <Item2
        item2={item}
        style2={styles.itemStyle1}
        onPress2={() => navigate('AboutUsScreen')}
      >
      </Item2>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list2}
        style={styles.background}
        renderItem={renderItem2}
        keyExtractor={(item) => item.id}
      >
      </FlatList>
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();


function MessageScreen({ }: Props) {
  return (
    <Tab.Navigator

      tabBarOptions={{
        showLabel: true,
        // 未选中字体的颜色
        inactiveTintColor: '#9CA4B3',
        // 选中的字体的颜色
        activeTintColor: '#3D73DD',
        labelStyle: { fontSize: 14, fontWeight: '600', with: 200, },
        indicatorStyle: { width: 28, backgroundColor: '#3D73DD', marginLeft: SCREENWIDTH / 4 - 14 },
        tabStyle: { height: 50 },
      }}
    >
      <Tab.Screen name={i18n.t("platformnotice")} component={HomeScreen} />
      <Tab.Screen name={i18n.t("tradeInformation")} component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  background: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  itemStyle: {
    height: 125,
    marginHorizontal: 20,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 8,
  },
  itemStyle1: {
    height: 130,
    marginHorizontal: 20,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 8,
  },
  headView: {
    marginHorizontal: 15,
    marginTop: 15,
    height: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerView:{
    marginHorizontal: 15,
    marginTop: 15,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA4B3',
  },
  timeStyle: {
    color: '#C4C8D2',
    fontSize: 13,
    fontWeight: '400',
  },
  desStyle: {
    marginTop: 15,
    marginHorizontal: 15,
    height: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#394867',
  },
  conStyle: {
    marginTop: 5,
    marginHorizontal: 15,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
    color: '#616D86',
    alignItems: 'center',
  },
  desStyle1:{
    fontSize: 14,
    fontWeight: '500',
    color: '#394867',
  },
  numberStyle:{
    fontSize: 18,
    fontWeight: '400',
    color: '#3DDD94',
  },
  lineView:{
    marginTop:15,
    height:0.5,
    backgroundColor:'#E9EDF1',
  },
  hashStyle1:{
    color:'#9CA4B3',
    fontSize:12,
    fontWeight:'400',
  },
  rightBtn:{
    width:8,
    height:15,
  }
});

export default MessageScreen;