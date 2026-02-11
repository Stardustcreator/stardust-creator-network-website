import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export const metadata: Metadata = generateMetaTags({
  title: 'Creator Success Stories | Stardust Creator Network',
  description:
    'Inspiring success stories from creators who have thrived through brand partnerships and leveraged our platform to grow their careers.',
  url: '/creators/stories',
});

import { redirect } from 'next/navigation';

export default function CreatorStoriesPage() {
  redirect('/case-studies');
}
