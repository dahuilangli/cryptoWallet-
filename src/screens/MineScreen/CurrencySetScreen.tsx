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
import { getCurrency } from 'reducers/dataStateReducer';


type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props {}
function CurrencySetScreen(props: Props) {
const list2 = [
    {
        code:'$',
        language:'USDT',
    },
    {
        code:'R',
        language:'CNY',
    }
]
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const currency = useSelector(getCurrency)

    console.log(currency);
    
    const [defaultCurrency, setDefaultCurrency] = useState(currency);
    async function editLanguage(params: string) {
        if (params) {
            await dispatch(walletAction.setCurrency(params));
            setDefaultCurrency(params)
        }
    }

    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={style}>
            <Text style={styles.nameText}>{item.language}</Text>
            <Image style={styles.imageText} source={defaultCurrency === item.language ? require('assets/icon-20-选择-on.png') : require('assets/icon-20-选择-off.png')}></Image>
        </TouchableOpacity>
    );
    const renderItem = ({item} ) => {
        return (
            <Item
                item={item}
                onPress={() => editLanguage(item.language)}
                style={styles.marginItem}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ list2 }
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

export default CurrencySetScreen;