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
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'components/navigationService';
import { ListItem, Header } from 'react-native-elements';
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
    const { data } = await helper.get('/sys/version', {})
    console.log('===========/sys/version=============');
    console.log(data);
    console.log(systemVersion);
    if (data) {
      if (data.app_ver > systemVersion) {
        setCheckVersion(true)
      } else {
        if (data.build_ver > buildVersion) {
          setCheckVersion(true)
        } else {
          setCheckVersion(false)
        }
      }
      setMessageListData(data)
    }
  }
  let html = ''
  helper.get('/sys/user/agreement',{}).then((res: any) => {
    
    // console.log('====================================');
    // console.log(res.data);
    // console.log('====================================');
    html = res.data.content
  })
    
  const list = {
    top: [
      {
        name: t("Addressbook"),
        leftIcon: require('assets/icon-24-地址薄.png'),
        rightIcon: require('assets/icon-20-arrow-right.png'),
        navigate: () =>
          navigate('AddressBookScreen', { title: '地址本', showMyself: true }),
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
        navigate: async () => await navigate('WebHtmlScreen', { title: '测试', uri: html })
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
    <View style={styles.container}>
      <Header
        placement="center"
        centerComponent={{ text: t("Personalcenter"), style: { fontSize: 18, fontWeight: 'bold', color: 'white', } }}
        containerStyle={{
          backgroundColor: '#3D73DD',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
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
            {
              checkMessage && i === 1 ? <View style={styles.messageshow}></View> : <View></View>
            }
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
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
