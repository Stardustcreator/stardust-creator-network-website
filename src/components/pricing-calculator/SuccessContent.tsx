'use client';

import { useSearchParams } from 'next/navigation';

export default function SuccessContent() {
  const email = useSearchParams()?.get('email');

  return (
    <div className="text-center mb-24">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
        Your quote has been sent successfully!
      </h1>
      <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
        Your quote PDF has been downloaded to your device and sent to{' '}
        <span className="font-semibold">{email}</span>. If the email doesn&apos;t show up in 5
        minutes, check your spam folder.
      </p>
    </div>
  );
}
