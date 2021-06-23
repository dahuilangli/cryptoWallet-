import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList,StatusBar ,Image} from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { screenHeight } from 'utils/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';


type AboutUsScreenRouteProp = RouteProp<ScreensParamList, 'AboutUsScreen'>;
interface Props {}

const list = [
  {
    name:'官网',
    img:require('assets/icon-30-关于我们-官网.png'),
    url:''
  },
  {
    name:'公众号',
    img:require('assets/icon-30-关于我们-官网.png'),
    url:''
  },
  {
    name:'Telegram',
    img:require('assets/icon-30-关于我们-官网.png'),
    url:''
  },
  {
    name:'Twitter',
    img:require('assets/icon-30-关于我们-官网.png'),
    url:''
  }
]

function AboutUsScreen({}: Props) {
    return (
      <View style = {styles.backView}>
        
        <SafeAreaView style={styles.container}>
          <View style = {styles.headView}>
            <Image source = {require('assets/icon-125-aboutuslogo.png')} style = {styles.iconImage}/>
            <Text style = {styles.nameLabel}>项目名称</Text>
          </View>
          <View style = {styles.bottomView}>
            {
              list.map((item,i)=>(
                <TouchableOpacity style = {styles.itemStyle}>
                  
                </TouchableOpacity>
              ))
            }
          </View>
        </SafeAreaView>
      </View>
      
    );
}

const styles = StyleSheet.create({
    backView:{
      flex: 1,
      backgroundColor:'#F2F5F8',
    },
    container: {
      flex: 1,
      backgroundColor: '#efefef',
    },
    headView:{
      height:300,
      alignItems:'center',
      justifyContent:'center',
    },
    iconImage:{
      marginTop:60,
      width:125,
      height:125,
    },
    nameLabel:{
      marginTop:20,
      alignContent : 'center',
      fontWeight : 'bold',
      color:'#394867',
      fontSize : 24,
      justifyContent:'center'
    },
    bottomView:{
      marginTop:50,
      justifyContent:'flex-start',
    },
    itemStyle:{
      marginHorizontal:20,
      backgroundColor : 'white',
      height:60,
      marginBottom:10,
      flexDirection:'row',
      alignItems:'center',
    }
  });

export default AboutUsScreen;