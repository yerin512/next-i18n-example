import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-deployed-site.vercel.app';
  
  // 지원하는 언어 목록
  const locales = ['ko', 'en', 'ja'];
  
  // 기본 URL 목록
  const routes = [''];
  
  // 모든 URL 생성 (각 경로 × 각 언어)
  const sitemap = locales.flatMap(locale => 
    routes.map(route => ({
      url: `${baseURL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    }))
  );
  
  return sitemap;
} 