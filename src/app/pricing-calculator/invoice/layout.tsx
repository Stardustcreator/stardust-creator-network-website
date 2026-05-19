import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review Your Invoice | Stardust Creator Network',
  description: 'Review and edit your personalized creator pricing invoice before sending.',
  robots: {
    index: false, // Don't index invoice pages
    follow: false,
  },
};

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
