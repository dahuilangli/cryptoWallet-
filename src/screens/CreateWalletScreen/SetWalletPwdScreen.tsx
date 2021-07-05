import { useTranslation } from 'react-i18next';
import React, {useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { Account } from "actions/types";

interface Props {
  route: {
    params: {
      accountInfo: Account;
      loginType: string;
    };
  };
}

const SetWalletPwdScreen = (props: Props) => {
  const { accountInfo } = props.route.params;
  const { loginType } = props.route.params;
  const [pwd, setPwd] = useState('');
  const [repwd, setRepwd] = useState('');
  const {t} = useTranslation();
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
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            console.log('====================================');
            console.log(loginType);
            console.log('====================================');
            if (loginType) {
              navigate('SuccessScreen', {
                title: t("Importsuccessful"),
                accountInfo: {...accountInfo,securityCode:repwd},
              });
            } else {
              navigate('SafetyTipsScreen', {
                accountInfo: {...accountInfo,securityCode:repwd},
              });
            }
          }}
          disabled={!(pwd.length >= 6 && repwd.length >= 6 && repwd === pwd)}
          title={t("NextStep")}
          titleStyle={styles.nextButtonTitle}
        />
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
