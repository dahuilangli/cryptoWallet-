import { RNCamera } from 'react-native-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Animated,
    PermissionsAndroid,
    default as Easing,
    ImageBackground,
    View,
    Text,
    Alert,
} from 'react-native';
import { navigate } from 'components/navigationService';
import { checkwalletAdress, checkwalletPrivateKey, verifyURL } from 'utils';
import { useTranslation } from 'react-i18next';
import { walletConnect } from 'helper/connect';
import { useSelector } from 'react-redux';
import { getUser } from 'reducers/walletStateReducer';
let camera;
interface Props {
    route: {
        params: {
            title: string,
            assetsList: any,
        }
    }
}
function ScanQRCode(props: Props) {
    const { t } = useTranslation();
    const { title } = props.route.params;
    const { assetsList } = props.route.params;
    const user = useSelector(getUser);
    const [lostFoceson, setLostFoceesOn] = useState(true)
    const moveAnim = useRef(new Animated.Value(-2)).current;
    let timer;
    useEffect(() => {
        requestCameraPermission();
        startAnimation();

    }, []);


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(

                PermissionsAndroid.PERMISSIONS.CAMERA,

                {

                    title: t("Requestcamerapermission"),

                    message: t("scanQRcodecamerapermissions"),

                    buttonNeutral: t("wait"),

                    buttonNegative: t("no"),

                    buttonPositive: t("yes"),

                },

            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                console.log('现在你获得摄像头权限了');

            } else {

                console.log('用户没有允许相机权限');

            }

        } catch (err) {

            console.warn(err);

        }

    };
    /** 扫描框动画*/
    const startAnimation = () => {

        Animated.sequence([

            Animated.timing(moveAnim, {

                toValue: 200,

                duration: 1500,

                easing: Easing.linear,

                useNativeDriver: false,

            }),

            Animated.timing(moveAnim, {

                toValue: -1,

                duration: 1500,

                easing: Easing.linear,

                useNativeDriver: false,

            }),

        ]).start(() => startAnimation());

    };
    const onBarCodeRead = (result) => {
        try {
            const { data } = result; //只要拿到data就可以了
            if (data) {
                setLostFoceesOn(!lostFoceson);
                if (checkwalletAdress(data) && title === 'HomeScreen') {
                    navigate('TransferScreen', { address: data, assetsList });
                } else if (verifyURL(data) && title === 'DappScreen') {
                    navigate('DappWebScreen', { uri: data })
                } else if((/^wc/).test(data)){
                    walletConnect(data,user.address);
                    navigate('HomeScreen');
                } else {
                    const splitStr = data.split(':')[1];
                    if (checkwalletAdress(splitStr) && title === 'HomeScreen') {
                        navigate('TransferScreen', { address: splitStr, assetsList });
                    } else {

                        Alert.alert(t("tips"), t("Addressviolation"), [
                            {
                                text: "sure",
                                onPress: () => {
                                },
                            },
                        ]);


                    }
                }
            }

        } catch (error) {

        }

    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    camera = ref;
                }}
                autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
                style={[styles.preview,]}
                type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
                flashMode={RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
                onBarCodeRead={onBarCodeRead}
                captureAudio={false}
            >
                <View style={{
                    width: 500,
                    height: 220,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }} />

                <View style={[{ flexDirection: 'row' }]}>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />
                    <ImageBackground source={require('assets/icon_scan_background.png')} style={{ width: 200, height: 200 }}>
                        <Animated.View style={[
                            styles.border, { transform: [{ translateY: moveAnim }] }
                        ]} />
                    </ImageBackground>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />

                </View>

                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500, alignItems: 'center' }}>
                    <Text style={styles.rectangleText}>{
                        title === 'HomeScreen' ? t("addressScanautomatically") : title === 'PrivateKeyScreen' ? t("privatekeyScanautomatically") : t("websiteScanautomatically")
                    }</Text>
                </View>
            </RNCamera>

        </View>
    )

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#fcb602',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10,
    },
    border: {
        flex: 0,
        width: 196,
        height: 2,
        backgroundColor: '#fcb602',
        borderRadius: 50,
    },

});

export default ScanQRCode;
