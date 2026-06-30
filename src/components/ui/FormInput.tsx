'use client';

import { useState } from 'react';
import CheckIcon from '@/components/icons/CheckIcon';
import EyeIcon from '@/components/icons/EyeIcon';

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
  showToggle?: boolean;
  labelAction?: React.ReactNode;
  disabled?: boolean;
  inputClassName?: string;
  showFilledIndicator?: boolean;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode'];
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
  showToggle = false,
  labelAction,
  disabled = false,
  inputClassName,
  showFilledIndicator = true,
  inputMode,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password' || showToggle;
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const isFilled = value.trim().length > 0;
  const showFilledStyles = showFilledIndicator && !isPassword && isFilled && !error && !focused;

  const borderStyle: React.CSSProperties = error
    ? {
        borderColor: 'var(--color-stroke-error)',
        borderWidth: '0.6px',
        backgroundColor: 'var(--color-surface-error-primary)',
      }
    : focused
      ? { borderWidth: '0.6px', borderColor: 'transparent' }
      : { borderColor: 'var(--color-stroke-primary)', borderWidth: '0.6px' };

  return (
    <div>
      <div className={`"flex items-center justify-between mb-1.5 ${!label && 'hidden'}`}>
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-primary"
        >
          {label}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        <input
          type={resolvedType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={`w-full px-3.5 py-2.5 focus-visible:outline-none! rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-surface-action text-text-primary placeholder:text-text-secondary transition-colors duration-150 ${showFilledStyles ? 'pr-10 bg-surface-primary' : 'pr-10'} ${inputClassName ?? ''}`.trim()}
          style={borderStyle}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            <EyeIcon visible={showPassword} />
          </button>
        ) : (
          isFilled &&
          !error &&
          !focused &&
          showFilledIndicator && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CheckIcon className="w-5 h-5 text-green-500" />
            </span>
          )
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
