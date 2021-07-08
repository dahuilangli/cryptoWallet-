import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';

// import { post } from 'utils/request';
import { Account } from 'actions/types';

interface Props {
  route: {
    params: {
      accountInfo: any;
    };
  };
}
const reorganize = function (array: Array<string>): Array<string> {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
};
const VerifyMnemonicScreen = (props: Props) => {
  const { t } = useTranslation();
  const { accountInfo } = props.route.params;
  const mnemonic = JSON.stringify(accountInfo.mnemonics);
  const [mnemonicList, setMnemonicList] = useState<string[]>(
    reorganize(JSON.parse(mnemonic)),
  );
  const [newMnemonicList, setNewMnemonicList] = useState<string[]>([]);
  const updateList = (word: string, index: number) => {
    mnemonicList.splice(index, 1);
    setMnemonicList([...mnemonicList]);
    newMnemonicList.push(word);
    setNewMnemonicList([...newMnemonicList]);
  };
  const updateNewList = (word: string, index: number) => {
    newMnemonicList.splice(index, 1);
    setNewMnemonicList([...newMnemonicList]);
    mnemonicList.push(word);
    setMnemonicList([...mnemonicList]);
  };

  const verifyMnemonic = JSON.stringify(newMnemonicList) === mnemonic;
  console.log(JSON.stringify(newMnemonicList));
  console.log(mnemonic);

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
        <View>
          <Text style={styles.presentText}>
            {t("mnemonicwordscopied")}
          </Text>
          <View style={styles.newMnemonicList}>
            <View style={styles.newMnemonic}>
              {newMnemonicList &&
                newMnemonicList.map((info, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.newListItem}
                    onPress={() => updateNewList(info, index)}
                  >
                    <View style={styles.newItemWarp}>
                      <Text style={styles.newWarpIndex}>
                        {index < 9 ? '0' + (index + 1) : index + 1}
                      </Text>
                      <Text style={styles.newWarpText}>{info}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
          <View style={styles.mnemonicList}>
            {mnemonicList &&
              mnemonicList.map((info, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() => updateList(info, index)}
                >
                  <View style={styles.itemWarp}>
                    <Text style={styles.warpText}>{info}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        <View style={styles.bottonContainer}>
          <Button
            buttonStyle={styles.nextButton}
            onPress={storageAccount}
            title={t("sure")}
            disabled={!verifyMnemonic}
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
  newMnemonicList: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    minHeight: 80,
  },
  newMnemonic: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  newListItem: {
    width: '30%',
    borderRadius: 8,
    margin: 5,
    paddingBottom: 8,
    backgroundColor: 'rgba(245, 248, 253, 100)',
  },
  newItemWarp: {
    paddingVertical: 6,
  },
  newWarpIndex: {
    textAlign: 'justify',
    fontSize: 11,
    color: '#3D73DD',
    opacity: 0.2,
    fontWeight: '700',
  },
  newWarpText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#3D73DD',
    fontWeight: '500',
  },
  mnemonicList: {
    marginTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  listItem: {
    width: '30%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    margin: 5,
  },
  itemWarp: {
    paddingVertical: 16,
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
    marginTop: 40,
    backgroundColor: '#3B6ED5',
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});
export default VerifyMnemonicScreen;
