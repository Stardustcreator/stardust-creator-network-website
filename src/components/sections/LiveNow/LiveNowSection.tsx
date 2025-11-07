import Link from 'next/link';
import NumberedSection from '../NumberedSection/NumberedSection';

export default function LiveNowSection() {
  return (
    <NumberedSection
      number="01"
      badge="LIVE NOW"
      title="Work with Creators Who Move Culture"
      subtitle="Connect. Collaborate. Create."
      layout="centered"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-neutral-600 leading-relaxed mb-12">
          We connect leading brands with Nigeria and the UK&apos;s most dynamic creators, from nano
          storytellers to macro influencers, to craft authentic campaigns that convert. More
          countries coming soon.
        </p>

        {/* Two-column benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="text-center p-8 bg-neutral-50 rounded-2xl">
            <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">For Brands</h3>
            <p className="text-neutral-600">
              Tell us your goals, and we&apos;ll curate creators who bring your vision to life.
            </p>
          </div>

          <div className="text-center p-8 bg-neutral-50 rounded-2xl">
            <div className="w-16 h-16 bg-brand-bright rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">For Creators</h3>
            <p className="text-neutral-600">
              Join our verified network and start collaborating today.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/brands/find"
            className="btn-primary"
          >
            Find Creators
          </Link>
          <Link
            href="/creators/join"
            className="btn-secondary"
          >
            Join as Creator
          </Link>
        </div>
      </div>
    </NumberedSection>
  );
}
