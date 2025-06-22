import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../public/locales/en/common.json';
import ptTranslations from '../public/locales/pt/common.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'pt', // Start with Portuguese
    fallbackLng: 'pt',
    debug: process.env.NODE_ENV === 'development',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enTranslations,
      },
      pt: {
        common: ptTranslations,
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
