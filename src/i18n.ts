import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import es from "./locales/es.json";

let initialLanguage = "en";

const persistedState = localStorage.getItem("persist:root");
if (persistedState) {
  try {
    const parsedState = JSON.parse(persistedState);
    if (parsedState.language) {
      const languageState = JSON.parse(parsedState.language);
      initialLanguage = languageState.language || "en";
    }
  } catch (error) {
    console.error("Error parsing persisted language state", error);
    initialLanguage = "en";
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
    es: { translation: es },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
