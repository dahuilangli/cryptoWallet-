import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import walletAction from 'actions/wallet';
import { Button } from 'react-native-elements';
import { show } from 'utils'
import { useTranslation } from 'react-i18next';
import { goBack } from 'components/navigationService';
interface Props {
    route: {
        params: {
            address: string,
            pwds: string,
            type: string,
            setPwds: Function,
        }
    }
}
const EditPwdScreen = (props: Props) => {
    console.log(props.route.params);
    const { t } = useTranslation();
    const { address, pwds, type, setPwds } = props.route.params;
    const dispatch = useDispatch();
    const [lastPassWord, setLastPassWord] = useState('');
    const [firstPassWord, setFirstPassWord] = useState('');
    const [secondPassWord, setSecondPassWord] = useState('');
    const changePassWord = async (passWordStr: string) => {
        await dispatch(walletAction.setPassWord({ address: address, securityCode: passWordStr, type: type }));
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.main}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>{t("currentpassword")}</Text>
                        <TextInput placeholder={t("entercurrentpassword")}
                            style={styles.inputText}
                            onChangeText={(Text) => setLastPassWord(Text)}
                            maxLength={12}
                            secureTextEntry />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>{t("newpassword")}</Text>
                        <TextInput placeholder={t("enternewpassword")}
                            style={styles.inputText}
                            onChangeText={(Text) => setFirstPassWord(Text)}
                            maxLength={12}
                            secureTextEntry />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>{t("confirmpassword")}</Text>
                        <TextInput
                            placeholder={t("enterconfirmpassword")}
                            style={styles.inputText}
                            onChangeText={(Text) => setSecondPassWord(Text)}
                            maxLength={12}
                            secureTextEntry />
                    </View>
                    <Button
                        buttonStyle={styles.nextButton}
                        title={t("sure")}
                        titleStyle={styles.nextButtonTitle}
                        disabled={lastPassWord&&firstPassWord&&secondPassWord?false:true}
                        onPress={() => {
                            if (pwds === lastPassWord) {
                                if (firstPassWord === lastPassWord) {
                                    show(t("newpasswordcannotsameoldpassword"))
                                } else {
                                    if (secondPassWord === firstPassWord ) {
                                        setPwds(firstPassWord);
                                        changePassWord(secondPassWord);
                                        goBack();
                                    } else {
                                        show(t("newpasswordisnotsameconfirmationpassword"))
                                    }
                                }
                            } else {
                                show(t("Oldpassworderror"))
                            }

                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    main: {
        flex: 1,
        marginHorizontal: 20,
    },
    inputItem: {
        marginTop: 20
    },
    inputTitle: {
        fontSize: 13,
        color: '#616D86',
        fontWeight: '400',
    },
    inputText: {
        marginTop: 10,
        height: 55,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    nextButton: {
        height: 55,
        borderRadius: 8,
        fontSize: 16,
        marginTop: 30,
        backgroundColor: '#3B6ED5',
    },
    nextButtonTitle: {
        fontWeight: '600',
    },
});
export default EditPwdScreen;