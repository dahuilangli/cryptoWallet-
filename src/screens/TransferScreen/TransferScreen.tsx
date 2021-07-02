import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
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
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants"
interface Props {
  route: {
    params: {
      address: string
    }
  }
}

function TransferScreen(props: Props) {
  const { address } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [transferConfirm, setTransferConfirm] = useState(false);
  const [riskWarning, setRiskWarning] = useState(false);

  const [receivingAddress, setReceivingAddress] = useState(address);
  const [transferAmount, setTransferAmount] = useState('');
  const [gasIndex, setGasIndex] = useState(-1);
  const [selectCoinIndex, setSelectCoinIndex] = useState(-1);
  const {t} = useTranslation();
  // for (let index = 0; index < 10; index++) {
  //   setGenericPassword(index.toString(), '密码' + index);
  // }
  // getGenericPassword();

  let list = [
    {
      coinName: 'ETH',
      avatar_url: require('assets/img-40-coointype-eth.png'),
    },
    {
      coinName: 'STO',
      avatar_url: require('assets/img-40-coointype-sto.png'),
    },
    {
      coinName: 'BSC',
      avatar_url: require('assets/img-40-coointype-币安.png'),
    },
    {
      coinName: 'USDT',
      avatar_url: require('assets/img-40-coointype-USDT.png'),
    },
  ];
  let gasList = [
    {
      title: '快速',
      quantity: '0.000666',
      coin: 'ETH',
      cny: '0.6',
    },
    {
      title: '平均',
      quantity: '0.000348',
      coin: 'ETH',
      cny: '0.4',
    },
    {
      title: '最慢',
      quantity: '0.000219',
      coin: 'ETH',
      cny: '0.2',
    },
  ];
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
              <Image
                style={styles.coinLogo}
                source={require('assets/img-40-coointype-eth.png')}
              />
              <View style={styles.coinNameList}>
                <Text style={styles.coinName}>ETH</Text>
                <Text style={styles.coinNameInfo}>{t("Balance")}: 0.0043 ETH</Text>
              </View>
              <Image
                style={styles.coinGo}
                source={require('assets/icon-20-arrow-right.png')}
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
              <Image
                style={styles.inputRightIcon}
                source={require('assets/icon-20-地址本.png')}
              />
            </View>

            <Text style={styles.coinTypeS}>{t("transferamount")}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={t("entertransferamount")}
                keyboardType="numeric"
                style={styles.addressInput}
                value={transferAmount}
                onChangeText={setTransferAmount}
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
                    {item?.quantity} {item?.coin}
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
                    ≈￥{item?.cny} {item?.coin}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.buttonStyle}
              title={t("sure")}
              titleStyle={styles.buttonTitle}
              onPress={() => setTransferConfirm(!transferConfirm)}
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
                  key={item.coinName}
                  onPress={() => {
                    setSelectCoinIndex(i);

                    setTimeout(() => {
                      setModalVisible(!modalVisible);
                    }, 150);
                  }}
                >
                  <Avatar
                    rounded
                    source={item.avatar_url}
                    containerStyle={styles.avatar}
                  />
                  <Text style={styles.listCoinName}>{item.coinName}</Text>
                  {selectCoinIndex === i ? (
                    <Avatar
                      rounded
                      source={require('assets/icon-20-选中-样式1.png')}
                      containerStyle={styles.avatarSelect}
                    />
                  ) : undefined}
                </TouchableOpacity>
              ))}
            </View>
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
                      source={require('assets/icon-20-close.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.groupView}>
                  <View style={styles.codeInputView}>
                    <TextInput placeholder={t("enterpassword")} style={styles.codeInput} />
                    <View style={styles.codeButtonView}>
                      <Button
                        buttonStyle={styles.buttonStyle}
                        title={t("sure")}
                        titleStyle={styles.buttonTitle}
                        onPress={() => setTransferConfirm(!transferConfirm)}
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
          <View style={styles.modalView}>
            <View style={styles.headViews}>
              <Text style={styles.headText} />
              <TouchableWithoutFeedback
                style={{ ...styles.openButton }}
                onPress={() => {
                  setRiskWarning(!riskWarning);
                }}
              >
                <Image
                  style={styles.textStyle}
                  source={require('assets/icon-20-close.png')}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.groupView}>
              <View style={styles.alignItemsCenter}>
                <Image
                  style={styles.warning}
                  source={require('assets/safetyWarning.png')}
                />
              </View>
              <Text style={styles.warningTitle}>风险提示</Text>
              <View style={styles.warningDesc}>
                <Text style={styles.descText}>
                  1. 请务必在转账操作前，仔细核对转账地址信息。
                </Text>
                <Text style={{ ...styles.descText, ...styles.paddingTop_30 }}>
                  2.
                  您的转账行为一旦完成，对应的资产所有权将由变更为目标地址所对应的账户所有人享有。
                </Text>
                <Text style={{ ...styles.descText, ...styles.paddingTop_30 }}>
                  3.
                  确保转账属于自愿行为，并确认不涉及任何传销，非法集资，诈骗等违法情形。谨防上当受骗，避免造成不必要的财产损失。
                </Text>
              </View>
              <Button
                type="clear"
                buttonStyle={styles.warningButtonStyle}
                title="我知道了"
                titleStyle={styles.buttonTitle}
                onPress={() => {
                  Alert.alert('点击了');
                  setTimeout(() => {
                    setRiskWarning(!riskWarning);
                  }, 150);
                }}
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
    paddingHorizontal: 10,
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
  },
  textStyle: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: SCREENWIDTH / 2 - 135,
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
