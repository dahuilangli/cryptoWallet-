import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import { navigate } from 'utils/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { screenHeight } from 'utils/constants';

type AboutUsScreenRouteProp = RouteProp<ScreensParamList, 'AboutUsScreen'>;
interface Props {}

function AboutUsScreen({}: Props) {
  return (
    <View style={styles.backView}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headView}>
          <Image
            source={require('assets/icon-125-aboutuslogo.png')}
            style={styles.iconImage}
          />
          <Text style={styles.nameLabel}>项目名称</Text>
        </View>
        {/* <FlatList >

          </FlatList> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backView: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  headView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    marginTop: 60,
    width: 125,
    height: 125,
  },
  nameLabel: {
    marginTop: 20,
    alignContent: 'center',
    fontWeight: 'bold',
    color: '#394867',
    fontSize: 24,
    justifyContent: 'center',
  },
});

export default AboutUsScreen;
