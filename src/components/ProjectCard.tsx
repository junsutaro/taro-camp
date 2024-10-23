// src/components/ProjectCard.tsx

import { ProjectCardProps } from '@/types/projectTypes';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({
  title,
  description,
  imgSrc,
  features,
  id,
}: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${id}`}>
      <div className="entry-card border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
        <div className="mb-4 w-full h-[150px] relative overflow-hidden rounded-lg">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority
          />
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="mt-4">
          <h3 className="text-green-600 font-semibold">담당 구현 사항</h3>
          <ul className="list-disc ml-5">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
