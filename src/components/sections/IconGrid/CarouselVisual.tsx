import Image from 'next/image';
import type { CarouselSlide } from './carousel-data';
import { encodeImagePath } from '@/lib/utils';

interface CarouselVisualProps {
  slide: CarouselSlide;
  isActive: boolean;
}

export default function CarouselVisual({ slide, isActive }: CarouselVisualProps) {
  if (slide.image) {
    return (
      <div className="relative w-full rounded-l-[40px] overflow-hidden bg-black">
        <Image
          src={encodeImagePath(slide.image)}
          alt={slide.alt || slide.title}
          width={1080}
          height={1080}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          priority={isActive}
        />
      </div>
    );
  }

  // Fallback for slides without images
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px] flex items-center justify-center rounded-l-[40px] overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
      {/* Simple placeholder for slides without images */}
      <div
        className={`w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientVia} ${slide.gradientTo} rounded-3xl flex items-center justify-center`}
      >
        <span className="text-white font-bold text-6xl md:text-8xl">{slide.placeholder}</span>
      </div>
    </div>
  );
}
