'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface LanguageSwitcherProps {
  translations: {
    changeLanguage: string;
    languages: {
      ko: string;
      en: string;
      ja: string;
    };
  };
  currentLocale: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ translations, currentLocale }) => {
  const router = useRouter();
  
  const changeLocale = useCallback((newLocale: string) => {
    // 쿠키 설정
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    
    // 새 로케일로 이동
    router.push(`/${newLocale}`);
  }, [router]);

  return (
    <div className="language-switcher">
      <div className="language-title">{translations.changeLanguage}:</div>
      <div className="language-options">
        <button
          className={`language-option ${currentLocale === 'ko' ? 'active' : ''}`}
          onClick={() => changeLocale('ko')}
        >
          {translations.languages.ko}
        </button>
        <button
          className={`language-option ${currentLocale === 'en' ? 'active' : ''}`}
          onClick={() => changeLocale('en')}
        >
          {translations.languages.en}
        </button>
        <button
          className={`language-option ${currentLocale === 'ja' ? 'active' : ''}`}
          onClick={() => changeLocale('ja')}
        >
          {translations.languages.ja}
        </button>
      </div>
      <style jsx>{`
        .language-switcher {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px 0;
          padding: 10px;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          background-color: #f8f9fa;
        }
        
        .language-title {
          margin-bottom: 10px;
          font-weight: bold;
        }
        
        .language-options {
          display: flex;
          gap: 10px;
        }
        
        .language-option {
          padding: 5px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .language-option:hover {
          background-color: #f1f1f1;
        }
        
        .language-option.active {
          background-color: #0070f3;
          color: white;
          border-color: #0070f3;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher; 