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
import walletAction from 'actions/wallet';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage } from 'reducers/dataStateReducer';
import * as helper from 'apis/helper'


type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props {
    route: {
        params: {
            title: string,
        };
    };
}

interface Language {
    code: string,
    language: string,
}

interface Currency {
    currency: string,
    symbol: string,
}

const list1 = [
    {
        code:'en',
        language:'English',
    },
    {
        code:'zh_CH',
        language:'中文(简体)',
    }
]

const list2 = [
    {
        code:'$',
        language:'USDT',
    },
    {
        code:'$',
        language:'RMB',
    }
]

function LanguageSetScreen(props: Props) {
    const { title } = props.route.params;
    const dispatch = useDispatch()
    const language = useSelector(getLanguage)
    const [defaultLanguage, setDefaultLanguage] = useState(language);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            title === i18n.t("currencyUnit") ? list2 : list1;
        }
    }, [isFocused]);
    

    async function editLanguage(params: string) {
        if (params) {
            await dispatch(walletAction.setLanguage(params));
            await setDefaultLanguage(params)
            console.log('====================================');
            console.log(params);
            console.log('====================================');
            i18n.changeLanguage(params)
        }
    }

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={styles.nameText}>{item.language}</Text>
            <Image style={styles.imageText} source={defaultLanguage === item.code ? require('assets/icon-20-选择-on.png') : require('assets/icon-20-选择-off.png')}></Image>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => editLanguage(item.code)}
                style={styles.marginItem}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={title === i18n.t("currencyUnit") ? list2 : list1}
                style={styles.item}
                renderItem={renderItem}
                keyExtractor={(item) =>  item.code}
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