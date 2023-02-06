import i18n from 'i18next';
import roTranslation from './ro.json';
import enTranslation from './en.json';
import { initReactI18next } from 'react-i18next';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

export const resources = {
  ro: {
    translation: roTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

const savedLang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
if (!savedLang) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, 'en');
}
const lng = savedLang ? savedLang : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
