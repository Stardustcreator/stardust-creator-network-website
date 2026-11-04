'use client';

import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import Modal from '@/components/ui/modal';
import ArrowRight from './ArrowRight';

const BUDGETS = ['Under ₦5M', '₦5M to ₦20M', '₦20M to ₦50M', '₦50M to ₦100M', 'Above ₦100M'];

const ICON = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#57058b',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const FIELDS: {
  name: 'fullName' | 'email' | 'company' | 'jobTitle' | 'website';
  label: string;
  type: string;
  autoComplete: string;
  icon: ReactNode;
}[] = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    autoComplete: 'name',
    icon: (
      <svg {...ICON}>
        <circle
          cx="12"
          cy="8"
          r="4"
        />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
  {
    name: 'email',
    label: 'Work Email Address',
    type: 'email',
    autoComplete: 'email',
    icon: (
      <svg {...ICON}>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
        />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    name: 'company',
    label: 'Company Name',
    type: 'text',
    autoComplete: 'organization',
    icon: (
      <svg {...ICON}>
        <rect
          x="5"
          y="3"
          width="10"
          height="18"
          rx="1"
        />
        <path d="M15 9h4v12h-4M9 7h2M9 11h2M9 15h2" />
      </svg>
    ),
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    type: 'text',
    autoComplete: 'organization-title',
    icon: (
      <svg {...ICON}>
        <rect
          x="3"
          y="7"
          width="18"
          height="13"
          rx="2"
        />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
      </svg>
    ),
  },
  {
    name: 'website',
    label: 'Company Website',
    type: 'text',
    autoComplete: 'url',
    icon: (
      <svg {...ICON}>
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
];

type FormState = Record<(typeof FIELDS)[number]['name'] | 'budget', string>;
const EMPTY: FormState = {
  fullName: '',
  email: '',
  company: '',
  jobTitle: '',
  website: '',
  budget: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-full border border-[#d9d2e6] bg-white py-3 pl-11 pr-4 text-[15px] text-[#1a002e] placeholder:text-[#4b4458] outline-none transition-colors focus:border-[#57058b]';

export default function InsightReportForm({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [error, setError] = useState('');

  const update = (name: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (Object.values(form).some(value => !value.trim())) {
      setError('Please complete every field.');
      return;
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/insight-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.');
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#4b0a8a] px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      >
        Get the Free Report
        <ArrowRight />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        dismissible={status !== 'submitting'}
        ariaLabel="Get the free report"
        className="max-w-[560px]"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-72 rounded-full bg-[#ede4fb]" />
          <button
            type="button"
            aria-label="Close"
            onClick={() => status !== 'submitting' && setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#1a002e] hover:bg-[#f3eefb]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m3 3 10 10M13 3 3 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="relative p-8 pt-14 sm:p-10 sm:pt-14">
            {status === 'done' ? (
              <div
                role="status"
                className="rounded-2xl bg-[#f6f0fd] p-8 text-[#1a002e]"
              >
                <p className="font-[family-name:var(--font-instrument-sans)] text-2xl font-semibold">
                  Thank you.
                </p>
                <p className="mt-2">We will email you the report shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-3"
              >
                {FIELDS.map(field => (
                  <label
                    key={field.name}
                    className="relative block"
                  >
                    <span className="sr-only">{field.label}</span>
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                      {field.icon}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      autoComplete={field.autoComplete}
                      placeholder={field.label}
                      value={form[field.name]}
                      onChange={e => update(field.name, e.target.value)}
                      className={inputClass}
                    />
                  </label>
                ))}

                <label className="relative block">
                  <span className="sr-only">Annual Influencer Marketing Budget</span>
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                    <svg {...ICON}>
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="13"
                        rx="2"
                      />
                      <path d="M3 10h18M16 15h2" />
                    </svg>
                  </span>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={e => update('budget', e.target.value)}
                    className={`${inputClass} appearance-none ${form.budget ? '' : 'text-[#4b4458]'}`}
                  >
                    <option value="">Annual Influencer Marketing Budget</option>
                    {BUDGETS.map(budget => (
                      <option
                        key={budget}
                        value={budget}
                      >
                        {budget}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m4 6 4 4 4-4"
                      stroke="#1a002e"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>

                {error && (
                  <p
                    role="alert"
                    className="text-sm text-red-600"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#4b0a8a] px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending...' : 'Get the Free Report'}
                  <ArrowRight />
                </button>
              </form>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
