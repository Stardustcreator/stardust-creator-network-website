import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Join Stardust Creator Network | Apply as a Creator',
  description:
    'Join Stardust Creator Network and connect with top brands in Nigeria and the UK. Access exclusive campaigns, grow your creator career, and monetize your influence. Choose your region to apply.',
  url: '/creators/join',
});

export default function CreatorJoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
