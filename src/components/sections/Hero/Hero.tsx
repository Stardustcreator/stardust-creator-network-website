'use client';

import TypewriterText from './TypewriterText';

export default function Hero() {
  return (
    <section className="hero-fullwidth relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full min-w-full min-h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source
          src="/hero%20background.mp4"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
      </video>

      {/* Background with Gradient Overlays */}
      <div className="absolute inset-0 bg-black/30 z-10">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/40 via-neutral-900/30 to-black/40" />
        {/* Secondary Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 via-transparent to-transparent" />
      </div>

      {/* Content - Bottom Left */}
      <div className="absolute bottom-0 left-0 z-20 p-6 pb-16 md:p-8 md:pb-20 lg:p-12 lg:pb-24">
        <div className="max-w-4xl">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
              <TypewriterText
                words={['Build.', 'Collaborate.', 'Monetize.']}
                typeSpeed={100}
                deleteSpeed={50}
                delayBetweenWords={2500}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight"
                cursorClassName="bg-white"
              />
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text leading-tight mb-4">
              The Future of the Creator Economy Starts Here.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              Stardust Creator Network connects creators and brands today, and is building the
              infrastructure that will power tomorrow&apos;s creative businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
