/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // 빌드 시 ESLint 실행 중지
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 타입 검사 건너뛰기
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 