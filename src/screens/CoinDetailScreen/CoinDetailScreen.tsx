import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  Animated,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { SCREENWIDTH } from 'config/constants';
import { navigate } from 'components/navigationService';
import StickyHeader from 'components/StickyHeader';
import * as helper from 'apis/helper'
import { AssetsList } from 'actions/types';
import { getUser } from 'reducers/walletStateReducer';
import { useSelector } from 'react-redux';
import { subSplit } from 'utils';
import { getCurrency } from 'reducers/dataStateReducer';
interface Props {
  route: {
    params: {
      title: string;
      assetsList: AssetsList;
    };
  };
}
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

function CoinDetailScreen({ route }: Props) {
  const { title, assetsList } = route.params;
  const user = useSelector(getUser);
  const currency = useSelector(getCurrency);
  const [navStatus, setNavStatus] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [headHeight, setHeadHeight] = useState(-1);
  const { t } = useTranslation();
  const [transferlistData, setTransferListData] = useState([]);

  const [loading, setLoading] = useState<'refresh' | 'more' | null>(null);
  const isEndReached = React.useRef(false);
  const isFetching = React.useRef(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTransferRecordList(true);
    }
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
    const data = await helper.get(
      '/wallet/transfer_record',
      {
        id: isRefresh ? null : transferlistData[transferlistData.length - 1].id,
        address: user?.address,
        symbol: assetsList?.symbol,
        wallet: assetsList?.wallet
      }
    );
    setLoading(null);
    if (data) {
      if (isRefresh) {
        console.log('=========下拉刷新===========');
        setTransferListData(data);
      } else {
        console.log('=========上拉加载===========');
        setTransferListData(transferlistData.concat(data));
      }
      if (data.length === 0) {
        console.log('=========不能再上拉加载了===========');
        isEndReached.current = true;
      } else {
        console.log('=========可以进行上拉加载===========');
        isEndReached.current = false;
      }
    }
    isFetching.current = false;
  }

  /**
 * 上拉触底
 */
  const _contentViewScroll = (e) => {

    var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度

    if (offsetY + oriageScrollHeight >= contentSizeHeight) {
      console.log('==========上拉============');
      getTransferRecordList(false)
      // 在这里面加入你需要指行得方法和加载数据
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              let { contentOffset } = event.nativeEvent;
              if (contentOffset.y >= 229) {
                setNavStatus(true);
              } else {
                setNavStatus(false);
              }
            },
          }, // 可选的异步监听函数
        )}
        scrollEventThrottle={1}
        refreshControl={
          <RefreshControl
            refreshing={loading === 'refresh'}
            onRefresh={() => getTransferRecordList(true)}
            colors={['red','green','blue']}
            title="正在加载中..."
          >
          </RefreshControl>
        }
        onMomentumScrollEnd={_contentViewScroll}
        automaticallyAdjustContentInsets={false}
      >
        <View style={styles.main}>
          <View
            style={styles.nav}
            onLayout={(e) => {
              let { height } = e.nativeEvent.layout;
              setHeadHeight(height); // 给头部高度赋值
            }}
          >
            <Image
              style={styles.navImage}
              source={{ uri: assetsList?.icon }}
            />
            <View style={styles.navAmount}>
              <Text style={styles.navUSDT}>{assetsList?.balance}</Text>
              <Text style={styles.navCNY}>≈ {currency === 'USDT' ? '$' : '¥'}{assetsList?.rate_price}</Text>
            </View>
          </View>
          {/* <View
            onLayout={(e) => {
              let { height } = e.nativeEvent.layout;
              setHeadHeight(height); // 给头部高度赋值
            }}
          /> */}
          <StickyHeader
            stickyHeaderY={headHeight} // 把头部高度传入
            stickyScrollY={scrollY} // 把滑动距离传入
          >
            {navStatus ? (
              <View style={styles.subNav}>
                <Image
                  style={styles.subNavImage}
                  source={{ uri: assetsList?.icon }}
                />
                <Text style={styles.subNavTitle}>{title}</Text>
                <View style={styles.subNavAmount}>
                  <Text style={styles.subNavUSDT}>{assetsList?.balance}</Text>
                  <Text style={styles.subNavCNY}>≈ {currency === 'USDT' ? '$' : '¥'}{assetsList?.rate_price}</Text>
                </View>
              </View>
            ) : undefined}
          </StickyHeader>

          <View style={styles.transactions}>
            <Text style={styles.transactionsTitle}>{t("TransactionRecord")}</Text>

            <View style={styles.transactionsList}>
              {transferlistData.length > 0 ? (
                <View>

                  {
                    transferlistData.map((item: TransferListItem, i) => (
                      <View style={styles.list} key={i}>
                        <View style={styles.listItem}>
                          <View style={styles.listNav}>
                            <Text style={styles.listNavTitle}>{item?.from === user?.address ? '转出' : '转入'}</Text>
                            <View style={item?.state > 0 ? styles.listNavStatus_1 : item?.state < 0 ? styles.listNavStatus_def : styles.listNavStatus_0}>
                              <Text style={styles.statusText}>
                                {item?.state > 0
                                  ? t("completed")
                                  : item?.state < 0
                                    ? t("failure")
                                    : t("processing")}
                              </Text>
                            </View>
                            <View style={styles.listNavAmount}>
                              <Text style={
                                item?.state < 0 ?
                                  { ...styles.amountText, color: '#D4D8E1' } :
                                  item?.from === user?.address ?
                                    { ...styles.amountText, color: '#DD3D50' } :
                                    { ...styles.amountText, color: '#3DDD94' }
                              }>
                                {item?.from === user?.address ? '-' : '+'}{item?.amount}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.listNavDesc}>
                            <Text style={styles.descText}>{t("transactiontime")}: {item?.ctime}</Text>
                            <Text style={styles.descText}>
                              {t("handlefee")}: {item?.gas} {user.type}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.listNavHash}
                            onPress={() =>
                              navigate('WebScreen', {
                                title: 'Ethereum',
                                uri: item?.remarks,
                              })
                            }
                          >
                            <Text style={styles.hashText}>HASH: {subSplit(item?.tx_hash, 14, 17)}</Text>
                            <Image
                              style={styles.hashGoImg}
                              source={require('assets/icon-20-arrow-right.png')}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))
                  }
                  {
                    loading === 'more' ? <ActivityIndicator /> : null
                  }

                </View>
              ) : (
                <View style={{ marginTop: 80, alignItems: 'center', justifyContent: 'center' }}>
                  <Image style={{ height: 140, width: 240 }} source={require('assets/缺省-无记录.png')}></Image>
                  <Text style={styles.notdata}>{t("noRecords")}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          type="outline"
          icon={
            <Image
              style={styles.buttonIcon}
              source={require('assets/icon-20-转账-light.png')}
            />
          }
          buttonStyle={styles.button}
          title={t("Transfer")}
          titleStyle={styles.buttonTitle}
          onPress={() => navigate('TransferScreen', { assetsList: [assetsList] })}
        />
        <Button
          icon={
            <Image
              style={styles.buttonIcon}
              source={require('assets/icon-20-收款-light.png')}
            />
          }
          buttonStyle={styles.buttonOne}
          title={t("Receive")}
          titleStyle={styles.buttonTitle}
          onPress={() => navigate('ReceivePaymentScreen', { address: user?.address })}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  main: {
    // flex: 1,
    // justifyContent: 'space-between',
  },
  nav: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  navImage: {
    width: 80,
    height: 80,
  },
  navAmount: {
    alignItems: 'center',
  },
  navUSDT: {
    fontSize: 20,
    color: '#394867',
    fontWeight: '400',
    marginTop: 20,
  },
  navCNY: {
    fontSize: 16,
    color: '#C4C8D2',
    fontWeight: '400',
    marginTop: 10,
  },
  subNav: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9EDF1',
  },
  subNavImage: {
    width: 40,
    height: 40,
  },
  subNavTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#394867',
    paddingLeft: 10,
  },
  subNavAmount: {
    flex: 1,
    alignItems: 'flex-end',
  },
  subNavUSDT: {
    fontSize: 16,
    color: '#394867',
    fontWeight: '400',
  },
  subNavCNY: {
    fontSize: 14,
    color: '#C4C8D2',
    fontWeight: '400',
  },
  transactions: {
    
    marginHorizontal: 20,
  },
  transactionsTitle: {
    fontSize: 18,
    color: '#394867',
    fontWeight: '500',
    paddingTop: 20,
  },
  transactionsList: {
    paddingTop: 15,
  },
  list: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 15,
  },
  listItem: {
    paddingVertical: 15,
  },
  listNav: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    lineHeight: 20,
    alignItems: 'center',
  },
  listNavTitle: {
    fontSize: 16,
    color: '#394867',
    fontWeight: '500',
  },
  listNavStatus_0: {
    backgroundColor: '#FFC029',
    borderRadius: 10,
    marginLeft: 8,
  },
  listNavStatus_1: {
    backgroundColor: '#14CC25',
    borderRadius: 10,
    marginLeft: 8,
  },
  listNavStatus_def: {
    backgroundColor: '#D4D8E1',
    borderRadius: 10,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  listNavAmount: {
    flex: 1,
  },
  amountText: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '400',
  },
  listNavDesc: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9EDF1',
  },
  descText: {
    fontSize: 11,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  listNavHash: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hashText: {
    fontSize: 12,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  hashGoImg: {
    width: 8,
    height: 20,
  },
  buttonContainer: {
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopColor: '#FFFFFF',
    borderTopWidth: 1,
    paddingHorizontal: 20,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    width: (SCREENWIDTH - (40 + 15)) / 2,
    paddingVertical: 15,
  },
  buttonOne: {
    backgroundColor: '#263C75',
    borderRadius: 8,
    width: (SCREENWIDTH - (40 + 15)) / 2,
    paddingVertical: 15,
    marginLeft: 15,
  },
  buttonTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  notdata: {
    fontSize: 16,
    color: '#CCCFD9',
    fontWeight: '500',
  },
});
export default CoinDetailScreen;
