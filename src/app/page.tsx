import { redirect } from 'next/navigation';

export default function Home() {
  // 기본 언어로 리디렉션 (미들웨어에서 쿠키 처리)
  redirect('/ko');
}
