import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import walletAction from 'actions/wallet';
import { getAccountList, getUser } from 'reducers/walletStateReducer';
import { getCurrency, getShowRisk } from 'reducers/dataStateReducer';
import * as helper from 'apis/helper'
import { AssetsList } from 'actions/types';
import { Mul, Div, Add, Sub, transaction, contractTrans } from 'wallets/ethsWallet'
import { show } from 'utils';

import { navigate } from 'components/navigationService';
import { ethers } from 'ethers';
interface Props {
  route: {
    params: {
      assetsList: Array<AssetsList>,
      address?: string,
    }
  }
}

function TransferScreen(props: Props) {
  const dispatch = useDispatch();
  const currenTUnit = useSelector(getCurrency);
  const showRisk = useSelector(getShowRisk);
  const [modalVisible, setModalVisible] = useState(false);
  const [transferConfirm, setTransferConfirm] = useState(false);
  const [riskWarning, setRiskWarning] = useState(false);

  const [assetsList, setAssetsList] = useState(props.route.params.assetsList);
  const [receivingAddress, setReceivingAddress] = useState(props.route.params.address);
  const [transferAmount, setTransferAmount] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [gasList, setGasList] = useState<Array<{ gasPrice: string; title: string; balance: string; amount: string }>>([]);
  const [gasIndex, setGasIndex] = useState(-1);
  const [selectCoinIndex, setSelectCoinIndex] = useState(0);

  const walletlist = useSelector(getAccountList);
  const user = useSelector(getUser);


  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)


  const { t } = useTranslation();
  useEffect(() => {
    getAssetsList();
    getGas();
  }, []);
  async function getCoinItem(index: number) {
    setSelectCoinIndex(index);
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 150);
  }
  // 刷新币种信息缓存
  async function getAssetsList() {
    let params = {
      "address": user?.address,
      "contracts": thisUser?.contracts,
      "wallet": thisUser?.coinInfo?.wallet
    }
    helper.post('/wallet/assets', params).then((res: any) => {
      setAssetsList(assetsList)
    })
  }
  // 获取GasList
  async function getGas() {
    let params = {
      "wallet": thisUser?.coinInfo?.wallet
    }
    helper.get('/wallet/gas', params).then((res: any) => {

      let gas: Array<{ gasPrice: string; title: string; balance: string; amount: string }> = []
      gas[0] = {
        title: t("fast"),
        gasPrice: res.fastest,
        balance: Div(Mul(res.fastest, assetsList[selectCoinIndex]?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))).toString(),
        amount: Mul(Div(Mul(res.fastest, assetsList[selectCoinIndex]?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))), res.rate_currency).toString(),
      };
      gas[1] = {
        title: t("average"),
        gasPrice: res.average,
        balance: Div(Mul(res.average, assetsList[selectCoinIndex]?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))).toString(),
        amount: Mul(Div(Mul(res.average, assetsList[selectCoinIndex]?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))), res.rate_currency).toString(),
      };
      gas[2] = {
        title: t("slow"),
        gasPrice: res.slow,
        balance: Div(Mul(res.slow, assetsList[selectCoinIndex]?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))).toString(),
        amount: Mul(Div(Mul(res.slow, assetsList[selectCoinIndex]?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))), res.rate_currency).toString(),
      };
      setGasList(gas)
    })
  }
  // 关闭首次弹出
  function setShowRisk() {
    dispatch(walletAction.setShowRisk(false))
    setRiskWarning(false);
    setTimeout(() => {
      setTransferConfirm(true)
    }, 100);
  }
  // 校验安全密码
  async function verifySecurityPwd(arg0: boolean) {
    if (arg0) {
      if (gasList[gasIndex]?.balance <= assetsList[selectCoinIndex]?.balance) {
        if (securityCode === thisUser?.securityCode) {
          let address = user?.address;
          let wallet = thisUser?.coinInfo?.wallet;
          let gas_price = Mul(gasList[gasIndex].gasPrice, Math.pow(10, thisUser?.coinInfo?.gas_decimal)).toString();
          let amount = transferAmount;
          // let amountSign = Mul(amount, assetsList[selectCoinIndex].gas_limit);
          let to = receivingAddress;
          let symbol = assetsList[selectCoinIndex].symbol;
          let gas_limit: any = assetsList[selectCoinIndex].gas_limit;
          helper.get('/wallet/transfer_nonce', { address, wallet }).then((res: any) => {
            let nonce = res.nonce;
            if (thisUser?.coinInfo?.token === assetsList[selectCoinIndex]?.symbol) {
              transaction(thisUser.privateKey, nonce, gas_limit, gas_price, to, amount).then(sign => {
  
                let params = {
                  "amount": amount,
                  "from": address,
                  "gas": gasList[gasIndex].balance,
                  "nonce": Number(nonce),
                  "signature": sign,
                  "symbol": symbol,
                  "to": to,
                  "wallet": wallet
                }
                show(t("Submittedsuccessfully"))
                helper.post('/wallet/transfer', params)
              })
            } else {
              let value: bigint = BigInt(Mul(amount, Math.pow(10, Number(assetsList[selectCoinIndex]?.decimals))));
              let contract = assetsList[selectCoinIndex]?.token;
              contractTrans(thisUser.privateKey, nonce, gas_limit, gas_price, contract, to, value).then(sign => {

                let params = {
                  "amount": amount,
                  "from": address,
                  "gas": gasList[gasIndex].balance,
                  "nonce": Number(nonce),
                  "signature": sign,
                  "symbol": symbol,
                  contract,
                  "to": to,
                  "wallet": wallet
                }
                show(t("Submittedsuccessfully"))
                helper.post('/wallet/transfer', params)
              })
            }

          })
        } else {
          show(t("Pleaseentercorrectsecuritypassword"))
        }
      } else {
        show(t("Pleaseentercorrectsecuritypassword"))
      }
    }
    setSecurityCode('')
    setTransferConfirm(!transferConfirm)
  }

  let verification = receivingAddress && receivingAddress.startsWith('0x') && transferAmount && gasIndex !== -1;
  return (
    <SafeAreaView style={styles.container}>
     
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <View style={styles.bodyContainer}>
              <Text style={styles.coinType}>{t("Transfercurrency")}</Text>
              <TouchableOpacity
                style={styles.selectCoin}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Avatar
                  rounded
                  title={assetsList[selectCoinIndex]?.symbol[0]}
                  containerStyle={styles.coinLogo}
                  source={{ uri: assetsList[selectCoinIndex]?.icon }}
                />
                <View style={styles.coinNameList}>
                  <Text style={styles.coinName}>{assetsList[selectCoinIndex]?.symbol}</Text>
                  <Text style={styles.coinNameInfo}>{t("Balance")}: {assetsList[selectCoinIndex]?.balance} {assetsList[selectCoinIndex]?.symbol}</Text>
                </View>
                <Image
                  style={styles.coinGo}
                  source={require('assets/icon_arrow_right.png')}
                />
              </TouchableOpacity>

              <Text style={styles.coinTypeS}>{t("receiveaddress")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={t("enterWalAdd")}
                  style={styles.addressInput}
                  value={receivingAddress}
                  onChangeText={setReceivingAddress}
                />
                <TouchableOpacity onPress={() => {
                  navigate('AddressBookScreen', { title: '收款人', type: 'tansfer', setAddress: setReceivingAddress })
                }}>
                  <Image
                    style={styles.inputRightIcon}
                    source={require('assets/icon_address_book.png')}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.coinTypeS}>{t("transferamount")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={t("entertransferamount")}
                  keyboardType="numeric"
                  style={styles.addressInput}
                  value={transferAmount}
                  onChangeText={(text: any) => {
                    let balance = Number(assetsList[selectCoinIndex]?.balance);
                    let textVal = Number(text);
                    if (textVal <= balance) {
                      setTransferAmount(text)
                    } else {
                      show(t("lessthanavailablebalance"))
                    }
                  }}
                />
              </View>

              <Text style={styles.coinTypeS}>{t("Minerfee")}</Text>

              <View style={styles.gasContainer}>
                {gasList.map((item, index) => (
                  <TouchableOpacity
                    key={item.title}
                    style={
                      gasIndex === index
                        ? // eslint-disable-next-line react-native/no-inline-styles
                        {
                          ...styles.gasItem,
                          borderColor: '#3D73DD',
                          borderWidth: 0.5,
                        }
                        : styles.gasItem
                    }
                    onPress={() => setGasIndex(index)}
                  >
                    <Text
                      style={
                        gasIndex === index
                          ? // eslint-disable-next-line react-native/no-inline-styles
                          { ...styles.gasItemTitle, color: '#3D73DD' }
                          : styles.gasItemTitle
                      }
                    >
                      {item?.title}
                    </Text>
                    <Text
                      style={
                        gasIndex === index
                          ? // eslint-disable-next-line react-native/no-inline-styles
                          {
                            ...styles.gasItemSum,
                            color: '#3D73DD',
                            opacity: 0.5,
                          }
                          : styles.gasItemSum
                      }
                    >
                      {item?.balance} {thisUser?.coinInfo?.token}
                    </Text>
                    <Text
                      style={
                        gasIndex === index
                          ? // eslint-disable-next-line react-native/no-inline-styles
                          {
                            ...styles.gasItemSums,
                            color: '#3D73DD',
                            opacity: 0.5,
                          }
                          : styles.gasItemSums
                      }
                    >
                      ≈ {currenTUnit === 'USDT' ? '$' : '￥'} {item?.amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={styles.buttonStyle}
                title={t("sure")}
                disabled={!verification}
                titleStyle={styles.buttonTitle}
                onPress={() => showRisk ? setRiskWarning(true) : setTransferConfirm(!transferConfirm)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      {/* 选择币种Model */}
      <Modal
        animationType="fade"
        transparent={true}
        hardwareAccelerated={true}
        visible={modalVisible}
        onRequestClose={() => {
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
              <Text style={styles.headText}>{t("Choosecurrency")}</Text>
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  style={styles.textStyle}
                  source={require('assets/icon_close.png')}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.groupView}>
              {assetsList.map((item, i) => (
                <TouchableOpacity
                  style={styles.list}
                  key={item?.token}
                  onPress={() => getCoinItem(i)}
                >
                  <Avatar
                    rounded
                    title={item?.symbol[0]}
                    source={{ uri: item?.icon }}
                    containerStyle={styles.avatar}
                  />
                  <Text style={styles.listCoinName}>{item?.symbol}</Text>
                  {selectCoinIndex === i ? (
                    <Avatar
                      rounded
                      source={require('assets/icon_selected_styleone.png')}
                      containerStyle={styles.avatarSelect}
                    />
                  ) : undefined}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.lineView} />
          </View>
        </View>
      </Modal>

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
            behavior={Platform.OS == "ios" ? "position" : "height"}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
            >
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
                      placeholder={t("enterpassword")}
                      maxLength={12}
                      style={styles.codeInput}
                      value={securityCode}
                      onChangeText={setSecurityCode}
                      secureTextEntry
                    />
                    <View style={styles.codeButtonView}>
                      <Button
                        buttonStyle={styles.buttonStyle}
                        title={t("sure")}
                        titleStyle={styles.buttonTitle}
                        disabled={!(securityCode.length >= 6 && securityCode.length >= 6)}
                        onPress={() => verifySecurityPwd(true)}
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

      {/* 风险提示Model */}
      <Modal
        animationType="fade"
        transparent={true}
        hardwareAccelerated={true}
        visible={riskWarning}
        onRequestClose={() => {
          setRiskWarning(!riskWarning);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            style={{ ...styles.outView }}
            onPress={() => {
              setRiskWarning(!riskWarning);
            }}
          >
            <View style={styles.outContair} />
          </TouchableWithoutFeedback>
          <View style={{ ...styles.modalView, maxHeight: 'auto' }}>
            <View style={styles.headViews}>
              <Text style={styles.headText} />
              <TouchableOpacity
                style={{ ...styles.openButton }}
                onPress={() => {
                  setRiskWarning(!riskWarning);
                }}
              >
                <Image
                  style={styles.textStyle}
                  source={require('assets/icon_close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.groupView}>
              <View style={styles.alignItemsCenter}>
                <Image
                  style={styles.warning}
                  source={require('assets/safety_warning.png')}
                />
              </View>
              <Text style={styles.warningTitle}>{t("Riskwarning")}</Text>
              <View style={styles.warningDesc}>
                <Text style={styles.descText}>
                  1. {t("checktransferaddress")}
                </Text>
                <Text style={{ ...styles.descText, ...styles.paddingTop_30 }}>
                  2.
                  {t("transfercompletedtargetaddress")}
                </Text>
                <Text style={{ ...styles.descText, ...styles.paddingTop_30 }}>
                  3.
                  {t("Ensurethattransfersarevoluntary")}
                </Text>
              </View>
              <Button
                type="clear"
                buttonStyle={styles.warningButtonStyle}
                title={t("Iknow")}
                titleStyle={styles.buttonTitle}
                onPress={setShowRisk}
              />
            </View>
            <View style={styles.lineView} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bodyContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  coinType: {
    fontSize: 13,
    color: '#616D86',
    fontWeight: '400',
  },
  coinTypeS: {
    marginTop: 15,
    fontSize: 13,
    color: '#616D86',
    fontWeight: '400',
  },
  selectCoin: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinLogo: {
    width: 40,
    height: 40,
  },
  coinNameList: {
    marginLeft: 10,
    flex: 1,
  },
  coinName: {
    fontSize: 13,
    color: '#394867',
    fontWeight: '500',
  },
  coinNameInfo: {
    fontSize: 12,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  coinGo: {
    width: 8,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  addressInput: {
    height: 55,
    flex: 1,
  },
  inputRightIcon: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  gasContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gasItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    width: (SCREENWIDTH - (40 + 20)) / 3,
  },
  gasItemTitle: {
    fontSize: 14,
    color: '#616D86',
    fontWeight: '500',
  },
  gasItemSum: {
    paddingTop: 10,
    fontSize: 11,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  gasItemSums: {
    fontSize: 11,
    color: '#9CA4B3',
    fontWeight: '400',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    height: 55,
  },
  buttonTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  outView: {
    height: SCREENHEIGHT - 214,
  },
  outContair: {
    flex: 1,
    width: SCREENWIDTH,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: SCREENWIDTH,
    maxHeight: SCREENHEIGHT / 2,
    minHeight: SCREENHEIGHT / 3,
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
  headViews: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 0,
    height: 60,
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
  list: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9EDF1',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
  },
  listCoinName: {
    flex: 1,
    fontSize: 16,
    color: '#616D86',
    fontWeight: '400',
    paddingLeft: 10,
  },
  avatarSelect: {
    width: 20,
    height: 20,
  },
  groupView: {},
  lineView: {
    width: SCREENWIDTH,
    height: 30,
  },
  //   安全密码model
  codeInputView: {
    paddingHorizontal: 20,
  },
  codeInput: {
    marginTop: 20,
    backgroundColor: '#F2F5F8',
    borderRadius: 8,
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  codeButtonView: {
    marginTop: 20,
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
  alignItemsCenter: {
    alignItems: 'center',
  },
  warning: {
    width: 120,
    height: 120,
    resizeMode: 'center',
  },
  warningTitle: {
    paddingVertical: 15,
    fontSize: 20,
    color: '#394867',
    fontWeight: '500',
    textAlign: 'center',
  },
  warningDesc: {
    paddingHorizontal: 20,
  },
  descText: {
    fontSize: 14,
    color: '#616D86',
    lineHeight: 25,
    fontWeight: '400',
  },
  paddingTop_30: {
    paddingTop: 30,
  },
  warningButtonStyle: {
    marginHorizontal: 20,
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    height: 55,
    marginTop: 30,
    marginBottom: 20,
  },
});
export default TransferScreen;
