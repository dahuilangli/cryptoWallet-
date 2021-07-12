import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'components/navigationService';
import { ListItem } from 'react-native-elements';
import { SCREENWIDTH } from 'config/constants';
import ActionSheet from 'react-native-action-sheet';
import pickImage from 'components/pickImage';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog';
import * as helper from 'apis/helper'
import { User } from 'actions/types';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';

interface Props { }
let systemVersion = DeviceInfo.getVersion();
let buildVersion = DeviceInfo.getBuildNumber();
function ProfileScreen({ }: Props) {
  const { t } = useTranslation();
  const [messagelistData, setMessageListData] = useState({});
  const [checkVersion, setCheckVersion] = useState(false);
  const isFocused = useIsFocused(); useEffect(() => {
    if (isFocused) {
      getVersion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  async function getVersion() {
    await helper.get('/sys/version', {}).then((res:any)=>{
      if (res) {
        if (res.app_ver > systemVersion) {
          setCheckVersion(true)
        } else {
          if (res.build_ver > buildVersion) {
            setCheckVersion(true)
          } else {
            setCheckVersion(false)
          }
        }
        setMessageListData(res)
      }
    })
  }
  let html = ''
  helper.get('/sys/user/agreement', {}).then((res: any) => {
    html = res.content
  })

  const list = {
    top: [
      {
        name: t("Addressbook"),
        leftIcon: require('assets/icon-24-地址薄.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () =>
          navigate('AddressBookScreen', { title: '收款人', showMyself: true ,type:'person'}),
      },
      {
        name: t("Message"),
        leftIcon: require('assets/icon-24-消息通知.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () => navigate('MessageScreen'),
      },
    ],
    content: [
      {
        name: t("Usesettings"),
        leftIcon: require('assets/icon-24-使用设置.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () => navigate('SetUpScreen')
      }, {
        name: t("HelpFeedback"),
        leftIcon: require('assets/icon-24-反馈帮助.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () => navigate('SuggestScreen')
      }, {
        name: t("versionupdate"),
        leftIcon: require('assets/icon-24-版本更新.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () => navigate('UpdateScreen', { item: messagelistData, checkVersion: checkVersion })

      }, {
        name: t("UserAgreement"),
        leftIcon: require('assets/icon-24-协议.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: async () => await navigate('WebHtmlScreen', { title: t("UserAgreement"), uri: html })
      }, {
        name: t("aboutus"),
        leftIcon: require('assets/icon-24-关于我们.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () => navigate('AboutUsScreen')
      }
    ]

  }

  const dispatch = useDispatch();
  const checkMessage = true;
  return (
    <LinearGradient colors={['#3060C2', '#3B6ED5']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("Personalcenter")}</Text>
      </View>
      <View style = {{flex:1,backgroundColor : '#F2F5F8'}}>
      <View style={styles.listGroup}>
        {list.top.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            containerStyle={
              i === 2 ? { marginTop: 20, height: 60 } : { height: 60 }
            }
            onPress={item.navigate}
          >
            <Image source={item.leftIcon} style={styles.leftIcon} />
            <ListItem.Content>
              <ListItem.Title style={styles.listText}>
                {item.name}
              </ListItem.Title>
            </ListItem.Content>

            <Image source={item.rightIcon} style={styles.rightIcon} />
          </ListItem>
        ))}
        <View style={{ marginTop: 20 }}>
          {list.content.map((item, i) => (
            <ListItem
              key={i}
              bottomDivider
              containerStyle={{ height: 60 }}
              onPress={item.navigate}
            >
              <Image source={item.leftIcon} style={styles.leftIcon} />
              <ListItem.Content>
                <ListItem.Title style={styles.listText}>
                  {item.name}
                </ListItem.Title>
              </ListItem.Content>
              {
                i === 2 && checkVersion ? <Image style={styles.versionShow} source={require('assets/new-vision.png')}></Image> : <Text></Text>
              }
              <Image source={item.rightIcon} style={styles.rightIcon} />
            </ListItem>
          ))}
        </View>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 50, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 88, // 处理iOS状态栏
    backgroundColor: '#efefef',
  },
  header: {
    paddingHorizontal: 20,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,

    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  main: {
    flex: 1,
  },
  listGroup: {
    width: SCREENWIDTH,
    marginTop: 20,
  },

  listItem: {
    backgroundColor: 'red',
  },
  listText: {
    color: '#394867',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: -5,
  },
  leftIcon: {
    width: 24,
    height: 24,
  },
  rightIcon: {
    width: 8,
    height: 20,
  },
  messageshow: {
    backgroundColor: '#FF2943',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  versionShow: {
    width: 32,
    height: 16,
  }
});
export default ProfileScreen;
