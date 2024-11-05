// src/app/layout.tsx (기본 레이아웃 파일)

import type {Metadata} from 'next';
import RootLayoutContent from './RootLayoutContent';
import './globals.css';
import YoutubePlayer from '@/components/youtubePlayer';

export const metadata: Metadata = {
  title: 'Taro Camp',
  description: 'Marketing, Diary, Board ...',
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
        <div className='mb-20'>
          <RootLayoutContent>{children}</RootLayoutContent>
          <YoutubePlayer/>
        </div>
      </body>
    </html>
  );
}
