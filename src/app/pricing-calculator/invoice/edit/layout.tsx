import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice - Pricing Calculator | Stardust Creator Network',
  description: 'Edit your brand deal invoice details before sending.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvoiceEditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
