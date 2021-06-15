import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button } from 'react-native-elements';
import { navigate } from 'utils/navigationService';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { screenHeight, screenWidth } from 'utils/constants';
interface Props {}
const list = [
  {
    name: '助记词导入',
    avatar_url: require('assets/icon-20-导入-词.png'),
    type: 'mnemonic',
  },
  {
    name: '私钥导入',
    avatar_url: require('assets/icon-20-导入-私钥.png'),
    type: 'privateKey',
  },
];

const LoginScreen = ({}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
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
            navigate('SelectWalletScreen', { loginType: 'new' });
          }}
          title="创建新钱包"
          titleStyle={styles.newCreateTitle}
        />
        <Button
          type="outline"
          buttonStyle={styles.already}
          onPress={() => setModalVisible(true)}
          title="已有钱包"
          titleStyle={styles.alreadyTitle}
        />
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            style={{ ...styles.outView }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.outContair} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.headView}>
              <Text style={styles.headText}>导入方式</Text>
              <TouchableWithoutFeedback
                style={{ ...styles.openButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  style={styles.textStyle}
                  source={require('assets/icon-20-close.png')}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.groupView}>
              {list.map((item, i) => (
                <TouchableOpacity
                  style={styles.list}
                  key={i}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigate('SelectWalletScreen', { loginType: item.type });
                  }}
                >
                  <View style={styles.lineView} />
                  <View style={styles.listItem}>
                    <Avatar
                      rounded
                      source={item.avatar_url}
                      containerStyle={styles.avatar}
                    />
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View style={styles.lineView} />
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(38,60,114,0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  outView: {
    height: screenHeight - 214,
  },
  outContair: {
    flex: 1,
    width: screenWidth,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: screenWidth,
    height: 214,
  },
  headView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 0,
    height: 60,
    width: screenWidth,
  },
  headText: {
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    marginLeft: screenWidth / 2 - 100,
    fontSize: 16,
    fontWeight: '600',
    color: '#616D86',
    textAlign: 'center',
  },
  openButton: {
    width: 20,
    height: 20,
  },
  textStyle: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: screenWidth / 2 - 135,
  },
  list: {},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#3D73DD',
    fontWeight: '400',
  },
  groupView: {},
  lineView: {
    width: screenWidth,
    height: 0.5,
    backgroundColor: '#E9EDF1',
  },
});
export default LoginScreen;
