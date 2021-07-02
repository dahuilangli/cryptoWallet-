import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomQrCode from 'components/CustomQrCode';
import { Button } from 'react-native-elements';
import { show } from 'components/Dialog';
interface Props {}
function ReceivePaymentScreen({}: Props) {
  const address = '0x4250c3c0094A65dd12f6C41D8c4C6ec10ff458f7';
  // Other
  const copyToClipboard = () => {
    Clipboard.setString(address);
    show('钱包地址复制成功');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.codeContainer}>
          <CustomQrCode text={address} styl={styles.qrCode} />
          <Text style={styles.codeInfo}>扫二维码接收付款</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>钱包地址</Text>
          <Text style={styles.addressInfo}>{address}</Text>
        </View>
      </View>
      <Button
        type="clear"
        buttonStyle={styles.button}
        onPress={copyToClipboard}
        title="复制地址"
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
