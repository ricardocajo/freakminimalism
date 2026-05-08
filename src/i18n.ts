import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../public/locales/en/common.json';
import ptTranslations from '../public/locales/pt/common.json';

const SUPPORTED = ['pt', 'en'] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    supportedLngs: SUPPORTED as unknown as string[],
    nonExplicitSupportedLngs: true, // map en-US → en, pt-PT → pt etc.
    load: 'languageOnly',
    debug: process.env.NODE_ENV === 'development',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { common: enTranslations },
      pt: { common: ptTranslations },
    },
    detection: {
      // Detection order — first hit wins. localStorage persists user choice
      // across reloads; navigator detects first-visit preference.
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
