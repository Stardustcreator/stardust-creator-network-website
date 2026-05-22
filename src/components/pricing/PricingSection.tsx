'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heading, Text } from '@/components/typography';
import CheckIcon from '@/components/icons/CheckIcon';

type BillingPeriod = 'annual' | 'monthly';

const PRICING: Record<BillingPeriod, { display: string; suffix: string }> = {
  annual: { display: '₦50,000', suffix: '/year' },
  monthly: { display: '₦5,000', suffix: '/month' },
};

const COMMUNITY_FEATURES = [
  'Structured live clinics',
  'Pricing and negotiation playbooks',
  'Peer network of sub-10k creators',
  'Weekly office hours with the programs lead',
];

interface PricingSectionProps {
  ctaBase?: string;
}

export default function PricingSection({
  ctaBase = '/onboarding/create-account',
}: PricingSectionProps) {
  const [billing, setBilling] = useState<BillingPeriod>('annual');

  const pricing = PRICING[billing];

  return (
    <section className="py-20 pb-22 px-6">
      <div className="max-w-2xl mx-auto">
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
        <div className="flex justify-center mb-6">
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

        {/* Pricing card */}
        <div
          className="rounded-2xl p-8 pt-6"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Text
            variant="small"
            className="text-white! font-bold! mb-1 text-sm md:text-base"
          >
            Community
          </Text>

          <div className="mb-6 text-2xl md:text-3xl lg:text-4xl">
            <span className="font-bold text-white">{pricing.display}</span>
            <span className="text-white ">{pricing.suffix}</span>
          </div>

          <Link
            href={`${ctaBase}?billing=${billing}`}
            className="block w-full text-center bg-white font-semibold py-3 shadow-xs px-6 text-sm md:text-base rounded-xl transition-all duration-200 hover:bg-white/90 mb-4"
            style={{ color: 'var(--color-deep-purple)' }}
          >
            Join Community
          </Link>
          <p
            className="h-px w-full mb-4"
            style={{ background: 'var(--gradient-primary)' }}
          ></p>

          <ul className="space-y-4">
            {COMMUNITY_FEATURES.map(feature => (
              <li
                key={feature}
                className="flex items-center gap-2"
              >
                <CheckIcon className="w-5 h-5 text-white shrink-0" />
                <Text
                  variant="small"
                  className="text-white! text-sm md:text-base"
                >
                  {feature}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
