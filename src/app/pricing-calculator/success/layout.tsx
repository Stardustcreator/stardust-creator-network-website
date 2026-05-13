import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Sent Successfully | Stardust Creator Network',
  description:
    'Your personalized creator pricing quote has been sent. Check your email for the full breakdown.',
  robots: {
    index: false, // Don't index success pages
    follow: false,
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
