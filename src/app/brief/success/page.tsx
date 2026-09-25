'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

const WHAT_HAPPENS_NEXT = [
  {
    title: 'Brief Review',
    description: 'Our team analyzes your requirements and matches you on suitable creators.',
  },
  {
    title: 'Creator Shortlist',
    description: 'Receive a curated list of verified creators with detailed profiles and rates.',
  },
  {
    title: 'Campaign Launch',
    description: 'Start your collaboration with handpicked creators who align with your brand.',
  },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/stardustcreatornetwork/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@stardustcreatornetwork',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@StardustCreatorNetwork',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/stardust-creator-network',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

export default function BriefSuccessPage() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-32 pb-20 px-4 sm:px-6"
        style={{ backgroundColor: '#FBF3FF' }}
      >
        <div className="max-w-3xl mx-auto">
          <div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#EAF9EF' }}
              >
                <svg
                  className="w-8 h-8"
                  style={{ color: '#22C55E' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                You&apos;re all set!
              </h1>
              <p className="text-neutral-500 max-w-lg mx-auto">
                Our partnerships team will review your brief and contact you within 72 hours with
                curated creator shortlist and tailored proposal.
              </p>
              <Link
                href="/brief-status"
                className="inline-block mt-4 font-semibold"
                style={{ color: '#57058B' }}
              >
                View your brief anytime, no sign-in needed →
              </Link>
            </div>

            <div
              className="mt-8 rounded-xl p-6 sm:p-8 hidden"
              style={{ border: '1px solid #E7E5E4' }}
            >
              <p className="text-center text-neutral-700 max-w-2xl mx-auto mb-6">
                Want to stay ahead of the curve? Join our Marketing Leaders community focused on
                driving business growth using insights, case studies, reports, and tools.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  className="rounded-lg py-6 px-4 text-center font-semibold text-white border-2 border-transparent hover:border-[#57058B] transition-colors"
                  style={{ backgroundColor: '#FF5400' }}
                >
                  Join Growth Authority Waitlist
                </button>
                <button
                  type="button"
                  className="rounded-lg py-6 px-4 text-center font-medium text-neutral-800 border-2 border-transparent hover:border-[#57058B] transition-colors"
                  style={{ backgroundColor: '#F1F5F9' }}
                >
                  Book a brand Strategy Call
                </button>
                <Link
                  href="/case-studies"
                  className="rounded-lg py-6 px-4 text-center font-medium text-neutral-800 border-2 border-transparent hover:border-[#57058B] transition-colors flex items-center justify-center"
                  style={{ backgroundColor: '#F1F5F9' }}
                >
                  Explore Creator Success Stories
                </Link>
              </div>
            </div>

            <div
              className="mt-8 rounded-xl p-6 sm:p-8"
              style={{ backgroundColor: '#FAFAF9' }}
            >
              <h2 className="text-xl font-bold text-black text-center mb-6">What happens next?</h2>
              <div className="space-y-3">
                {WHAT_HAPPENS_NEXT.map((item, index) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-lg p-4"
                    style={{ border: '1px solid #E7E5E4' }}
                  >
                    <p className="text-sm font-semibold text-neutral-900">
                      {index + 1}. {item.title}
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-6 rounded-xl p-6 sm:p-8"
              style={{ border: '1px solid #E7E5E4' }}
            >
              <p className="font-semibold text-neutral-900 mb-1">Follow us on Social media</p>
              <p className="text-sm text-neutral-500 mb-4">
                Stay updated with Creator&apos;s marketing insights, success stories, and campaign
                inspiration.
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-[#57058B] transition-colors"
                    style={{ backgroundColor: '#F5F5F4' }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.path} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-center text-neutral-500 mt-6">Questions? We&apos;re here to help.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
