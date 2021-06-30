import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStoragePlugin from 'i18next-react-native-async-storage'

import en from './en.json';
import zh from './zh.json';
 
const i18n =i18next.createInstance();

i18n.use(AsyncStoragePlugin()).use(initReactI18next).init({
  lng:'en',
  debug: true,
  resources: {
    en: { translation: en },
    "zh-CN": { translation: zh },
  },  interpolation: {
    escapeValue: false,
  },
})
export default i18n;
