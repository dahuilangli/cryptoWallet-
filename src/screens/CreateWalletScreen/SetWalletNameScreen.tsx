import i18n from "i18n";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { Account } from 'actions/types';
import {
  genWallet,
  importByprivateKey,
  importByMnemonic,
} from 'wallet/ethers';
import { navigate } from 'components/navigationService';

interface Props {
  route: {
    params: {
      type: string;
      loginType: string;
      desc: string;
    };
  };
}
const SetWalletNameScreen = (props: Props) => {
  const { type } = props.route.params;
  const { loginType } = props.route.params;
  const [walletName, setWalletName] = useState('');
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>
            {i18n.t("walletnamedes")}
          </Text>
          <TextInput
            maxLength={20}
            placeholder={i18n.t("Wallet Name")}
            value={walletName}
            style={styles.inputName}
            onChangeText={setWalletName}
          />
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            navigate('SetWalletPwdScreen', {
              accountInfo: { ...accountInfo, walletName, type },
              loginType,
            });
          }}
          disabled={!walletName}
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
