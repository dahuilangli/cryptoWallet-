import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { screenWidth } from 'utils/constants';
import { navigate } from 'utils/navigationService';
import Swiper from 'react-native-swiper'
interface Props { }
function DappScreen({ }: Props) {
  return (

    <SafeAreaView style={styles.container}>
     <View style={styles.banner}>
      <Swiper
        style={styles.wrapper}
        // removeClippedSubviews={true}
        // showsButtons={false}         //显示控制按钮
        loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
        autoplay={true}                //自动轮播
        autoplayTimeout={3}          //每隔3秒切换
        dot={<View style={{           //未选中的圆点样式
          backgroundColor: '#FFFFFF',
          width: 4,
          height: 4,
          borderRadius: 2,
          marginLeft: 4,
          marginRight: 4,
          marginTop: 9,
          marginBottom: 40,
        
        }} />}
        activeDot={<View style={{    //选中的圆点样式
          backgroundColor: '#FFFFFF',
          width: 8,
          height: 4,
          borderRadius: 2,
          marginLeft: 4,
          marginRight: 4,
          marginTop: 9,
          marginBottom: 40,
        }} />}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>青衣</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>冷秋</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>听雨</Text>
        </View>
      </Swiper>
     </View>
     </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  wrapper: {
  },
  banner: {
    width: screenWidth,
    height: screenWidth * 240 / 375,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    padding: 10,
    position: 'absolute',
    right: '6%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9bebe5'
},
slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3b1e5'
},
slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90d985'
},
text: {
    color: '#ff6fa3',
    fontSize: 30,
    fontWeight: 'bold'
}
});
export default DappScreen;
