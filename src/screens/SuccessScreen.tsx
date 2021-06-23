import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Image,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
import { Account } from 'actions/types';

// import { setGenericPassword } from 'utils/keyChain';
interface Props {
  route: {
    params: {
      title: string;
      accountInfo: Account;
    };
  };
}
const SuccessScreen = ({ route }: Props) => {
  let { title } = route.params;
  let { accountInfo } = route.params;
  console.log('====================================');
  console.log(accountInfo);
  console.log('====================================');
  const dispatch = useDispatch();
  async function storageAccount() {
    try {
      // await setGenericPassword('account', JSON.stringify(accountInfo));
      await dispatch(walletAction.setAccountList(accountInfo));
    } catch (err) {
      Alert.alert(`${title}失败，请重新选择钱包后重试`);
    }
  }
  let spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1], //输入值
    outputRange: ['360deg', '0deg'], //输出值
  });
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 4000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(storageAccount);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image style={styles.logo} source={require('assets/success.png')} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>正在接入钱包</Text>
      <Animated.Image
        style={[styles.circle, { transform: [{ rotate: spin }] }]}
        source={require('assets/loading.png')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 25,
    color: '#394867',
    fontWeight: '500',
    marginTop: 15,
  },
  desc: {
    marginTop: 15,
    fontSize: 14,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  circle: {
    marginTop: 15,
    width: 20,
    height: 20,
  },
});

export default SuccessScreen;
