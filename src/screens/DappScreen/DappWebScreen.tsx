import React, { useState } from 'react';
import {
    StyleSheet, Modal,
    TouchableWithoutFeedback, View, TouchableOpacity
} from 'react-native';
import i18n from "i18n";
import { SCREENWIDTH } from 'config/constants';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DappRecentItem, ScreensParamList } from 'actions/types';
import { Image } from 'react-native-elements/dist/image/Image';
import { event } from 'react-native-reanimated';
import { navigate } from 'components/navigationService';
import { Text } from 'react-native-elements';

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
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(true);
    const [showHtml, setShowHtml] = useState(true)
    const uri = showHtml ? '' : route.params.uri.replace('http:', 'https:');
    return (
        <View style={{flex: 1}}>
            <WebView
                stopLoading
                style={styles.container}
                source={{ uri }}
                startInLoadingState={true}
                injectedJavaScript={scriptToRemoveHeader}
                onMessage={event => {
                    navigation.setParams({ title: event.nativeEvent.data });
                    // console.warn(event.nativeEvent.data);
                }}
            />
            
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
                                    source={require('assets/icon_close.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <Image source={require('assets/risk_warning.png')} style={{ width: 120, height: 120 }} />
                        <Text style={styles.tipTitle}>{route.params.item?.content}</Text>
                        <Text numberOfLines={0} style={styles.tipContent}>您在第三方 DAPP 上使用的行为将适用该第三方DAPP的《用户使用协议》和《隐私政策》
                            由mystone.io 直接并单独由你承担责任</Text>
                        <View style={styles.bottomView}>
                            <TouchableOpacity
                                style={{ ...styles.tipBtn }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigate('DappScreen');
                                }}
                            >
                                <Text style={styles.tipText}>{t("noremindagain")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.tipBtn1 }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    setShowHtml(!showHtml);
                                }}
                            >
                                <Text style={styles.knowText}>{t("Iknow")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

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
        width: SCREENWIDTH / 2 - 27.5,
        marginTop: 10,
        backgroundColor: '#F2F5F8',
        borderRadius: 8,
        alignItems: 'flex-end',
    },
    outContair: {
        flex: 1,
        width: SCREENWIDTH,
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: SCREENWIDTH,
        flexDirection: 'column',
        alignItems: 'center'
    },
    headView: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: 40,
        marginLeft: 20,
        width: SCREENWIDTH - 40,
    },
    textStyle: {
        width: 20,
        height: 20,
    },
    openButton: {
        marginTop: 20,
        width: 20,
        height: 20,
        marginRight: 20,
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
    tipBtn: {
        height: 55,
        width: SCREENWIDTH / 2 - 27.5,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#E9EDF1',
        borderWidth: 1,
    },
    tipBtn1: {
        height: 55,
        width: SCREENWIDTH / 2 - 27.5,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B6ED5',
        borderRadius: 8,
    },
    knowText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    tipText: {
        color: '#616D86',
        fontSize: 16,
        fontWeight: '600',
    },
});
