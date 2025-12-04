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
      <div className="relative w-full h-full overflow-hidden">
        {/* Full Section Image Display */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src={encodeImagePath(slide.image)}
            alt={slide.alt || slide.title}
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
            loading="lazy"
            suppressHydrationWarning
            unoptimized
          />
        </div>

        {/* Brand-Colored Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-pink-500/20" />

        {/* Subtle Darkening for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center p-8 md:p-12">
      {/* Background Abstract Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientTo} rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
            isActive ? 'scale-100 opacity-20' : 'scale-75 opacity-0'
          }`}
        />
        <div
          className={`absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-tl ${slide.gradientVia} ${slide.gradientTo} rounded-full opacity-15 blur-3xl transition-all duration-1000 delay-200 ${
            isActive ? 'scale-100 opacity-15' : 'scale-75 opacity-0'
          }`}
        />
      </div>

      {/* Main Visual Card */}
      <div
        className={`relative z-10 transition-all duration-700 ease-out ${
          isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        {/* Large Gradient Badge Placeholder */}
        <div
          className={`w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientVia} ${slide.gradientTo} rounded-3xl md:rounded-[3rem] flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-105`}
        >
          <span className="text-white font-bold text-6xl md:text-8xl select-none">
            {slide.placeholder}
          </span>
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientVia} ${slide.gradientTo} rounded-3xl md:rounded-[3rem] opacity-40 blur-2xl -z-10 transition-opacity duration-500`}
        />

        {/* Floating Decorative Elements */}
        <div
          className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientVia} rounded-2xl opacity-60 blur-sm transition-all duration-700 ${
            isActive ? 'translate-x-0 translate-y-0' : 'translate-x-4 translate-y-4'
          }`}
        />
        <div
          className={`absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr ${slide.gradientVia} ${slide.gradientTo} rounded-2xl opacity-50 blur-sm transition-all duration-700 delay-100 ${
            isActive ? 'translate-x-0 translate-y-0' : '-translate-x-4 -translate-y-4'
          }`}
        />
      </div>
    </div>
  );
}
