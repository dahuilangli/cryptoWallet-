import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

import { Button } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';

interface Props {}

const show = () => {
  const toastOpts = {
    data: '钱包地址复制成功',
    textColor: '#ffffff',
    backgroundColor: '#444444',
    duration: WToast.duration.SHORT, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
  };

  WToast.show(toastOpts);
};
const ExportPrivateKeyScreen = ({}: Props) => {
  let privateKey = '0x4250c3c0094A65d3c0094A65dd12f6Cd123';
  const copyToClipboard = () => {
    Clipboard.setString(privateKey);
    show();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.presentText}>
          请备份私钥至安全地方{'\n'}一旦泄露, 可能会导致资产损失
        </Text>
        <View style={styles.privateKeyContainer}>
          <Text style={styles.privateKeyText}>{privateKey}</Text>
        </View>

        <Button
          buttonStyle={styles.nextButton}
          onPress={copyToClipboard}
          title="复制私钥"
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