import React from 'react';
import { 
  StyleSheet,
  Platform,
  View,
  Image,
  TextInput, 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';
import { navigate } from 'utils/navigationService';

import { post } from 'utils/request';
interface Props {}

function HomeScreen({}: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/home-mining-machine.png')} style={styles.logo} />

      <View style={styles.searchBox}>
        <Image source={require('../../../assets/home-mining-machine.png')} style={styles.searchIcon} />

        <TextInput
          style={styles.inputText}
          keyboardType="web-search"
          placeholder="搜索京东商品/店铺"
        />

        <Image source={require('../../../assets/home-mining-machine.png')} style={styles.voiceIcon} />
      </View>

      <Image source={require('../../../assets/home-mining-machine.png')} style={styles.scanIcon} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 水平排布
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: Platform.OS === 'ios' ? 35 : 0, // 处理iOS状态栏
    height: Platform.OS === 'ios' ? 88 : 48, // 处理iOS状态栏
    backgroundColor: '#3B6ED5',
    alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  logo: {
    //图片logo
    height: 24,
    width: 24,
    resizeMode: 'stretch', // 设置拉伸模式
  },
  searchBox: {
    //搜索框
    height: 30,
    flexDirection: 'row', // 水平排布
    flex: 1,
    borderRadius: 5, // 设置圆角边
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    borderColor:'red',
    borderWidth:0.5,
  },
  searchIcon: {
    //搜索图标
    height: 20,
    width: 20,
    marginLeft: 5,
    resizeMode: 'stretch',
  },
  inputText: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 15,
    
  },
  voiceIcon: {
    marginLeft: 5,
    marginRight: 8,
    width: 24,
    height: 24,
    resizeMode: 'stretch',
  },
  scanIcon: {
    //搜索图标
    height: 26.7,
    width: 26.7,
    resizeMode: 'stretch',
  },
});
export default HomeScreen;
