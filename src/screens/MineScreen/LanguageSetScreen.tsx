import React, { useState, useEffect } from 'react';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { StyleSheet, View, Text, SafeAreaView, Image, FlatList, Alert } from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { get } from 'apis/helper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from "i18n";
import * as helper from 'apis/helper'
import { url } from 'inspector';
import { getDeviceId } from 'react-native-device-info';
import { current } from 'immer';

type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props {
    route: {
        params: {
            title: string,
        };
    };
}

interface Language {
    code:string,
    language:string,
}

interface Currency {
    currency:string,
    symbol:string,
}


function LanguageSetScreen(props: Props) {
    const { title } = props.route.params;
    const [languagelistData, setLanguageListData] = useState([]);
    const [coinlistData, setCoinListData] = useState([]);
    const [selectItem, setSelectItem] = useState({});
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            title === i18n.t("currencyUnit") ? getCoinUnit() : getLanguage();
        }
    }, [isFocused]);
    async function getLanguage() {
        const { data } = await helper.get('/sys/language', {})        
        if (data && data.length) {
            setLanguageListData(data)
        }
    }

    async function getCoinUnit() {
        const { data } = await helper.get('/sys/coin_unit', {})
        if (data && data.length) {
            setCoinListData(data)
        }
    }
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={styles.nameText}>{title === i18n.t("currencyUnit") ?item.currency:item.language}</Text>
            <Image style={styles.imageText} source={selectItem===item ? require('assets/icon-20-选择-on.png') : require('assets/icon-20-选择-off.png')}></Image>
        </TouchableOpacity>
    );
    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
                onPress={() => {
                    switch (title) {
                        case i18n.t("currencyUnit"):
                            setSelectItem(item)
                            break;
                        case i18n.t("languagesettings"):
                            setSelectItem(item)
                            i18n.changeLanguage(item.code)
                            break;
                        default:
                            break;
                    }
                }
                }
                style={styles.marginItem}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={title === i18n.t("currencyUnit") ? coinlistData : languagelistData}
                style={styles.item}
                renderItem={renderItem}
                keyExtractor={(item) => title === i18n.t("currencyUnit") ?item.currency:item.code}
            >
            </FlatList>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    item: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    marginItem: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        marginLeft: 15,
        fontSize: 14,
        fontWeight: '500',
        color: '#394867',
        width: SCREENWIDTH / 2 - 35
    },
    imageText: {
        marginLeft: SCREENWIDTH / 2 - 55,
        width: 20,
        height: 20,
    }
});

export default LanguageSetScreen;