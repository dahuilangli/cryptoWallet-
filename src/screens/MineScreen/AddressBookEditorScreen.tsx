import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, Button, Alert,TextInput } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import { navigate } from 'components/navigationService';
import i18n from "i18n";
import {SCREENHEIGHT,SCREENWIDTH} from "config/constants"
interface Props {
    route: {
        params: {
            title: string,
            item: {
                id:string,
                type:string,
                name: string,
                avatar_url: any,
                subtitle:string,
                pkey:string,
            };
        };
    };
}

function AddressBookEditorScreen(props: Props) {
    const { item } = props.route.params;
    const { title } = props.route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.typeText}>{i18n.t("addresstype")}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigate('AddressTypeScreen', {
                            type: item.type,
                        })
                    }
                >
                    <View style={styles.typeView}>
                        <Image style={styles.typeImage} source={item.avatar_url}></Image>
                        <Text style={styles.typeName}>{item.type}</Text>
                        <Image style={styles.rightImage} source={require('assets/icon-20-arrow-right.png')}></Image>
                    </View>
                </TouchableOpacity>
                <Text style={styles.typeText}>{i18n.t("addressname")}</Text>
                <View style={styles.nameView}>
                    <TextInput
                        style={styles.nameInput}
                        placeholder={i18n.t("enterAddName")}
                        defaultValue = {item.name}
                        onChangeText={(text: string) => ({})}
                    >

                    </TextInput>
                </View>
                <Text style={styles.typeText}>{i18n.t("marks")}</Text>
                <View style={styles.nameView}>
                    <TextInput
                        style={styles.nameInput}
                        placeholder={i18n.t("enterWalMark")}
                        defaultValue = {item.subtitle}
                        onChangeText={(text: string) => ('')}>
                    </TextInput>
                </View>
                <Text style={styles.typeText}>{i18n.t("walletaddress")}</Text>
                <View style={styles.addressView}>
                    <TextInput
                        style={styles.addressInput}
                        multiline
                        placeholder={i18n.t("pasteWalAddress")}
                        defaultValue = {item.pkey}
                        onChangeText={(text: string) => ('')}>
                    </TextInput>
                </View>
            </View>
            <TouchableOpacity onPress={({ }) => (Alert.alert('1111'))} style={styles.surebtn}>
                <Text style={styles.sureText}>{i18n.t("sure")}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    typeText: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        color: '#616D86',
        fontSize: 13,
        fontWeight: '400',
    },
    typeView: {
        height: 70,
        marginHorizontal: 20,
        borderRadius: 8,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeImage: {
        marginLeft: 20,
        width: 40,
        height: 40,
    },
    typeName: {
        marginLeft: 10,
        height: 20,
        width: SCREENWIDTH - 138,
        color: '#394867',
        fontSize: 14,
        fontWeight: '500',
    },
    rightImage: {
        width: 8,
        height: 20,
        marginRight: 20
    },
    nameView: {
        marginHorizontal: 20,
        height: 55,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    nameInput: {
        marginHorizontal: 15,
        marginTop: 18,
        height: 20,
        fontSize: 14,
        fontWeight: '400',
    },
    addressView: {
        marginHorizontal: 20,
        height: 95,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    addressInput: {
        marginHorizontal: 15,
        marginVertical: 18,
        fontSize: 14,
        fontWeight: '400',
    },
    surebtn: {
        marginTop: 140,
        marginHorizontal: 20,
        backgroundColor: '#3B6ED5',
        height: 55,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sureText: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});

export default AddressBookEditorScreen;