import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
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
  console.log(loginType);
  

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
          <View style={styles.bottonContainer}>
            <Button
              buttonStyle={styles.nextButton}
              onPress={() => {
                navigate('SetWalletPwdScreen', {
                  accountInfo: { walletName, type, coinInfo },
                  desc,
                  loginType,
                });
              }}
              disabled={!walletName}
              title={t("NextStep")}
              titleStyle={styles.nextButtonTitle}
            />
          </View>
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
  bottonContainer: {
    // flex: 1,
    paddingBottom: 20,
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
