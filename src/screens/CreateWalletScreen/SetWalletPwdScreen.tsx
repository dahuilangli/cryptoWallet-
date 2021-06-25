import i18next from 'i18n';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
// import { WToast } from 'react-native-smart-tip';

interface Props {
  route: {
    params: {
      accountInfo: object;
      loginType: string;
    };
  };
}

const SetWalletPwdScreen = (props: Props) => {
  const { accountInfo } = props.route.params;
  const { loginType } = props.route.params;
  console.log('====================================');
  console.log(accountInfo);
  console.log(loginType);
  console.log('====================================');
  const [pwd, setPwd] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const checkPwd =
    pwd.length >= 6 && securityCode.length >= 6 && securityCode === pwd;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>{i18n.t("securityPassWordDes")}</Text>
          <TextInput
            placeholder={i18n.t("setsecurepassword")}
            maxLength={12}
            value={pwd}
            style={styles.inputPwd}
            onChangeText={setPwd}
            secureTextEntry
          />
          <TextInput
            placeholder={i18n.t("confirmsecuritypassword")}
            maxLength={12}
            value={securityCode}
            style={styles.inputsecurityCode}
            onChangeText={setSecurityCode}
            secureTextEntry
          />
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            if (loginType) {
              navigate('SuccessScreen', {
                title: i18n.t("Importsuccessful"),
                accountInfo: accountInfo,
              });
            } else {
              navigate('SafetyTipsScreen', {
                accountInfo: { ...accountInfo, securityCode },
              });
            }
          }}
          disabled={!checkPwd}
          title={i18n.t("NextStep")}
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
