import koTranslations from '../../i18n/locales/ko.json';
import enTranslations from '../../i18n/locales/en.json';
import jaTranslations from '../../i18n/locales/ja.json';

const dictionaries = {
  ko: () => Promise.resolve(koTranslations),
  en: () => Promise.resolve(enTranslations),
  ja: () => Promise.resolve(jaTranslations),
};

export const getDictionary = async (locale: string) => {
  // 기본 로케일이 없으면 한국어로 설정
  if (!dictionaries[locale as keyof typeof dictionaries]) {
    locale = 'ko';
  }
  
  return dictionaries[locale as keyof typeof dictionaries]();
}; 