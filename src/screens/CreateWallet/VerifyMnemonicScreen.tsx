import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Button } from 'react-native-elements';
import { navigate } from 'utils/navigationService';

// import { post } from 'utils/request';
// import { useDispatch } from 'react-redux';
// import actions from 'reduxState/actions';

interface Props {
  route: {
    params: {
      mnemonic: string[];
    };
  };
}

const VerifyMnemonicScreen = ({ route }: Props) => {
  //   const dispatch = useDispatch();
  //   const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const mnemonic = JSON.stringify(route.params.mnemonic);
  const [mnemonicList, setMnemonicList] = useState<string[]>(
    JSON.parse(mnemonic),
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

  async function storageAccount() {
    // setIsSigninInProgress(true);
    try {
      navigate('CreateWalletSuccessScreen');
      //   const { data }: any = await post('/login', {
      //     username,
      //     pwd,
      //   });
      //   user = data;
    } finally {
      //   setIsSigninInProgress(false);
    }
    // if (user) {
    //   dispatch(actions.setUser(user));
    // } else {
    //   Alert.alert('登录失败，请检查网络和输入后重试');
    // }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View>
          <Text style={styles.presentText}>
            请根据您抄写的助记词, 按顺序选择填充
          </Text>
          <View style={styles.newMnemonicList}>
            <View style={styles.newMnemonic}>
              {newMnemonicList &&
                newMnemonicList.map((info, index) => (
                  <TouchableOpacity
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
        <Button
          buttonStyle={styles.nextButton}
          onPress={storageAccount}
          title="确认"
          disabled={verifyMnemonic}
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
    width: '30.33%',
    borderRadius: 8,
    margin: 5,
    paddingBottom: 8,
    backgroundColor: 'rgba(245, 248, 253, 100)',
  },
  newItemWarp: {
    padding: 6,
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
    width: '30.33%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    margin: 5,
  },
  itemWarp: {
    paddingHorizontal: 23.5,
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
