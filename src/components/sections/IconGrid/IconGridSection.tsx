export default function IconGridSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learn. Collaborate. Scale.
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              The SCN Creator Community is Launching Soon.
            </span>
          </h2>

          {/* Main Copy */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
            The SCN Creator Community will empower creators with access to education, monetization
            playbooks, and peer collaboration, all within a private, growth-focused ecosystem.
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Join the waitlist to be first in line when we open doors next month.
          </p>

          {/* Call-to-Action */}
          <div className="flex justify-center">
            <button className="group relative inline-flex items-center justify-center px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
              <span className="relative z-10">Join the Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
            </button>
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-12 inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-gray-300 font-medium">Opening Next Month</span>
          </div>
        </div>
      </div>
    </section>
  );
}
