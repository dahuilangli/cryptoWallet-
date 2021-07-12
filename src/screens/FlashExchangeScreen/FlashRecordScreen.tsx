/** 
 * 闪兑记录
*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';

import * as helper from 'apis/helper'
import { mobileType } from 'apis/common';
type FlashRecordScreenRouteProp = RouteProp<ScreensParamList, 'FlashRecordScreen'>;
interface Props {
  route: {
    params: {
      equipmentNo?: string
    }
  }
}
const limit = 10;

const Item = ({ item, style }) => (

  <TouchableOpacity style={style}>
    <Text style={styles.timeText}>{item?.begin_date}</Text>
    <View style={styles.lineView}></View>
    <View style={styles.outView}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.outImage} source={require('assets/img-40-coointype-币安.png')} />
        <Text style={styles.outText}>{item?.from_coin_code}</Text>
      </View>
      <Text style={styles.outNumber}>- {item?.from_coin_amt}</Text>
    </View>
    <Image style={styles.dianImage} source={require('assets/img-40-coointype-币安.png')} />
    <View style={styles.inView}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.outImage} source={require('assets/img-40-coointype-币安.png')} />
        <Text style={styles.outText}>{item?.to_coin_code}</Text>
      </View>
      <Text style={styles.inNumber}>+ {item?.to_coin_amt}</Text>
    </View>

  </TouchableOpacity>
);


function FlashRecordScreen({ route }: Props) {
  const { equipmentNo } = route.params;
  const source_type = mobileType.toUpperCase();


  const { t } = useTranslation();
  const [tradeList, setTradeList] = useState([])

  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getFlashRedemptionList(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  async function getFlashRedemptionList(isRefresh?: boolean) {
    if (isFetching.current) {
      return;
    }
    if (!isRefresh && isEndReached.current) {
      return;
    }
    isFetching.current = true;
    setLoading(isRefresh ? 'refresh' : 'more');
    console.log('====================================');
    console.log({
      equipment_no: equipmentNo,
      source_type,
      page_no: isRefresh ? 1 : tradeList.length > 0 ? Math.ceil(tradeList.length / limit) : limit,
      page_size: limit
    });
    console.log('====================================');
    const data: any = await helper.post('/swft/all_trade', {
      equipment_no: equipmentNo,
      source_type,
      page_no: isRefresh ? 1 : tradeList.length > 0 ? Math.ceil(tradeList.length / limit) : limit,
      page_size: limit
    })
    setLoading(null);
    if (data && data.page_content) {
      let currentCount;
      if (isRefresh) {
        currentCount = data.page_content.length;
        setTradeList(data.page_content);
      } else {
        currentCount = data.page_content.length + tradeList.length;
        setTradeList(tradeList.concat(data.page_content));
      }
      if (currentCount >= data.total_count) {
        isEndReached.current = true;
      } else {
        isEndReached.current = false;
      }
    }
    isFetching.current = false;
  }
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        style={styles.marginItem}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tradeList}
        style={styles.item}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.order_id + index}
        refreshControl={
          <RefreshControl
            title="正在加载中..."
            colors={['red','green','blue']}
            refreshing={loading === 'refresh'}
            onRefresh={() => getFlashRedemptionList(true)}
          />
        }
        onEndReachedThreshold={0.1}
        onEndReached={() => getFlashRedemptionList()}
        ListFooterComponent={() =>
          loading === 'more' ? <ActivityIndicator /> : null
        }
      >

      </FlatList>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  marginItem: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  timeText: {
    marginTop: 10,
    marginBottom: 9.5,
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA4B3',
    marginHorizontal: 15,
  },
  lineView: {
    height: 0.5,
    backgroundColor: '#E9EDF1',
    marginBottom: 14,
  },
  outView: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  outImage: {
    width: 20,
    height: 20,
  },
  outText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#616D86',
    marginLeft: 10,
  },
  outNumber: {
    fontSize: 20,
    fontWeight: '400',
    color: '#DD3D50'
  },
  dianImage: {
    marginLeft: 24.5,
    marginVertical: 1,
    width: 1,
    height: 14,
  },
  inView: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inNumber: {
    fontSize: 20,
    fontWeight: '400',
    color: '#3DDD94',
  }
});

export default FlashRecordScreen;