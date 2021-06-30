import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView ,FlatList,TouchableOpacity, Alert ,Image} from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants";
import { getAddressBookList } from 'reducers/dataStateReducer';
import { useSelector, useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
type AddressBookScreenRouteProp = RouteProp<ScreensParamList, 'AddressBookScreen'>;
interface Props {}
const Item = ({ item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style = {styles.headView}>
      <View style ={styles.desView}>
        <Text style={styles.nameLabel}>{item.add_name}</Text>
        <Text style={styles.subLabel}>{item.remarks}</Text>
      </View>
      <Image source = {item.logo} style = {styles.avatar}></Image>
    </View>
    
    <View style ={styles.lineView}></View>
    <Text style = {styles.pkey}>{item.walletaddress}</Text>
  </TouchableOpacity>
);


function AddressBookScreen({}: Props) {
  const dispatch = useDispatch();
  const dppSearchList = useSelector(getAddressBookList)
  console.log('111111');
  
  console.log(dppSearchList);
  const [selectedId, setSelectedId] = useState(null);
  const {t} = useTranslation();

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigate('AddressBookEditorScreen', {
            title:t("editpayee"),
            item:item,
          })
        }
        style={styles.marginItem}
      />
    );
  };


  return (
      <SafeAreaView style={styles.container}>
        <FlatList 
        data={dppSearchList} 
        style={styles.item}
        renderItem={renderItem}
        keyExtractor={(item) => item.walletaddress}
        >
        
        </FlatList>
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    },
    headView:{
      height:55,
      flexDirection:'row',
      
    },
    desView:{
      marginLeft:15,
      width:SCREENWIDTH-130,
    },
    nameLabel:{
      marginTop:15,
      height:20,
      fontSize:14,
      color:'#394867',
      fontWeight:'500',
    },
    subLabel:{
      marginTop:0,
      height:20,
      fontSize:12,
      color:'#9CA4B3',
      fontWeight:'400',
    },
    avatar:{
      marginLeft:20,
      marginTop:15,
      width:40,
      height:40,
    },
    lineView:{
      marginLeft:15,
      marginRight:15,
      height:0.5,
      marginTop:15,
      backgroundColor:'#E9EDF1',
    },
    pkey:{
      marginLeft:15,
      marginRight:15,
      marginBottom:15,
      marginTop:15,
      fontSize:12,
      color:'#9CA4B3',
      fontWeight:'400',
    },
  });

export default AddressBookScreen;