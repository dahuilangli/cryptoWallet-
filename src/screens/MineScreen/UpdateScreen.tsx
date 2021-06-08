import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'types/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';


type UpdateScreenRouteProp = RouteProp<ScreensParamList, 'UpdateScreen'>;
interface Props {}

function UpdateScreen({}: Props) {
    return (
        <SafeAreaView style={styles.container}>
          
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#efefef',
    },
  });

export default UpdateScreen;