import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity,Image  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { useDispatch, useSelector } from 'react-redux';
import {  SCREENWIDTH } from 'config/constants';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { formatDate ,subSplit} from 'utils'
import * as helper from 'apis/helper'
import { getAccountList } from 'reducers/walletStateReducer';
import { add } from 'react-native-reanimated';

type MessageScreenRouteProp = RouteProp<ScreensParamList, 'MessageScreen'>;
interface Props { }

interface TransferListItem {
  "amount": string,
  "ctime": string,
  "device": string,
  "from": string,
  "gas": string,
  "gas_use"?: string,
  "id": number,
  "ledger_index"?: any,
  "nonce": number,
  "state": number,
  "symbol": string,
  "to": string,
  "tx_hash": string,
  wallet: string,
  remarks: string,
}

function HomeScreen() {
  const {t} = useTranslation();
  const [messagelistData, setMessageListData] = useState([]);
  const isFocused = useIsFocused();  useEffect(() => {
    if (isFocused) {
      getMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  async function getMessage() {
    const { data } = await helper.get('/sys/notice/list',{})
    // console.log('===========/sys/notice/list=============');
    // console.log(data);
    // console.log('====================================');
    if (data && data.length) {
      setMessageListData(data)
    }
  }

  
  const Item1 = ({ item1, onPress1, style1 }) => (
    <TouchableOpacity onPress={onPress1} style={[styles.background, style1]}>
      <View style={styles.headView}>
        <Text style={styles.titleStyle}>{item1.type}</Text>
        <Text style={styles.timeStyle}>{formatDate(item1.rtime)}</Text>
      </View>
      <Text style={styles.desStyle}>{item1.title}</Text>
      <Text numberOfLines={2} style={styles.conStyle}>{item1.subtitle}</Text>
    </TouchableOpacity>
  )

  const renderItem1 = ({ item }) => {
    return (
      <Item1
        item1={item}
        style1={styles.itemStyle}
        // navigate: async () => await navigate('WebHtmlScreen', { title: '测试', uri: html })
        onPress1={() =>  navigate('WebHtmlScreen', { title: '通知详情', uri: item.content })}
      >

      </Item1>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {messagelistData.length>0 ?<FlatList
        data={messagelistData}
        style={styles.background}
        renderItem={renderItem1}
        keyExtractor={(item) => item.id}
      >
      </FlatList>:(<View style={styles.nodataContainer}><Image source={require('assets/seach-nodata.png')} /><Text style={styles.nodata}>{t('nodata')}</Text></View>)}
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const {t} = useTranslation();
  const walletlist = useSelector(getAccountList);
  const [addressList, setAddressList] = useState([String]);
  // console.log(walletlist);
  
  let arr = ["HECO","BSC","ETH"]
  walletlist.toArray
  // for (let index = 0; index < arr.length; index++) {
  //   const element = arr[index];
  //   walletlist.get(element)?.find(x => {
  //     const addStr = x.address
  //     addressList.push(x.address)
  //   })
  // }  
  // console.log(addressList);
  
  // walletlist.get('ETH')
  
  const [transferlistData, setTransferListData] = useState([]);
  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();  useEffect(() => {
    if (isFocused) {
      getTransferRecordList(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  async function getTransferRecordList(isRefresh?: boolean) {
    if (isFetching.current) {
      return;
    }
    if (!isRefresh && isEndReached.current) {
      return;
    }
    isFetching.current = true;
    setLoading(isRefresh ? 'refresh' : 'more');
    const {data} = await helper.post('/wallet/transfer_record', 
    {
      address_list:['0xf3e0c6F599a33E8cD5b273A377e925EBD327b13A'],
      id: isRefresh ? null : transferlistData[transferlistData.length - 1].id,
    })
    console.log('--------------------');
    console.log(data);
    console.log('--------------------');
    if (data && data.length) {
      setTransferListData(data)
    }
  }
  const Item2 = ({ item2,  style2 }) => (
    <View  style={[styles.background, style2]}>
      <View style = {styles.headView}>
        <Text style={styles.titleStyle}>{item2.form === item2.to ?'转入通知' :'转出通知'}</Text>
        <Text style={styles.timeStyle}>{item2.ctime}</Text>
      </View>
      <View style = {styles.centerView}>
        <Text style={styles.desStyle1}>{item2.wallet}</Text>
        <Text style={{
          fontSize: 18,
          fontWeight: '400',
          color: (item2.form === item2.to)?'#3DDD94':'#DD3D50',
        }}>{(item2.form === item2.to) ? '+ ' :'- ' }{item2.amount} {item2.symbol} </Text>
      </View>
      <View style = {styles.lineView}></View>
      <TouchableOpacity style = {styles.centerView} onPress={() =>
                        navigate('WebScreen', {
                          title: item2.symbol,
                          uri: item2?.remarks,
                        })
                      }>
        <Text style={styles.hashStyle1}>HASH:{subSplit(item2?.tx_hash, 14, 17)}</Text>
        <Image
          source = {require('assets/icon-20-arrow-right.png')}
          style = {styles.rightBtn}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItem2 = ({ item }) => {
    return (
      <Item2
        item2={item}
        style2={styles.itemStyle1}
        // onPress2={() => navigate('AboutUsScreen')}
      >
      </Item2>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {transferlistData.length > 0 ?<FlatList
        data={transferlistData}
        style={styles.background}
        renderItem={renderItem2}
        keyExtractor={(item) => item.id}
      >
      </FlatList>:(<View style={styles.nodataContainer}><Image source={require('assets/seach-nodata.png')} /><Text style={styles.nodata}>{t('nodata')}</Text></View>)}
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();


function MessageScreen({ }: Props) {
  const {t} = useTranslation();
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
      <Tab.Screen name={t("platformnotice")} component={HomeScreen} />
      <Tab.Screen name={t("tradeInformation")} component={SettingsScreen} />
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
    marginBottom:15,
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

export default MessageScreen;