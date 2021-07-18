import React, { useState } from 'react';
import {
  Modal, View, StyleSheet, Text, ScrollView
} from 'react-native';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletStatus, getToken, getLanguage } from 'reducers/dataStateReducer';
import i18n from "i18n";
import walletAction from 'actions/wallet'
import * as helper from "apis/helper"
import DeviceInfo from 'react-native-device-info';
import HTMLView from 'react-native-htmlview';
import { showUpdateResultDialog } from 'components/Dialog';
import { useTranslation } from 'react-i18next';

function RootScreen() {
  const { t } = useTranslation();

  let systemVersion = DeviceInfo.getVersion();
  let buildVersion = DeviceInfo.getBuildNumber();
  const dispatch = useDispatch();
  const walletStatus = useSelector(getWalletStatus);
  const token = useSelector(getToken);
  const CurrentLanguage = useSelector(getLanguage);
  React.useEffect(() => {
    i18n.changeLanguage(CurrentLanguage);
    findToken();
    SplashScreen.hide();

  }, []);
  function checkVersion() {
    helper.get('/sys/version', {}).then((res: any) => {
      console.log(res);
      
      if (res) {
        if (Number(res.app_ver) > Number(systemVersion)) {
          console.log(111111);
          
          showUpdateResultDialog(
            {
              icon: CurrentLanguage === 'en' ? (require('assets/findNewVersion_En.png')) : (require('assets/findNewVersion_china.png')),
              name: t("versionupdate"),
              downloadLink: res.download_url,
              content:
                <ScrollView style={{ height: 200, marginHorizontal: 10, marginLeft: 20 }}>
                  <HTMLView
                    value={res.ucontent}
                    stylesheet={htmlStyle}
                  />
                </ScrollView>
            }
          )
        } else {
          
          if (Number(res.build_ver)  > Number(buildVersion) ){
            console.log(222222);
            showUpdateResultDialog(
              {
                icon: CurrentLanguage === 'en' ? (require('assets/findNewVersion_En.png')) : (require('assets/findNewVersion_china.png')),
                name: t("versionupdate"),
                downloadLink: res.download_url,
                content:
                  <View>
                    <ScrollView style={{ height: 200, marginHorizontal: 15 }}>
                      <HTMLView
                        value={res.ucontent}
                        stylesheet={htmlStyle}
                      />
                    </ScrollView>
                  </View>
              }
            )
          } else {

          }
        }

      }
      return res;
    })
  }

  function findToken() {
    if (!token) {
      const params = {
        device_id: DeviceInfo.getUniqueId(),
        mobile_model: DeviceInfo.getModel(),
        mobile_type: DeviceInfo.getSystemName(),
        sys_version: DeviceInfo.getSystemVersion()
      };
      helper.post('/sys/device_authorization', params).then((res: any) => {

        dispatch(walletAction.setToken(res.token))
        checkVersion();
      }).catch(e => {
        throw console.error(e);
      })
    } else {
      checkVersion();
    }

  }

  return (
    <NavigationContainer ref={navigationRef}>
      {walletStatus ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contain: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  center: {
    marginTop: SCREENHEIGHT / 2 - 150,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 40,
    height: 300,
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',

  },
  webView: {
    marginVertical: 10,
  }
})

const htmlStyle = StyleSheet.create({
  // p: { marginBottom: -50},
  // ol: { margin: 0 },
  // span: {
  //   margin: -10,
  //   padding: -10,
  //   lineHeight: -10
  // }
})

export default RootScreen;