import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Alert,TextInput } from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { Button } from  'react-native-elements'
import * as helper from 'apis/helper'
import i18n from "i18n";

type SuggestScreenRouteProp = RouteProp<ScreensParamList, 'SuggestScreen'>;
interface Props {}

function SuggestScreen({}: Props) {
    const [emailText ,setEmailText] = useState('');
    const [walletAddressText ,setWalletAddressText] = useState('');
    const [detailsText ,setDetailsText] = useState('');

    async function postSuggest() {
      const { data} = await helper.post('/sys/help', {"email":emailText,"content":detailsText,"address":walletAddressText})
      console.log('===========/sys/help=============');
      console.log(data);
      console.log('====================================');
      if (data && data.length) {
          // setLanguageListData(data)
      }
  }
    return (
        <SafeAreaView style={styles.container}>
          <Text style = {styles.email}>{i18n.t("yourmailbox")}</Text>
          <View style = {styles.whiteView}>
            <TextInput style = {styles.input}  placeholder={i18n.t("enteremailaddress")} onChangeText = {setEmailText}>
              
            </TextInput>
          </View>
          <Text style = {styles.email}>{i18n.t("yourwalletaddress")}</Text>
          <View style = {styles.whiteView}>
            <TextInput style = {styles.input}  placeholder={i18n.t("enterWalAdd")} onChangeText = {setWalletAddressText}>
              
            </TextInput>
          </View>
          <Text style = {styles.email}>{i18n.t("problemDescription")}</Text>
          <View style = {styles.questView}>
            <TextInput style = {styles.input}  placeholder={i18n.t("enterproblemDescription")} multiline  onChangeText = {setDetailsText}>
              
            </TextInput>
          </View>
          <View style = {styles.main}>
            <Button 
            title={i18n.t("submit")}
            titleStyle = {styles.Tlabel}
            buttonStyle = {styles.Tbutton}
            onPress = {() => postSuggest()}
            />
          </View>

          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2F5F8',
      justifyContent: 'flex-end',
    },
    email:{
      marginTop:20,
      marginLeft:20,
      fontSize:13,
      color:'#616D86',
    },
    whiteView:{
      marginLeft:20,
      marginTop:10,
      marginRight:20,
      backgroundColor:'#FFFFFF',
      borderRadius:8,
      height:55,
      
    },
    questView:{
      marginLeft:20,
      marginTop:10,
      marginRight:20,
      backgroundColor:'#FFFFFF',
      borderRadius:8,
      height:135,
      
    },
    input:{
      marginLeft:15,
      marginRight:15,
      marginTop:18,
      marginBottom:17,
      fontSize:14,
      color:'black',
    },
    main :{
      flex: 1,
      marginHorizontal: 20,
      justifyContent: 'flex-end',
    },
    Tbutton:{
      marginLeft:20,
      marginRight:20,
      marginBottom:54,
      height:55,
      backgroundColor:'#3B6ED5',
      alignItems:'center',
      borderRadius:8,
    },
    Tlabel:{
      fontSize:16,
      fontWeight:'600',
    },
  });

export default SuggestScreen;