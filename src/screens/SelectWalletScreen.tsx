import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
// import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

import { navigate } from 'utils/navigationService';

interface Props {}
const list = [
  {
    name: 'STO',
    avatar_url:
      'https://tcs.teambition.net/thumbnail/11262ac182aa38d4ffc7404b9960590d8472/w/200/h/200',
  },
  {
    name: 'ETH',
    avatar_url:
      'https://tcs-ga.teambition.net/thumbnail/1126517802171e140ae13e1185afb2d0347f/w/200/h/200',
  },
];
const SelectWalletScreen = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.presentText}>选择需要创建的钱包类型</Text>
        {list.map((item, i) => (
          <TouchableOpacity
            style={styles.list}
            key={i}
            onPress={() => {
              navigate('SetWalletNameScreen');
            }}
          >
            <View style={styles.listItem}>
              <Avatar
                rounded
                source={{ uri: item.avatar_url }}
                containerStyle={styles.avatar}
              />
              <Text style={styles.text}>{item.name}</Text>
              <Image
                style={styles.icon}
                source={require('assets/arrow-right.png')}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  main: {
    marginHorizontal: 25,
  },
  presentText: {
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 15,
  },
  list: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    padding: 15,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#394867',
    fontWeight: '500',
  },
  icon: {
    width: 8,
    height: 20,
  },
});

export default SelectWalletScreen;
