import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  Image,
  Animated,
  Easing,
} from 'react-native';

interface Props {}
const SuccessScreen = ({}: Props) => {
  let spinValue = new Animated.Value(0);
  const spin = spinValue.interpolate({
    inputRange: [0, 1], //输入值
    outputRange: ['0deg', '360deg'], //输出值
  });
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 4000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image style={styles.logo} source={require('assets/success.png')} />
      <Text style={styles.title}>创建成功</Text>
      <Text style={styles.desc}>正在接入钱包</Text>
      <Animated.Image
        style={[styles.circle, { transform: [{ rotate: spin }] }]}
        source={require('assets/logo.png')}
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
    paddingVertical: 15,
  },
  desc: {
    fontSize: 14,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  circle: {
    marginTop: 15,
    width: 100,
    height: 100,
  },
});

export default SuccessScreen;
