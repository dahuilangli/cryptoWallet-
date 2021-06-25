import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';


type MessageScreenRouteProp = RouteProp<ScreensParamList, 'MessageScreen'>;
interface Props {}

function MessageScreen({}: Props) {
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

export default MessageScreen;