import i18n from 'i18next';
import roTranslation from './ro.json';
import enTranslation from './en.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  ro: {
    translation: roTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

const lng = 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
