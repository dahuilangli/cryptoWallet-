import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { Button } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';
import { importByprivateKey, importByMnemonic } from 'wallets/ethsWallet';
import { navigate } from 'components/navigationService';
import { checkwalletPrivateKey, checkWalletMnemonic } from 'utils'
import { Value } from 'react-native-reanimated';
interface Props {
  route: {
    params: {
      type: string;
      coinInfo: object;
    };
  };
}
function UselessTextInput(props: any) {

  return (
    <TextInput
      {...props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
      editable
      maxLength={100}
    />
  );
}
const ImportPrivateKeyScreen = (props: Props) => {
  const { t } = useTranslation();
  const { type, coinInfo } = props.route.params;
  let nextfooot = String(t("NextStep"));
  let Verifying = String(t("Verifying"));
  const [btnTitle, setBtnTitle] = useState(nextfooot);
  const [privateKey, setPrivateKey] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <Text style={styles.presentText}>{t("enterprivatekeyormnemonicwords")}</Text>
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
          <View style={styles.bottonContainer}>
            <Button
              buttonStyle={styles.nextButton}
              onPress={() => {
                setBtnTitle(Verifying)
                if (checkwalletPrivateKey(privateKey)) {
                  try {
                    var importWord:object =importByprivateKey(
                      privateKey.replace(/(^\s*)|(\s*$)/g, ''),
                    );
                    setBtnTitle(nextfooot)
                    navigate('SetWalletNameScreen', {
                      type,
                      loginType: 'privateKey',
                      desc: privateKey.replace(/(^\s*)|(\s*$)/g, ''),
                      coinInfo,
                      importWord,
                    });
                  } catch (error) {
                    setBtnTitle(nextfooot)
                    WToast.show({
                      data: t("Pleaseentercorrectprivatekey"),
                      duration: WToast.duration.LONG,
                      position: WToast.position.CENTER,
                    });
                  }
                } else if (checkWalletMnemonic(privateKey)) {
                  try {
                    setTimeout(() => {
                      var importWord:object = importByMnemonic(
                        privateKey.replace(/(^\s*)|(\s*$)/g, ''),
                        t("mnemonicwordwrong"),
                      );

                      setBtnTitle(nextfooot)
                      navigate('SetWalletNameScreen', {
                        type,
                        loginType: 'mnemonic',
                        desc: privateKey.replace(/(^\s*)|(\s*$)/g, ''),
                        coinInfo,
                        importWord,
                      });
                    }, 10);
                  } catch (error) {
                    setBtnTitle(nextfooot)
                    WToast.show({
                      data: t("Pleaseentercorrectmnemonic"),
                      duration: WToast.duration.LONG,
                      position: WToast.position.CENTER,
                    });
                  }
                } else {
                  setBtnTitle(nextfooot)
                  WToast.show({
                    data: t("Pleaseentercorrectmnemonicorprivatekey"),
                    duration: WToast.duration.LONG,
                    position: WToast.position.CENTER,
                  });

                }

              }}
              disabled={privateKey && btnTitle === nextfooot ? false : true}
              title={btnTitle}
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

export default ImportPrivateKeyScreen;
