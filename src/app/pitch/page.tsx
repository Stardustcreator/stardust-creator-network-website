'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { getStoredGuestBriefToken } from '@/lib/guest-brief-token';
import type { BriefResumeResponse } from '@/lib/api/briefs';

type LoadState = 'loading' | 'no-token' | 'error' | 'success';

function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}

// Placeholder destination for single-creator briefs. The real pitch
// experience (matching the brand with one creator and letting that creator
// pitch back) doesn't exist yet - this just confirms the brief was
// received and reuses the same guest-token lookup /brief-status already
// has, since a single-creator brief has no commitment fee/payment step to
// show.
function PitchContent() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams?.get('token') ?? undefined;

  const [state, setState] = useState<LoadState>('loading');
  const [brief, setBrief] = useState<BriefResumeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = tokenFromUrl ?? getStoredGuestBriefToken()?.guestToken;

    if (!token) {
      setState('no-token');
      return;
    }

    fetch('/api/brief-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async response => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success) {
          throw new Error(result.error || "We couldn't find that brief.");
        }
        setBrief(result.data as BriefResumeResponse);
        setState('success');
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : "We couldn't find that brief.");
        setState('error');
      });
  }, [tokenFromUrl]);

  if (state === 'loading') return <Spinner />;

  if (state === 'no-token' || state === 'error') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-black mb-3">
              {state === 'error' ? "We couldn't load your brief" : 'No brief found on this device'}
            </h1>
            <p className="text-neutral-500 mb-6">
              {state === 'error'
                ? errorMessage
                : "We couldn't find a saved brief here. Use the link in your confirmation email, or submit a new brief below."}
            </p>
            <Link
              href="/brief"
              className="inline-block px-6 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: '#57058B' }}
            >
              Submit a brief
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!brief) return null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
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
          <p className="text-sm text-neutral-500 mb-2">Reference: {brief.id}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
            We&apos;re finding your creator, {brief.brandName}
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Since you&apos;re looking for one creator, our team will match you directly and that
            creator will pitch their approach to your campaign. We&apos;ll be in touch by email
            shortly.
          </p>
          <p className="text-center text-neutral-500 mt-10">Questions? We&apos;re here to help.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PitchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <PitchContent />
    </Suspense>
  );
}
