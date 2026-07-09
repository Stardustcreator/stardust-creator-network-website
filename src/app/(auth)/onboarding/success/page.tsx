'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Image from 'next/image';
import { getScnDashboardUrl } from '@/lib/scn-dashboard';

const REDIRECT_MS = 4000;

function SuccessContent() {
  const searchParams = useSearchParams();

  const firstName = searchParams?.get('firstName') ?? 'Creator';
  const email = searchParams?.get('email') ?? '';
  const reference = searchParams?.get('reference') ?? '';

  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState('');

  useEffect(() => {
    if (!reference) {
      setDashboardUrl(getScnDashboardUrl());
      return;
    }
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
    if (!base) return;

    setDashboardUrl(`${base}/payments/callback?trxref=${reference}&reference=${reference}`);
  }, [reference]);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min((elapsed / REDIRECT_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else if (dashboardUrl) {
        window.location.href = dashboardUrl;
      }
    }

    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(skipTimer);
      cancelAnimationFrame(raf);
    };
  }, [dashboardUrl]);

  return (
    <>
      <Header variant="light" />

      <main
        id="main-content"
        className="pt-41 bg-white flex flex-col items-center justify-center px-6 pb-32 md:pb-16"
      >
        <div className="w-full max-w-3xl text-center">
          {/* Check icon */}
          <div className="flex justify-center mb-5">
            <Image
              src="/icons/checkmark.svg"
              alt="Check Icon"
              width={72}
              height={72}
              unoptimized
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            You&apos;re in, {firstName}
          </h1>

          {/* Subtitle */}
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-12">
            Creator OS is active. Taking you to your dashboard now{' '}
            <br className="hidden sm:block" /> — no extra steps needed.
          </p>

          {/* Progress widget */}
          <div className="w-full rounded-lg border px-6 py-10 mb-3 border-primary-100 bg-surface-action-primary">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm md:text-base text-text-secondary">
                Opening your dashboard...
              </span>
              <svg
                className="w-4 h-4 text-neutral-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </div>

            <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'var(--gradient-primary)',
                  transition: 'width 80ms linear',
                }}
              />
            </div>

            <p
              className={`text-sm text-text-secondary font-medium mt-3 transition-opacity duration-500 ${showSkip ? 'opacity-100' : 'opacity-0'}`}
            >
              Taking too long?{' '}
              {dashboardUrl ? (
                <a
                  href={dashboardUrl}
                  className="hover:underline text-text-action"
                >
                  Go to dashboard now
                </a>
              ) : (
                <Link
                  href="/onboarding"
                  className="hover:underline text-text-action"
                >
                  Go to dashboard now
                </Link>
              )}
            </p>
          </div>

          {/* Receipt confirmation */}
          {email && (
            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
              <svg
                className="w-4 h-4 shrink-0 text-icon-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <span>
                Receipt sent to <span className="font-normal text-text-primary">{email}</span>
              </span>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function OnboardingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
          />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
