import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { User } from 'types/types';
import { navigate } from 'utils/navigationService';
import { post } from 'utils/request';
import actions from 'reduxState/actions';

interface Props {}
const SetWalletNameScreen = ({}: Props) => {
  const dispatch = useDispatch();
  const [isSigninInProgress, setIsSignupInProgress] = useState(false);
  const [name, setName] = useState('');
  let user: User;
  async function signup() {
    setIsSignupInProgress(true);
    try {
      const { data, msg } = await post('/user', {
        name,
      });
      if (data) {
        user = data;
      } else if (msg) {
        Alert.alert(msg);
      }
    } finally {
      setIsSignupInProgress(false);
    }
    if (user) {
      dispatch(actions.setUser(user));
      setTimeout(() => {
        Alert.alert('注册成功');
      }, 200);
    }
  }
  const next = name.length <= 20 && name;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.inputContainer}>
          <Text style={styles.presentText}>
            钱包名称不能为空,不能大于20个字符
          </Text>
          <TextInput
            placeholder="钱包名称"
            value={name}
            style={styles.inputName}
            onChangeText={setName}
          />
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            navigate('SetWalletPwdScreen');
          }}
          disabled={isSigninInProgress || !next}
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
    marginHorizontal: 20,
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
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    textAlign: 'center',
  },
  nextButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});

export default SetWalletNameScreen;
