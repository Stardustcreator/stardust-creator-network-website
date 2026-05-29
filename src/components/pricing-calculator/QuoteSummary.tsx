'use client';

import Button from '../ui/Button';
import { formatNaira } from './calculator.utils';
import { usePricingCalculator } from '@/lib/contexts';

interface QuoteSummaryProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string | null;
  emailAddress?: string;
}

export default function QuoteSummary({
  onSubmit,
  isSubmitting,
  submitError,
  emailAddress,
}: QuoteSummaryProps) {
  const { quote } = usePricingCalculator();

  return (
    <div className="border-t lg:border-t-0 pt-6 lg:pt-0">
      <h3 className="text-2xl font-medium text-text-primary mb-4">Summary</h3>

      <div className="space-y-4 mb-4 bg-primary-100 p-6 pb-8 rounded-lg text-text-primary text-sm md:text-base lg:text-lg">
        <div className="flex items-center justify-between">
          <span>Subtotal (Content only)</span>
          <span className="text-base lg:text-xl font-semibold">{formatNaira(quote.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Rights & Exclusivity</span>
          <span className="text-base lg:text-xl font-semibold">{formatNaira(quote.licensing)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount Applied</span>
          <span className="text-base lg:text-xl font-semibold">
            {quote.discount > 0 ? `-${formatNaira(quote.discount)}` : formatNaira(0)}
          </span>
        </div>
        <div className="flex items-center justify-between border-y border-stroke-tertiary py-4">
          <span>Final Custom Quote</span>
          <span className="text-xl lg:text-2xl font-semibold lg:font-bold">
            {formatNaira(quote.finalTotal)}
          </span>
        </div>
      </div>

      {submitError && (
        <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2.5 text-xs text-red-700">
          {/* {submitError} */}
          Join the SCN Community for unlimited rate card generations
        </div>
      )}

      <Button
        type="button"
        onClick={onSubmit}
        variant="primary"
        className="w-full py-2.5! text-sm! rounded-md"
        disabled={
          isSubmitting ||
          (emailAddress !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim()))
        }
      >
        {isSubmitting ? 'Generating PDF…' : 'Download rate card'}
      </Button>
    </div>
  );
}
