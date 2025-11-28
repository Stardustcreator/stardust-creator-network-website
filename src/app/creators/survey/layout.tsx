import type { Metadata } from 'next';
import { generateMetaTags } from '@/lib/seo';

export const metadata: Metadata = generateMetaTags({
  title: 'Creator Feedback & Survey | Stardust Creator Network',
  description:
    'Share your feedback and help us build better tools for creators. Take our 2-minute survey to shape the future of Stardust Creator Network and influence the features we prioritize.',
  url: '/creators/survey',
});

export default function CreatorSurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
