'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import CheckIcon from '@/components/icons/CheckIcon';
import LockIcon from '@/components/icons/LockIcon';
import Image from 'next/image';
import { ArrowRightIcon, ChevronRightIcon } from '@sanity/icons';

type BillingPeriod = 'annual' | 'monthly';
type PlanId = 'starter' | 'builder';

type FeatureValue = string | { locked: true; text: string };

interface PlanConfig {
  id: PlanId;
  name: string;
  recommended: boolean;
  price: Record<BillingPeriod, string>;
  suffix: string;
  caption: Record<BillingPeriod, string>;
  cta: { label: string; withArrow: boolean };
  commission: string;
}

const PLANS: PlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    recommended: false,
    price: { annual: '₦0', monthly: '₦0' },
    suffix: '/month',
    caption: { annual: 'Free Forever.', monthly: 'Free Forever.' },
    cta: { label: 'Get Started for free', withArrow: false },
    commission: '5%',
  },
  {
    id: 'builder',
    name: 'Builder',
    recommended: true,
    price: { annual: '₦6,250', monthly: '₦7,500' },
    suffix: '/month',
    caption: { annual: 'Billed as ₦75,000/year', monthly: 'Billed monthly' },
    cta: { label: 'Start Building', withArrow: true },
    commission: '3%',
  },
];

const FEATURES: { label: string; starter: FeatureValue; builder: FeatureValue }[] = [
  { label: 'Rate Card Output', starter: 'Total price only', builder: 'Full Breakdown' },
  { label: 'Rate card generations', starter: '3 / month', builder: '10 / month' },
  { label: 'Invoicing', starter: '3 / month', builder: '10 / month' },
  { label: 'Commission', starter: '5%', builder: '3%' },
  { label: 'Email captures', starter: '100 subscribers', builder: '500 subscribers' },
  { label: 'Email Broadcasts', starter: '2 / month', builder: '5 / month' },
  {
    label: 'Community access',
    starter: 'Weekly community digest/newsletter only',
    builder: 'Full access',
  },
  // { label: 'UGC package', starter: { locked: true, text: 'Locked' }, builder: 'Included' },
  { label: 'Brand deals', starter: { locked: true, text: 'Locked' }, builder: 'Basic access' },
  { label: 'Templates', starter: 'Preview Only', builder: 'Full library' },
];

interface PlanPricingSectionProps {
  ctaBase?: string;
}

export default function PlanPricingSection({
  ctaBase = '/onboarding/create-account',
}: PlanPricingSectionProps) {
  const [billing, setBilling] = useState<BillingPeriod>('annual');

  return (
    <section className="py-10 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Promo banner */}
        <div className="animate-promo-banner max-w-2xl mx-auto mb-8 rounded-lg border border-comp-primary-100 bg-surface-action-primary px-4 py-3 text-center">
          <Text
            variant="small"
            className="text-text-primary!"
          >
            Sign up for the <span className="font-semibold">Builder</span> plan and get your first
            month free — use code <span className="font-semibold text-brand-purple">BETA26</span> at
            checkout.
          </Text>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <Heading
            level={3}
            variant="default"
            className="text-text-primary! mb-3"
          >
            Choose your Plan
          </Heading>
          <Text
            variant="body"
            className="text-text-secondary!"
          >
            Start free with Community, upgrade when you&apos;re ready to grow
          </Text>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-surface-secondary rounded-md py-2 px-3 gap-0.5 w-full max-w-xs">
            <button
              type="button"
              onClick={() => setBilling('annual')}
              className={`flex-1 px-4 py-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-all duration-200 cursor-pointer text-center ${
                billing === 'annual'
                  ? 'bg-white text-text-primary shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Annual <span className="text-brand-purple font-medium">(Save 17%)</span>
            </button>
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={`flex-1 px-4 py-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-all duration-200 cursor-pointer text-center ${
                billing === 'monthly'
                  ? 'bg-white text-text-primary shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start max-w-3xl mx-auto md:max-w-none">
          {PLANS.map(plan => {
            const isBuilder = plan.id === 'builder';
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl bg-white p-8 py-6 ${
                  plan.recommended
                    ? 'border-2 border-brand-purple shadow-xl'
                    : 'border border-stroke-secondary'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full text-sm font-semibold text-surface-action-2 inner-shadow">
                    Recommended
                  </span>
                )}

                {/* Plan name */}
                <Text
                  variant="small"
                  className="text-text-primary! font-bold! text-sm md:text-base"
                >
                  {plan.name}
                </Text>

                {/* Price */}
                <div className="mt-2 mb-1 text-3xl md:text-4xl">
                  <span className="font-medium text-text-primary">{plan.price[billing]}</span>
                  <span className="text-text-primary font-medium">{plan.suffix}</span>
                </div>

                {/* Caption */}
                {billing == 'annual' && (
                  <Text
                    variant="small"
                    className="text-text-secondary! text-sm"
                  >
                    {plan.caption[billing]}
                  </Text>
                )}

                {/* CTA */}
                <Link
                  href={`${ctaBase}?plan=${plan.id}&billing=${billing}`}
                  className={`mt-6 mb-6 flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all duration-200 md:text-base ${
                    isBuilder
                      ? 'bg-brand-purple text-white hover:bg-brand-purple-dark'
                      : 'border border-icon-action text-icon-action hover:bg-brand-purple/5'
                  }`}
                >
                  {plan.cta.label}
                  {plan.cta.withArrow && <ArrowRightIcon className="scale-120 mt-1" />}
                </Link>

                <div className="h-px w-full bg-surface-secondary" />

                {/* What you get */}
                <Text
                  variant="small"
                  className="text-text-secondary! my-4 block text-xs font-semibold uppercase tracking-wider"
                >
                  What you get
                </Text>

                {/* SCN Commission highlight */}
                <div
                  className={`flex items-center justify-between rounded-lg px-4 py-3 mb-3 ${
                    isBuilder ? 'bg-surface-action-primary' : 'bg-surface-primary'
                  }`}
                >
                  <div>
                    <Text
                      variant="small"
                      className="text-text-secondary! text-sm md:text-base"
                    >
                      SCN Commission
                    </Text>
                    <Text
                      variant="small"
                      className="text-text-secondary! text-xs"
                    >
                      Per transaction
                    </Text>
                  </div>
                  <Text
                    variant="small"
                    className="text-text-secondary! font-semibold! text-base"
                  >
                    {plan.commission}
                  </Text>
                </div>

                {/* Feature list */}
                <ul>
                  {FEATURES.map(feature => {
                    const value = plan.id === 'starter' ? feature.starter : feature.builder;
                    const locked = typeof value !== 'string' && value.locked;
                    const text = typeof value === 'string' ? value : value.text;
                    return (
                      <li
                        key={feature.label}
                        className="flex items-center justify-between gap-3 border-b border-stroke-tertiary py-4 last:border-b-0"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <CheckIcon className="w-5 h-5 text-surface-action shrink-0" />
                          {/* <Image
                              src="/icons/CheckGradient.svg"
                              alt=""
                              width={20}
                              height={20}
                            /> */}
                          <Text
                            variant="small"
                            className="text-text-secondary! text-sm md:text-base"
                          >
                            {feature.label}
                          </Text>
                        </span>
                        <span className="flex items-center gap-1.5 text-right shrink-0 max-w-2/4 xl:max-w-3/4">
                          {locked && <LockIcon className="w-4 h-4 text-text-secondary shrink-0" />}
                          <Text
                            variant="small"
                            className="text-text-secondary! font-bold! text-sm md:text-base"
                          >
                            {text}
                          </Text>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
