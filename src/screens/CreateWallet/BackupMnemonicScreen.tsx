import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'utils/navigationService';
interface Props {}

const BackupMnemonicScreen = ({}: Props) => {
  const mnemonic =
    'walnut narrow brush found quarter bid force junior fork venue toast morning';
  const mnemonicList: string[] = mnemonic.split(' ');
  const reorganize = function (array: Array<string>): Array<string> {
    return array.sort(function () {
      return 0.5 - Math.random();
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={styles.presentText}>
            按正确的顺序记录这些单词{'\n'}并将他们保存在安全的地方, 建议手动抄写
          </Text>
          <View style={styles.mnemonicList}>
            {mnemonicList &&
              mnemonicList.map((info, index) => (
                <View style={styles.listItem}>
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
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            console.log(reorganize(mnemonicList));
            let mnemonics = reorganize(mnemonicList);
            navigate('VerifyMnemonicScreen', {
              mnemonic: mnemonics,
            });
          }}
          title="下一步"
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
    width: '30.33%',
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
});
export default BackupMnemonicScreen;
