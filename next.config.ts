import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // 빌드 시 ESLint 실행 중지
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
