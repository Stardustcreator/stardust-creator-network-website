'use client';

import { useTypewriter, type UseTypewriterOptions } from './useTypewriter.hook';

export interface TypewriterTextProps extends Omit<UseTypewriterOptions, 'words'> {
  words: string[];
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
}

export default function TypewriterText({
  words,
  className = '',
  cursorClassName = '',
  showCursor = true,
  ...typewriterOptions
}: TypewriterTextProps) {
  const { displayText, isTyping } = useTypewriter({
    words,
    ...typewriterOptions,
  });

  return (
    <span className={`inline-block ${className}`}>
      <span className="relative">
        {displayText}
        {showCursor && (
          <span
            className={`inline-block w-1 ml-1 bg-current animate-pulse ${cursorClassName}`}
            style={{
              height: '1em',
            }}
          />
        )}
      </span>
    </span>
  );
}
