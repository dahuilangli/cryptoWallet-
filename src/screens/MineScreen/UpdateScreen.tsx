import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity ,Image} from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import i18next from 'i18n';

type UpdateScreenRouteProp = RouteProp<ScreensParamList, 'UpdateScreen'>;
interface Props { }

let systemVersion = DeviceInfo.getVersion();
function UpdateScreen({ }: Props) {

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.headView}>
        <Image source={require('assets/icon-125-aboutuslogo.png')} style={styles.iconImage} />
        <Text style={styles.nameLabel}>{i18n.t("projectname")}</Text>
        <Text style={styles.currentVersion}>{i18n.t("currentversion")}</Text>
        <Text style={styles.localVersion}>
          v{systemVersion}
        </Text>
      </View>
      <View style={styles.bottomView}>
        <View style = {styles.VersionNumber}>
          <Image style = {styles.Icon} source = {require('assets/icon-125-aboutuslogo.png')}/>
          <Text style = {styles.findText}>{i18n.t("newversionfound")}</Text>
          <Text>v{'1.0.1'}</Text>
        </View>
        <TouchableOpacity style = {styles.upDataBtn}>
          <Text style = {styles.upDataView}>{i18n.t("downloadupdate")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'space-between',
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
  currentVersion: {
    marginTop: 20,
    height: 20,
    color: '#9CA4B3',
    fontSize: 16,
  },
  localVersion: {
    marginTop: 9,
    height: 20,
    color: '#616D86',
    fontSize: 16,
    fontWeight: '400',
  },
  bottomView: {
    height:189,
    flexDirection: 'column',
    marginHorizontal:20,
  },
  VersionNumber:{
    height:60,
    backgroundColor:'white',
    borderRadius:8,
    justifyContent: 'center',
    flexDirection:'row',
    alignItems:'center',
  },
  Icon:{
    width:24,
    height:24,
  },
  findText:{
    marginHorizontal:8,
    fontSize:14,
    fontWeight:'400',
    color:'#394867',
  },
  newVersion:{
    fontSize:14,
    fontWeight:'400',
    color:'#3B6ED5',
    fontFamily:'CircularPro-Book',
  },
  upDataBtn:{
    marginTop:20,
    height:55,
    borderRadius:8,
    backgroundColor:'#3B6ED5',
    alignItems:'center',
    justifyContent:'center',
  },
  upDataView:{
    fontSize:16,
    fontWeight:'600',
    color:'#FFFFFF',
  },
});

export default UpdateScreen;