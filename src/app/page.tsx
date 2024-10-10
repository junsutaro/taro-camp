// src/app/page.tsx

'use client';

import {useEffect, useState} from 'react';

// 유튜브 링크를 저장한 배열
const youtubeLinks = [
  'https://www.youtube.com/embed/ddl_m1hwWO4', // Destiny Rogers - Outside
  'https://www.youtube.com/embed/H4eTCeWGgVQ', // 심규선 my little bird
  'https://www.youtube.com/embed/BGn2oo-0Dqc', // Gorillaz - On Melancholy Hill
  'https://www.youtube.com/embed/8evbtRNtz8s', // Snoop Lion - Ashtrays and Heartbreaks ft. Miley Cyrus
  'https://www.youtube.com/embed/VQZXXciZb_c', // 10CM - Gradation(그라데이션)
];

export default function MainPage() {
  const [randomLink, setRandomLink] = useState<string>('');

  useEffect(() => {
    // 배열에서 랜덤한 링크를 가져오기
    const randomIndex = Math.floor(Math.random() * youtubeLinks.length);
    setRandomLink(youtubeLinks[randomIndex]);
  }, []);

  return (
    <div className="main-page min-h-screen flex flex-col items-center bg-cover bg-center">
      <h1 className="text-3xl font-bold text-center mb-8">🎹 오마카세 🎺</h1>
      {randomLink && (
        <div className="youtube-video-container w-full max-w-4xl aspect-w-16 aspect-h-9 relative">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={randomLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      )}
    </div>
  );
}
