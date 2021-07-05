import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { goBack, navigate } from 'components/navigationService';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-elements'
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { useDispatch } from 'react-redux';
import walletAction from 'actions/wallet';
interface Props {
    route: {
        params: {
            title: string,
            item: {
                add_type: string,
                add_name: string,
                remarks?: string,
                logo: any,
                walletaddress: string,
            };
        };
    };
}

function AddressBookEditorScreen(props: Props) {
    const { t } = useTranslation();
    const { item } = props.route.params;
    const [addType, setAddType] = useState(item.add_type ? item.add_type : 'ETH');

    const [addname, setAddName] = useState(item.add_name);
    const [remarks, setRemarks] = useState(item.remarks);
    const [typeLogo, setTypeLogo] = useState(item.logo ? item.logo : require('assets/coins/ethereum.png'));
    const [WalletAdress, setWalletAdress] = useState(item.walletaddress);
    const dispatch = useDispatch();
    async function addAddressBook() {
        await dispatch(walletAction.setAddressBookList(
            {
                add_type: addType,
                add_name: addname,
                remarks: remarks,
                logo: typeLogo,
                walletaddress: WalletAdress,
            }));
        goBack()
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text style={styles.typeText}>{t("addresstype")}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigate('AddressTypeScreen', {
                                addType,
                                setAddType,
                                typeLogo,
                                setTypeLogo,
                            })
                        }
                    >
                        <View style={styles.typeView}>
                            <Image style={styles.typeImage} source={typeLogo}></Image>
                            <Text style={styles.typeName}>{addType}</Text>
                            <Image style={styles.rightImage} source={require('assets/icon-20-arrow-right.png')}></Image>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.typeText}>{t("addressname")}</Text>
                    <View style={styles.nameView}>
                        <TextInput
                            style={styles.nameInput}
                            placeholder={t("enterAddName")}
                            defaultValue={item.add_name}
                            onChangeText={(text: string) => (setAddName(text))}
                        >

                        </TextInput>
                    </View>
                    <Text style={styles.typeText}>{t("marks")}</Text>
                    <View style={styles.nameView}>
                        <TextInput
                            style={styles.nameInput}
                            placeholder={t("enterWalMark")}
                            defaultValue={item.remarks}
                            onChangeText={(text: string) => (setRemarks(text))}>
                        </TextInput>
                    </View>
                    <Text style={styles.typeText}>{t("walletaddress")}</Text>
                    <View style={styles.addressView}>
                        <TextInput
                            style={styles.addressInput}
                            multiline
                            placeholder={t("pasteWalAddress")}
                            defaultValue={item.walletaddress}
                            onChangeText={(text: string) => (setWalletAdress(text))}>
                        </TextInput>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Button
                title={t("sure")}
                titleStyle={styles.Tlabel}
                buttonStyle={styles.Tbutton}
                onPress={() => addAddressBook()}
                disabled={WalletAdress && addname && typeLogo && addType ? false : true}
            />
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
    Tbutton: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 54,
        height: 55,
        backgroundColor: '#3B6ED5',
        alignItems: 'center',
        borderRadius: 8,
    },
    Tlabel: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddressBookEditorScreen;