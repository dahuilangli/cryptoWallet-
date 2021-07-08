import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import walletAction from 'actions/wallet';
import { Button } from 'react-native-elements';
import { show } from 'utils'
import { goBack } from 'components/navigationService';
interface Props {
    route: {
        params: {
            address: string,
            pwds: string,
            type: string,
            setPwds:Function,
        }
    }
}
const EditPwdScreen = (props: Props) => {
    console.log(props.route.params);
    
    const { address ,pwds,type,setPwds} = props.route.params;
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
                        <Text style={styles.inputTitle}>当前密码</Text>
                        <TextInput placeholder='请输入当前密码' style={styles.inputText} onChangeText={(Text) => setLastPassWord(Text)} />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>新密码</Text>
                        <TextInput placeholder='请输入新密码' style={styles.inputText} onChangeText={(Text) => setFirstPassWord(Text)} />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>确认密码</Text>
                        <TextInput placeholder='请输入确认密码' style={styles.inputText} onChangeText={(Text) => setSecondPassWord(Text)} />
                    </View>
                    <Button
                        buttonStyle={styles.nextButton}
                        title="确认"
                        titleStyle={styles.nextButtonTitle}
                        disabled = {false}
                        onPress={() => {
                            if (pwds === lastPassWord) {
                                if (firstPassWord === lastPassWord) {
                                    show('新密码不能和上次密码一样')
                                } else {
                                    if (secondPassWord === firstPassWord) {
                                        setPwds(firstPassWord);
                                        changePassWord(secondPassWord);
                                        goBack();
                                    }else{
                                        show('新密码和确认密码不一样')
                                    }
                                }
                            } else {
                                show('原始密码错误')
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