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
    // Always start in Portuguese, on the server *and* the client's first
    // render, so hydration matches the prerendered HTML. (Node 21+ also has a
    // global `navigator` reporting en-US, which would make SSG detect
    // English.) I18nProvider switches to the visitor's saved/browser language
    // right after hydration.
    lng: 'pt',
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
      // No automatic caching: init pins 'pt' (see `lng`), which would be
      // saved as if the visitor chose it. I18nProvider saves real changes.
      caches: [],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
