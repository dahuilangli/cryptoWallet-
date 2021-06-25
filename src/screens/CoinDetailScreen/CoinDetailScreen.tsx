import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { Button } from 'react-native-elements';

import {  SCREENWIDTH } from 'config/constants';
import { navigate } from 'components/navigationService';
import StickyHeader from 'components/StickyHeader';
interface Props {
  route: {
    params: {
      title: string;
    };
  };
}
const list = [
  {
    title: '转入',
    status: 0,
    value: '+0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转出',
    status: 1,
    value: '-0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转出',
    status: 1,
    value: '-0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转入',
    status: 0,
    value: '+0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转入',
    status: 0,
    value: '+0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转入',
    status: 0,
    value: '+0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转入',
    status: 0,
    value: '+0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
  {
    title: '转入',
    status: 0,
    value: '+0.043432',
    time: '2021-5-1 23:33',
    gas: '0',
    hash: '0xf9cbae4f18e6……83f15e8f0f8f2f480',
  },
];

function CoinDetailScreen({ route }: Props) {
  const { title } = route.params;
  const [navStatus, setNavStatus] = useState(false);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [headHeight, setHeadHeight] = useState(-1);

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
              source={require('assets/img-40-coointype-eth.png')}
            />
            <View style={styles.navAmount}>
              <Text style={styles.navUSDT}>56.867491</Text>
              <Text style={styles.navCNY}>≈ ¥345454.43</Text>
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
                  source={require('assets/img-40-coointype-eth.png')}
                />
                <Text style={styles.subNavTitle}>{title}</Text>
                <View style={styles.subNavAmount}>
                  <Text style={styles.subNavUSDT}>56.867491</Text>
                  <Text style={styles.subNavCNY}>≈ ¥345454.43</Text>
                </View>
              </View>
            ) : undefined}
          </StickyHeader>

          <View style={styles.transactions}>
            <Text style={styles.transactionsTitle}>{i18n.t("Transaction Record")}</Text>
            <View style={styles.transactionsList}>
              {list.map((item, i) => (
                <View style={styles.list} key={i}>
                  <View style={styles.listItem}>
                    <View style={styles.listNav}>
                      <Text style={styles.listNavTitle}>{item.title}</Text>
                      <View style={styles.listNavStatus}>
                        <Text style={styles.statusText}>
                          {item?.status > 0
                            ? i18n.t("completed")
                            : item?.status < 0
                            ? i18n.t("failure")
                            : i18n.t("processing")}
                        </Text>
                      </View>
                      <View style={styles.listNavAmount}>
                        <Text style={styles.amountText}>{item.value}</Text>
                      </View>
                    </View>
                    <View style={styles.listNavDesc}>
                      <Text style={styles.descText}>{i18n.t("transactiontime")}:{item?.time}</Text>
                      <Text style={styles.descText}>
                        {i18n.t("handlefee")}:{item?.gas} ETH
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.listNavHash}
                      onPress={() =>
                        navigate('WebScreen', {
                          title: 'Ethereum',
                          uri: 'https://cn.etherscan.com/tx/${item?.hash}',
                        })
                      }
                    >
                      <Text style={styles.hashText}>HASH:{item?.hash}</Text>
                      <Image
                        style={styles.hashGoImg}
                        source={require('assets/icon-20-arrow-right.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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
          title={i18n.t("Transfer")}
          titleStyle={styles.buttonTitle}
        />
        <Button
          icon={
            <Image
              style={styles.buttonIcon}
              source={require('assets/icon-20-收款-light.png')}
            />
          }
          buttonStyle={styles.buttonOne}
          title={i18n.t("Receive")}
          titleStyle={styles.buttonTitle}
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
    flex: 1,
    justifyContent: 'space-between',
  },
  nav: {
    alignItems: 'center',
    paddingVertical: 30,
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
  listNavStatus: {
    backgroundColor: '#FFC029',
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
    color: '#3DDD94',
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
});
export default CoinDetailScreen;
