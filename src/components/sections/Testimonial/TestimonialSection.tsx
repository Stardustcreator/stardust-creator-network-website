export default function TestimonialSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-neutral-950 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="mb-6">
              <svg
                className="w-12 h-12 text-purple-400 opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote Text */}
            <blockquote className="mb-8">
              <p className="text-2xl md:text-3xl text-white leading-relaxed font-light mb-6">
                Thanks to Stardust Creator Network, I transformed my content creation into a
                thriving business. The community, tools, and support are unmatched. I went from
                posting sporadically to running a sustainable creative enterprise with consistent
                income.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                The analytics helped me understand my audience better, and the monetization features
                made it easy to turn my passion into profit. I couldn&apos;t have done this without
                the platform.
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                JM
              </div>
              <div>
                <div className="text-white font-bold text-lg">Jessica Martinez</div>
                <div className="text-gray-400 text-sm">Content Creator & Entrepreneur</div>
                <div className="text-purple-400 text-xs mt-1">850K followers</div>
              </div>
            </div>
          </div>

          {/* Stats Below */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5/5</div>
              <div className="text-gray-400 text-sm">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2,500+</div>
              <div className="text-gray-400 text-sm">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
