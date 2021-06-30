import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';
import { importByprivateKey } from 'wallets/ethsWallet';
import { navigate } from 'components/navigationService';
interface Props {
  route: {
    params: {
      type: string;
    };
  };
}
function UselessTextInput(props: any) {
  const {t} = useTranslation();
  return (
    <TextInput
      {...props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
      editable
      maxLength={100}
    />
  );
}
const ImportPrivateKeyScreen = (props: Props) => {
  const { type } = props.route.params;
  const [privateKey, setPrivateKey] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>{t("enterprivatekeyorscanQRcode")}</Text>
          <View style={styles.inputName}>
            <UselessTextInput
              multiline
              numberOfLines={4}
              onChangeText={(text: string) => setPrivateKey(text)}
              value={privateKey}
              placeholder={t("Please fill out")}
            />
          </View>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            try {
              importByprivateKey(
                privateKey.replace(/(^\s*)|(\s*$)/g, ''),
              );
              navigate('SetWalletNameScreen', {
                type,
                loginType: 'privateKey',
                desc: privateKey.replace(/(^\s*)|(\s*$)/g, ''),
              });
            } catch (error) {
              WToast.show({
                data: t("Pleaseentercorrectprivatekey"),
                duration: WToast.duration.LONG,
                position: WToast.position.CENTER,
              });
            }
          }}
          disabled={!privateKey}
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
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ImportPrivateKeyScreen;
