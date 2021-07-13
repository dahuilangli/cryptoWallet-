import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import * as helper from 'apis/helper'
import { navigate } from 'components/navigationService';
import { CHAINS } from 'config/constants';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  route: {
    params: {
      loginType?: string;
    };
  };
}
interface responesItem {
  "describe": string,
  "gas_decimal": number,
  "gas_limit": number,
  "icon": string,
  "name_en": string,
  "name_zh": string,
  "token": string,
  "token_limit": number,
  "token_name": string,
  "tx_browser": string,
  "wallet": string,
}
const list = [
  {
    name: CHAINS.eth,
    avatar_url: require('assets/coins/ethereum.png'),
  },
  {
    name: CHAINS.bnb,
    avatar_url: require('assets/coins/binance.png'),
  },
  {
    name: CHAINS.ht,
    avatar_url: require('assets/coins/ht.png'),
  },
];

const SecondSelectWalletScreen = (props: Props) => {
  const { t } = useTranslation();
  const {loginType}  = props.route.params;
  const [typeList, setTypeList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getTypeList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  function getTypeList() {
    helper.get('/wallet/type', {}).then((res: any) => {
      setTypeList(res)
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.presentText}>{t("Selectwallettypetobecreated")}</Text>
        {typeList.map((item: responesItem, i) => (
          <TouchableOpacity
            style={styles.list}
            key={i}
            onPress={() => {
              switch (loginType) {
                case 'new':
                  navigate('SecondSetWalletNameScreen', {
                    type: item.name_en,
                    coinInfo: item
                  });
                  break;
                case 'old':
                  navigate('SecondImportPrivateKeyScreen', {
                    type: item.name_en,
                    coinInfo: item
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
                title={item?.name_en[0]}
                source={{ uri: item.icon }}
                containerStyle={styles.avatar}
              />
              <Text style={styles.text}>{item?.name_en}</Text>
              <Image
                style={styles.icon}
                source={require('assets/icon_arrow_right.png')}
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

export default SecondSelectWalletScreen;
