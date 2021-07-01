import AsyncStorage from '@react-native-community/async-storage';
import {  Platform } from 'react-native';

export const clearAll = async () => {
    // await  AsyncStorage.removeItem("persist:data");
    // // AsyncStorage.
    // const asyncStorageKeys = await AsyncStorage.getAllKeys();
    // if (asyncStorageKeys.length > 0) {
    //   if (Platform.OS === 'android') {
    //     await AsyncStorage.clear();
    //   }
    //   if (Platform.OS === 'ios') {
    //      for (const key in asyncStorageKeys) {
    //          await  AsyncStorage.removeItem(key);
    //      }
       
    //   }
    // }

    console.log('Done.')
  }