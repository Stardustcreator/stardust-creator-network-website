import React from 'react';

interface NumberedSectionProps {
  number: string;
  badge?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  layout?: 'default' | 'centered' | 'split';
}

export default function NumberedSection({
  number,
  badge,
  title,
  subtitle,
  children,
  className = '',
  layout = 'default',
}: NumberedSectionProps) {
  const layoutClasses = {
    default: 'text-left',
    centered: 'text-center',
    split: 'text-left lg:text-left',
  };

  return (
    <section className={`py-20 lg:py-24 ${className}`}>
      <div className="container mx-auto px-6">
        <div className={`relative ${layoutClasses[layout]}`}>
          {/* Background Section Number */}
          <div className="absolute -top-8 left-0 section-number pointer-events-none">
            ({number})
          </div>

          {/* Badge */}
          {badge && (
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-neutral-100 text-brand-purple font-semibold text-sm rounded-full uppercase tracking-wider">
                {badge}
              </span>
            </div>
          )}

          {/* Title */}
          <div className="relative z-10">
            <h2 className="section-title mb-6">{title}</h2>

            {/* Subtitle */}
            {subtitle && <h3 className="section-subtitle mb-8 max-w-3xl">{subtitle}</h3>}

            {/* Content */}
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
