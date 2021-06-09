import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList ,Image} from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info'

type UpdateScreenRouteProp = RouteProp<ScreensParamList, 'UpdateScreen'>;
interface Props {}

let systemVersion = DeviceInfo.getSystemVersion();
console.log(systemVersion);
function UpdateScreen({}: Props) {
    return (
      <View style = {styles.backView}>
        
       <SafeAreaView style={styles.container}>
        
          <View style = {styles.headView}>
            <Image source = {require('../../../assets/icon-125-aboutuslogo.png')} style = {styles.iconImage}/>
            <Text style = {styles.nameLabel}>项目名称</Text>
            <Text style = {styles.currentVersion}>当前版本</Text>
            <Text style = {styles.localVersion}>
              
            </Text>
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
  currentVersion:{
    marginTop:20,
    height:20,
    color:'#9CA4B3',
    fontSize:16,
  },
  localVersion:{
    marginTop:9,
    height:20,
    color:'#3D73DD',
    fontSize:16,
  },
});

export default UpdateScreen;