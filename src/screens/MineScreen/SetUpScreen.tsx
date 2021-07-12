import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SCREENHEIGHT, SCREENWIDTH } from "config/constants"
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage ,getCurrency} from 'reducers/dataStateReducer';
type SetUpScreenRouteProp = RouteProp<ScreensParamList, 'SetUpScreen'>;
interface Props { }

function SetUpScreen({ }: Props) {
  const { t } = useTranslation();
  const language = useSelector(getLanguage)
  const currency = useSelector(getCurrency)
  const list = [

    {
      name: t("languagesettings"),
      content: language === 'en'?'English':'中文(简体)',
    },
    {
      name: t("currencyUnit"),
      content: currency === 'CNY'?'CNY':'USDT',
    },

  ]
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        {
          list.map((item, i) => (
            <TouchableOpacity
              style={{ flexDirection: 'column' }}
              onPress={() => {
                switch (i) {
                  case 0:
                    navigate('LanguageSetScreen');
                    break;
                  case 1:
                    navigate('CurrencySetScreen');
                    break;
                  default:
                    break;
                }
              }
              }
            >
              <View style={{ height: 60.5, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <Image style={styles.right} source={require('assets/icon_arrow_right.png')} />
              </View>
              <View style={{ height: 0.5, backgroundColor: '#E9EDF1' }} />
            </TouchableOpacity>
          ))
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  title: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#394867',
    width: SCREENWIDTH / 2 - 20,
  },
  content: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA4B3',
    width: SCREENWIDTH / 2 - 40,
    textAlign: 'right'
  },
  right: {
    marginLeft: 12,
    width: 8,
    height: 20,
  }
});

export default SetUpScreen;