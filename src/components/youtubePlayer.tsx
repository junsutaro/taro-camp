// src/components/youtubePlayer.tsx

'use client';

import { youtubeLinks } from '@/Data/youtubeLinks';
import {useEffect, useState} from 'react';
import Button from './Button';



export default function YoutubePlayer() {
  const [randomLink, setRandomLink] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  //   const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true); // 플레이어를 보여줄지 여부를 관리하는 상태
  const [key, setKey] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * youtubeLinks.length);
    setRandomLink(youtubeLinks[randomIndex]);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      //   setIsLargeScreen(width > 1280);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [key]);

  return (
    <div>
      {isMobile && (
        <Button
          onClick={() => setShowPlayer(!showPlayer)} // 버튼 클릭 시 상태 변경
          variant='tertiary'
          className="fixed z-20 top-0 right-0 m-4 p-2 rounded-lg">
          {showPlayer ? '유튜브 접기' : '열기'}
        </Button>
      )}
      <div
        className={`fixed z-10 left-0
        ${isMobile ? (showPlayer ? 'w-40 h-40' : 'w-0 h-0 ') : 'w-64 h-64'}
        ${isMobile ? 'bottom-20' : 'bottom-0'} `}>
        <iframe
          className="w-full h-full"
          src={randomLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
      {showPlayer && (
        <button
          onClick={() => setKey(prev => prev + 1)}
          className={`fixed z-20 left-0 rounded-lg 
        ${isMobile ? 'bottom-60' : 'bottom-64'}`}>
          랜덤 돌리기
        </button>
      )}
    </div>
  );
}
