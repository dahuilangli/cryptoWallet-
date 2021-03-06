import React, { useState } from 'react';
import {
    StyleSheet, Modal,
    TouchableWithoutFeedback, View, TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensParamList } from 'types/types';
import { screenWidth } from 'utils/constants';
import { Image } from 'react-native-elements/dist/image/Image';
import { event } from 'react-native-reanimated';
import { navigate } from 'utils/navigationService';
import { Text } from 'react-native-elements';
import i18next from 'i18n';

type WebScreenNavigationProp = StackNavigationProp<
    ScreensParamList,
    'DappWebScreen'
>;
type DappWebScreenRouteProp = RouteProp<ScreensParamList, 'DappWebScreen'>;
interface Props {
    navigation: WebScreenNavigationProp;
    route: DappWebScreenRouteProp;
}

const scriptToRemoveHeader = `
var headEl = document.querySelector('.rt-head');
var bodyEl = document.querySelector('.rt-body');
if (headEl && bodyEl) {
  var title = document.querySelector('.vf-title').textContent;
  window.ReactNativeWebView.postMessage(title);
  headEl.remove();
  bodyEl.style.paddingTop = 0;
}
`;

export default function DappWebScreen({ navigation, route }: Props) {

    const uri = route.params.uri.replace('http:', 'https:');
    const [currentItem, setCurrentItem] = useState(route.params.item);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <WebView

            style={styles.container}
            source={{ uri }}
            onShouldStartLoadWithRequest={(event) => {
                setModalVisible(!modalVisible);
                return true;
            }}
            startInLoadingState={true}
            injectedJavaScript={scriptToRemoveHeader}
            onMessage={event => {
                navigation.setParams({ title: event.nativeEvent.data });
                // console.warn(event.nativeEvent.data);
            }}
        >
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback
                        style={{ ...styles.outView }}

                    >
                        <View style={styles.outContair} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <View style={styles.headView}>
                            <TouchableOpacity
                                style={{ ...styles.openButton }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigate('DappScreen');
                                }}
                            >
                                <Image
                                    style={styles.textStyle}
                                    source={require('assets/icon-20-close.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <Image source={require('assets/????????????.png')} style={{ width: 120, height: 120 }} />
                        <Text style={styles.tipTitle}>{route.params.item.content}</Text>
                        <Text numberOfLines={0} style={styles.tipContent}>??????????????? DAPP ???????????????????????????????????????DAPP????????????????????????????????????????????????
???mystone.io ?????????????????????????????????</Text>
                        <View style={styles.bottomView}>
                            <TouchableOpacity
                                style={{ ...styles.tipBtn }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigate('DappScreen');
                                }}
                            >
                                <Text style = {styles.tipText}>{i18n.t("noremindagain")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.tipBtn1 }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style = {styles.knowText}>{i18n.t("Iknow")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </WebView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(100,103,104,1)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    outView: {
        marginRight: 20,
        height: 55,
        width: screenWidth / 2 - 27.5,
        marginTop: 10,
        backgroundColor: '#F2F5F8',
        borderRadius: 8,
        alignItems: 'flex-end',
    },
    outContair: {
        flex: 1,
        width: screenWidth,
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: screenWidth,
        flexDirection: 'column',
        alignItems: 'center'
    },
    headView: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: 40,
        marginLeft: 20,
        width: screenWidth - 40,
    },
    textStyle: {
        width: 20,
        height: 20,
        marginTop: 20,
        marginRight: 20,
    },
    openButton: {
        width: 20,
        height: 20,
    },
    tipTitle: {
        marginVertical: 15,
        height: 30,
        fontSize: 20,
        fontWeight: '500',
        color: '#394867'
    },
    tipContent: {
        marginHorizontal: 40,
        fontSize: 14,
        fontWeight: '400',
        color: '#9CA4B3',
        textAlign: 'center',
        lineHeight: 25,
    },
    bottomView: {
        marginTop: 30,
        marginHorizontal: 20,
        height: 109,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tipBtn:{
        height:55,
        width:screenWidth/2-27.5,
        marginLeft:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        borderColor:'#E9EDF1',
        borderWidth:1,
    },
    tipBtn1:{
        height:55,
        width:screenWidth/2-27.5,
        marginLeft:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3B6ED5',
        borderRadius:8,
    },
    knowText:{
        color:'white',
        fontSize:16,
        fontWeight:'600',
    },
    tipText:{
        color:'#616D86',
        fontSize:16,
        fontWeight:'600',
    },
});
