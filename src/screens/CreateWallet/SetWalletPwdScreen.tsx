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
// import { WToast } from 'react-native-smart-tip';

interface Props {}
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
const SetWalletPwdScreen = ({}: Props) => {
  const dispatch = useDispatch();
  const [isSigninInProgress, setIsSignupInProgress] = useState(false);
  const [pwd, setPwd] = useState('');
  const [verifyPwd, setVerifyPwd] = useState('');
  let user: User;
  async function signup() {
    setIsSignupInProgress(true);
    try {
      const { data, msg } = await post('/user', {
        pwd,
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
  const checkPwd =
    pwd.length >= 6 && verifyPwd.length >= 6 && verifyPwd === pwd;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.presentText}>安全密码不能为空, 必须是6-12位</Text>
        <TextInput
          placeholder="设置安全密码"
          maxLength={12}
          value={pwd}
          style={styles.inputPwd}
          onChangeText={setPwd}
          secureTextEntry
        />
        <TextInput
          placeholder="确认安全密码"
          maxLength={12}
          value={verifyPwd}
          style={styles.inputVerifyPwd}
          onChangeText={setVerifyPwd}
          secureTextEntry
        />
      </View>
      <Button
        buttonStyle={styles.nextButton}
        onPress={() => {
          navigate('SafetyTipsScreen');
        }}
        disabled={isSigninInProgress || !checkPwd}
        title="下一步"
        titleStyle={styles.nextButtonTitle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: '#F2F5F8',
    // justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
  },
  presentText: {
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    paddingVertical: 30,
  },
  inputPwd: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    textAlign: 'center',
  },
  inputVerifyPwd: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 17.5,
    marginTop: 20,
    textAlign: 'center',
  },
  nextButton: {
    position: 'relative',
    height: 55,
    borderRadius: 8,
    fontSize: 16,
  },
  nextButtonTitle: {
    fontWeight: '600',
  },
});

export default SetWalletPwdScreen;
