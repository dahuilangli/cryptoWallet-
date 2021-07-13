import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { SCREENWIDTH } from 'config/constants';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, subSplit } from 'utils'
import * as helper from 'apis/helper'
import { getAccountList } from 'reducers/walletStateReducer';
import { CHAINS } from 'config/constants';
type MessageScreenRouteProp = RouteProp<ScreensParamList, 'MessageScreen'>;
interface Props { }

function HomeScreen() {
  const { t } = useTranslation();
  const [messagelistData, setMessageListData] = useState([]);
  const isFocused = useIsFocused(); useEffect(() => {
    if (isFocused) {
      getMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  function getMessage() {
    helper.get('/sys/notice/list', {}).then((res: any) => {
      setMessageListData(res)
    })

  }


  const Item1 = ({ item1, onPress1}) => (
    <TouchableOpacity onPress={onPress1} style={item1 === messagelistData[0]? {...styles.itemStyle,marginTop:15}:{...styles.itemStyle}}>
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
        onPress1={() =>  navigate('WebHtmlScreen', { title: t("noticedetails"), uri: item.content })}
      >

      </Item1>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {messagelistData.length > 0 ? <FlatList
        data={messagelistData}
        style={styles.background}
        renderItem={renderItem1}
        keyExtractor={(item) => item.id}
      >
      </FlatList> : (<View style={styles.nodataContainer}><Image source={require('assets/icon_nomessage.png')} /><Text style={styles.nodata}>{t('nomessage')}</Text></View>)}
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const { t } = useTranslation();
  const walletlist = useSelector(getAccountList);
  var addressListData: (string | undefined)[] = [];
  // console.log(walletlist);

  walletlist.map((item, i) => {
    if (item.length > 0) {
      item.map((object, j) => {   
        if (addressListData.indexOf(object.address) === -1) {
          addressListData.unshift(object.address)
        }
      })
    }
  })
  
  const [transferlistData, setTransferListData] = useState([]);
  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused(); useEffect(() => {
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
    const data: any = await helper.post('/wallet/transfer_record',
      {
        address_list: addressListData,
        id: isRefresh ? null : transferlistData[transferlistData.length - 1].id,
      })
    setLoading(null);
    if (data) {
      if (isRefresh) {
        // console.log('=========下拉刷新===========');
        setTransferListData(data);
      } else {
        // console.log('=========上拉加载===========');
        setTransferListData(transferlistData.concat(data));
      }
      if (data.length === 0) {
        // console.log('=========不能再上拉加载了===========');
        isEndReached.current = true;
      } else {
        // console.log('=========可以进行上拉加载===========');
        isEndReached.current = false;
      }
    }
    isFetching.current = false;
    // if(data.)
  }
  const Item2 = ({ item2, style2 }) => (
    <View style={item2 === transferlistData[0] ?{...styles.itemStyle1 ,marginTop:15}:{...styles.itemStyle1}}>
      <View style={styles.headView}>
        <Text style={styles.titleStyle}>{item2.form === item2.to ? '转入通知' : '转出通知'}</Text>
        <Text style={styles.timeStyle}>{item2.ctime}</Text>
      </View>
      <View style={styles.centerView}>
        <Text style={styles.desStyle1}>{item2.wallet}</Text>
        <Text style={{
          fontSize: 18,
          fontWeight: '400',
          color: (item2.form === item2.to) ? '#3DDD94' : '#DD3D50',
        }}>{(item2.form === item2.to) ? '+ ' : '- '}{item2.amount} {item2.symbol} </Text>
      </View>
      <View style={styles.lineView}></View>
      <TouchableOpacity style={styles.centerView} onPress={() =>
        navigate('WebScreen', {
          title: item2.symbol,
          uri: item2?.remarks,
        })
      }>
        <Text style={styles.hashStyle1}>HASH:{subSplit(item2?.tx_hash, 14, 17)}</Text>
        <Image
          source={require('assets/icon_arrow_right.png')}
          style={styles.rightBtn}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItem2 = ({ item }) => {
    return (
      <Item2
        item2={item}
      >
      </Item2>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {transferlistData.length > 0 ? <FlatList
        data={transferlistData}
        style={styles.background}
        renderItem={renderItem2}
        keyExtractor={(item, index) => item?.id}
        refreshControl={
          <RefreshControl
            title="正在加载中..."
            colors={['red', 'green', 'blue']}
            refreshing={loading === 'refresh'}
            onRefresh={() => getTransferRecordList(true)}
          />
        }
        onEndReachedThreshold={0.1}
        onEndReached={() => getTransferRecordList()}
        ListFooterComponent={() =>
          loading === 'more' ? <ActivityIndicator /> : null
        }
      >
      </FlatList> : (<View style={styles.nodataContainer}><Image source={require('assets/icon_nomessage.png')} /><Text style={styles.nodata}>{t('nomessage')}</Text></View>)}
    </SafeAreaView>
  );
}

const Tab = createMaterialTopTabNavigator();


function MessageScreen({ }: Props) {
  const { t } = useTranslation();
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
    marginBottom: 20,
    borderRadius: 8,
  },
  itemStyle1: {
    height: 130,
    marginHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 8,
  },
  headView: {
    marginHorizontal: 15,
    marginTop: 15,
    height: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerView: {
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
    marginBottom: 15,
    marginHorizontal: 15,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '400',
    color: '#616D86',
    alignItems: 'center',
  },
  desStyle1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#394867',
  },
  numberStyle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#3DDD94',
  },
  lineView: {
    marginTop: 15,
    height: 0.5,
    backgroundColor: '#E9EDF1',
  },
  hashStyle1: {
    color: '#9CA4B3',
    fontSize: 12,
    fontWeight: '400',
  },
  rightBtn: {
    width: 8,
    height: 15,
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