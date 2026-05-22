import { type ButtonHTMLAttributes } from 'react';

const VARIANTS = {
  primary:
    'py-3 px-6 rounded-lg text-white font-semibold transition-opacity duration-150 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed bg-surface-action',
  social:
    'flex items-center cursor-pointer justify-center gap-3 bg-white border border-neutral-300 rounded-lg py-3 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors duration-150',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`cursor-pointer ${VARIANTS[variant]}${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  );
}
