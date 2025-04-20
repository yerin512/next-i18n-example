import { redirect } from 'next/navigation';

export default function Home() {
  // 기본적으로 한국어 페이지로 리디렉션
  redirect('/ko');
}
