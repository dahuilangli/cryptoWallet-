import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  // Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { recoverAccountToMnemonic } from 'utils/ethers';
import { navigate } from 'utils/navigationService';

import { WToast } from 'react-native-smart-tip';

interface Props {
  route: {
    params: {
      type: string;
    };
  };
}

// const toastOpts = {
//   data: 'Success',
//   textColor: '#ffffff',
//   backgroundColor: '#444444',
//   duration: WToast.duration.LONG, //1.SHORT 2.LONG
//   position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
//   icon: (
//     <Image
//       source={{
//         uri:
//           'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1445367555,278299601&fm=26&gp=0.jpg',
//       }}
//       style={{ width: 32, height: 32, resizeMode: 'contain' }}
//     />
//   ),
// };
function UselessTextInput(props: any) {
  return (
    <TextInput
      {...props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
      editable
      autoFocus
      maxLength={100}
    />
  );
}
const ImportMnemonicScreen = (props: Props) => {
  const { type } = props.route.params;
  const [mnemonic, setMnemonic] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <Text style={styles.presentText}>
              请按顺序输入您的12位助记词, 用空格区隔
            </Text>
            <View style={styles.inputName}>
              <UselessTextInput
                style={styles.TextInput}
                multiline
                numberOfLines={4}
                enablesReturnKeyAutomatically
                returnKeyType="join"
                onChangeText={(text: string) => setMnemonic(text)}
                autoComplete={false}
                value={mnemonic}
                placeholder="请填写"
              />
            </View>
          </View>
          <Button
            buttonStyle={styles.nextButton}
            onPress={() => {
              try {
                recoverAccountToMnemonic(
                  mnemonic.replace(/(^\s*)|(\s*$)/g, ''),
                );
                navigate('SetWalletNameScreen', {
                  type,
                  loginType: 'mnemonic',
                  desc: mnemonic.replace(/(^\s*)|(\s*$)/g, ''),
                });
              } catch (error) {
                WToast.show({
                  data: '请填写正确的助记词',
                  duration: WToast.duration.LONG,
                  position: WToast.position.CENTER,
                });
              }
            }}
            // disabled={}
            title="下一步"
            titleStyle={styles.nextButtonTitle}
          />
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
    justifyContent: 'center',
  },
  TextInput: {
    paddingHorizontal: 17.5,
    textAlign: 'center',
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

export default ImportMnemonicScreen;
