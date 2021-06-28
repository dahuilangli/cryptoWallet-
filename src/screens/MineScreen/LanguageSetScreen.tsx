import React, { useState, useEffect } from 'react';
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants"
import { StyleSheet, View, Text, SafeAreaView, Image ,FlatList, Alert} from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { ListItem} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from "i18n";

type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props {
    route: {
        params: {
            title: string,
        };
    };
}
const list = [

    {
        name: '简体中文',
        select: true,
    },
    {
        name: 'English',
        select: false,
    },

]
const list1 = [

    {
        name: 'CNY',
        select: true,
    },
    {
        name: 'HKD',
        select: false,
    },
    {
        name: 'USD',
        select: false,
    },
    {
        name: 'TWD',
        select: false,
    },
    {
        name: 'EUR',
        select: false,
    },
    

]


const Item = ({ item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={ style}>
        <Text style = {styles.nameText}>{item.name}</Text>
        <Image style = {styles.imageText} source = {item.select?require('assets/icon-20-选择-on.png'):require('assets/icon-20-选择-off.png')}></Image>
    </TouchableOpacity>
  );

function LanguageSetScreen(props: Props) {
    const { title } = props.route.params;
    console.log(title);
    
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>(
            item.select = true
        )
        }
        style={styles.marginItem}
      />
    );
  };
    return (
        <SafeAreaView style={styles.container}>
        <FlatList 
        data={title===i18n.t("currencyUnit")?list1:list} 
        style={styles.item}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        >
        </FlatList>
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    item:{
        flex:1,
        backgroundColor:'#F2F5F8',
    },
    marginItem:{
        marginLeft:20,
        marginRight:20,
        marginTop:15,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        height:60,
        flexDirection:'row',
        alignItems:'center',
      },
      nameText:{
          marginLeft:15,
          fontSize:14,
          fontWeight:'500',
          color:'#394867',
          width:SCREENWIDTH/2-35
      },
      imageText:{
          marginLeft:SCREENWIDTH/2-55,
          width:20,
          height:20,
      }
});

export default LanguageSetScreen;