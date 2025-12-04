import Image from 'next/image';
import { Text } from '@/components/typography';

export default function PlatformLogosSection() {
  const brands = [
    { name: 'Honeywell', logo: '/brand logos/honeywell.webp' },
    { name: 'Chevrolet', logo: '/brand logos/chevrolet.webp' },
    { name: 'FMN', logo: '/brand logos/fmn.webp' },
    { name: 'Golden Penny', logo: '/brand logos/golden penny.webp' },
    { name: 'Daily Trust', logo: '/brand logos/daily trust.webp' },
    { name: 'Leadway', logo: '/brand logos/leadway.webp' },
  ];

  // Create a logo component to avoid repetition
  const LogoItem = ({ brand, index }: { brand: (typeof brands)[0]; index: number }) => (
    <div
      key={`${brand.name}-${index}`}
      className="group cursor-pointer shrink-0 flex flex-col items-center"
    >
      <div className="w-20 h-14 md:w-24 md:h-16 lg:w-28 lg:h-20 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={112}
          height={80}
          className="object-contain max-w-full max-h-full transition-all duration-300"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <section className="pt-12 pb-8 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Horizontally Scrolling Brand Logos */}
        <div className="relative overflow-hidden">
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 lg:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 md:gap-8 lg:gap-10 animate-scroll-logos">
            {/* First set of logos */}
            {brands.map((brand, index) => (
              <LogoItem
                key={brand.name}
                brand={brand}
                index={index}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <LogoItem
                key={`${brand.name}-duplicate`}
                brand={brand}
                index={index + brands.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
