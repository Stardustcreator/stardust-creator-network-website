'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { formatPrice } from '@/lib/currency';
import { getStoredGuestBriefToken, persistGuestBriefToken } from '@/lib/guest-brief-token';
import type { BriefResumeResponse } from '@/lib/api/briefs';

type LoadState = 'loading' | 'no-token' | 'error' | 'success';

const TAG_TOKENS: Record<string, { bg: string; text: string }> = {
  Paid: { bg: 'var(--color-surface-success)', text: 'var(--color-text-success)' },
  'Sourcing Creators': { bg: 'var(--color-surface-success)', text: 'var(--color-text-success)' },
  'Creators Shortlisted': { bg: 'var(--color-surface-success)', text: 'var(--color-text-success)' },
  Completed: { bg: 'var(--color-surface-success)', text: 'var(--color-text-success)' },
  'Awaiting Payment': { bg: 'var(--color-surface-warning)', text: 'var(--color-text-warning)' },
  Submitted: { bg: 'var(--color-surface-warning)', text: 'var(--color-text-warning)' },
  Closed: { bg: 'var(--color-surface-error-primary)', text: 'var(--color-text-error)' },
};

// `paidAt` is the reliable signal, `status` a secondary check - mirrors the
// same check in BriefPaymentClient.
function isBriefPaid(brief: BriefResumeResponse): boolean {
  return brief.commitmentFee?.paidAt != null || brief.commitmentFee?.status === 'Paid';
}

// The backend withholds a total when a brief's creator count falls outside
// its configured pricing range - only offer payment once there's a real
// amount due, same gate BriefPaymentClient uses.
function isBriefPayable(brief: BriefResumeResponse): boolean {
  const total = brief.pricing?.totalDueNowKobo;
  return total != null && total > 0;
}

function TagPill({ tag }: { tag: string }) {
  const tokens = TAG_TOKENS[tag] ?? { bg: '#F1F5F9', text: '#334155' };
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
      style={{ backgroundColor: tokens.bg, color: tokens.text }}
    >
      {tag}
    </span>
  );
}

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

function BriefStatusContent() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams?.get('token') ?? undefined;

  const [state, setState] = useState<LoadState>('loading');
  const [brief, setBrief] = useState<BriefResumeResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenFromUrl ?? getStoredGuestBriefToken()?.guestToken;

    if (!token) {
      setState('no-token');
      return;
    }

    setToken(token);

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
        // Arrived via an emailed link on a new device - remember it here too,
        // so a future visit works without the token in the URL.
        persistGuestBriefToken(result.data.id, token);
        setBrief(result.data as BriefResumeResponse);
        setState('success');
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : "We couldn't find that brief.");
        setState('error');
      });
  }, [tokenFromUrl]);

  if (state === 'loading') return <Spinner />;

  if (state === 'no-token') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-black mb-3">No brief found on this device</h1>
            <p className="text-neutral-500 mb-6">
              We couldn&apos;t find a saved brief here. If you submitted one from another device,
              use the link in your confirmation email, or submit a new brief below.
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

  if (state === 'error') {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-black mb-3">We couldn&apos;t load your brief</h1>
            <p className="text-neutral-500 mb-6">{errorMessage}</p>
            <Link
              href="/brief"
              className="inline-block px-6 py-3 rounded-full font-semibold text-white"
              style={{ backgroundColor: '#57058B' }}
            >
              Submit a new brief
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
        <div className="max-w-2xl mx-auto px-4 py-16">
          <p className="text-sm text-neutral-500 mb-2">Reference: {brief.id}</p>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">{brief.brandName}</h1>
            <TagPill tag={brief.tag} />
          </div>

          {brief.campaignBrief && (
            <p className="text-neutral-700 mb-6 whitespace-pre-line">{brief.campaignBrief}</p>
          )}

          <div
            className="rounded-xl p-6 mb-6 space-y-2"
            style={{ border: '1px solid #E7E5E4' }}
          >
            {brief.creatorCountNeeded && (
              <p className="text-sm text-neutral-700">
                <strong>Creators needed:</strong> {brief.creatorCountNeeded}
              </p>
            )}
            {brief.platforms.length > 0 && (
              <p className="text-sm text-neutral-700">
                <strong>Platforms:</strong> {brief.platforms.join(', ')}
              </p>
            )}
            {!brief.budgetIncomplete && brief.budget && (
              <p className="text-sm text-neutral-700">
                <strong>Budget:</strong> {formatPrice(brief.budget / 100, 'NGN')}
              </p>
            )}
          </div>

          {!isBriefPaid(brief) && isBriefPayable(brief) && token && (
            <div
              className="rounded-xl p-6 mb-6"
              style={{ backgroundColor: '#FAFAF9' }}
            >
              <p className="text-neutral-700 mb-4">
                Complete the one-time mobilization payment of{' '}
                <strong>{formatPrice((brief.pricing?.totalDueNowKobo ?? 0) / 100, 'NGN')}</strong>{' '}
                to get your brief in front of creators.
              </p>
              <Link
                href={`/brief/payment?token=${encodeURIComponent(token)}`}
                className="inline-block px-6 py-3 rounded-full font-semibold text-white"
                style={{ backgroundColor: '#57058B' }}
              >
                Proceed to payment
              </Link>
            </div>
          )}

          {isBriefPaid(brief) && (
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-success)' }}
            >
              Payment received - thanks! Our partnerships team is on it.
            </p>
          )}

          <p className="text-center text-neutral-500 mt-10">Questions? We&apos;re here to help.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BriefStatusPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BriefStatusContent />
    </Suspense>
  );
}
