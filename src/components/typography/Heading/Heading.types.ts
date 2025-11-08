import React from 'react';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'display' | 'gradient';
  size?: 'responsive' | 'fixed';
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}
