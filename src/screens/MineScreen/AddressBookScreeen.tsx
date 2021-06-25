import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView ,FlatList,TouchableOpacity, Alert ,Image} from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';


type AddressBookScreenRouteProp = RouteProp<ScreensParamList, 'AddressBookScreen'>;
interface Props {}

const list = [
  {
    id:'1',
    name: 'Jason的小号',
    avatar_url: require('assets/img-40-coointype-eth.png'),
    subtitle: '我的第二个ETH钱包',
    pkey:'0x4250c3c0094A65dd12f6C41D8c4C6ec10ff458f7',
  },
  {
    id:'2',
    name: 'Chris Jackson',
    avatar_url: require('assets/img-40-coointype-pk.png'),
    subtitle: 'Vice Chairman',
    pkey:'0x4250c3c0094A65dd12f6C41D8c4C6ec10ff458f7C41D8c4C6ec10ff458f7',
  },
  {
    id:'1',
    name: 'Jason的小号',
    avatar_url: require('assets/img-40-coointype-eth.png'),
    subtitle: '我的第二个ETH钱包',
    pkey:'0x4250c3c0094A65dd12f6C41D8c4C6ec10ff458f7',
  },
  {
    id:'2',
    name: 'Chris Jackson',
    avatar_url: require('assets/img-40-coointype-pk.png'),
    subtitle: 'Vice Chairman',
    pkey:'0x4250c3c0094A65dd12f6C41D8c4C6ec10ff458f7C41D8c4C6ec10ff458f7',
  },
  
]

const Item = ({ item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style = {styles.headView}>
      <View style ={styles.desView}>
        <Text style={styles.nameLabel}>{item.name}</Text>
        <Text style={styles.subLabel}>{item.subtitle}</Text>
      </View>
      <Image source = {item.avatar_url} style = {styles.avatar}></Image>
    </View>
    
    <View style ={styles.lineView}></View>
    <Text style = {styles.pkey}>{item.pkey}</Text>
  </TouchableOpacity>
);


function AddressBookScreen({}: Props) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() =>
          navigate('AddressBookEditorScreen', {
            title:'编辑收款人',
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
        data={list} 
        style={styles.item}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        >
          <View >

          </View>
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
      marginTop:20,
      backgroundColor:'#FFFFFF',
      borderRadius:8,
    },
    headView:{
      height:55,
      flexDirection:'row',
    },
    desView:{
      marginLeft:15,
      width:screenWidth-130,
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