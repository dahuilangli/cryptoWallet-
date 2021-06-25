import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';
import { recoverAccountToPrivateKey } from 'helper/ethers';
import { navigate } from 'components/navigationService';
interface Props {
  route: {
    params: {
      type: string;
    };
  };
}
function UselessTextInput(props: any) {
  return (
    <TextInput
      {...props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
      editable
      maxLength={100}
    />
  );
}
const ImportPrivateKeyScreen = (props: Props) => {
  const { type } = props.route.params;
  const [privateKey, setPrivateKey] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>请输入私钥或扫描二维码</Text>
          <View style={styles.inputName}>
            <UselessTextInput
              multiline
              numberOfLines={4}
              onChangeText={(text: string) => setPrivateKey(text)}
              value={privateKey}
              placeholder="请填写"
            />
          </View>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            try {
              recoverAccountToPrivateKey(
                privateKey.replace(/(^\s*)|(\s*$)/g, ''),
              );
              navigate('SetWalletNameScreen', {
                type,
                loginType: 'privateKey',
                desc: privateKey.replace(/(^\s*)|(\s*$)/g, ''),
              });
            } catch (error) {
              WToast.show({
                data: '请填写正确的私钥',
                duration: WToast.duration.LONG,
                position: WToast.position.CENTER,
              });
            }
          }}
          disabled={!privateKey}
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
    paddingHorizontal: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ImportPrivateKeyScreen;
