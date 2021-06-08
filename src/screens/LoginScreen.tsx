import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import { navigate } from 'utils/navigationService';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { post } from 'utils/request';
import { useDispatch } from 'react-redux';
import actions from 'reduxState/actions';

interface Props {}
const windowWidth = Dimensions.get('window').width;
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
  function gotoRegister() {
    navigate('SelectWalletScreen');
  }
  return (
    // <ImageBackground style={styles.bg} source={{ uri: 'launch_screen' }}>
    <SafeAreaView style={styles.bg}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
          <Text style={styles.logoText}>{'宣传文案'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.signinButton}
            onPress={gotoRegister}
            disabled={isSigninInProgress}
            title="创建新钱包"
          />
          <Button
            buttonStyle={styles.signinButton}
            onPress={login}
            disabled={isSigninInProgress}
            title="已有钱包"
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <Input
            containerStyle={styles.input}
            placeholder="用户名"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Icon name="user" style={styles.icon} />}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            containerStyle={styles.input}
            placeholder="密码"
            secureTextEntry
            leftIcon={<Icon name="lock" style={styles.icon} />}
            value={pwd}
            onChangeText={setPwd}
            onSubmitEditing={login}
          />
          <View style={styles.signup}>
            <Text style={styles.link} onPress={gotoRegister}>
              注册用户
            </Text>
            <Text style={styles.link}>忘记密码？</Text>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bg: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  logoText: {
    marginTop: 50,
    fontSize: 20,
  },
  buttonContainer: {
    flex: 0.5,
  },
  signinButton: {
    marginTop: 15,
    width: windowWidth - 30,
    height: 50,
    borderRadius: 8,
  },
  // inputContainer: {
  //   width: '95%',
  //   backgroundColor: '#ffffff88',
  //   padding: 12,
  //   borderRadius: 16,
  // },
  // input: {
  //   marginTop: 10,
  // },
  // title: {
  //   fontSize: 28,
  //   lineHeight: 36,
  //   marginBottom: 40,
  // },
  // icon: {
  //   fontSize: 24,
  //   marginRight: 10,
  // },
  // signup: {
  //   marginTop: 40,
  //   marginBottom: 10,
  //   marginHorizontal: 15,
  //   alignSelf: 'stretch',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // link: {
  //   fontSize: 16,
  //   color: '#0366d6',
  //   fontWeight: 'bold',
  // },
});
export default LoginScreen;
