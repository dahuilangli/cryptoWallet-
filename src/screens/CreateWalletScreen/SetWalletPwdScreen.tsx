import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { Account } from "actions/types";
import {
  genWallet,
  importByprivateKey,
  importByMnemonic,
} from 'wallets/ethsWallet';
interface Props {
  route: {
    params: {
      accountInfo: Account;
      loginType: string;
      desc: string;
    };
  };
}

const SetWalletPwdScreen = (props: Props) => {
  const { accountInfo, loginType, desc } = props.route.params;
  const [pwd, setPwd] = useState('');
  const [account, setAccount] = useState({});
  const [repwd, setRepwd] = useState('');
  const { t } = useTranslation();
  console.log(loginType);
  useEffect(() => {
    createAccount()
  }, []);
  async function createAccount() {
    switch (loginType) {
      case 'mnemonic':
        await setAccount(importByMnemonic(desc));
        break;
      case 'privateKey':
        await setAccount(importByprivateKey(desc));
        break;
      default:
        await setAccount(genWallet());
        break;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>{t("securityPassWordDes")}</Text>
          <TextInput
            placeholder={t("setsecurepassword")}
            maxLength={12}
            value={pwd}
            style={styles.inputPwd}
            onChangeText={setPwd}
            secureTextEntry
          />
          <TextInput
            placeholder={t("confirmsecuritypassword")}
            maxLength={12}
            value={repwd}
            style={styles.inputsecurityCode}
            onChangeText={setRepwd}
            secureTextEntry
          />
        </View>
        <View style={styles.bottonContainer}>
          <Button
            buttonStyle={styles.nextButton}
            onPress={() => {
              if (loginType) {
                navigate('SuccessScreen', {
                  title: t("Importsuccessful"),
                  accountInfo: { ...account, ...accountInfo, securityCode: repwd },
                });
              } else {
                navigate('SafetyTipsScreen', {
                  accountInfo: { ...account, ...accountInfo, securityCode: repwd },
                });
              }
            }}
            disabled={!(pwd.length >= 6 && repwd.length >= 6 && repwd === pwd)}
            title={t("NextStep")}
            titleStyle={styles.nextButtonTitle}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
    // justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },
  inputContainer: {},
  presentText: {
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    paddingVertical: 30,
  },
  inputPwd: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    textAlign: 'center',
  },
  inputsecurityCode: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    marginTop: 20,
    textAlign: 'center',
  },
  bottonContainer: {
    paddingBottom: 20,
  },
  nextButton: {
    position: 'relative',
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#3B6ED5',
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});

export default SetWalletPwdScreen;
