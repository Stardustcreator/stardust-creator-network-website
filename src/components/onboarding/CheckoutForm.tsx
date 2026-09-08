'use client';

import { useState } from 'react';
import FormInput from '../ui/FormInput';
import { OrderDetails } from './OrderDetails';
import { type DiscountPreview } from '@/lib/api/payments';
import { InfoOutlineIcon } from '@sanity/icons';
import Button from '../ui/Button';

export interface CheckoutValues {
  firstName: string;
  lastName: string;
  email: string;
  couponCode?: string;
}

interface CheckoutFormProps {
  offerId: string;
  priceLabel: string;
  planLabel: string;
  busy: boolean;
  initialFirstName?: string;
  initialLastName?: string;
  initialEmail?: string;
  onSubmit: (values: CheckoutValues) => void;
  onCancel: () => void;
}

export function CheckoutForm({
  offerId,
  priceLabel,
  planLabel,
  busy,
  initialFirstName = '',
  initialLastName = '',
  initialEmail = '',
  onSubmit,
  onCancel,
}: CheckoutFormProps) {
  const [values] = useState<CheckoutValues>({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
  });
  const [coupon, setCoupon] = useState<DiscountPreview | null>(null);

  const isFree = coupon?.finalAmount === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...values, couponCode: coupon?.code });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 p-6"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF]">
        <InfoOutlineIcon className="text-icon-information size-7" />
      </span>

      <div>
        <h2 className="text-base lg:text-xl font-bold text-text-primary">
          One more step before payment.
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          A few quick details, then straight to secure checkout.
        </p>
      </div>

      <h3 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        Contact information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormInput
          label="First Name"
          id="checkout-first-name"
          name="firstName"
          value={values.firstName}
          onChange={() => {}}
          showFilledIndicator={false}
          inputClassName="disabled:bg-surface-primary"
          disabled
        />

        <FormInput
          label="Last Name"
          id="checkout-last-name"
          name="lastName"
          value={values.lastName}
          onChange={() => {}}
          showFilledIndicator={false}
          inputClassName="disabled:bg-surface-primary"
          disabled
        />
      </div>

      <FormInput
        label="Email address"
        id="checkout-email"
        name="email"
        type="email"
        value={values.email}
        onChange={() => {}}
        showFilledIndicator={false}
        inputClassName="disabled:bg-surface-primary"
        disabled
      />

      <OrderDetails
        offerId={offerId}
        priceLabel={priceLabel}
        planLabel={planLabel}
        busy={busy}
        onChange={setCoupon}
      />

      <div className="space-y-3 pt-1">
        <Button
          type="submit"
          variant="primary"
          disabled={busy}
          className="w-full rounded-md py-3! text-sm!"
        >
          {busy
            ? isFree
              ? 'Completing registration…'
              : 'Opening secure payment…'
            : isFree
              ? 'Complete registration'
              : 'Continue to payment'}
        </Button>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="w-full cursor-pointer rounded-md border border-stroke-primary bg-surface-white px-5 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
