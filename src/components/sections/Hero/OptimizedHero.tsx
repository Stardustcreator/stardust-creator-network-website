import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { optimizeLCP } from '@/lib/lcp-optimization';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: string;
}

export const OptimizedHero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  backgroundImage
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeHero = async () => {
      await optimizeLCP();
      setIsLoaded(true);
    };
    initializeHero();
  }, []);

  return (
    <section 
      className={`relative hero-section ${isLoaded ? 'loaded' : ''} min-h-[70vh] flex items-center justify-center`}
    >
      <div className="absolute inset-0 z-0">
        <Image 
          src={backgroundImage}
          alt="Hero Background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover brightness-50"
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>
      
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center text-white max-w-4xl px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {subtitle}
            </p>
            <button className="bg-primary-500 text-white px-8 py-3 rounded-full hover:bg-primary-600 transition">
              {ctaText}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};