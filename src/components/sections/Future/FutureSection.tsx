import Link from 'next/link';
import NumberedSection from '../NumberedSection/NumberedSection';

export default function FutureSection() {
  return (
    <NumberedSection
      number="03"
      badge="COMING 2026"
      title="Build Your Dream Creator Back Office Tool"
      subtitle="The Stardust Creator OS - Coming 2026"
      layout="centered"
      className="bg-gradient-to-br from-brand-purple/10 to-brand-violet/10"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
          We&apos;re building Stardust Creator OS, the operating system for modern creators. Create
          and sell digital products, courses, memberships, or event tickets. Manage campaigns,
          license your content, and automate payments all in one platform.
        </p>

        <p className="text-lg text-neutral-600 leading-relaxed mb-12">
          Help us shape it. Take our 2-minute survey and tell us what your dream creator workspace
          looks like.
        </p>

        {/* Feature showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-purple to-brand-violet rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2 text-sm">Digital Products</h3>
            <p className="text-xs text-neutral-600">Create and sell courses, ebooks, templates</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-bright to-brand-purple rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2 text-sm">Memberships</h3>
            <p className="text-xs text-neutral-600">Build recurring revenue streams</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-gold to-brand-orange rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2 text-sm">Campaign Management</h3>
            <p className="text-xs text-neutral-600">Track performance and ROI</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-violet to-brand-bright rounded-xl flex items-center justify-center mb-4 mx-auto">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2 text-sm">Payment Automation</h3>
            <p className="text-xs text-neutral-600">Seamless financial management</p>
          </div>
        </div>

        {/* Development timeline */}
        <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm mb-12">
          <h3 className="text-xl font-semibold text-neutral-900 mb-6 text-center">
            Development Roadmap
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-purple mb-2">2025 Q2</div>
              <div className="text-sm text-neutral-600">Alpha Release</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-bright mb-2">2025 Q4</div>
              <div className="text-sm text-neutral-600">Beta Testing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-violet mb-2">2026 Q1</div>
              <div className="text-sm text-neutral-600">Public Launch</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/creator-os/survey"
            className="btn-primary"
          >
            Take the 2-Minute Survey
          </Link>
        </div>
      </div>
    </NumberedSection>
  );
}
