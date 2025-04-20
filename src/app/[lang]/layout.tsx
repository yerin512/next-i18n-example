import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary } from "../i18n/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 동적 메타데이터 생성
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string } 
}): Promise<Metadata> {
  // 코드 초기에 params에서 lang 값을 추출하고 사용
  const lang = params.lang;
  const dict = await getDictionary(lang);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-deployed-site.vercel.app';
  
  return {
    title: `${dict.welcome} - Next.js i18n Example`,
    description: dict.description,
    // 다국어 대체 페이지 정보 제공
    alternates: {
      languages: {
        'ko': '/ko',
        'en': '/en',
        'ja': '/ja',
      },
      canonical: `/${lang}`
    },
    // OpenGraph/소셜 미디어 메타데이터
    openGraph: {
      title: `${dict.welcome} - Next.js i18n Example`,
      description: dict.description,
      url: `${baseUrl}/${lang}`,
      locale: lang,
      type: 'website',
      siteName: 'Next.js i18n Example',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Next.js i18n Example'
        }
      ]
    },
    // 트위터 카드
    twitter: {
      card: 'summary_large_image',
      title: `${dict.welcome} - Next.js i18n Example`,
      description: dict.description,
      images: [`${baseUrl}/og-image.png`]
    }
  };
}

export default async function LangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
} 