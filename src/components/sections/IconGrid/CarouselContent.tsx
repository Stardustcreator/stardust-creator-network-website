import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import type { CarouselSlide } from './carousel-data';

interface CarouselContentProps {
  slide: CarouselSlide;
  isActive: boolean;
}

export default function CarouselContent({ slide, isActive }: CarouselContentProps) {
  return (
    <div className="w-full flex flex-col justify-center p-8 md:p-12 text-left">
      {/* Title */}
      <div
        className={`transition-all duration-500 ${
          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <Heading
          level={3}
          className="!text-white mb-2 text-3xl md:text-4xl lg:text-5xl text-left"
        >
          {slide.title}
        </Heading>
      </div>

      {/* Subtitle */}
      <div
        className={`transition-all duration-500 delay-75 ${
          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <Text
          variant="large"
          className="text-purple-300 mb-8 text-left"
        >
          {slide.subtitle}
        </Text>
      </div>

      {/* Feature List */}
      <ul className="space-y-4 text-left">
        {slide.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-start gap-4 transition-all duration-500 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{
              transitionDelay: isActive ? `${150 + index * 100}ms` : '0ms',
            }}
          >
            {/* Bullet Point */}
            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />

            {/* Feature Text */}
            <Text
              variant="body"
              className="text-gray-300 leading-relaxed text-left"
            >
              {feature}
            </Text>
          </li>
        ))}
      </ul>

      {/* Decorative Line */}
      <div
        className={`mt-8 h-1 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-transparent rounded-full transition-all duration-700 ${
          isActive ? 'w-32 opacity-100' : 'w-0 opacity-0'
        }`}
        style={{
          transitionDelay: isActive ? '500ms' : '0ms',
        }}
      />
    </div>
  );
}
