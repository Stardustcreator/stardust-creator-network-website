'use client';

import { useState } from 'react';

import Button from '../ui/Button';
import { previewDiscount, type DiscountPreview } from '@/lib/api/payments';
import { CheckmarkCircleIcon, CloseIcon } from '@sanity/icons';

/** Human label for the applied discount, e.g. "6% off" or "₦5,000 off". */
function discountSummary(discount: DiscountPreview): string {
  return discount.discountType.toLowerCase() === 'percentage'
    ? `${discount.discountValue}% off`
    : `${formatNaira(discount.discountAmount)} off`;
}
function formatNaira(kobo: number | undefined): string {
  const naira = Math.round((kobo ?? 0) / 100);
  return `₦${new Intl.NumberFormat('en-NG').format(naira)}`;
}

interface OrderDetailsProps {
  offerId: string;
  priceLabel: string;
  planLabel: string;
  busy: boolean;
  onChange: (discount: DiscountPreview | null) => void;
}

/**
 * Order-details panel for the checkout sheet: an optional discount-code field
 * and the cart/discount/total breakdown. Validates codes through
 * `POST /payments/discount-preview`, which returns the server-computed amounts
 * (kobo), so the totals here are never derived on the client.
 */
export function OrderDetails({
  offerId,
  priceLabel,
  planLabel,
  busy,
  onChange,
}: OrderDetailsProps) {
  const [code, setCode] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied] = useState<DiscountPreview | null>(null);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setApplying(true);
    setError(null);
    try {
      const discount = await previewDiscount(offerId, trimmed);
      setApplied(discount);
      onChange(discount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code. Check and try again');
    } finally {
      setApplying(false);
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode('');
    setError(null);
    onChange(null);
  };

  return (
    <div className="space-y-4 rounded-md bg-surface-primary p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        Order details
      </h3>

      <div className="space-y-3">
        {!applied && (
          <p className="text-sm text-text-secondary">
            Got a discount code?{' '}
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              disabled={busy || applying || !!applied}
              className="font-semibold text-text-action cursor-pointer underline-offset-2 hover:underline disabled:no-underline disabled:opacity-60"
            >
              Click here
            </button>
          </p>
        )}
        {applied ? (
          <div className="flex items-center justify-between gap-3 rounded-md border border-stroke-success bg-surface-success px-4 py-3 shadow-md">
            <span className="flex items-center gap-2 text-sm font-medium text-text-success">
              <CheckmarkCircleIcon className="shrink-0 text-icon-success size-5" />
              {applied.code} — {discountSummary(applied)} applied
            </span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={busy}
              aria-label="Remove discount code"
              className="shrink-0 cursor-pointer text-icon-success transition-opacity hover:opacity-70 disabled:opacity-50"
            >
              <CloseIcon />
            </button>
          </div>
        ) : expanded ? (
          <div>
            <div className="flex items-start gap-3">
              <input
                type="text"
                value={code}
                onChange={e => {
                  setCode(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleApply();
                  }
                }}
                placeholder="e.g., SAVE5K"
                disabled={busy || applying}
                autoComplete="off"
                aria-label="Discount code (optional)"
                className="h-11 flex-1 rounded-md border focus-visible:outline-none! focus:ring-2 focus:ring-surface-action bg-surface-white px-3 text-sm text-text-primary outline-none placeholder:text-text-secondary focus:border-stroke-action disabled:opacity-60"
                style={{
                  borderColor: error ? 'var(--color-stroke-error)' : 'var(--color-stroke-primary)',
                  backgroundColor: error ? 'var(--color-surface-error-primary)' : undefined,
                }}
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleApply}
                disabled={busy || applying || !code.trim()}
                className="h-11 px-5 text-sm! disabled:opacity-30! rounded-md"
              >
                {applying ? 'Applying…' : 'Apply'}
              </Button>
            </div>
            {error && <p className="mt-2 text-sm font-medium text-text-error">{error}</p>}
          </div>
        ) : null}
      </div>

      <div className="h-px bg-stroke-tertiary" />

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-text-secondary">{planLabel}</dt>
          <dd className="text-text-primary">
            {applied ? formatNaira(applied.originalAmount) : priceLabel}
          </dd>
        </div>

        {applied && (
          <div className="flex items-center justify-between">
            <dt className="font-medium text-text-success">
              Discount
              {applied.discountType.toLowerCase() === 'percentage'
                ? ` (${applied.discountValue}%)`
                : ''}
            </dt>
            <dd className="font-medium text-text-success">
              -{formatNaira(applied.discountAmount)}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between text-base font-bold">
          <dt className="text-text-primary">Total</dt>
          <dd className="flex items-center gap-2">
            {applied && <span className="text-text-secondary line-through">{priceLabel}</span>}
            <span className={applied ? 'text-text-success' : 'text-text-action'}>
              {applied ? formatNaira(applied.finalAmount) : priceLabel}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
