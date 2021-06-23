import React, { useState, useEffect } from 'react';
import { screenWidth } from 'utils/constants';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
interface Props {
  route: {
    params: {
      type: string,
    }
  }
}

const Data = [
  {
    name: 'ETH',
    avatar_url: require('assets/img-40-coointype-eth.png'),
    type: 'privateKey',
  },
  {
    name: 'STO',
    avatar_url: require('assets/img-40-coointype-sto.png'),
    type: 'privateKey',
  }, {
    name: 'BSC',
    avatar_url: require('assets/img-40-coointype-币安.png'),
    type: 'mnemonic',
  },
  {
    name: 'USDT',
    avatar_url: require('assets/img-40-coointype-USDT.png'),
    type: 'mnemonic',
  },
]



function AddressTypeScreen(props: Props) {
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={style}>
        <Image style={styles.typeImage} source={item.avatar_url}></Image>
        <Text style={styles.typeName}>{item.name}</Text>
        <Image style={styles.rightImage} source={require('assets/icon-20-选择-off.png')}></Image>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          Alert.alert('11111')
        }
        style={styles.marginItem}
      />
    );
  };
  return (
    <SafeAreaView style = {styles.container}>
      <FlatList
        data={Data}
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
    width: screenWidth - 138,
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