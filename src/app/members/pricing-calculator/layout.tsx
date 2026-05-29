import type { Metadata } from 'next';
import { PricingCalculatorProvider } from '@/lib/contexts';

export const metadata: Metadata = {
  title: 'Pricing Calculator – Stardust Creator Network',
  robots: { index: false },
};

export default function MemberPricingCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <PricingCalculatorProvider>{children}</PricingCalculatorProvider>;
}
