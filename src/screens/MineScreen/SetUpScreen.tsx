import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { screenWidth } from 'utils/constants';


type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props { }
const list = [

  {
    name: '语言设置',
    content: '简体中文',
  },
  {
    name: '货币单位',
    content: 'CNY',
  },

]
function SetUpScreen({ }: Props) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        {
          list.map((item, i) => (
            <TouchableOpacity
              style={{ flexDirection: 'column' }}
              onPress={() => (
                navigate('LanguageSetScreen',{title:i===0?'语言设置':'货币单位'})
            )}>
              <View style={{ height: 60.5, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <Image style={styles.right} source={require('assets/icon-20-arrow-right.png')} />
              </View>
              <View style={{ height: 0.5, backgroundColor: '#E9EDF1' }} />
            </TouchableOpacity>
          ))
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  title: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#394867',
    width: screenWidth / 2 - 20,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA4B3',
    width: screenWidth / 2 - 40,
    textAlign: 'right'
  },
  right: {
    marginLeft: 12,
    width: 8,
    height: 20,
  }
});

export default SetUpScreen;