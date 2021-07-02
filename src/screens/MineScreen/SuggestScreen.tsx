import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Alert, TextInput } from 'react-native';
import { goBack, navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { Button } from 'react-native-elements'
import * as helper from 'apis/helper'
import { useTranslation } from 'react-i18next';
import { showWithImage } from 'components/Dialog';
import {checkEmail} from 'components/checkCorrect'
import { Image } from 'react-native-elements/dist/image/Image';
type SuggestScreenRouteProp = RouteProp<ScreensParamList, 'SuggestScreen'>;
interface Props { }

function SuggestScreen({ }: Props) {
  const { t } = useTranslation();
  const [emailText, setEmailText] = useState('');
  const [walletAddressText, setWalletAddressText] = useState('');
  const [detailsText, setDetailsText] = useState('');


  async function postSuggest() {
    const body = {
      email: emailText,
      content: detailsText,
      address: walletAddressText,
    };
    const data = await helper.post('/sys/help', body)
    if(data.code === '200'){
      showWithImage('提交成功',require('assets/icon-20-有误.png'))
      goBack()
    }

    return data

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.email}>{t("yourmailbox")}</Text>
      <View style={styles.whiteView}>
        <TextInput
          style={styles.input}
          placeholder={t("enteremailaddress")}
          onChangeText={setEmailText}
          onEndEditing ={()=>checkEmail(emailText)}
        >

        </TextInput>
      </View>
      <Text style={styles.email}>{t("yourwalletaddress")}</Text>
      <View style={styles.whiteView}>
        <TextInput style={styles.input} placeholder={t("enterWalAdd")} onChangeText={setWalletAddressText}>

        </TextInput>
      </View>
      <Text style={styles.email}>{t("problemDescription")}</Text>
      <View style={styles.questView}>
        <TextInput style={styles.input} placeholder={t("enterproblemDescription")} multiline onChangeText={setDetailsText}>

        </TextInput>
      </View>
      <View style={styles.main}>
        <Button
          title={t("submit")}
          titleStyle={styles.Tlabel}
          buttonStyle={styles.Tbutton}
          onPress={() =>
            postSuggest()
          }
          disabled={walletAddressText && emailText && detailsText ? false : true}
        />
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
    justifyContent: 'flex-end',
  },
  email: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 13,
    color: '#616D86',
  },
  whiteView: {
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 55,

  },
  questView: {
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 135,

  },
  input: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 18,
    marginBottom: 17,
    fontSize: 14,
    color: 'black',
  },
  main: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'flex-end',
  },
  Tbutton: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 54,
    height: 55,
    backgroundColor: '#3B6ED5',
    alignItems: 'center',
    borderRadius: 8,
  },
  Tlabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuggestScreen;