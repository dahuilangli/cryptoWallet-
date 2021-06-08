import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList,StatusBar ,Image} from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { screenHeight } from 'utils/constants';


type AboutUsScreenRouteProp = RouteProp<ScreensParamList, 'AboutUsScreen'>;
interface Props {}

function AboutUsScreen({}: Props) {
    return (
      <View>
        <StatusBar barStyle = 'dark-content'>

        </StatusBar>
        <SafeAreaView style={styles.container}>
          <View style = {styles.headView}>
            <Image source = {require('../../../assets/kaikeba.png')} style = {styles.iconImage}/>
            <Text style = {styles.nameLabel}>项目名称</Text>
          </View>
          {/* <FlatList >

          </FlatList> */}
        </SafeAreaView>
      </View>
      
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efefef',
    },
    headView:{
      height:300,
      backgroundColor:'red',
      alignItems:'center',
      justifyContent:'center',
    },
    iconImage:{
      width:100,
      height:100,
      borderRadius:50,
      marginTop:50,

    },
    nameLabel:{
      marginTop:20,
      alignContent : 'center',
      fontWeight : 'bold',
      fontSize : 18,
      justifyContent:'center'

    },
  });

export default AboutUsScreen;