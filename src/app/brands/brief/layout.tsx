import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';

// SEO metadata for the brand brief section
export const metadata: Metadata = generateMetaTags({
  title: 'Find Creators | Stardust Creator Network',
  description:
    'Connect your brand with verified creators who move culture. Complete our quick brief to get matched with creators across Nigeria and the UK who drive real results.',
  url: '/brands/brief',
});

export default function BrandBriefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
