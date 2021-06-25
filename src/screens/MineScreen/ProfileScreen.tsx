import React, { useState } from 'react';
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
import { ListItem , Header} from 'react-native-elements';
// import { getUserAvatar, screenWidth } from 'constants/constants';
import ActionSheet from 'react-native-action-sheet';
import pickImage from 'components/pickImage';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog';
import { post, put } from 'apis/helper';
import { User } from 'actions/types';

interface Props {}

const list = {
  top: [
    {
      name: i18n.t("Addressbook"),
      leftIcon: require('assets/icon-24-地址薄.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () =>
        navigate('AddressBookScreen', { title: '地址本', showMyself: true }),
    },
    {
      name:i18n.t("Message"),
      leftIcon: require('assets/icon-24-消息通知.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () => navigate('MessageScreen'),
    },
  ],
  content: [
    {
      name: i18n.t("Usesettings"),
      leftIcon: require('assets/icon-24-使用设置.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () => navigate('SetUpScreen')
    }, {
      name: i18n.t("HelpFeedback"),
      leftIcon: require('assets/icon-24-反馈帮助.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () => navigate('SuggestScreen')
    }, {
      name: i18n.t("versionupdate"),
      leftIcon: require('assets/icon-24-版本更新.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () => navigate('UpdateScreen')

    }, {
      name: i18n.t("UserAgreement"),
      leftIcon: require('assets/icon-24-协议.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () => navigate('WebScreen', { title: i18n.t("UserAgreement"), uri: 'https://mystone.io/flashRedemption.html' })
    }, {
      name: i18n.t("aboutus"),
      leftIcon: require('assets/icon-24-关于我们.png'),
      rightIcon: require('assets/icon-20-arrow-right.png'),
      navigate: () => navigate('AboutUsScreen')
    }
  ]

}

function ProfileScreen({ }: Props) {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser)!;
  // const setUser = React.useCallback(
  //   (user: User) => dispatch(actions.setUser(user)),
  //   [dispatch],
  // );
  // const logout = React.useCallback(() => dispatch(actions.logout()), [
  //   dispatch,
  // ]);

  const checkAppVersion = false;
  const checkMessage = false;
  return (
    <SafeAreaView style={styles.container}>
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
              <Image source={item.rightIcon} style={styles.rightIcon} />
            </ListItem>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  listGroup: {
    width: screenWidth,
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
});
export default ProfileScreen;
