import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button, Alert } from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


type SuggestScreenRouteProp = RouteProp<ScreensParamList, 'SuggestScreen'>;
interface Props {}

function SuggestScreen({}: Props) {
    return (
        <SafeAreaView style={styles.container}>
          <Text style = {styles.email}>您的邮箱</Text>
          <View style = {styles.whiteView}>
            <TextInput style = {styles.input}  placeholder="请输入邮箱地址">
              
            </TextInput>
          </View>
          <Text style = {styles.email}>您的钱包地址</Text>
          <View style = {styles.whiteView}>
            <TextInput style = {styles.input}  placeholder="请输入钱包地址">
              
            </TextInput>
          </View>
          <Text style = {styles.email}>问题描述</Text>
          <View style = {styles.questView}>
            <TextInput style = {styles.input}  placeholder="请描述您遇到的问题" multiline >
              
            </TextInput>
          </View>
          <View style ={styles.Tbutton}>
            <Button title='提交' color="#FFFFFF"  onPress = {() => Alert.alert('123') }/>
          </View>
          

          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2F5F8',
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
    Tbutton:{
      marginLeft:20,
      marginRight:20,
      top:220,
      height:55,
      backgroundColor:'#3B6ED5',
      alignItems:'center',
      borderRadius:8,
      flexDirection: 'column',
      justifyContent: 'center',

    },
  });

export default SuggestScreen;