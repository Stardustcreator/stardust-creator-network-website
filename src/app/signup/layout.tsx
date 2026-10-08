import type { Metadata } from 'next';
import { Instrument_Sans, Lato } from 'next/font/google';

// The signup page is a client component, so its fonts are loaded here.
// next/font self-hosts them (the CSP only allows fonts from 'self').
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-instrument-sans',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato-su',
});

export const metadata: Metadata = {
  title: { absolute: 'Sign up | Stardust Creator Network' },
  description: 'Pick your role to get started with Stardust Creator Network.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${instrumentSans.variable} ${lato.variable}`}>{children}</div>;
}
