import { cn } from '@/lib/utils';
import type { TextProps } from './Text.types';

export default function Text({
  variant,
  weight,
  color = 'primary',
  children,
  className = '',
  as = 'p',
}: TextProps) {
  const Tag = as;

  const variantClasses = {
    large: 'text-large',
    body: 'text-body',
    small: 'text-small',
    caption: 'text-caption',
    label: 'text-label',
    button: 'text-button',
    navigation: 'text-navigation',
  };

  const colorClasses = {
    primary: 'text-neutral-800',
    secondary: 'text-neutral-700',
    muted: 'text-neutral-600',
    white: 'text-white',
    'gradient-primary': 'text-gradient-primary',
    'gradient-accent': 'text-gradient-accent',
  };

  const weightClasses = weight
    ? {
        300: 'font-light',
        400: 'font-normal',
        500: 'font-medium',
        600: 'font-semibold',
        700: 'font-bold',
        900: 'font-black',
      }[weight]
    : '';

  return (
    <Tag className={cn(variantClasses[variant], colorClasses[color], weightClasses, className)}>
      {children}
    </Tag>
  );
}
