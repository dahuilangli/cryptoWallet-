import AsyncStorage from '@react-native-community/async-storage';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLanguage } from 'reducers/dataStateReducer';

import en from './en.json';
import zh from './zh.json';
 
async function getLanauage() {
  const result = await AsyncStorage.getItem('persist:data')
  if(result != null){
    const tt = JSON.parse(result)
    console.log('====================================');
    console.log(tt.language);
    console.log('====================================');
    return tt.language == "" ? 'en' : tt.language;
  }
  return 'en';
}

const language: any = getLanauage()
i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: { translation: en },
    zn: { translation: zh },
  },
});

export default i18next;
