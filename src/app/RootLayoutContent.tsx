// src/app/RootLayoutContent.tsx

'use client';

import localFont from 'next/font/local';
import Sidebar from '@/components/sidebar';
import {useEffect, useState} from 'react';
import Navbar from '@/components/bottomNavbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLargeScreen(width >= 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased m-10`}>
      <div className={`flex min-h-screen`}>
        {!isMobile && (
          <div className="w-64 fixed top-0 left-0 h-full z-10">
            <Sidebar />
          </div>
        )}
        <div
          className={`flex-1 ${
            isMobile
              ? 'p-0'
              : isLargeScreen
              ? 'ml-64 px-40' // 큰 화면에서 카드 폭 제한
              : 'ml-64 px-4'
          }`}>
          {' '}
          {children}
        </div>
        {isMobile && <Navbar />}
      </div>
    </div>
  );
}
