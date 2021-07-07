import Clipboard from '@react-native-clipboard/clipboard';
import i18next from 'i18n';
import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import i18n from 'i18n'
import { Button } from 'react-native-elements';
import { copyToClipboard } from 'utils';
import { useTranslation } from 'react-i18next';


interface Props {
  route: {
    params: {
      privatekey:string,
    }
  }
}


const ExportPrivateKeyScreen = (props: Props) => {
  let privateKey = props.route.params.privatekey;
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.presentText}>
          {t("backupprivatekeytosafeplace")}{'\n'}{t("Onceleakeditmaycauseassetloss")}
        </Text>
        <View style={styles.privateKeyContainer}>
          <Text style={styles.privateKeyText}>{privateKey}</Text>
        </View>

        <Button
          buttonStyle={styles.nextButton}
          onPress={() => copyToClipboard(privateKey, t('copySuccess'))}
          title={t("Copyprivatekey")}
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
    marginHorizontal: 20,
  },
  presentText: {
    color: '#9CA4B3',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 30,
    paddingBottom: 25,
    textAlign: 'center',
  },
  privateKeyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  privateKeyText: {
    padding: 20,
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  nextButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 30,
    backgroundColor: '#3B6ED5',
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});
export default ExportPrivateKeyScreen;