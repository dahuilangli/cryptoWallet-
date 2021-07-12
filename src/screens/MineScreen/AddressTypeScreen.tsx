import React, { useState, useEffect } from 'react';
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants"
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { goBack } from 'components/navigationService';
interface Props {
  route: {
    params: {
      addType: string,
      setAddType:Function,
    }
  }
}

const list = [
  {
    name: 'ETH',
    avatar_url:require('assets/coins/ethereum.png'),
  },
  {
    name: 'BNB',
    avatar_url:require('assets/coins/binance.png'),
  },
  {
    name: 'HT',
    avatar_url:require('assets/coins/ht.png'),
  },
];

function AddressTypeScreen(props: any) {
  console.log('--------------------------');
  console.log(props.route.params);
  console.log('--------------------------');
  const [selectItem, setSelectItem] = useState(props.route.params.addType);
  const {addType,setAddType,typeLogo,setTypeLogo} = props.route.params
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={style}>
        <Image style={styles.typeImage} source={item.avatar_url}></Image>
        <Text style={styles.typeName}>{item.name}</Text>
        <Image style={styles.rightImage} source={ selectItem === item.name? require('assets/icon_choose_on.png'):require('assets/icon_choose_of.png')}></Image>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>{
          setSelectItem(item.name)
          setAddType(item.name)
          setTypeLogo(item.avatar_url)
          goBack()
        }}
        style={styles.marginItem}
      />
    );
  };
  return (
    <SafeAreaView style = {styles.container}>
      <FlatList
        data={list}
        style={styles.item}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      >
      </FlatList>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  marginItem: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    height:70,
    flexDirection:'row',
    alignItems:'center',
  },
  typeImage:{
    marginVertical:15,
    marginLeft:15,
    width:40,
    height:40
  },
  typeName: {
    marginLeft: 10,
    height: 20,
    width: SCREENWIDTH - 138,
    color: '#394867',
    fontSize: 14,
    fontWeight: '500',
},
rightImage: {
    width: 20,
    height: 20,
    marginRight: 20
},
});

export default AddressTypeScreen;