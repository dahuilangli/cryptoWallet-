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
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import { copyToClipboard, show } from 'utils';
import { navigate } from 'components/navigationService';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import walletAction from 'actions/wallet';
import { Account } from 'actions/types';
interface Props {
  route: {
    params: {
        addressMessage: {
        address: string;
        mnemonic: string;
        privateKey: string;
        securityCode: string;
        walletName: string;
        password: string;
        type: string;
        contracts: string[];
        coinInfo: {
          describe: string,
          gas_decimal: number,
          gas_limit: number,
          icon: string,
          name_en: string,
          name_zh: string,
          token: string,
          token_limit: number,
          token_name: string,
          tx_browser: string,
          wallet: string,
        },
      }
    }
  }
}
function WalletDetailScreen(props: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { addressMessage } = props.route.params;
  const [pwds ,setPwds] = useState(addressMessage.securityCode);
  const [pwd, setPwd] = useState('');
  const [replaceName ,setReplaceName] = useState(addressMessage.walletName);
  const [wallName, setWallName] = useState(addressMessage.walletName);
  const [transferConfirm, setTransferConfirm] = useState(false);
  const [wallNameModel, setWallNameModel] = useState(false);
  const [navigateName, setNavigateName] = useState('');
  const [exportModel, setExportModel] = useState(false);
  const changeWalletName =  (walletNameStr: string) => {
     dispatch(walletAction.setWalletName({ address: addressMessage.address, walletName: walletNameStr, type: addressMessage.type }));
  }


  function goNavigate(screenName: string) {
    if (screenName) {
      setNavigateName(screenName);
      setPwd('');
      setTransferConfirm(!transferConfirm)
      
    }
    return;
  }
  return (
    <SafeAreaView style={styles.flex_1}>
      <View style={{ ...styles.flex_1, ...styles.container }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setWallNameModel(!wallNameModel)
          }}
        >
          <View
            style={{
              ...styles.itemContainer,
              ...styles.Row,
              ...styles.padding_20,
            }}
          >
            <Text style={styles.title}>{wallName}</Text>
            <Image
              style={styles.icon_20}
              source={require('assets/icon_edit.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => copyToClipboard(addressMessage.address, t('copySuccess'))}>
          <View style={styles.itemContainer}>
            <View
              style={{
                ...styles.Row,
                ...styles.paddingTop_20,
                ...styles.paddingHorizontal_20,
              }}
            >
              <Text style={styles.title}>{t("walletaddress")}</Text>
              <Image
                style={styles.icon_20}
                source={require('assets/icon_copy.png')}
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
              {addressMessage.address}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.itemContainer}>
          {addressMessage.mnemonic ? <TouchableOpacity
            onPress={() => goNavigate('mnemonic')}
            style={{
              ...styles.Row,
              ...styles.padding_20,
              ...styles.borderBootom,
            }}
          >
            <Text style={styles.title}>{t("exportmnemonic")}</Text>
            <Image
              style={styles.right}
              source={require('assets/icon_arrow_right.png')}
            />
          </TouchableOpacity> : null}
          <TouchableOpacity
            onPress={() => goNavigate('privateKey')}
            style={{
              ...styles.Row,
              ...styles.padding_20,
              ...styles.borderBootom,
            }}
          >
            <Text style={styles.title}>{t("exportprivatekey")}</Text>
            <Image
              style={styles.right}
              source={require('assets/icon_arrow_right.png')}
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
            <Text style={styles.title}>{t("changePassword")}</Text>
            <Image
              style={styles.right}
              source={require('assets/icon_arrow_right.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        buttonStyle={styles.button}
        title={t("deletewallet")}
        onPress={() => goNavigate('deleteWallet')}
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
                  <Text style={styles.headText}>{t("entersecurepassword")}</Text>
                  <TouchableOpacity
                    style={{ ...styles.openButton }}
                    onPress={() => {
                      setTransferConfirm(!transferConfirm);
                    }}
                  >
                    <Image
                      style={styles.textStyle}
                      source={require('assets/icon_close.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.groupView}>
                  <View style={styles.codeInputView}>
                    <TextInput
                      style={styles.codeInput}
                      secureTextEntry
                      placeholder={t("enterpassword")}
                      value={pwd}
                      onChangeText={setPwd}
                    />
                    <View style={styles.codeButtonView}>
                      <Button
                        buttonStyle={styles.buttonStyle}
                        title={t("sure")}
                        titleStyle={styles.buttonModelTitle}
                        onPress={() => {
                          if (pwd === pwds) {
                            setTransferConfirm(!transferConfirm);
                            switch (navigateName) {
                              case 'privateKey':
                                navigate('ExportPrivateKeyScreen', { privatekey: addressMessage.privateKey });
                                break;
                              case 'mnemonic':
                                navigate('ExportMnemonicScreen', { mnemonic: addressMessage.mnemonic });
                                break;
                              case 'editPwd':
                                navigate('EditPwdScreen',{address:addressMessage.address,type:addressMessage.type,pwds:pwds,setPwds});
                                break;
                              case 'deleteWallet':
                                dispatch(walletAction.deleteAccount({address: addressMessage.address, type: addressMessage.type}))
                                navigate('HomeScreen')
                                break;
                              default:
                                break;
                            }
                          }else{
                            setTransferConfirm(!transferConfirm);
                            show(t("Incorrectpassword"))
                          }
                        }}
                      />
                      <Button
                        buttonStyle={styles.cancelButtonStyle}
                        title={t("cancel")}
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
                  <Text style={styles.headText}>{t("modifywalletname")}</Text>
                  <TouchableOpacity
                    style={{ ...styles.openButton }}
                    onPress={() => {                      
                      setWallNameModel(!wallNameModel);
                    }}
                  >
                    <Image
                      style={styles.textStyle}
                      source={require('assets/icon_close.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.groupView}>
                  <View style={styles.codeInputView}>
                    <TextInput
                      style={styles.codeInput}
                      placeholder={t("enterwalletname")}
                      value={replaceName}
                      onChangeText={setReplaceName}
                    />
                    <View style={styles.codeButtonView}>
                      <Button
                        buttonStyle={styles.buttonStyle}
                        title={t("sure")}
                        titleStyle={styles.buttonModelTitle}
                        onPress={() => {
                          setWallNameModel(!wallNameModel);
                          setWallName(replaceName);
                          changeWalletName(replaceName);
                        }}
                      />
                      <Button
                        buttonStyle={styles.cancelButtonStyle}
                        title={t("cancel")}
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
    height: SCREENHEIGHT - 214,
  },
  outContair: {
    flex: 1,
    width: SCREENWIDTH,
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
    width: SCREENWIDTH,
  },

  headText: {
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    marginLeft: SCREENWIDTH / 2 - 100,
    fontSize: 16,
    fontWeight: '600',
    color: '#616D86',
    textAlign: 'center',
  },

  openButton: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: SCREENWIDTH / 2 - 135,
  },
  textStyle: {
    width: 20,
    height: 20,
  },
  headView: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 0,
    height: 60,
    width: SCREENWIDTH,
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
    width: SCREENWIDTH,
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
