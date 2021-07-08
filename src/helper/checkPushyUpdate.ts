import { Platform, Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import {
  isFirstTime,
  isRolledBack,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';
import * as helper from 'apis/helper'
import DeviceInfo from 'react-native-device-info';
import _updateConfig from '../../update.json';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';

// @ts-ignore
const { appKey } = _updateConfig[Platform.OS];
let systemVersion = DeviceInfo.getVersion();
let buildVersion = DeviceInfo.getBuildNumber();
export default async function checkPushyUpdate() {
  
    const {data} = await helper.get('/sys/version', {})
    console.log('===========/sys/version=============');
    console.log(data);
    console.log(systemVersion);
    if (data) {
      if (data.app_ver > systemVersion) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {
            text: "sure",
            onPress: () => {
               Linking.openURL(data.download_url);
            },
          },
        ]);
      } else {
        if (data.build_ver > buildVersion) {
          Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
            {
              text: "sure",
              onPress: () => {
                 Linking.openURL(data.download_url);
              },
            },
          ]);
        } else {
          
        }
      }
      
    }
  
  // if (isFirstTime) {
  //   markSuccess();
  // } else if (isRolledBack) {
  //   // Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
  // }
  
  // console.log(appKey);
  // try {
  //   const info = await checkUpdate(appKey);

  //   if (info.expired) {
  //     Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
  //       {
  //         text: "sure",
  //         onPress: () => {
  //           info.downloadUrl && Linking.openURL(info.downloadUrl);
  //         },
  //       },
  //     ]);
  //   } else if (info.upToDate) {
  //     // Alert.alert('提示', '您的应用版本已是最新.');
  //   } else {
  //     Alert.alert(
  //       '提示',
  //       '检查到新的版本' + info.name + ',是否下载?\n' + info.description,
  //       [
  //         {
  //           text: '是',
  //           onPress: async () => {
  //             try {
  //               const hash = await downloadUpdate(info);
  //               Alert.alert('提示', '下载完毕,是否重启应用?', [
  //                 {
  //                   text: '是',
  //                   onPress: () => {
  //                     switchVersion(hash!);
  //                   },
  //                 },
  //                 { text: '否' },
  //                 {
  //                   text: '下次启动时',
  //                   onPress: () => {
  //                     switchVersionLater(hash!);
  //                   },
  //                 },
  //               ]);
  //             } catch (err) {
  //               Alert.alert('提示', '更新失败.' + JSON.stringify(err));
  //             }
  //           },
  //         },
  //         { text: '否' },
  //       ],
  //     );
  //   }
  // } catch (err) {
  //   console.warn(err);
  //   return;
  // }
}
