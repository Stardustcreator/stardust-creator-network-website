import Link from 'next/link';

export default function ConnectCollaborateCreateSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Connect. Collaborate. Create.
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              We connect leading brands with Nigeria and the UK&apos;s most dynamic creators — from
              nano storytellers to macro influencers — to craft authentic campaigns that convert.
              More countries coming soon.
            </p>
          </div>

          {/* Two-Column Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Brands Card */}
            <div className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">For Brands</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Tell us your goals — we&apos;ll curate creators who bring your vision to life.
              </p>
              <Link
                href="/brands"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Find Creators
              </Link>
            </div>

            {/* For Creators Card */}
            <div className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">For Creators</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join our verified network and start collaborating today.
              </p>
              <Link
                href="/creators"
                className="inline-flex items-center justify-center px-8 py-3 bg-slate-700 text-white font-semibold rounded-full hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
              >
                Join as Creator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
