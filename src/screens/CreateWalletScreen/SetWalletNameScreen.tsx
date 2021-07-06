import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { Account } from 'actions/types';
import {
  genWallet,
  importByprivateKey,
  importByMnemonic,
} from 'wallets/ethsWallet';
import { navigate } from 'components/navigationService';

interface Props {
  route: {
    params: {
      type: string;
      loginType: string;
      desc: string;
      coinInfo: object
    };
  };
}
const SetWalletNameScreen = (props: Props) => {
  const { type, loginType, coinInfo, desc } = props.route.params;
  const [walletName, setWalletName] = useState('');
  const { t } = useTranslation();
  let accountInfo = {};
  useEffect(() => {
    switch (loginType) {
      case 'mnemonic':
        accountInfo = importByMnemonic(desc);
        console.log('====================================');
        console.log('mnemonic 解析', accountInfo);
        console.log('====================================');
        break;
      case 'privateKey':
        accountInfo = importByprivateKey(desc);
        console.log('====================================');
        console.log('privateKey 解析', accountInfo);
        console.log('====================================');
        break;
      default:
        accountInfo = genWallet();
        console.log('====================================');
        console.log('创建账号', accountInfo);
        console.log('====================================');
        break;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <Text style={styles.presentText}>
              {t("walletnamedes")}
            </Text>
            <TextInput
              maxLength={20}
              placeholder={t("walletname")}
              value={walletName}
              style={styles.inputName}
              onChangeText={setWalletName}
            />
          </View>
          <Button
            buttonStyle={styles.nextButton}
            onPress={() => {
              navigate('SetWalletPwdScreen', {
                accountInfo: { walletName, type, coinInfo, ...accountInfo },
                loginType,
              });
            }}
            disabled={!walletName}
            title={t("NextStep")}
            titleStyle={styles.nextButtonTitle}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  main: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },
  inputContainer: {
    // flex: 1,
  },
  presentText: {
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    paddingVertical: 30,
  },
  inputName: {
    fontSize: 16,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    textAlign: 'center',
  },
  nextButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#3B6ED5',
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});

export default SetWalletNameScreen;
