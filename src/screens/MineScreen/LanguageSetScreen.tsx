import React, { useState, useEffect } from 'react';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { StyleSheet, View, Text, SafeAreaView, Image, FlatList, Alert } from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { get } from 'apis/helper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import i18n from "i18n";
import walletAction from 'actions/wallet';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage } from 'reducers/dataStateReducer';
import {show} from 'utils'

type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props {
}

function LanguageSetScreen(props: Props) {

const list1 = [
    {
        code:'en',
        language:'English',
    },
    {
        code:'zh-CN',
        language:'中文(简体)',
    }
]

    const {t} = useTranslation();
    const dispatch = useDispatch()
    const language = useSelector(getLanguage)
    const [defaultLanguage, setDefaultLanguage] = useState(language);
    

    async function editLanguage(params: string) {
        if (params) {
            await dispatch(walletAction.setLanguage(params));
             setDefaultLanguage(params)
            i18n.changeLanguage(params);
            show(t("Change")+(params === 'en' ? 'English' : '中文(简体)')+t("successful"));
        }
    }

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={styles.nameText}>{item.language}</Text>
            <Image style={styles.imageText} source={defaultLanguage === item.code ? require('assets/icon_choose_on.png') : require('assets/icon_choose_of.png')}></Image>
        </TouchableOpacity>
    );
    const renderItem = ({item} ) => {
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
                data={list1}
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