export interface TextProps {
  variant: 'large' | 'body' | 'small' | 'caption' | 'label' | 'button' | 'navigation';
  weight?: 300 | 400 | 500 | 600 | 700 | 900;
  color?: 'primary' | 'secondary' | 'muted' | 'white' | 'gradient-primary' | 'gradient-accent';
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
}
