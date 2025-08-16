import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fi from './locales/fi/translation.json';
import en from './locales/en/translation.json';
import sv from './locales/sv/translation.json';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      fi: { translation: fi },
      en: { translation: en },
      sv: { translation: sv }
    },
    lng: 'fi', // default language
    fallbackLng: 'sv', // fallback language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });