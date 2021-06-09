import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, Image, StatusBar } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { navigate } from 'utils/navigationService';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { post } from 'utils/request';
import { useDispatch } from 'react-redux';
import actions from 'reduxState/actions';

interface Props {}
const LoginScreen = ({}: Props) => {
  const dispatch = useDispatch();
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  // const [username, setUsername] = useState('');
  // const [pwd, setPwd] = useState('');
  let user;
  async function login() {
    setIsSigninInProgress(true);
    try {
      const { data }: any = await post('/login', {
        // username,
        // pwd,
      });
      user = data;
    } finally {
      setIsSigninInProgress(false);
    }
    if (user) {
      dispatch(actions.setUser(user));
    } else {
      Alert.alert('登录失败，请检查网络和输入后重试');
    }
  }
  return (
    <LinearGradient colors={['#1D4692', '#263C75']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('assets/logo.png')} />
        <Text style={styles.logoText}>MORLEYSTONE</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.newCreate}
          onPress={() => {
            navigate('SelectWalletScreen');
          }}
          disabled={isSigninInProgress}
          title="创建新钱包"
          titleStyle={styles.newCreateTitle}
        />
        <Button
          type="outline"
          buttonStyle={styles.already}
          onPress={login}
          disabled={isSigninInProgress}
          title="已有钱包"
          titleStyle={styles.alreadyTitle}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 135,
    height: 135,
  },
  logoText: {
    marginTop: 40,
    color: '#FFFFFF',
    fontSize: 28,
  },
  buttonContainer: {
    flex: 0.5,
  },
  newCreate: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
  },
  newCreateTitle: {
    fontWeight: '600',
  },
  already: {
    marginTop: 15,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  alreadyTitle: {
    color: '#3D73DD',
    fontWeight: '600',
  },
});
export default LoginScreen;
