// src/app/portfolio/[Id]/page.tsx

import {notFound} from 'next/navigation';
import Image from 'next/image';
import {projectsData} from '@/Data/projectsData'; // 프로젝트 데이터를 별도 파일로 관리한다고 가정

export default function ProjectDetail({params}: {params: {id: string}}) {
  console.log('params:', params); // 여기에 로그를 찍어 params가 어떻게 들어오는지 확인
  const project = projectsData.find(project => project.id === params.id);

  if (!project) {
    return notFound(); // 프로젝트를 찾지 못하면 404 페이지로 이동
  }

  return (
    <div className="container mx-auto p-14">
      <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
      <div className="flex flex-col gap-6">
        <div className="relative w-full h-auto">
          <Image
            src={project.imgSrc.replace('-1.png', '-1.png')} // 첫 번째 이미지를 가져오는 경로
            alt={`${project.title} 이미지 1`}
            width={1600} // 최대 너비를 설정 (적절한 값으로 설정)
            height={900} // 원하는 높이를 설정 (적절한 값으로 설정)
            className="w-full h-auto" // 이미지가 컨테이너의 너비에 맞게 자동 조정됨
          />
        </div>

        <div className="relative w-full h-auto">
          <Image
            src={project.imgSrc.replace('-1.png', '-2.png')} // 두 번째 이미지를 가져오는 경로
            alt={`${project.title} 이미지 2`}
            width={1600} // 최대 너비를 설정 (적절한 값으로 설정)
            height={900} // 원하는 높이를 설정 (적절한 값으로 설정)
            className="w-full h-auto" // 이미지가 컨테이너의 너비에 맞게 자동 조정됨
          />
        </div>
      </div>
    </div>
  );
}
