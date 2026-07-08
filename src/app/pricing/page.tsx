export const metadata = {
  canonical: 'https://www.stardustcreatornetwork.com/pricing',
};

('use client');
import { redirect } from 'next/navigation';

export default function PricingRedirect() {
  redirect('/onboarding');
}
