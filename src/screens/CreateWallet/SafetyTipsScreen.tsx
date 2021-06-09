import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { User } from 'types/types';
import { navigate } from 'utils/navigationService';
import { post } from 'utils/request';
import actions from 'reduxState/actions';

interface Props {}
const SafetyTipsScreen = ({}: Props) => {
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.presentContainer}>
          <Image
            style={styles.warning}
            source={require('assets/safetyWarning.png')}
          />
          <Text style={styles.presentTitle}>安全提示</Text>
          <Text style={styles.warningDesc}>
            任何得到助记词的用户都能够将您的资产转走
            {'\n'}
            请务必在安全的环境下备份以及保管好助记词
          </Text>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          onPress={() => {
            navigate('BackupMnemonicScreen');
          }}
          title="前往备份"
          titleStyle={styles.nextButtonTitle}
        />
        <Button
          buttonStyle={styles.noneButton}
          onPress={() => {
            navigate('BackupMnemonicScreen');
          }}
          title="稍后备份"
          titleStyle={styles.noneButtonTitle}
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
    marginHorizontal: 20,
  },
  presentContainer: {
    alignItems: 'center',
  },
  warning: {
    display: 'flex',
    marginTop: 70,
    width: 120,
    height: 120,
    resizeMode: 'center',
  },
  presentTitle: {
    color: '#394867',
    fontSize: 25,
    fontWeight: '500',
    paddingVertical: 15,
  },
  warningDesc: {
    fontSize: 14,
    color: '#9CA4B3',
    textAlign: 'center',
    lineHeight: 18,
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
  noneButton: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  noneButtonTitle: {
    color: '#3D73DD',
    fontWeight: '600',
  },
});

export default SafetyTipsScreen;
