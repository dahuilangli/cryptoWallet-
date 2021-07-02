import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { Button } from 'react-native-elements';
interface Props { }
const EditPwdScreen = ({ }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.main}>
                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>当前密码</Text>
                        <TextInput placeholder='请输入当前密码' style={styles.inputText} />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>新密码</Text>
                        <TextInput placeholder='请输入新密码' style={styles.inputText} />
                    </View>

                    <View style={styles.inputItem}>
                        <Text style={styles.inputTitle}>确认密码</Text>
                        <TextInput placeholder='请输入确认密码' style={styles.inputText} />
                    </View>
                    <Button
                        buttonStyle={styles.nextButton}
                        title="确认"
                        titleStyle={styles.nextButtonTitle}
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