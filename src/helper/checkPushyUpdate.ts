import { Platform, Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
// import {
//   isFirstTime,
//   isRolledBack,
//   checkUpdate,
//   downloadUpdate,
//   switchVersion,
//   switchVersionLater,
//   markSuccess,
// } from 'react-native-update';
import * as helper from 'apis/helper'
import DeviceInfo from 'react-native-device-info';
import _updateConfig from '../../update.json';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { clearAll } from './test';

// // @ts-ignore
// const { appKey } = _updateConfig[Platform.OS];
let systemVersion = DeviceInfo.getVersion();
let buildVersion = DeviceInfo.getBuildNumber();
export default async function checkPushyUpdate() {
  await clearAll();
    helper.get('/sys/version', {}).then((res:any)=>{
      console.log('===========/sys/version=============');
    console.log(res);
    console.log(systemVersion);
      if (res) {
        if (res.app_ver > systemVersion) {
          Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
            {
              text: "sure",
              onPress: () => {
                 Linking.openURL(res.download_url);
              },
            },
          ]);
        } else {
          if (res.build_ver > buildVersion) {
            Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
              {
                text: "sure",
                onPress: () => {
                   Linking.openURL(res.download_url);
                },
              },
            ]);
          } else {
            
          }
        }
        
      }
    })
    
    
  
  
}
