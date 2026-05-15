'use client';

import { useState } from 'react';

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

function GreenCheck() {
  return (
    <svg
      className="w-5 h-5 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  autoComplete,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);

  const isFilled = value.trim().length > 0;

  const borderStyle: React.CSSProperties = error
    ? {
        borderColor: 'var(--color-stroke-error)',
        borderWidth: '0.6px',
        backgroundColor: 'var(--color-surface-error-primary)',
      }
    : focused
      ? { borderColor: 'var(--color-stroke-action)' }
      : { borderColor: 'var(--color-stroke-primary)', borderWidth: '0.6px' };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary mb-1.5"
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`w-full px-3.5 py-2.5 rounded-md outline-none focus:outline-none text-text-primary placeholder:text-text-secondary transition-colors duration-150 ${isFilled && !focused ? 'pr-10 bg-surface-primary' : ''}`}
          style={borderStyle}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {isFilled && !error && !focused && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <GreenCheck />
          </span>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-surface-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
