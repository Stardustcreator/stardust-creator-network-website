import { cn } from '@/lib/utils';
import type { DisplayTextProps } from './DisplayText.types';

export default function DisplayText({
  gradient = 'primary',
  animation = 'none',
  responsive = true,
  children,
  className = '',
  as = 'h1',
}: DisplayTextProps) {
  const Tag = as;

  const gradientClasses = {
    primary: 'text-gradient-primary',
    accent: 'text-gradient-accent',
    none: 'text-white',
  };

  const animationClasses = {
    typewriter: 'animate-typewriter',
    fade: 'animate-fade-in',
    slide: 'animate-slide-up',
    none: '',
  };

  return (
    <Tag
      className={cn(
        'text-display',
        responsive ? 'text-heading-1' : 'text-6xl lg:text-7xl xl:text-8xl',
        gradientClasses[gradient],
        animationClasses[animation],
        className
      )}
    >
      {children}
    </Tag>
  );
}
