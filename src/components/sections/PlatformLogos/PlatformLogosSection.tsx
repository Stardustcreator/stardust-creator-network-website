import Image from 'next/image';
import { Heading, Text } from '@/components/typography';

export default function PlatformLogosSection() {
  const brands = [
    { name: 'Honeywell', logo: '/brand logos/honeywell.png' },
    { name: 'Chevrolet', logo: '/brand logos/chevrolet.png' },
    { name: 'International Breweries', logo: '/brand logos/International Breweries Logo.png' },
    { name: 'FMN', logo: '/brand logos/fmn.png' },
    { name: 'Golden Penny', logo: '/brand logos/golden penny.png' },
    { name: 'Daily Trust', logo: '/brand logos/daily trust.png' },
    { name: 'Leadway', logo: '/brand logos/leadway.png' },
  ];

  // Create a logo component to avoid repetition
  const LogoItem = ({ brand, index }: { brand: (typeof brands)[0]; index: number }) => (
    <div
      key={`${brand.name}-${index}`}
      className="group cursor-pointer flex-shrink-0 flex flex-col items-center"
    >
      <div className="w-32 h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={180}
          height={120}
          className="object-contain max-w-full max-h-full transition-all duration-300"
        />
      </div>
      <Text
        variant="caption"
        color="white"
        weight={500}
        className="text-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {brand.name}
      </Text>
    </div>
  );

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Heading
            level={2}
            variant="default"
            className="text-white opacity-60 mb-4"
          >
            Trusted by Leading Brands
          </Heading>
        </div>

        {/* Horizontally Scrolling Brand Logos */}
        <div className="relative overflow-hidden">
          <div className="flex gap-8 md:gap-12 lg:gap-16 animate-scroll-logos">
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
