import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 지원하는 로케일 목록
const locales = ['ko', 'en', 'ja']

// 기본 로케일은 ko
const defaultLocale = 'ko'

export function middleware(request: NextRequest) {
  // 현재 요청된 경로에서 로케일 확인
  const pathname = request.nextUrl.pathname
  
  // 퍼블릭 파일 또는 API 요청은 처리하지 않음
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.match(/\.(.*)$/)
  ) {
    return
  }
  
  // 이미 로케일이 포함된 경로인지 확인
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  // 로케일이 없으면 기본 로케일로 리디렉션
  if (!pathnameHasLocale) {
    // 쿠키에서 로케일 확인
    const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale
    
    // 새 URL 생성
    const newUrl = new URL(
      `/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
      request.url
    )
    
    return NextResponse.redirect(newUrl)
  }
} 