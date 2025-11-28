import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Start a Brand Campaign with Creators | Stardust Creator Network',
  description:
    'Start your brand campaign with verified creators in Nigeria and the UK. Connect with top influencers who drive authentic engagement and real results for your brand. Choose your region to begin.',
  url: '/brands/brief',
});

export default function BrandBriefLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
