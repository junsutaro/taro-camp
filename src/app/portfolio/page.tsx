// src/app/portfolio/page.tsx

import ProjectCard from '@/components/ProjectCard';

export default function Portfolio() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-8">포트폴리오</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          id="quizdot"
          title="퀴즈닷 (Quiz Dot)"
          description="부족한 상식의 2%, 게임으로 채워보세요! 다양한 모드의 퀴즈게임 웹사이트"
          imgSrc="/images/project1-1.png"
          technologies={['React', 'TypeScript', 'Zustand', '웹소켓']}
          features={['서바이벌 모드 구현', '웹소켓 통신']}
        />
        <ProjectCard
          id="fasttravel"
          title="패스트래블"
          description="AI 기반 여행지 추천 시스템. 사용자에게 맞춤형 여행지를 추천해줍니다."
          imgSrc="/images/project2-1.png"
          technologies={['React', 'TensorFlow', 'Tailwind CSS']}
          features={['AI 추천 엔진', '프론트엔드 개발']}
        />
        <ProjectCard
          id="koalamate"
          title="코알라 메이트"
          description="위치 기반의 친구 찾기 서비스, 칵테일 취향으로 친구를 찾아보세요!"
          imgSrc="/images/project3-1.png"
          technologies={['React', 'Spring', 'MariaDB', 'Swagger']}
          features={['위치 기반 서비스', '실시간 매칭 엔진']}
        />
      </div>
    </div>
  );
}
