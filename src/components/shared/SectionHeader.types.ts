export interface SectionHeaderWord {
  text: string;
  className?: string;
}

export interface SectionHeaderProps {
  /** The words to animate in sequence */
  words: SectionHeaderWord[];
  /** Optional subtitle text */
  subtitle?: string;
  /** Heading level (1-6) */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Delay between each word animation in ms */
  staggerDelay?: number;
  /** Container className */
  className?: string;
  /** Subtitle className */
  subtitleClassName?: string;
  /** Heading className */
  headingClassName?: string;
  /** Animation threshold (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to center align the header */
  centered?: boolean;
  /** Animation variant */
  variant?: 'fadeUp' | 'slideIn' | 'scale' | 'flip';
}
