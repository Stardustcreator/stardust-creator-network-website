import React from 'react';
import { cn } from '@/lib/utils';
import type { HeadingProps } from './Heading.types';

export default function Heading({
  level,
  variant = 'default',
  size = 'responsive',
  children,
  className = '',
  as,
}: HeadingProps) {
  const Tag = as || (`h${level}` as keyof React.JSX.IntrinsicElements);

  const variantClasses = {
    default: 'text-neutral-900',
    display: 'font-black text-gradient-primary',
    gradient: 'text-gradient-accent',
  };

  const levelClasses = {
    1:
      size === 'responsive'
        ? 'heading-1'
        : 'text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight',
    2:
      size === 'responsive'
        ? 'heading-2'
        : 'text-4xl md:text-5xl lg:text-6xl font-bold leading-snug tracking-snug',
    3:
      size === 'responsive'
        ? 'heading-3'
        : 'text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug',
    4:
      size === 'responsive'
        ? 'heading-4'
        : 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-normal',
    5:
      size === 'responsive'
        ? 'heading-5'
        : 'text-xl md:text-2xl lg:text-3xl font-medium leading-normal',
    6:
      size === 'responsive'
        ? 'heading-6'
        : 'text-lg md:text-xl lg:text-2xl font-medium leading-normal',
  };

  return (
    <Tag
      className={cn(
        levelClasses[level],
        variantClasses[variant],
        variant === 'default' && level === 1 && 'text-white',
        className
      )}
    >
      {children}
    </Tag>
  );
}
