import { useRouter } from 'next/router';
import koTranslations from './locales/ko.json';
import enTranslations from './locales/en.json';
import jaTranslations from './locales/ja.json';

// TranslationValue 인터페이스 정의
interface TranslationRecord {
  [key: string]: string | TranslationRecord;
}

const translations: Record<string, TranslationRecord> = {
  ko: koTranslations,
  en: enTranslations,
  ja: jaTranslations,
};

export function useTranslation() {
  const router = useRouter();
  const { locale = 'ko' } = router;
  
  // 현재 로케일에 맞는 번역 문자열을 반환하는 함수
  const t = (key: string): string => {
    // 키가 중첩되어 있는 경우('todo.title'과 같은 형식) 처리
    const keys = key.split('.');
    let result: any = translations[locale];
    
    for (const k of keys) {
      if (typeof result !== 'object' || result?.[k] === undefined) {
        console.warn(`Translation key "${key}" not found for locale "${locale}"`);
        return key;
      }
      result = result[k];
    }
    
    if (typeof result !== 'string') {
      console.warn(`Translation for key "${key}" is not a string for locale "${locale}"`);
      return key;
    }
    
    return result;
  };

  // 언어 변경 함수
  const changeLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    
    // 쿠키 설정
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    // 현재 경로를 유지하면서 새 로케일로 이동
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return {
    t,
    locale,
    changeLocale,
  };
} 