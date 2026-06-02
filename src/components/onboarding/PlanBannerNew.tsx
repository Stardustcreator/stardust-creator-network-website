import Link from 'next/link';

type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'starter' | 'builder';

interface PlanBannerNewProps {
  plan?: PlanId;
  billing: BillingPeriod;
  hideChanger?: boolean;
}

const PLAN_DISPLAY: Record<
  PlanId,
  {
    name: string;
    price: Record<BillingPeriod, string>;
    suffix: string;
    caption: Record<BillingPeriod, string>;
  }
> = {
  starter: {
    name: 'Starter',
    price: { annual: '₦0', monthly: '₦0' },
    suffix: '/month',
    caption: { annual: 'Free Forever', monthly: 'Free Forever' },
  },
  builder: {
    name: 'Builder',
    price: { annual: '₦6,250', monthly: '₦7,500' },
    suffix: '/month',
    caption: { annual: 'Billed as ₦75,000/year', monthly: 'Billed monthly' },
  },
};

export default function PlanBannerNew({
  plan = 'builder',
  billing,
  hideChanger = false,
}: PlanBannerNewProps) {
  const { name, price, suffix, caption } = PLAN_DISPLAY[plan];

  return (
    <div className="w-full rounded-lg px-6 py-4 flex items-center justify-between bg-surface-action-primary border border-comp-primary-100">
      <div>
        <p className="text-sm md:text-base font-semibold text-text-primary">{name}</p>
        <p className="text-sm text-text-secondary mt-0.5">
          {price[billing]}
          {suffix} &middot; {caption[billing]}
        </p>
      </div>

      {!hideChanger && (
        <Link
          href="/onboarding"
          className="text-sm font-medium hover:underline shrink-0 ml-4"
          style={{ color: 'var(--color-deep-purple)' }}
        >
          Change Plan
        </Link>
      )}
    </div>
  );
}
