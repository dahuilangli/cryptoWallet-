import React, { useState } from 'react';
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
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { screenHeight, screenWidth } from 'utils/constants';
interface Props {}

function TransferScreen({}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [transferConfirm, setTransferConfirm] = useState(false);

  const [receivingAddress, setReceivingAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [gasIndex, setGasIndex] = useState(-1);
  const [selectCoinIndex, setSelectCoinIndex] = useState(-1);
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
      <View style={styles.main}>
        <View style={styles.bodyContainer}>
          <Text style={styles.coinType}>转账币种</Text>
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
              <Text style={styles.coinNameInfo}>余额: 0.0043 ETH</Text>
            </View>
            <Image
              style={styles.coinGo}
              source={require('assets/icon-20-arrow-right.png')}
            />
          </TouchableOpacity>

          <Text style={styles.coinTypeS}>收款地址</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="请输入或粘贴钱包地址"
              style={styles.addressInput}
              value={receivingAddress}
              onChangeText={setReceivingAddress}
            />
            <Image
              style={styles.inputRightIcon}
              source={require('assets/icon-20-地址本.png')}
            />
          </View>

          <Text style={styles.coinTypeS}>转账数量</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="请输入转账数量"
              keyboardType="numeric"
              style={styles.addressInput}
              value={transferAmount}
              onChangeText={setTransferAmount}
            />
          </View>

          <Text style={styles.coinTypeS}>矿工费</Text>
          <View style={styles.gasContainer}>
            {gasList.map((item, index) => (
              <TouchableOpacity
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
                        { ...styles.gasItemSum, color: '#3D73DD', opacity: 0.5 }
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
            title="确定"
            titleStyle={styles.buttonTitle}
            onPress={() => setTransferConfirm(!transferConfirm)}
          />
        </View>
      </View>
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
              <Text style={styles.headText}>选择币种</Text>
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
                <TextInput placeholder="输入密码" style={styles.codeInput} />
                <View style={styles.codeButtonView}>
                  <Button
                    buttonStyle={styles.buttonStyle}
                    title="确定"
                    titleStyle={styles.buttonTitle}
                    onPress={() => setTransferConfirm(!transferConfirm)}
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
        </View>
      </Modal>

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
              <Text style={styles.headText}>选择币种</Text>
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
    width: (screenWidth - (40 + 20)) / 3,
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
    width: screenWidth,
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
});
export default TransferScreen;
