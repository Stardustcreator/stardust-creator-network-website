import type { ReactNode } from 'react';

export interface DisplayTextProps {
  gradient?: 'primary' | 'accent' | 'none';
  animation?: 'typewriter' | 'fade' | 'slide' | 'none';
  responsive?: boolean;
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'div' | 'span';
}
