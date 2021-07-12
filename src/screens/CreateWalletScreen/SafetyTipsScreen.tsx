import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { Account } from 'actions/types';

interface Props {
  route: {
    params: {
      accountInfo: any;
    };
  };
}
const SafetyTipsScreen = (props: Props) => {
  const {t} = useTranslation();
  const { accountInfo } = props.route.params;


  async function storageAccount() {

    let account: Account;
    try {
      account = accountInfo;
      navigate('SuccessScreen', { title: t("Createdsuccessfully"), accountInfo: account });
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.presentContainer}>
          <Image
            style={styles.warning}
            source={require('assets/safety_warning.png')}
          />
          <Text style={styles.presentTitle}>{t("Safetytips")}</Text>
          <Text style={styles.warningDesc}>
            {t("Anyonegetsmnemonicphrasecantransferyourassets")}
            {'\n'}
            {t("backupandkeepmnemonicwordsinsecureenvironment")}
          </Text>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            navigate('BackupMnemonicScreen', { accountInfo });
          }}
          title={t("Gobackup")}
          titleStyle={styles.nextButtonTitle}
        />
        <Button
          buttonStyle={styles.noneButton}
          onPress={storageAccount}
          title={t("Backuplater")}
          titleStyle={styles.noneButtonTitle}
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
    marginHorizontal: 40,
  },
  presentContainer: {
    alignItems: 'center',
  },
  warning: {
    display: 'flex',
    marginTop: 70,
    width: 120,
    height: 120,
    resizeMode: 'center',
  },
  presentTitle: {
    color: '#394867',
    fontSize: 25,
    fontWeight: '500',
    paddingVertical: 15,
  },
  warningDesc: {
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    lineHeight: 18,
  },
  nextButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 40,
    backgroundColor: '#3B6ED5',
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
  noneButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  noneButtonTitle: {
    color: '#3D73DD',
    fontWeight: '600',
  },
});

export default SafetyTipsScreen;
