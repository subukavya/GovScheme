import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import ta from "./locales/ta.json";

i18n.use(initReactI18next).init({
  resources: {
    English: {
      translation: en,
    },

    हिन्दी: {
      translation: hi,
    },

    தமிழ்: {
      translation: ta,
    },
  },

  lng: "English",

  fallbackLng: "English",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;