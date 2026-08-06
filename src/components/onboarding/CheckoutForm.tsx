'use client';

import { useEffect, useState } from 'react';
import FormInput from '../ui/FormInput';
import { OrderDetails, type AppliedDiscount } from './OrderDetails';
import { InfoOutlineIcon } from '@sanity/icons';
import Button from '../ui/Button';

export interface CheckoutValues {
  firstName: string;
  lastName: string;
  email: string;
  couponCode?: string;
}

type ContactField = 'firstName' | 'lastName' | 'email';
type FieldErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutFormProps {
  offerId: string;
  priceLabel: string;
  planLabel: string;
  busy: boolean;
  initialFirstName?: string;
  initialLastName?: string;
  initialEmail?: string;
  /**
   * Lets the payer edit and correct their own contact details. Off by default:
   * the subscription flows show the signed-in user's details as read-only, but
   * the brief checkout has no session and must collect a real payer, since
   * `POST /briefs/find-a-creator/pay` requires all three fields.
   */
  editableContact?: boolean;
  /** Overrides discount-code validation - see `OrderDetails.onPreview`. */
  onPreviewDiscount?: (code: string) => Promise<AppliedDiscount>;
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
  editableContact = false,
  onPreviewDiscount,
  onSubmit,
  onCancel,
}: CheckoutFormProps) {
  const [values, setValues] = useState<CheckoutValues>({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [coupon, setCoupon] = useState<AppliedDiscount | null>(null);

  // Re-sync when the prefill arrives after mount. The brief checkout loads its
  // brand contact asynchronously, so a mount-time snapshot would stay blank.
  useEffect(() => {
    setValues(current => ({
      ...current,
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
    }));
  }, [initialFirstName, initialLastName, initialEmail]);

  const isFree = coupon?.finalAmount === 0;

  const setField = (field: ContactField, value: string) => {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const validateContact = (): FieldErrors => {
    const found: FieldErrors = {};
    if (!values.firstName.trim()) found.firstName = 'First name is required';
    if (!values.lastName.trim()) found.lastName = 'Last name is required';
    if (!values.email.trim()) {
      found.email = 'Email address is required';
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      found.email = 'Please enter a valid email address';
    }
    return found;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Read-only mode has nothing to validate - the values came from a trusted
    // session and the inputs can't be changed.
    if (!editableContact) {
      onSubmit({ ...values, couponCode: coupon?.code });
      return;
    }

    const found = validateContact();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    onSubmit({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      couponCode: coupon?.code,
    });
  };

  const readOnlyProps = editableContact
    ? {}
    : { disabled: true, inputClassName: 'disabled:bg-surface-primary' };

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
          onChange={e => setField('firstName', e.target.value)}
          error={errors.firstName}
          required={editableContact}
          autoComplete={editableContact ? 'given-name' : undefined}
          showFilledIndicator={false}
          {...readOnlyProps}
        />

        <FormInput
          label="Last Name"
          id="checkout-last-name"
          name="lastName"
          value={values.lastName}
          onChange={e => setField('lastName', e.target.value)}
          error={errors.lastName}
          required={editableContact}
          autoComplete={editableContact ? 'family-name' : undefined}
          showFilledIndicator={false}
          {...readOnlyProps}
        />
      </div>

      <FormInput
        label="Email address"
        id="checkout-email"
        name="email"
        type="email"
        value={values.email}
        onChange={e => setField('email', e.target.value)}
        error={errors.email}
        required={editableContact}
        autoComplete={editableContact ? 'email' : undefined}
        showFilledIndicator={false}
        {...readOnlyProps}
      />

      <OrderDetails
        offerId={offerId}
        priceLabel={priceLabel}
        planLabel={planLabel}
        busy={busy}
        onChange={setCoupon}
        onPreview={onPreviewDiscount}
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
