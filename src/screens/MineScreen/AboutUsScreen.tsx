import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import i18n from "i18n";
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';

type AboutUsScreenRouteProp = RouteProp<ScreensParamList, 'AboutUsScreen'>;
interface Props {}

const list = [
  {
    name: '官网',
    img: require('assets/icon-30-关于我们-官网.png'),
    url: ''
  },
  {
    name: '公众号',
    img: require('assets/icon-30-关于我们-官网.png'),
    url: ''
  },
  {
    name: 'Telegram',
    img: require('assets/icon-30-关于我们-官网.png'),
    url: ''
  },
  {
    name: 'Twitter',
    img: require('assets/icon-30-关于我们-官网.png'),
    url: ''
  }
]

function AboutUsScreen({ }: Props) {
  return (
    <View style={styles.backView}>

      <SafeAreaView style={styles.container}>
        <View style={styles.headView}>
          <Image source={require('assets/icon-125-aboutuslogo.png')} style={styles.iconImage} />
          <Text style={styles.nameLabel}>{i18n.t("projectname")}</Text>
        </View>
        <View style={styles.bottomView}>
          {
            list.map((item, i) => (
              <TouchableOpacity style={styles.itemStyle}>
                <View style={styles.firstView}>
                  <Image
                    style = {styles.LeftImage}
                    source = {item.img}
                  />
                  <Text style = {styles.nameText}>{item.name}</Text>
                </View >
                <View style={styles.secondView}>
                  <Image
                    style = {styles.rightImage}
                    source = {require('assets/icon-20-arrow-right.png')}
                  />
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
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
