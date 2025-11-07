export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-neutral-900 to-black">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-purple-900/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight tracking-tight">
              Build. Collaborate. Monetize
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text leading-tight mb-6">
              The Future of the Creator Economy Starts Here.
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl">
              Stardust Creator Network connects creators and brands today, and is building the
              infrastructure that will power tomorrow&apos;s creative businesses.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
