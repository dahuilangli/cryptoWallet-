import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import en from './en.json';
import zh from './zh.json';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
});

export default i18next;
