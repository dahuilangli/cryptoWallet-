import React from 'react';
import { useTranslation } from 'react-i18next';

import {GETHELP} from "actions/wallet"

import { useDispatch, useSelector } from 'react-redux';
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

import { navigate } from 'components/navigationService';

interface Props {
  route: {
    params: {
      loginType: string;
    };
  };
}
const list = [
  {
    name: 'ETH',
    avatar_url:require('assets/wallet-icon/ethereum.png'),
  },
  {
    name: 'BNB',
    avatar_url:require('assets/wallet-icon/binance-coin.png'),
  },
  {
    name: 'HT',
    avatar_url:require('assets/wallet-icon/ht.png'),
  },
];
const SelectWalletScreen = (prop: Props) => {
  
  const { loginType } = prop.route.params;
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.presentText}>{t("Selectwallettypetobecreated")}</Text>
        {list.map((item, i) => (
          <TouchableOpacity
            style={styles.list}
            key={i}
            onPress={() => {
              switch (loginType) {
                case 'new':
                  navigate('SetWalletNameScreen', {
                    type: item.name,
                    loginType: 'mnemonic',
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
                source={item.avatar_url}
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
