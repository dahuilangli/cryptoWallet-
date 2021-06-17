import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';


type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props {}
const list =[
  
    {
      name: '语言设置',
      avatar_url:require('assets/icon-20-导入-词.png'),
    },
    {
      name: '货币单位',
      avatar_url:require('assets/icon-20-导入-私钥.png'),
    },
  
]
function SetUpScreen({}: Props) {
  
    return (
        <SafeAreaView style={styles.container}>
          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2F5F8',
    },
  });

export default SetUpScreen;