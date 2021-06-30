import React, { useState } from 'react';
import {Header } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from 'react-native';
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from 'components/navigationService';
import { Avatar, Button } from 'react-native-elements';

const list = [

  {
    name: 'ETH',
    avatar_url: require('assets/img-40-coointype-eth.png'),
    type: 'privateKey',
  },
  {
    name: 'STO',
    avatar_url: require('assets/img-40-coointype-sto.png'),
    type: 'privateKey',
  }, {
    name: 'BSC',
    avatar_url: require('assets/img-40-coointype-币安.png'),
    type: 'mnemonic',
  },
  {
    name: 'USDT',
    avatar_url: require('assets/img-40-coointype-USDT.png'),
    type: 'mnemonic',
  },

];


interface Props { }
function FlashExchangeScreen({ }: Props) {
  const {t} = useTranslation();
  const [outImage, setOutImage] = useState(require('assets/img-40-coointype-eth.png'));
  const [inPutImage, setInPutImage] = useState(require('assets/img-40-coointype-USDT.png'));
  const [outName, setOutName] = useState('ETH');
  const [inPutName, setInPutName] = useState('USDT');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [currentChange, setCurrentChange] = useState(1);
  const [outNumber, setOutNumber] = useState('');
  const [inNumber, setInNumber] = useState('');

  return (
    <View style={styles.container}>
      <Header
        placement="center"
        rightComponent={
          <TouchableOpacity 
            onPress = {() => navigate('FlashRecordScreen')}
          >
            <Text style = {styles.rightBtn}>{t("record")}</Text>
          </TouchableOpacity>
        }
        rightContainerStyle = {{alignItems:'flex-end',justifyContent:'center',}}
        centerComponent={{ text: t("flash"), style: { fontSize: 18, fontWeight: 'bold', color: 'white' ,} }}
        containerStyle={{
          backgroundColor: '#3D73DD',
          flexDirection:'row',
          alignItems: 'center',
        }}
      />
      <View style={styles.backgroundView}>
        <View style={styles.firstView}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setModalVisible(true);
              setCurrentChange(1);
            }}
          >
            <Image style={styles.inputImage} source={outImage} />
            <Text style={styles.inputText}>{outName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setModalVisible(true);
              setCurrentChange(2);
            }}
          >
            <Text style={styles.outText}>{inPutName}</Text>
            <Image style={styles.outImage} source={inPutImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.lineView} />
        <TouchableOpacity
          style = {styles.exchange}
          onPress={() => {
            setInPutImage(outImage);
            setOutImage(inPutImage);
            setInPutName(outName);
            setOutName(inPutName);
          }}>
          <Image style={{width:40,height:40}} source={require('assets/icon-40-闪兑切换.png')} />
        </TouchableOpacity>
        <View style={styles.secondView}>
          <View style={styles.centerViewone}>
            <Text style={styles.centerOut}>{t("transferout")}</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder={t("numberoftransfers")}
                style={styles.inputNumber}
                onChangeText={(text: string) => setOutNumber(text)}
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
                onChangeText={(text: string) => setInNumber(text)}
              >
              </TextInput>
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.useText}>{t("Available")}</Text>
            <Text style={styles.useNumber}>0.023875129 ETH</Text>
          </View>
          <Text style={styles.rateText}>{t("exchangerate")}  1 ETH ≈ 786.564 USDT</Text>
          <Text style={styles.rateText}>{t("handlefee")}  0.03%</Text>
          <TouchableOpacity style={styles.exchangeBtn} onPress={() => {
            if (inPutName === outName) {
              return;
            }
            setModalVisible1(true);
          }}>
            <Text style={styles.changeText}>{t("exchange")}</Text>
          </TouchableOpacity>
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
                      currentChange === 1 ?
                        (
                          setOutImage(item.avatar_url),
                          setOutName(item.name)
                        ) :
                        (
                          setInPutImage(item.avatar_url),
                          setInPutName(item.name)
                        );
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
                      {!!(currentChange === 1 && item.name === outName) && <Avatar
                        source={require('assets/icon-20-选中-样式1.png')}
                        containerStyle={styles.selected}
                      />}
                      {!!(currentChange === 2 && item.name === inPutName) && <Avatar
                        source={require('assets/icon-20-选中-样式1.png')}
                        containerStyle={styles.selected}
                      />}
                    </View>
                  </TouchableOpacity>
                ))}
                <View style={styles.lineView} />
              </View>
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
                        source={require('assets/icon-20-close.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.centerView1}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={outImage} style={styles.outImage2} />
                      <Text style={styles.outName2}>{outName}</Text>
                      <Text style={styles.outNumber2}>-{outNumber}</Text>
                    </View>
                    <Image style={styles.dianImage} source={require('assets/img-40-coointype-币安.png')} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={inPutImage} style={styles.outImage2} />
                      <Text style={styles.outName2}>{inPutName}</Text>
                      <Text style={styles.inNumber2}>+{inNumber}</Text>
                    </View>
                  </View>
                  <View style={styles.lineView1}></View>
                  <View style={styles.centerView1}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.poundage}>{t("handlefee")}</Text>
                      <Text style={styles.des}>0.023875129 ETH</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                      <Text style={styles.poundage}>{t("exchangerate")}</Text>
                      <Text style={styles.des}>1 ETH ≈ 786.564 USDT</Text>
                    </View>
                  </View>
                  <View style={styles.lineView1}></View>
                  <View style={styles.passView}>
                    <TextInput
                      placeholder={t("entersecurepassword")}
                      style={styles.passwordNumber}
                      onChangeText={(text: string) => { }}
                    >
                    </TextInput>
                  </View>
                  <View style={styles.bottomView1}>
                    <TouchableOpacity style={styles.sureBtn} onPress={() => {
                      if (inPutName === outName) {
                        Alert.alert('兑换名称不能一致');
                        return;
                      }
                      setModalVisible1(true);
                    }}>
                      <Text style={styles.changeText}>{t("confirmredemption")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </Modal>


      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  backgroundView: {
    backgroundColor: '#FFFFFF',
    height: 360,
  },
  rightBtn:{
    color: 'white' ,
    fontSize:14,
    fontWeight:'500',
    textAlign:'center',
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
    height: (list.length + 1) * 60 + 34,
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
  },
  textStyle: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginLeft: SCREENWIDTH / 2 - 135,
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
    width: SCREENWIDTH / 2 - 20,
    color: '#616D86',
    fontSize: 14,
    fontWeight: '500',
  },
  des: {
    width: SCREENWIDTH / 2 - 20,
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
  bottomView1:{
    height:109,
  }
});
export default FlashExchangeScreen;
