import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
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
const ImportMnemonicScreen = (props: Props) => {
  const { type } = props.route.params;
  const [mnemonic, setMnemonic] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>
            请按顺序输入您的12位助记词, 用空格区隔
          </Text>
          <View style={styles.inputName}>
            <UselessTextInput
              multiline
              numberOfLines={4}
              onChangeText={(text: string) => setMnemonic(text)}
              value={mnemonic}
              placeholder="请填写"
            />
          </View>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() =>
            navigate('SetWalletNameScreen', {
              type,
              loginType: 'mnemonic',
              desc: mnemonic,
            })
          }
          disabled={!mnemonic}
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

export default ImportMnemonicScreen;
