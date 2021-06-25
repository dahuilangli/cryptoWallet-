import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { screenWidth } from 'utils/constants';
import i18next from 'i18n';


type FlashRecordScreenRouteProp = RouteProp<ScreensParamList, 'FlashRecordScreen'>;
interface Props { }

const list = [
  {
    id: '1',
    time: '2021-5-1 23:33',
    outname: 'ETH',
    inname: 'USDT',
    outnumber: '0.029383',
    innumber: '324.3',
  },
  {
    id: '1',
    time: '2021-5-1 23:33',
    outname: 'ETH',
    inname: 'USDT',
    outnumber: '0.029383',
    innumber: '324.3',
  },
  {
    id: '1',
    time: '2021-5-1 23:33',
    outname: 'ETH',
    inname: 'USDT',
    outnumber: '0.029383',
    innumber: '324.3',
  },
  {
    id: '1',
    time: '2021-5-1 23:33',
    outname: 'ETH',
    inname: 'USDT',
    outnumber: '0.029383',
    innumber: '324.3',
  },

]

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text style={styles.timeText}>{item.time}</Text>
    <View style={styles.lineView}></View>
    <View style={styles.outView}>
      <View style = {{flexDirection:'row',alignItems:'center'}}>
        <Image style={styles.outImage} source={require('assets/img-40-coointype-币安.png')} />
        <Text style = {styles.outText}>{item.outname}</Text>
      </View>
      <Text style = {styles.outNumber}>- {item.outnumber}</Text>
    </View>
    <Image style={styles.dianImage} source={require('assets/img-40-coointype-币安.png')} />
    <View style={styles.inView}>
      <View style = {{flexDirection:'row',alignItems:'center'}}>
        <Image style={styles.outImage} source={require('assets/img-40-coointype-币安.png')} />
        <Text style = {styles.outText}>{item.inname}</Text>
      </View>
      <Text style = {styles.inNumber}>+ {item.innumber}</Text>
    </View>

  </TouchableOpacity>
);


function FlashRecordScreen({ }: Props) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigate('AddressBookEditorScreen', {
            title: i18n.t("editpayee"),
            item: item,
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

      </FlatList>

    </SafeAreaView>
  );
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
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  timeText: {
    marginTop: 10,
    marginBottom: 9.5,
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA4B3',
    marginHorizontal: 15,
  },
  lineView: {
    height: 0.5,
    backgroundColor: '#E9EDF1',
    marginBottom: 14,
  },
  outView: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  outImage: {
    width: 20,
    height: 20,
  },
  outText:{
    fontSize:16,
    fontWeight:'400',
    color:'#616D86',
    marginLeft:10,
  },
  outNumber:{
    fontSize:20,
    fontWeight:'400',
    color:'#DD3D50'
  },
  dianImage: {
    marginLeft:24.5,
    marginVertical: 1,
    width: 1,
    height: 14,
  },
  inView:{
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:15,
  },
  inNumber:{
    fontSize:20,
    fontWeight:'400',
    color:'#3DDD94',
  }
});

export default FlashRecordScreen;