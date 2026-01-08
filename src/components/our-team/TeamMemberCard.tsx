'use client';

import Image from 'next/image';
import { Text } from '@/components/typography';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface TeamMemberCardProps {
  name: string;
  position: string;
  image: string;
  index?: number;
}

export default function TeamMemberCard({ name, position, image, index = 0 }: TeamMemberCardProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  return (
    <div
      ref={elementRef}
      className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 ease-out ${
        isIntersecting ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: isIntersecting ? `${index * 100}ms` : '0ms',
      }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={image}
          alt={`${name} - ${position}`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <h1 className="text-white mb-2 text-sm md:text-base whitespace-nowrap font-semibold">
          {name}
        </h1>
        <Text
          variant="body"
          className="text-purple-300 text-sm"
        >
          {position}
        </Text>
      </div>
    </div>
  );
}
