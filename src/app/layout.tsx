import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js i18n Example",
  description: "Next.js 국제화 예제 애플리케이션",
  verification: {
    // Google Search Console 확인 코드
    google: "nZUr_UG4YlMsL88u3kgYu5j5rNHP-Fr0drPkYUjlxA8"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="nZUr_UG4YlMsL88u3kgYu5j5rNHP-Fr0drPkYUjlxA8" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
