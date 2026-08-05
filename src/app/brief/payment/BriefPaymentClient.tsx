'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Modal from '@/components/ui/modal';
import { CheckoutForm, type CheckoutValues } from '@/components/onboarding/CheckoutForm';
import { type AppliedDiscount } from '@/components/onboarding/OrderDetails';
import {
  payBrief,
  previewBriefDiscount,
  resumeBrief,
  type BriefResumeResponse,
} from '@/lib/api/briefs';
import { getStoredGuestBriefToken } from '@/lib/guest-brief-token';
import { formatNaira } from '@/lib/format';
import { toast } from '@/lib/toast';

/**
 * Offer id for the brief mobilization charge. Unlike the subscription ids in
 * `payments.ts` there's a single brief offer, so it's a constant rather than a
 * plan/billing lookup. Discount codes here are scoped by the brief's guest
 * token rather than this id (see `previewBriefDiscount`), so it's only carried
 * for prop compatibility with the shared checkout form.
 */
const BRIEF_OFFER_ID = 'brief_mobilization';

const TERMS_URL = 'https://www.stardustcreatornetwork.com/legal/terms';

const BRIEF_TERMS = [
  {
    title: 'Campaign Brief Commitment',
    body: 'By submitting a campaign brief, the brand confirms that all information provided is accurate and complete. Stardust Creator Network (SCN) will not be held liable for campaign outcomes resulting from inaccurate brief information.',
  },
  {
    title: 'Mobilization Payment',
    body: 'A mobilization payment of 50% of the total commitment fee is required before creator sourcing begins. This payment is non-refundable once creator contracts have been issued. Payment must be received within 7 business days of brief submission.',
  },
  {
    title: 'Creator Sourcing',
    body: 'SCN will source creators that best match the brief criteria. SCN does not guarantee an exact match for every requirement. The brand will be presented with creator proposals for approval before campaign activation.',
  },
];

function ArrowLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  );
}

function BackToHomepage() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
      style={{ color: '#737373' }}
    >
      <ArrowLeftIcon />
      Back to Homepage
    </Link>
  );
}

/** Blue "check your inbox" notice used in both the unpaid and paid states. */
function EmailNotice({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-2.5 rounded-lg px-6 py-3"
      style={{ backgroundColor: '#EFF6FF', color: '#1447E6' }}
    >
      <InboxIcon />
      <p className="text-xs font-medium leading-[18px]">{children}</p>
    </div>
  );
}

/** A label/value row in the pricing summary or the paid receipt. */
function SummaryRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-6 py-4"
      style={last ? undefined : { borderBottom: '0.6px solid #E2E8F0' }}
    >
      <span
        className="text-base font-medium"
        style={{ color: '#737373' }}
      >
        {label}
      </span>
      <span
        className="text-base font-medium text-right"
        style={{ color: '#262626' }}
      >
        {value}
      </span>
    </div>
  );
}

function formatPaidDate(iso: string | undefined): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BriefPaymentClient() {
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams?.get('token') ?? undefined;

  const [token, setToken] = useState<string | null>(null);
  const [brief, setBrief] = useState<BriefResumeResponse | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The emailed link carries the token, but a brand returning on the same
  // device can resume from the copy persisted at submit time.
  useEffect(() => {
    const resolved = tokenFromUrl ?? getStoredGuestBriefToken()?.guestToken;

    if (!resolved) {
      setLoadError('No brief link found on this device.');
      return;
    }

    setToken(resolved);

    let active = true;
    resumeBrief(resolved)
      .then(data => {
        if (active) setBrief(data);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setLoadError(
          err instanceof Error ? err.message : "We couldn't find that brief. Check your link."
        );
      });

    return () => {
      active = false;
    };
  }, [tokenFromUrl]);

  /**
   * Re-reads the brief after a payment attempt. The paid receipt is rendered
   * from server state rather than optimistically, so a webhook that hasn't
   * landed yet leaves the brand on the unpaid view instead of a false receipt.
   */
  const refreshFromResume = useCallback(async () => {
    if (!token) return;
    try {
      setBrief(await resumeBrief(token));
      setShowCheckout(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Payment went through but we couldn't refresh."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [token]);

  const previewBriefDiscountCode = useCallback(
    async (code: string): Promise<AppliedDiscount> => {
      if (!token) throw new Error('Invalid code. Check and try again');
      return previewBriefDiscount(token, code);
    },
    [token]
  );

  async function handleCheckoutSubmit(values: CheckoutValues) {
    if (!token) return;
    setIsSubmitting(true);
    try {
      const { paymentUrl } = await payBrief({
        token,
        payerFirstName: values.firstName,
        payerLastName: values.lastName,
        payerEmail: values.email,
        ...(values.couponCode ? { discountCode: values.couponCode } : {}),
      });

      // No checkout to open means the fee settled server-side (e.g. a
      // 100%-off code), so go straight to re-reading the brief's state.
      if (!paymentUrl) {
        await refreshFromResume();
        return;
      }

      const accessCode = paymentUrl.split('/').pop();
      if (!accessCode) {
        throw new Error('Invalid payment session. Please try again.');
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { default: PaystackPop } = (await import('@paystack/inline-js')) as any;
      const trans = new PaystackPop().resumeTransaction(accessCode);

      trans.onSuccess = () => {
        void refreshFromResume();
      };
      trans.onError = () => {
        toast.error('Payment failed. Please try again.');
        setIsSubmitting(false);
      };
      trans.onCancel = () => setIsSubmitting(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  const email = brief?.contactEmail ?? '';
  const reference = brief?.reference ?? '';
  const pricing = brief?.pricing;
  const commitmentFee = brief?.commitmentFee;
  // `paidAt` is the reliable signal; the status label is a secondary check.
  const isPaid = commitmentFee?.paidAt != null || commitmentFee?.status === 'Paid';
  // Only `totalDueNowKobo` is the amount due now - `commitmentFee.amount` is
  // the full invoiced fee and is a larger, different figure, so it must never
  // stand in for the total.
  const totalDueNowKobo = pricing?.totalDueNowKobo;
  const totalLabel = formatNaira(totalDueNowKobo);
  // The backend rejects payment when a brief's creator count falls outside the
  // configured pricing range, and returns no total for it - so offer payment
  // only once there's a real amount to collect.
  const isPayable = totalDueNowKobo != null && totalDueNowKobo > 0;
  const [firstName, ...restOfName] = (brief?.contactName ?? '').trim().split(' ');

  return (
    <>
      {/* No site header/footer here - the brand is mid-payment, so the page
          stays focused with only the "Back to Homepage" link as an exit. */}
      <main
        className="min-h-screen bg-white pt-14 pb-24 px-4 sm:px-6 lg:px-16"
        style={{ fontFamily: 'Lato, sans-serif' }}
      >
        <div className="mx-auto w-full max-w-[1058px]">
          {loadError ? (
            <div className="mx-auto max-w-xl py-16 text-center">
              <BackToHomepage />
              <h1
                className="mt-6 text-2xl font-semibold"
                style={{ color: '#262626' }}
              >
                We couldn&apos;t load this payment
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: '#737373' }}
              >
                {loadError} If you reached this page from an email link, try opening it again or
                reply to that email and we&apos;ll help.
              </p>
            </div>
          ) : !brief ? (
            <div className="flex justify-center py-32">
              <div
                className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
                style={{ borderColor: '#57058B', borderTopColor: 'transparent' }}
              />
            </div>
          ) : isPaid ? (
            /* ---- Paid: centered receipt ---- */
            <div className="mx-auto max-w-[812px] py-8 sm:py-16">
              <div className="text-center">
                <span
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#EAF9EF', color: '#00A63E' }}
                >
                  <CheckIcon size={40} />
                </span>
                <h1
                  className="mt-6 text-3xl font-bold sm:text-4xl"
                  style={{ color: '#262626' }}
                >
                  Payment successful.
                </h1>
                <p
                  className="mx-auto mt-3 max-w-md text-base"
                  style={{ color: '#737373' }}
                >
                  Your payment has been confirmed and creator sourcing has officially begun.
                </p>
              </div>

              <div
                className="mt-10 rounded-xl"
                style={{ backgroundColor: '#FAFAF9', border: '1px solid #E2E8F0' }}
              >
                <SummaryRow
                  label="Brief ID"
                  value={reference || '—'}
                />
                <SummaryRow
                  label="Payment reference"
                  value={commitmentFee?.paymentReference ?? '—'}
                />
                <SummaryRow
                  label="Date paid"
                  value={formatPaidDate(commitmentFee?.paidAt ?? undefined)}
                />
                <SummaryRow
                  label="Confirmation sent to"
                  value={email || '—'}
                  last
                />
              </div>

              <div className="mt-8">
                <EmailNotice>
                  Your confirmation email is your permanent reference for this campaign. All updates
                  and your creator shortlist will be sent directly to {email || 'your inbox'}.
                </EmailNotice>
              </div>
            </div>
          ) : (
            /* ---- Unpaid: pricing + terms ---- */
            <div className="flex flex-col gap-6">
              <BackToHomepage />

              <div
                className="flex flex-col gap-4 rounded-lg px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ backgroundColor: '#F0FDF4', border: '1px solid #7BF1A8' }}
              >
                <div className="flex items-center gap-[18px]">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
                    style={{
                      backgroundColor: '#00A63E',
                      boxShadow: '0px 3.6px 7.2px 0px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <CheckIcon />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p
                      className="text-base font-semibold"
                      style={{ color: '#0D542B' }}
                    >
                      Brief submitted successfully
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: '#737373' }}
                    >
                      Confirmation sent to {email || 'your email'}
                    </p>
                  </div>
                </div>
                <span
                  className="self-start rounded-lg bg-white p-2.5 text-sm font-medium sm:self-auto"
                  style={{ color: '#0D542B' }}
                >
                  {reference}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h1
                  className="text-2xl font-semibold tracking-[-0.0333em]"
                  style={{ color: '#262626' }}
                >
                  Review your pricing and terms
                </h1>
                <p
                  className="text-sm"
                  style={{ color: '#737373' }}
                >
                  Complete your mobilization payment to start creator sourcing.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left: pricing, pay, notice */}
                <div className="flex flex-col gap-6">
                  <div
                    className="rounded-xl bg-white p-6 sm:p-8 shadow-sm"
                    style={{ border: '1px solid #E2E8F0' }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: '#7805C4' }}
                      >
                        MOBILIZATION PAYMENT
                      </p>
                      <p
                        className="text-xl font-semibold tracking-[-0.02em]"
                        style={{ color: '#262626' }}
                      >
                        Pricing Summary
                      </p>
                    </div>

                    <div className="mt-6">
                      <SummaryRow
                        label="Requested creators"
                        value={
                          pricing?.requestedCreators != null
                            ? `${pricing.requestedCreators} creator${pricing.requestedCreators === 1 ? '' : 's'}`
                            : '—'
                        }
                      />
                      <SummaryRow
                        label="Sourcing Fee"
                        value={formatNaira(pricing?.sourcingFeeKobo)}
                      />
                      {/* Labelled "Commitment fee" per the design; the backend
                          calls the same figure engagementFeeKobo. */}
                      <SummaryRow
                        label="Commitment fee"
                        value={formatNaira(pricing?.engagementFeeKobo)}
                      />
                    </div>

                    <div
                      className="mt-6 rounded-2xl px-6 pt-6 pb-7"
                      style={{
                        backgroundColor: '#FBF3FF',
                        border: '1px solid #57058B',
                        boxShadow:
                          '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <p
                        className="text-xs font-bold tracking-[0.05em]"
                        style={{ color: '#717182' }}
                      >
                        TOTAL DUE NOW
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <span
                          className="text-2xl font-bold tracking-[-0.0333em]"
                          style={{ color: '#0A0A0A' }}
                        >
                          {isPayable ? totalLabel : 'To be confirmed'}
                        </span>
                        {isPayable && (
                          <span
                            className="text-sm"
                            style={{ color: '#717182' }}
                          >
                            one-time
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isPayable ? (
                    <div className="flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCheckout(true)}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#57058B' }}
                      >
                        Pay Now
                        <ArrowRightIcon />
                      </button>
                      <p
                        className="text-center text-xs"
                        style={{ color: '#737373' }}
                      >
                        By paying, you agree to SCN&apos;s{' '}
                        <Link
                          href={TERMS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Terms of Service
                        </Link>
                      </p>
                    </div>
                  ) : null}

                  {isPayable ? (
                    <EmailNotice>
                      Not ready to pay now? Your secure payment link has been sent to{' '}
                      {email || 'your email'}. You can return and complete payment at any time
                      without signing in.
                    </EmailNotice>
                  ) : (
                    <EmailNotice>
                      Your brief needs a quick review before we can price it. Our partnerships team
                      will send your mobilization invoice to {email || 'your email'} within 72 hours
                      - no action needed from you right now.
                    </EmailNotice>
                  )}
                </div>

                {/* Right: terms */}
                <div
                  className="flex flex-col gap-4 rounded-xl bg-white p-6 sm:p-8 shadow-sm"
                  style={{ border: '1px solid #E2E8F0' }}
                >
                  <div className="flex flex-col gap-1">
                    <h2
                      className="text-xl font-semibold tracking-[-0.02em]"
                      style={{ color: '#262626' }}
                    >
                      Terms &amp; Conditions
                    </h2>
                    <p
                      className="text-sm font-medium"
                      style={{ color: '#737373' }}
                    >
                      Please review before proceeding to payment.
                    </p>
                  </div>

                  <div
                    className="rounded-xl"
                    style={{ backgroundColor: '#FAFAF9' }}
                  >
                    {BRIEF_TERMS.map((term, index) => (
                      <div
                        key={term.title}
                        className="flex flex-col gap-1.5 px-6 py-4"
                        style={
                          index === BRIEF_TERMS.length - 1
                            ? undefined
                            : { borderBottom: '0.6px solid #E2E8F0' }
                        }
                      >
                        <p
                          className="text-base font-medium"
                          style={{ color: '#262626' }}
                        >
                          {index + 1}. {term.title}
                        </p>
                        <p
                          className="text-base font-medium"
                          style={{ color: '#737373' }}
                        >
                          {term.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={TERMS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline"
                    style={{ color: '#7805C4' }}
                  >
                    See Full Terms
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Modal
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
        dismissible={!isSubmitting}
        mobileSheet
        ariaLabel="Mobilization Payment Checkout"
        className="w-xl"
      >
        <CheckoutForm
          offerId={BRIEF_OFFER_ID}
          priceLabel={totalLabel}
          planLabel="Mobilization Payment"
          busy={isSubmitting}
          initialFirstName={firstName ?? ''}
          initialLastName={restOfName.join(' ')}
          initialEmail={email}
          // The brand has no session here, and /pay needs a real payer - so
          // these are prefilled from the brief but stay correctable.
          editableContact
          onPreviewDiscount={previewBriefDiscountCode}
          onSubmit={handleCheckoutSubmit}
          onCancel={() => setShowCheckout(false)}
        />
      </Modal>
    </>
  );
}
