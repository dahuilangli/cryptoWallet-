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
interface Props {
  route: {
    params: {
      loginType: string;
    };
  };
}
const list = [
  {
    name: 'STO',
    avatar_url:
      'https://tcs.teambition.net/thumbnail/11262ac182aa38d4ffc7404b9960590d8472/w/200/h/200',
  },
  {
    name: 'ETH',
    avatar_url:
      'https://ninga-dev.oss-cn-shanghai.aliyuncs.com/coin-icon/0xDCD289ECF644bEC54393ba6Ce8dB35e9B5Ff75e7/BSC/logo.png',
  },
];
const SelectWalletScreen = (prop: Props) => {
  const { loginType } = prop.route.params;
  console.log(loginType);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.presentText}>选择需要创建的钱包类型</Text>
        {list.map((item, i) => (
          <TouchableOpacity
            style={styles.list}
            key={i}
            onPress={() => {
              switch (loginType) {
                case 'new':
                  navigate('SetWalletNameScreen', {
                    type: item.name,
                  });
                  break;
                case 'mnemonic':
                  navigate('ImportMnemonicScreen', {
                    type: item.name,
                    loginType: 'mnemonic',
                  });
                  break;
                case 'privateKey':
                  navigate('ImportPrivateKeyScreen', {
                    type: item.name,
                    loginType: 'mnemonic',
                  });
                  break;
                default:
                  break;
              }
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
                source={require('assets/icon-20-arrow-right.png')}
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
