/** 
 * 闪兑
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants";
import { navigate } from 'components/navigationService';
import { Avatar, Button } from 'react-native-elements';
import * as helper from 'apis/helper'
import { post } from 'apis/request'
import { useDispatch, useSelector } from 'react-redux';
import { getAccountList, getUser } from 'reducers/walletStateReducer';
import { show, showTop } from 'utils';
import { AssetsList } from 'actions/types';
import { contractTrans, Div, Mul, transaction } from 'wallets/ethsWallet';
import { mobileType } from 'apis/common';


interface Props { }
interface ResponseItem {
  "coin_code": string,
  "coin_decimal": number,
  "contact": any,
  "ctime": string,
  "gas_limit": number,
  "icon": string,
  "id": number,
  "remarks": string,
  "state": number,
  "symbol": string,
  "wallet": string,
}

interface BaseObj {
  "deposit_max": string,
  "deposit_min": string,
  "instant_rate": string,
  "miner_fee": string,
  "receive_coin_fee": string,
}

function FlashExchangeScreen({ }: Props) {
  const { t } = useTranslation();
  const user = useSelector(getUser);
  const walletlist = useSelector(getAccountList);
  const thisUser = walletlist.get(user.type)?.find(x => x.address === user.address)

  const [coinList, setCoinList] = useState([]);
  const [assetsList, setAssetsList] = useState<Array<AssetsList>>();
  const [balance, setBalance] = useState<AssetsList>();
  const [base, setBase] = useState<BaseObj>();
  const [out, setOut] = useState<ResponseItem>();
  const [inPut, setInPut] = useState<ResponseItem>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [currentChange, setCurrentChange] = useState(1);
  const [outNumber, setOutNumber] = useState('');
  const [inNumber, setInNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  useEffect(() => {
    if (user) {
      getSwftCoinList();
      getAssetsList();
    }
  }, [user]);

  useEffect(() => {
    if (coinList) {
      setOut(coinList[0])
      setInPut(coinList[1])
    }
  }, [coinList])

  useEffect(() => {
    if (out && inPut) {
      getBase()
    }
  }, [out, inPut]);

  useEffect(() => {
    if (out && assetsList) {
      let b = assetsList?.find(x => x.symbol === out?.symbol);
      setBalance(b ? b : { balance: '0', symbol: out.symbol })
    }
  }, [out, assetsList]);

  function getAssetsList() {
    let params = {
      "address": thisUser?.address,
      "contracts": thisUser?.contracts,
      "wallet": thisUser?.coinInfo?.wallet
    }
    helper.post('/wallet/assets', params).then((res: any) => {
      setAssetsList(res)
    })
  }

  function getSwftCoinList() {
    helper.get('/swft/coin', { wallet: thisUser?.coinInfo.wallet }).then((res: any) => {
      setCoinList(res)
    })
  }

  function getBase() {
    helper.get('/swft/base_info', { depositCoinCode: out?.coin_code, receiveCoinCode: inPut?.coin_code }).then((res: any) => {
      setBase(res)
    })
  }

  function exchange() {
    if (Number(outNumber) <= Number(balance?.balance)) {
      if (outNumber >= base?.deposit_min && outNumber <= base?.deposit_max) {
        setModalVisible1(true)
      } else {
        show(t("Limitnumberrollsout"))
      }
    } else {
      show(t("Insufficientbalance"))
    }
  }
  let accountExchange: any;
  async function exchangeSub() {
    if (securityCode === thisUser?.securityCode) {
      setIsSigninInProgress(true);
      setModalVisible1(false)
      setSecurityCode('')
      try {
        let sourceType = mobileType.toUpperCase();
        let equipmentNo = `Morleystone-${thisUser?.coinInfo?.wallet}-${thisUser.address}`;
        const data: any = await post('/accountExchange', {
          equipmentNo,
          sourceType,
          depositCoinCode: out?.coin_code,
          receiveCoinCode: inPut?.coin_code,
          receiveCoinAmt: Mul(outNumber, base?.instant_rate),
          depositCoinAmt: outNumber,
          destinationAddr: thisUser.address,
          refundAddr: thisUser.address,
          sourceFlag: 'MorleyStone'
        })
        accountExchange = data.data;
        if (accountExchange) {
          let address = user?.address;
          let wallet = thisUser?.coinInfo?.wallet;
          // 获取GasList
          helper.get('/wallet/gas', { wallet }).then((res: any) => {
            let gas = {
              title: t("fast"),
              gasPrice: res.fastest,
              balance: Div(Mul(res.fastest, balance?.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))).toString(),
              amount: Mul(Div(Mul(res.fastest, thisUser?.coinInfo.gas_limit), Math.pow(10, Number(thisUser?.coinInfo?.gas_decimal))), res.rate_currency).toString(),
            }
            let gas_price = Mul(gas.gasPrice, Math.pow(10, thisUser?.coinInfo?.gas_decimal)).toString();
            let gas_limit: any = balance?.gas_limit;
            let amount = accountExchange?.depositCoinAmt;
            // let amountSign = Mul(amount, balance?.gas_limit);
            let to = accountExchange?.platformAddr;
            let symbol = balance?.symbol;
            helper.get('/wallet/transfer_nonce', { address, wallet }).then((res: any) => {
              let nonce = res.nonce;
              if (thisUser?.coinInfo?.token === out?.symbol) {
                transaction(thisUser.privateKey, nonce, gas_limit, gas_price, to, amount).then(sign => {
                  console.log('============签名成功=============');
                  console.log(sign);
                  console.log('====================================');
                  let params = {
                    "amount": amount,
                    "equipment_no": equipmentNo,
                    "from": address,
                    "gas": gas?.balance,
                    "nonce": Number(nonce),
                    "order_id": accountExchange?.orderId,
                    "signature": sign,
                    "source_type": sourceType,
                    "symbol": symbol,
                    "to": to,
                    "wallet": wallet
                  }
                  helper.post('/swft/deposit', params).then((res: any) => {
                    show(t("Storedsuccessfully"));
                    getAssetsList();
                  })
                })
              } else {
                let value: bigint = BigInt(Mul(amount, Math.pow(10, Number(out?.coin_decimal))));
                let contract = out?.contact;
                contractTrans(thisUser.privateKey, nonce, gas_limit, gas_price, contract, to, value).then(sign => {
                  let params = {
                    "amount": amount,
                    "equipment_no": equipmentNo,
                    "from": address,
                    "gas": gas?.balance,
                    "nonce": Number(nonce),
                    "order_id": accountExchange?.orderId,
                    "signature": sign,
                    contract,
                    "source_type": sourceType,
                    "symbol": symbol,
                    "to": to,
                    "wallet": wallet
                  }
                  helper.post('/swft/deposit', params).then((res: any) => {
                    show(t("Storedsuccessfully"));
                    getAssetsList();
                  })
                })
              }
            })
          })
        } else {
          throw data.resMsg;
        }
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        Alert.alert(error)
      } finally {
        setIsSigninInProgress(false);
        setOutNumber('');
        setInNumber('');
        setSecurityCode('')
      }
    } else {
      show(t("Pleaseentercorrectsecuritypassword"))
      setSecurityCode('')
    }
  }
  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.leftBtn}>{t("record")}</Text>
            <Text style={styles.headerTitle}>{t("flash")}</Text>
            <TouchableOpacity onPress={() => navigate('FlashRecordScreen', { equipmentNo: `Morleystone-${thisUser?.coinInfo?.wallet}-${thisUser.address}` })}>
              <Image
                style={styles.image}
                source={require('assets/icon_flash_record.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.backgroundView}>
            <View style={{ backgroundColor: 'white', height: 360 }}>
              <View style={styles.firstView}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setModalVisible(true);
                    setCurrentChange(1);
                  }}
                >
                  <Image style={styles.inputImage} source={{ uri: out?.icon }} />
                  <Text style={styles.inputText}>{out?.symbol}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setModalVisible(true);
                    setCurrentChange(2);
                  }}
                >
                  <Text style={styles.outText}>{inPut?.symbol}</Text>
                  <Image style={styles.outImage} source={{ uri: inPut?.icon }} />
                </TouchableOpacity>
              </View>
              <View style={styles.lineView} />
              <TouchableOpacity
                style={styles.exchange}
                onPress={() => {
                  setInPut(out);
                  setOut(inPut);
                  setInNumber(outNumber);
                  setOutNumber(inNumber);
                }}>
                <Image style={{ width: 40, height: 40 }} source={require('assets/icon_flash_change.png')} />
              </TouchableOpacity>
              <View style={styles.secondView}>
                <View style={styles.centerViewone}>
                  <Text style={styles.centerOut}>{t("transferout")}</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      placeholder={t("numberoftransfers")}
                      style={styles.inputNumber}
                      keyboardType="numeric"
                      value={outNumber}
                      onChangeText={(text) => {
                        setOutNumber(text);
                        if (text) {
                          let num = Mul(parseFloat(text), parseFloat(base?.instant_rate)).toFixed(8);
                          setInNumber(num.toString())
                        } else {
                          setInNumber('')
                        }
                      }}
                    >
                    </TextInput>
                  </View>
                </View>
                <View style={styles.centerViewtwo}>
                  <Text style={styles.centerinput}>{t("transferin")}</Text>
                  <View style={styles.outView}>
                    <TextInput
                      placeholder={t("numberreceive")}
                      style={styles.outNumber}
                      keyboardType="numeric"
                      editable={false}
                      value={inNumber}
                      onChangeText={setInNumber}
                    >
                    </TextInput>
                  </View>
                </View>
              </View>
              <View style={styles.bottomView}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.useText}>{t("Available")}</Text>
                  <Text style={styles.useNumber}>
                    {balance?.balance} {out?.symbol}
                  </Text>
                </View>
                <Text style={styles.rateText}>{t("exchangerate")}  1 {out?.symbol} ≈ {Number(base?.instant_rate).toFixed(8)} {inPut?.symbol}</Text>
                <Text style={styles.rateText}>{t("handlefee")}  0.03%</Text>
                <TouchableOpacity style={styles.exchangeBtn} onPress={exchange}>
                  <Text style={styles.changeText}>{t("exchange")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Modal
              animationType='fade'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  // style={{ ...styles.outView }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.outContair} />
                </TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <View style={styles.headView}>
                    <Text style={styles.headText}>{t("importmethod")}</Text>
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
                    {coinList.map((item: ResponseItem, i) => (
                      <TouchableOpacity
                        style={styles.list}
                        key={i + item.coin_code}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          if (currentChange === 1) {
                            if (thisUser?.contracts.indexOf(item?.contact === null ? "" : item?.contact) !== -1) {
                              if (item?.coin_code !== inPut?.coin_code) {
                                setOut(item);
                              } else {
                                show(t("Noexchangesamecurrency"))
                              }
                            } else {
                              show(`${t("Currentlynoadded")}+${item.symbol}+${t("Assetspleaseaddagain")}`)
                            }
                          } else {
                            if (thisUser?.contracts.indexOf(item?.contact === null ? "" : item?.contact) !== -1) {
                              if (item?.coin_code !== out?.coin_code) {
                                setInPut(item);
                              } else {
                                show(t("Noexchangesamecurrency"))
                              }
                            } else {
                              show(`${t("Currentlynoadded")}+${item.symbol}+${t("Assetspleaseaddagain")}`)
                            }
                          }
                        }}
                      >
                        <View style={styles.lineView} />
                        <View style={styles.listItem}>
                          <Avatar
                            rounded
                            title={item.symbol[0]}
                            source={{ uri: item?.icon }}
                            containerStyle={styles.avatar}
                          />
                          <Text style={styles.text}>{item?.symbol}</Text>
                          {!!(currentChange === 1 && item.symbol === out?.symbol) && <Avatar
                            source={require('assets/icon_selected_styleone.png')}
                            containerStyle={styles.selected}
                          />}
                          {!!(currentChange === 2 && item.symbol === inPut?.symbol) && <Avatar
                            source={require('assets/icon_selected_styleone.png')}
                            containerStyle={styles.selected}
                          />}
                        </View>
                      </TouchableOpacity>
                    ))}
                    <View style={styles.lineView} />
                  </ScrollView>
                </View>
              </View>
            </Modal>

            <Modal
              animationType='fade'
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                setModalVisible1(!modalVisible1);
              }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setModalVisible1(!modalVisible1);
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
                    <View style={styles.modalView2}>
                      <View style={styles.headView}>
                        <Text style={styles.headText}>{t("confirmflash")}</Text>
                        <TouchableOpacity
                          style={{ ...styles.openButton }}
                          onPress={() => {
                            setModalVisible1(!modalVisible1);
                          }}
                        >
                          <Image
                            style={styles.textStyle}
                            source={require('assets/icon_close.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.centerView1}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: out?.icon }} style={styles.outImage2} />
                          <Text style={styles.outName2}>{out?.symbol}</Text>
                          <Text style={styles.outNumber2}>-{outNumber}</Text>
                        </View>
                        <Image style={styles.dianImage} source={require('assets/icon_coointype_bian.png')} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: inPut?.icon }} style={styles.outImage2} />
                          <Text style={styles.outName2}>{inPut?.symbol}</Text>
                          <Text style={styles.inNumber2}>+{inNumber}</Text>
                        </View>
                      </View>
                      <View style={styles.lineView1}></View>
                      <View style={styles.centerView1}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={styles.poundage}>{t("gas")}</Text>
                          <Text style={styles.des}> {Mul(outNumber ? outNumber : 0, 0.0003)} {out?.symbol}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                          <Text style={styles.poundage}>{t("exchangerate")}</Text>
                          <Text style={styles.des}> 1 {out?.symbol} ≈ {Number(base?.instant_rate).toFixed(8)} {inPut?.symbol}</Text>
                        </View>
                      </View>
                      <View style={styles.lineView1}></View>
                      <View style={styles.passView}>
                        <TextInput
                          placeholder={t("entersecurepassword")}
                          keyboardType='numeric'
                          maxLength={12}
                          style={styles.passwordNumber}
                          value={securityCode}
                          onChangeText={setSecurityCode}
                          secureTextEntry
                        >
                        </TextInput>
                      </View>
                      <View style={styles.bottomView1}>
                        <Button
                          buttonStyle={styles.sureBtn}
                          title={t("confirmredemption")}
                          disabled={isSigninInProgress || !(securityCode.length >= 6 && securityCode.length <= 12)}
                          onPress={exchangeSub}
                        />
                        {/* <TouchableOpacity style={styles.sureBtn} onPress={() => {
                        setModalVisible1(true);
                      }}>
                        <Text style={styles.changeText}>{t("confirmredemption")}</Text>
                      </TouchableOpacity> */}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 50, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 88, // 处理iOS状态栏
    backgroundColor: '#efefef',
  },
  header: {
    paddingHorizontal: 20,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  image: {
    width: 24,
    height: 24,
  },
  main: {
    flex: 1,
  },
  backgroundView: {
    flex: 1,
    backgroundColor: '#F2F5F8',
    // height: 360,
  },
  leftBtn: {
    color: 'rgba(0,0,0,0)',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  rightBtn: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  firstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 80,
    flexDirection: 'row',
  },
  inputImage: {
    marginLeft: 20,
    marginTop: 20,
    width: 40,
    height: 40,
  },
  inputText: {
    marginLeft: 10,
    marginTop: 30,
    height: 20,
    fontSize: 18,
    fontWeight: '400',
    color: '#616D86',
  },
  outImage: {
    marginRight: 20,
    marginTop: 20,
    width: 40,
    height: 40,
  },
  outText: {
    marginRight: 10,
    marginTop: 30,
    height: 20,
    fontSize: 18,
    fontWeight: '400',
    color: '#616D86',
  },
  lineView: {
    backgroundColor: '#E9EDF1',
    width: SCREENWIDTH,
    height: 0.5,
  },
  exchange: {
    width: 40,
    height: 40,
    marginTop: -20,
    marginLeft: SCREENWIDTH / 2 - 20,
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerViewone: {
    alignItems: 'flex-start',
  },
  centerViewtwo: {
    alignItems: 'flex-end',
  },
  centerOut: {
    marginLeft: 20,
    height: 20,
    color:'#616D86',
  },
  inputView: {
    marginLeft: 20,
    height: 55,
    width: SCREENWIDTH / 2 - 27.5,
    marginTop: 10,
    backgroundColor: '#F2F5F8',
    borderRadius: 8,
  },
  inputNumber: {
    marginLeft: 15,
    height: 55,
    marginRight: 15,
    fontSize: 14,
    width: SCREENWIDTH / 2 - 57.5,
    fontWeight: '400',
    color: '#9CA4B3',
  },
  centerinput: {
    marginRight: 20,
    height: 20,
    color:'#616D86',
  },
  outView: {
    marginRight: 20,
    width: SCREENWIDTH / 2 - 27.5,
    marginTop: 10,
    backgroundColor: '#F2F5F8',
    borderRadius: 8,
    alignItems: 'flex-end',
  },
  outNumber: {
    marginLeft: 15,
    height: 55,
    marginRight: 15,
    fontSize: 14,
    fontWeight: '400',
    width: SCREENWIDTH / 2 - 57.5,
    color: '#9CA4B3',
    textAlign: 'right',
  },
  bottomView: {
    marginTop: 20,
    marginLeft: 20,
    width: SCREENWIDTH - 40,
    // alignItems:'flex-start',
  },
  useText: {
    height: 20,
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA4B3',
  },
  useNumber: {
    marginLeft: 6,
    height: 20,
    fontSize: 12,
    fontWeight: '500',
    color: '#3D73DD',
  },
  rateText: {
    height: 20,
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA4B3',
  },
  exchangeBtn: {
    marginTop: 20,
    width: SCREENWIDTH - 40,
    height: 55,
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    alignItems: 'center',
  },
  changeText: {
    marginTop: 17.5,
    marginBottom: 20,
    height: 20,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    minHeight: SCREENHEIGHT / 4,
  },
  modalView2: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: SCREENWIDTH,
  },
  headView: {
    flexDirection: 'row',
    height: 60,
    borderBottomColor: '#E9EDF1',
    borderBottomWidth: 0.5,
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
  selected: {
    width: 20,
    height: 20,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#3D73DD',
    fontWeight: '400',
  },
  groupView: {},
  centerView1: {
    marginVertical: 17,
    marginHorizontal: 20,
    flexDirection: 'column',
    // alignItems:'center',
  },
  outImage2: {
    width: 30,
    height: 30,
  },
  outName2: {
    marginLeft: 10,
    height: 20,
    width: SCREENWIDTH / 2 - 60,
    fontSize: 16,
    fontWeight: '400',
  },
  outNumber2: {
    width: SCREENWIDTH / 2 - 20,
    color: '#DD3D50',
    textAlign: 'right',
    height: 20,
    fontSize: 18,
    fontWeight: '400',
  },
  inNumber2: {
    width: SCREENWIDTH / 2 - 20,
    color: '#3DDD94',
    textAlign: 'right',
    height: 20,
    fontSize: 18,
    fontWeight: '400',
  },
  dianImage: {
    marginLeft: 14.5,
    marginVertical: 1,
    width: 1,
    height: 14,
  },
  lineView1: {
    marginHorizontal: 20,
    backgroundColor: '#E9EDF1',
    height: 0.5,
  },
  poundage: {
    height: 20,
    color: '#616D86',
    fontSize: 14,
    fontWeight: '500',
  },
  des: {
    color: '#616D86',
    textAlign: 'right',
    height: 20,
    fontSize: 14,
    fontWeight: '400',
  },
  passView: {
    margin: 20,
    height: 55,
    backgroundColor: '#F2F5F8',
    borderRadius: 8,
  },
  passwordNumber: {
    marginHorizontal: 20,
    height: 55,
    fontSize: 14,
    fontWeight: '400',
    color: '#616D86',
  },
  sureBtn: {
    marginHorizontal: 20,
    height: 55,
    backgroundColor: '#3B6ED5',
    borderRadius: 8,
    alignItems: 'center',
  },
  bottomView1: {
    height: 109,
  }
});
export default FlashExchangeScreen;
