import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';

type AboutUsScreenRouteProp = RouteProp<ScreensParamList, 'AboutUsScreen'>;
interface Props {}

function AboutUsScreen({}: Props) {
  return (
    <View style={styles.backView}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headView}>
          <Image
            source={require('assets/icon-125-aboutuslogo.png')}
            style={styles.iconImage}
          />
          <Text style={styles.nameLabel}>项目名称</Text>
        </View>
        {/* <FlatList >

          </FlatList> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backView: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  headView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    marginTop: 60,
    width: 125,
    height: 125,
  },
  nameLabel: {
    marginTop: 20,
    alignContent: 'center',
    fontWeight: 'bold',
    color: '#394867',
    fontSize: 24,
    justifyContent: 'center'
  },
  bottomView: {
    marginTop: 50,
    justifyContent: 'flex-start',
  },
  itemStyle: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: 60,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  firstView: {
    marginLeft:15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  LeftImage:{
    width:30,
    height:30,
  },
  nameText:{
    marginLeft:10,
    fontSize:14,
    color:'#394867',
    fontWeight:'500',
  },
  secondView: {
    marginRight:15,
  },
  rightImage:{
    width:8,
    height:20,
  },
});

export default AboutUsScreen;
