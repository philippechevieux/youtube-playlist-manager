import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import french from './lang/fr.json';
import english from './lang/en.json';
import {AvailableLangague} from '../arms/user/state';

const resources = {
    en: {
        translation: english
    },
    fr: {
        translation: french
    }
};

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: AvailableLangague.EN,
        supportedLngs: [AvailableLangague.EN, AvailableLangague.FR],
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
