import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';


type AddressBookScreenRouteProp = RouteProp<ScreensParamList, 'AddressBookScreen'>;
interface Props {}

function AddressBookScreen({}: Props) {
    return (
        <SafeAreaView style={styles.container}>
          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#F2F5F8',
    },
    
  });

export default AddressBookScreen;