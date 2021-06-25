import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Button } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';
import { navigate } from 'components/navigationService';

interface Props {}
function WalletDetailScreen({}: Props) {
  let pwds = '111111';
  const [pwd, setPwd] = useState('');
  let name = 'Jason的钱包';
  const [wallName, setWallName] = useState(name);
  const [transferConfirm, setTransferConfirm] = useState(false);
  const [wallNameModel, setWallNameModel] = useState(false);
  const address = '0x4250c3c0094A65dd12f6C41D8c4C6ec10ff458f7';

  const [navigateName, setNavigateName] = useState('');
  // Other
  const show = () => {
    const toastOpts = {
      data: '钱包地址复制成功',
      textColor: '#ffffff',
      backgroundColor: '#444444',
      duration: WToast.duration.SHORT, //1.SHORT 2.LONG
      position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    };

    WToast.show(toastOpts);
  };
  const copyToClipboard = () => {
    Clipboard.setString(address);
    show();
  };

  function goNavigate(screenName: string) {
    if (screenName) {
      setNavigateName(screenName);
      setPwd('');
      setTransferConfirm(!transferConfirm);
    }
    return;
  }
  return (
    <SafeAreaView style={styles.flex_1}>
      <View style={{ ...styles.flex_1, ...styles.container }}>
        <TouchableWithoutFeedback
          onPress={() => setWallNameModel(!wallNameModel)}
        >
          <View
            style={{
              ...styles.itemContainer,
              ...styles.Row,
              ...styles.padding_20,
            }}
          >
            <Text style={styles.title}>{name}</Text>
            <Image
              style={styles.icon_20}
              source={require('assets/icon-20-edit.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={copyToClipboard}>
          <View style={styles.itemContainer}>
            <View
              style={{
                ...styles.Row,
                ...styles.paddingTop_20,
                ...styles.paddingHorizontal_20,
              }}
            >
              <Text style={styles.title}>钱包地址</Text>
              <Image
                style={styles.icon_20}
                source={require('assets/icon-20-copy.png')}
              />
            </View>
            <Text
              numberOfLines={2}
              style={{
                ...styles.desc,
                ...styles.paddingHorizontal_20,
                ...styles.paddingTop_10,
                ...styles.paddingBottom_20,
              }}
            >
              {address}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => goNavigate('mnemonic')}
            style={{
              ...styles.Row,
              ...styles.padding_20,
              ...styles.borderBootom,
            }}
          >
            <Text style={styles.title}>导出助记词</Text>
            <Image
              style={styles.right}
              source={require('assets/icon-20-arrow-right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => goNavigate('privateKey')}
            style={{
              ...styles.Row,
              ...styles.padding_20,
              ...styles.borderBootom,
            }}
          >
            <Text style={styles.title}>导出私钥</Text>
            <Image
              style={styles.right}
              source={require('assets/icon-20-arrow-right.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => goNavigate('editPwd')}
            style={{
              ...styles.Row,
              ...styles.padding_20,
              ...styles.borderBootom,
            }}
          >
            <Text style={styles.title}>修改密码</Text>
            <Image
              style={styles.right}
              source={require('assets/icon-20-arrow-right.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        buttonStyle={styles.button}
        title="删除钱包"
        onPress={() => setTransferConfirm(!transferConfirm)}
        titleStyle={styles.buttonTitle}
      />

      {/* 输入安全密码Model */}
      <Modal
        animationType="fade"
        transparent={true}
        hardwareAccelerated={true}
        visible={transferConfirm}
        onRequestClose={() => {
          setTransferConfirm(!transferConfirm);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            style={{ ...styles.outView }}
            onPress={() => {
              setTransferConfirm(!transferConfirm);
            }}
          >
            <View style={styles.outContair} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalView}>
                <View style={styles.headView}>
                  <Text style={styles.headText}>请输入安全密码</Text>
                  <TouchableOpacity
                    style={{ ...styles.openButton }}
                    onPress={() => {
                      setTransferConfirm(!transferConfirm);
                    }}
                  >
                    <Image
                      style={styles.textStyle}
                      source={require('assets/icon-20-close.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.groupView}>
                  <View style={styles.codeInputView}>
                    <TextInput
                      style={styles.codeInput}
                      secureTextEntry
                      placeholder="输入密码"
                      value={pwd}
                      onChangeText={setPwd}
                    />
                    <View style={styles.codeButtonView}>
                      <Button
                        buttonStyle={styles.buttonStyle}
                        title="确定"
                        titleStyle={styles.buttonModelTitle}
                        onPress={() => {
                          if (pwd === pwds) {
                            setTransferConfirm(!transferConfirm);
                            switch (navigateName) {
                              case 'privateKey':
                                navigate('ExportPrivateKeyScreen');
                                break;
                              case 'mnemonic':
                                navigate('ExportMnemonicScreen');
                                break;
                              case 'editPwd':
                                navigate('EditPwdScreen');
                                break;
                              default:
                                break;
                            }
                          }
                        }}
                      />
                      <Button
                        buttonStyle={styles.cancelButtonStyle}
                        title="取消"
                        titleStyle={styles.cancelButtonTitle}
                        onPress={() => setTransferConfirm(!transferConfirm)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.lineView} />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* 修改钱包名Model */}
      <Modal
        animationType="fade"
        transparent={true}
        hardwareAccelerated={true}
        visible={wallNameModel}
        onRequestClose={() => {
          setWallNameModel(!wallNameModel);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            style={{ ...styles.outView }}
            onPress={() => {
              setWallNameModel(!wallNameModel);
            }}
          >
            <View style={styles.outContair} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalView}>
                <View style={styles.headView}>
                  <Text style={styles.headText}>修改钱包名称</Text>
                  <TouchableOpacity
                    style={{ ...styles.openButton }}
                    onPress={() => {
                      setWallNameModel(!wallNameModel);
                    }}
                  >
                    <Image
                      style={styles.textStyle}
                      source={require('assets/icon-20-close.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.groupView}>
                  <View style={styles.codeInputView}>
                    <TextInput
                      style={styles.codeInput}
                      placeholder="输入钱包名称"
                      value={wallName}
                      onChangeText={setWallName}
                    />
                    <View style={styles.codeButtonView}>
                      <Button
                        buttonStyle={styles.buttonStyle}
                        title="确定"
                        titleStyle={styles.buttonModelTitle}
                        onPress={() => (name = wallName)}
                      />
                      <Button
                        buttonStyle={styles.cancelButtonStyle}
                        title="取消"
                        titleStyle={styles.cancelButtonTitle}
                        onPress={() => setWallNameModel(!wallNameModel)}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.lineView} />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F5F8',
  },
  flex_1: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    color: '#394867',
  },
  desc: {
    fontSize: 13,
    color: '#9CA4B3',
    lineHeight: 20,
    fontWeight: '400',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderBootom: {
    borderBottomColor: '#E9EDF1',
    borderBottomWidth: 0.5,
  },
  paddingTop_20: {
    paddingTop: 20,
  },
  paddingTop_10: {
    paddingTop: 10,
  },
  paddingBottom_20: {
    paddingBottom: 20,
  },
  paddingHorizontal_20: {
    paddingHorizontal: 20,
  },
  padding_20: {
    padding: 20,
  },
  right: {
    width: 8,
    height: 20,
  },
  icon_20: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 55,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonTitle: {
    fontSize: 16,
    color: '#3D73DD',
    fontWeight: '500',
  },

  //   安全密码model
  outView: {
    height: screenHeight - 214,
  },
  outContair: {
    flex: 1,
    width: screenWidth,
  },
  codeButtonView: {
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  codeInputView: {
    paddingHorizontal: 20,
  },
  groupView: {},
  codeInput: {
    marginTop: 20,
    backgroundColor: '#F2F5F8',
    borderRadius: 8,
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
  headView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 0,
    height: 60,
    width: screenWidth,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9EDF1',
  },
  cancelButtonStyle: {
    marginVertical: 20,
    borderRadius: 8,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderColor: '#E9EDF1',
    borderWidth: 0.5,
  },
  cancelButtonTitle: {
    fontSize: 16,
    color: '#616D86',
    fontWeight: '600',
  },
  lineView: {
    width: screenWidth,
    height: 30,
  },

  buttonStyle: {
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    height: 55,
  },
  buttonModelTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default WalletDetailScreen;
