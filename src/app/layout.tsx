// src/app/layout.tsx (기본 레이아웃 파일)

import type {Metadata} from 'next';
import RootLayoutContent from './RootLayoutContent';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taro Camp',
  description: 'Marketing, Cat, Diary ...',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
