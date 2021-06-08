import actions from 'reduxState/actions';
import React, { useState } from 'react';
import { Alert, StyleSheet, View, SafeAreaView, StatusBar ,Platform ,Text, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'utils/navigationService';
import { ListItem } from 'react-native-elements';
import { getUserAvatar, screenWidth } from 'utils/constants';
import ActionSheet from 'react-native-action-sheet';
import pickImage from 'utils/pickImage';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog';
import { post, put } from 'utils/request';
import { selectUser } from 'reduxState/selectors';
import { User } from 'types/types';

interface Props {}

function ProfileScreen({}: Props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)!;
  const setUser = React.useCallback(
    (user: User) => dispatch(actions.setUser(user)),
    [dispatch],
  );
  const logout = React.useCallback(() => dispatch(actions.logout()), [
    dispatch,
  ]);
 
  return (
    <View style={styles.headView}>
        <Text style = {styles.headText}>个人中心</Text>
        <SafeAreaView style={styles.container}>
        
        <View style={styles.listGroup}>
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="地址本"
            leftIcon={<Image source = {require('../../assets/icon-24-地址薄.png')}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() =>
              navigate('AddressBookScreen', { title: '地址本', showMyself: true })
            }
          />
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="消息通知"
            leftIcon={<Image source = {require('../../assets/icon-24-消息通知.png')}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() => navigate('MessageScreen')}
          />
        </View>

        <View style={styles.listGroup}>
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="使用设置"
            leftIcon={<Image source = {require('../../assets/icon-24-使用设置.png')}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() =>
              navigate('SetUpScreen')
            }
          />
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="帮助反馈"
            leftIcon={<Image source = {require('../../assets/icon-24-反馈帮助.png')}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() => navigate('SuggestScreen')}
          />
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="版本更新"
            leftIcon={<Image source = {require('../../assets/icon-24-版本更新.png')}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() => navigate('UpdateScreen')}
          />
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="用户协议"
            leftIcon={<Image source = {require('../../assets/icon-24-协议.png')}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() => navigate('WebScreen', {title:'用户协议',uri:'https://mystone.io/flashRedemption.html'})}
          />
          <ListItem
            titleStyle = {styles.listText}
            containerStyle = {styles.listView}
            bottomDivider
            title="关于我们"
            leftIcon={<Image source = {require('../../assets/icon-24-关于我们.png')} style = {styles.leftIcon}/>}
            rightIcon={<Image source = {require('../../assets/icon-20-arrow-right.png')}/>}
            onPress={() => navigate('AboutUsScreen')}
          />
        </View>
      </SafeAreaView>
    </View>
    

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  listGroup: {
    marginVertical: 6,
    width:screenWidth,
  },
  headView:{
    flexDirection:'column',
    flex:1, // 水平排布
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 35 : 0, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 48, // 处理iOS状态栏
    backgroundColor: '#3B6ED5',
    alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  headText:{
    color:'#FFFFFF',
    alignContent:'center',
    justifyContent:'center',
    fontSize:18,
    fontWeight:'bold',
    height:44,
    marginTop:8,
    paddingBottom:8,
  },
  listView:{
    height:60,
    backgroundColor:'#FFFFFF',
  },
  listText:{
    color:'#394867',
    fontSize:14,
    fontWeight:'bold',
  },
  leftIcon:{
    width:24,
    height:24,
  },
  
});
export default ProfileScreen;
