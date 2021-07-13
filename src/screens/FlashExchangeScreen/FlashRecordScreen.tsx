/** 
 * 闪兑记录
*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
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
    <View style={styles.headersTitle}>
      <Text style={styles.timeText}>{item?.begin_date}</Text>
      <View style={item?.trade_state === 'timeout' || item?.trade_state === 'wait_refund' || item?.trade_state === 'refund_complete' ?
        { ...styles.titleStatus, backgroundColor: '#D4D8E1' } :
        item?.trade_state === 'wait_deposits' || item?.trade_state === 'wait_fee' || item?.trade_state === 'exchange' ?
          { ...styles.titleStatus, backgroundColor: '#FFC029' } : { ...styles.titleStatus, backgroundColor: '#FFC029' }}>
        <Text style={styles.statusText}>
          {(() => {
            switch (item?.trade_state) {
              case "wait_deposits" || "wait_fee" || "exchange":
                return '等待中';
                break;
              case "complete":
                return "完成";
                break;
              default:
                return "失败"
                break;
            }
          }
          )()}
        </Text>
      </View>
    </View>
    <View style={styles.outView}>
      <Image style={styles.dianImage} source={require('assets/from_to.png')} />
      <View style={styles.outViewDesc}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Text style={styles.outText}>{item?.from_coin_code}</Text>
          <Text style={item?.trade_state === 'timeout' || item?.trade_state === 'wait_refund' || item?.trade_state === 'refund_complete' ? { ...styles.outTextNumber, color: '#C4C8D2' } : { ...styles.outTextNumber, color: '#DD3D50' }}>- {item?.from_coin_amt}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Text style={styles.outText}>{item?.to_coin_code}</Text>
          <Text style={item?.trade_state === 'timeout' || item?.trade_state === 'wait_refund' || item?.trade_state === 'refund_complete' ? { ...styles.inTextNumber, color: '#C4C8D2' } : { ...styles.inTextNumber, color: '#3DDD94' }}>+ {item?.to_coin_amt}</Text>
        </View>
      </View>
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
    const data: any = await helper.post('/swft/all_trade', {
      equipment_no: equipmentNo,
      source_type,
      page_no: isRefresh ? 1 : tradeList.length > 0 ? Math.ceil(tradeList.length / limit) : limit,
      page_size: limit
    })
    console.log(data);
    
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
      {tradeList.length > 0 ? (
        <FlatList
          data={tradeList}
          style={styles.item}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.order_id + index}
          refreshControl={
            <RefreshControl
              title={t("loading")}
              colors={['red', 'green', 'blue']}
              refreshing={loading === 'refresh'}
              onRefresh={() => getFlashRedemptionList(true)}
            />
          }
          onEndReachedThreshold={0.1}
          onEndReached={() => getFlashRedemptionList()}
          ListFooterComponent={() =>
            loading === 'more' ? <ActivityIndicator /> : null
          }
        />
      )
        : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 140, width: 240 }} source={require('assets/icon_norecord.png')}></Image>
            <Text style={styles.notdata}>{t("noRecords")}</Text>
          </View>
        )}

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
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  headersTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#E9EDF1',
    borderBottomWidth: 0.5,
  },
  timeText: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA4B3',
  },
  titleStatus: {
    borderRadius: 10,
    marginVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
  },
  statusText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  outView: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  outViewDesc: {
    flexDirection: 'column',
    flex: 1,
    height: 58,
    justifyContent: 'space-between',
  },
  dianImage: {
    width: 15,
    height: 50,
  },
  outImage: {
    width: 20,
    height: 20,
  },
  outText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#616D86',
    marginLeft: 5,
  },
  outTextNumber: {
    fontSize: 20,
    fontWeight: '400',
  },
  inTextNumber: {
    fontSize: 20,
    fontWeight: '400',
  },
  notdata: {
    fontSize: 16,
    color: '#CCCFD9',
    fontWeight: '500',
  },
});

export default FlashRecordScreen;