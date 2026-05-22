'use client';

import { useEffect, useRef, useState } from 'react';

interface PaymentStepProps {
  checkoutUrl: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentStep({ checkoutUrl, onSuccess, onCancel }: PaymentStepProps) {
  const opened = useRef(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (opened.current || !checkoutUrl) return;
    opened.current = true;

    const accessCode = checkoutUrl.split('/').pop();
    if (!accessCode) {
      setError('Invalid payment session. Please go back and try again.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import('@paystack/inline-js').then(({ default: PaystackPop }: any) => {
      const popup = new PaystackPop();
      const trans = popup.resumeTransaction(accessCode);
      trans.onSuccess = () => onSuccess();
      trans.onError = () => {
        opened.current = false;
        setError('Payment failed. Please try again.');
      };
      trans.onCancel = () => {
        opened.current = false;
        onCancel();
      };
    });
  }, [checkoutUrl, onSuccess, onCancel]);

  return (
    <div className="max-w-md mx-auto text-center py-24">
      {error ? (
        <>
          <p className="text-surface-error text-sm font-medium mb-4">{error}</p>
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-neutral-400 hover:text-neutral-600 underline transition-colors"
          >
            Go back
          </button>
        </>
      ) : (
        <>
          <div
            className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-5"
            style={{ borderColor: 'var(--color-deep-purple)', borderTopColor: 'transparent' }}
          />
          <p className="text-neutral-600 text-sm font-medium mb-1">Opening secure payment…</p>
          <p className="text-neutral-400 text-xs mb-6">
            A Paystack window will appear — please don&apos;t close this tab.
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-neutral-400 hover:text-neutral-600 underline transition-colors"
          >
            Cancel and go back
          </button>
        </>
      )}
    </div>
  );
}
