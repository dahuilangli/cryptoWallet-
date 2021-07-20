import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants"

import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';
import { navigate } from 'components/navigationService';
import { useTranslation } from 'react-i18next';


interface Props {}

const LoginScreen = ({}: Props) => {
  const {t} = useTranslation();
  

  async function addImportType(type:string){
    navigate('SelectWalletScreen',{loginType:type});
  }

  return (
    <LinearGradient colors={['#2859BF', '#387AFF']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.flex_1}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} resizeMethod="auto" source={require('assets/first_load_logo.png')} />
          <Text style={styles.logoText}>MORLEYSTONE</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.newCreate}
            onPress={() => {
              addImportType('new')
            }}
            title={t('createnewwallet')}
            titleStyle={styles.newCreateTitle}
          />
          <Button
            type="outline"
            buttonStyle={styles.already}
            onPress={() => addImportType('old')}
            title={t("haveawallet")}
            titleStyle={styles.alreadyTitle}
          />
        </View>
      </SafeAreaView>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
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
    paddingBottom: 20,
  },
  newCreate: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  newCreateTitle: {
    color: '#3D73DD',
    fontWeight: '600',
  },
  already: {
    height: 55,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  alreadyTitle: {
    color: '#3D73DD',
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
    height: 214,
  },
  headView: {
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
    width: SCREENWIDTH,
    height: 0.5,
    backgroundColor: '#E9EDF1',
  },
  flex_1: {
    flex: 1,
  },
});
export default LoginScreen;
