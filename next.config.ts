import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    // 지원할 언어 목록
    locales: ['default', 'ko', 'en', 'ja'],
    // 기본 언어 설정
    defaultLocale: 'default',
    // 자동 언어 감지 비활성화 (미들웨어에서 관리하기 위해)
    localeDetection: false,
  },
};

export default nextConfig;
