'use client';

export function sanitizeInteger(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

export function sanitizeDecimal(value: string): string {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  return parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
}

export function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function CellInput({
  value,
  onChange,
  placeholder = '—',
  allowDecimal = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  allowDecimal?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={e =>
        onChange(allowDecimal ? sanitizeDecimal(e.target.value) : sanitizeInteger(e.target.value))
      }
      placeholder={placeholder}
      inputMode={allowDecimal ? 'decimal' : 'numeric'}
      className="w-full text-sm text-text-primary focus-visible:outline-none! focus:outline-none focus:ring-2 focus:ring-surface-action bg-transparent border border-stroke-primary rounded-[6px] py-2.5 px-3.5 outline-none placeholder:text-text-secondary"
    />
  );
}
