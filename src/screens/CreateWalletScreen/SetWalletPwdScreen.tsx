import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { Account } from "actions/types";
import {
  genWallet,
} from 'wallets/ethsWallet';
interface Props {
  route: {
    params: {
      accountInfo: Account;
      loginType: string;
      desc: string;
      importWord: object;
    };
  };
}

const SetWalletPwdScreen = (props: Props) => {
  const { accountInfo, loginType, desc, importWord } = props.route.params;
  const [pwd, setPwd] = useState('');
  const [repwd, setRepwd] = useState('');
  const { t } = useTranslation();
  let nextfooot =  loginType === 'new' ? String(t("NextStep")):String(t("Importwallet"));
  let Walletgenerating = String(t("Walletgenerating"));
  const [btnTitle, setBtnTitle] = useState(nextfooot);

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
            keyboardType='numeric'
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
              if (loginType === 'new') {
                try {
                  setBtnTitle(Walletgenerating);
                  setTimeout(() => {
                    var importWord1 = genWallet()
                    setBtnTitle(nextfooot);
                    navigate('SafetyTipsScreen', {
                      accountInfo: { ...importWord1, ...accountInfo, securityCode: repwd },
                    });
                  }, 10);
                } catch (error) {
                  setBtnTitle(nextfooot);
                }

              } else {
                navigate('SuccessScreen', {
                  title: t("Importsuccessful"),
                  accountInfo: { ...importWord, ...accountInfo, securityCode: repwd },
                });
              }
            }}
            disabled={!(pwd.length >= 6 && repwd.length >= 6 && repwd === pwd && btnTitle === nextfooot)}
            title={btnTitle}
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
