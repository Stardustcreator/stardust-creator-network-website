import Link from 'next/link';

interface PlanBannerProps {
  billing: 'annual' | 'monthly';
}

const BILLING_DISPLAY = {
  annual: { price: '₦50,000', period: 'year', cadence: 'annually' },
  monthly: { price: '₦5,000', period: 'month', cadence: 'monthly' },
} as const;

export default function PlanBanner({ billing }: PlanBannerProps) {
  const { price, period, cadence } = BILLING_DISPLAY[billing];

  return (
    <div className="w-full rounded-lg px-6 py-4 flex items-center justify-between bg-surface-action-primary border border-comp-primary-100">
      <div>
        <p className="text-sm md:text-base font-semibold text-text-primary">Community</p>
        <p className="text-sm text-text-secondary mt-0.5">
          {price} / {period} &middot; Billed {cadence}
        </p>
      </div>

      <Link
        href="/onboarding"
        className="text-sm font-medium hover:underline shrink-0 ml-4"
        style={{ color: 'var(--color-deep-purple)' }}
      >
        Change Plan
      </Link>
    </div>
  );
}
