import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import CustomQrCode from 'components/CustomQrCode';
import { Button } from 'react-native-elements';
import { copyToClipboard } from 'utils';
import { useTranslation } from 'react-i18next';
interface Props {
  route: {
    params: {
      address: string
    }
  }
}
function ReceivePaymentScreen(props: Props) {
  const { address } = props.route.params;

  const {t} = useTranslation();
  // Other
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.codeContainer}>
          <CustomQrCode text={address} styl={styles.qrCode} />
          <Text style={styles.codeInfo}>{t("ScanQRcodereceivepayment")}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>{t("walletaddress")}</Text>
          <Text style={styles.addressInfo}>{address}</Text>
        </View>
      </View>
      <Button
        type="clear"
        buttonStyle={styles.button}
        onPress={() => copyToClipboard(address, t('copySuccess'))}
        title={t("copyAddress")}
        titleStyle={styles.buttonTitle}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  main: {
    flex: 1,
    margin: 20,
  },
  codeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  qrCode: {
    marginTop: 50,
    width: 215,
    height: 215,
  },
  codeInfo: {
    fontSize: 16,
    color: '#616D86',
    textAlign: 'center',
    fontWeight: '500',
    paddingTop: 28,
    paddingBottom: 35,
  },
  addressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
  },
  addressTitle: {
    fontSize: 14,
    color: '#394867',
    fontWeight: '500',
  },
  addressInfo: {
    marginTop: 10,
    fontSize: 14,
    color: '#9CA4B3',
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  button: {
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    margin: 20,
    height: 55,
  },
  buttonTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ReceivePaymentScreen;
