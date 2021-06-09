import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { navigate } from 'utils/navigationService';
// import Icon from 'react-native-vector-icons/FontAwesome';
interface Props {}
const LoginScreen = ({}: Props) => {
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
          title="创建新钱包"
          titleStyle={styles.newCreateTitle}
        />
        <Button
          type="outline"
          buttonStyle={styles.already}
          onPress={() => {}}
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
    backgroundColor: '#3B6ED5',
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
