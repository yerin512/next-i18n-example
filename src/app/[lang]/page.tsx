import { getDictionary } from '../i18n/dictionaries';
import Todo from '../components/Todo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import styles from '../page.module.css';
import Image from 'next/image';

// 정적 경로 생성을 위한 함수
export async function generateStaticParams() {
  return [
    { lang: 'ko' },
    { lang: 'en' },
    { lang: 'ja' },
  ];
}

export default async function Home({ params }: { params: { lang: string } }) {
  // 서버 컴포넌트에서는 async/await 패턴을 사용할 때 params를 직접 접근하기 전에
  // 그 값을 다른 변수에 할당하면 경고를 방지할 수 있습니다
  const lang = params.lang;
  const dict = await getDictionary(lang);
  
  // 언어 선택기에 필요한 번역 데이터 미리 준비
  const languageSwitcherTranslations = {
    changeLanguage: dict.changeLanguage,
    languages: {
      ko: dict.languages.ko,
      en: dict.languages.en,
      ja: dict.languages.ja
    }
  };
  
  // Todo 컴포넌트에 필요한 번역 데이터 미리 준비
  const todoTranslations = {
    title: dict.todo.title,
    add: dict.todo.add,
    placeholder: dict.todo.placeholder,
    empty: dict.todo.empty
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <h1>{dict.welcome}</h1>
        <p>{dict.description}</p>
        
        <LanguageSwitcher 
          translations={languageSwitcherTranslations} 
          currentLocale={lang} 
        />
        
        <Todo translations={todoTranslations} />
      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/docs/pages/building-your-application/routing/internationalization"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Next.js i18n 문서 →
        </a>
      </footer>
    </div>
  );
} 