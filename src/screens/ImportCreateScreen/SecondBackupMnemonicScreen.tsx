import { useTranslation } from 'react-i18next';
import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { SCREENWIDTH } from 'config/constants';
interface Props {
  route: {
    params: {
      accountInfo: any;
    };
  };
}

const SecondBackupMnemonicScreen = (props: Props) => {
  const { accountInfo } = props.route.params;
  const mnemonicList: string[] = accountInfo.mnemonic.split(' ');
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={styles.presentText}>
            {t("Recordwordsincorrectorder")}{'\n'}{t("keepthemnsafeplaceManualtranscriptionisrecommended")}
          </Text>
          <View style={styles.mnemonicList}>
            {mnemonicList &&
              mnemonicList.map((info, index) => (
                <View style={styles.listItem} key={index}>
                  <View style={styles.itemWarp}>
                    <Text style={styles.warpIndex}>
                      {index < 9 ? '0' + (index + 1) : index + 1}
                    </Text>
                    <Text style={styles.warpText}>{info}</Text>
                  </View>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.bottonContainer}>
          <Button
            buttonStyle={styles.nextButton}
            onPress={() => {
              navigate('SecondVerifyMnemonicScreen', {
                accountInfo: { ...accountInfo, mnemonics: mnemonicList },
              });
            }}
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
  },
  main: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  presentText: {
    color: '#9CA4B3',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 30,
    paddingBottom: 25,
    textAlign: 'center',
  },
  mnemonicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    width: (SCREENWIDTH - (40 + 30)) / 3,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    margin: 5,
    paddingBottom: 8,
  },
  itemWarp: {
    padding: 8,
  },
  warpIndex: {
    textAlign: 'justify',
    fontSize: 11,
    color: '#3D73DD',
    opacity: 0.2,
    fontWeight: '700',
  },
  warpText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#3D73DD',
    fontWeight: '500',
  },
  bottonContainer: {
    paddingBottom: 20,
  },
  nextButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#3B6ED5',
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});
export default SecondBackupMnemonicScreen;
