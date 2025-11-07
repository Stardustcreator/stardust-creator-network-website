import Link from 'next/link';
import NumberedSection from '../NumberedSection/NumberedSection';

export default function ComingSoonSection() {
  return (
    <NumberedSection
      number="02"
      badge="COMING SOON"
      title="Your Creator HQ"
      subtitle="Learn. Collaborate. Scale. The SCN Creator Community is Launching Soon."
      layout="centered"
      className="bg-gradient-to-br from-brand-gold/10 to-brand-bright/10"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-neutral-600 leading-relaxed mb-12">
          The SCN Creator Community will empower creators with access to education, monetization
          playbooks, and peer collaboration, all within a private, growth-focused ecosystem.
        </p>

        <p className="text-lg text-neutral-600 leading-relaxed mb-12">
          Join the waitlist to be first in line when we open doors next month.
        </p>

        {/* Feature preview grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Education Hub</h3>
            <p className="text-sm text-neutral-600">Comprehensive courses and resources</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 bg-brand-bright rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Monetization Playbooks</h3>
            <p className="text-sm text-neutral-600">Proven strategies to grow revenue</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-12 h-12 bg-brand-purple rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-6 h-6 text-white"
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
            <h3 className="font-semibold text-neutral-900 mb-2">Peer Collaboration</h3>
            <p className="text-sm text-neutral-600">Connect with like-minded creators</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/community/waitlist"
            className="btn-primary"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </NumberedSection>
  );
}
