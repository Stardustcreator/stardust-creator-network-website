'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export interface UseTypewriterReturn {
  displayText: string;
  currentWordIndex: number;
  isTyping: boolean;
  isDeleting: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 150,
  deleteSpeed = 75,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const currentWord = words[currentWordIndex] || '';
  const displayText = currentWord.slice(0, currentCharIndex);

  const typeNextChar = useCallback(() => {
    if (currentCharIndex < currentWord.length) {
      setCurrentCharIndex(prev => prev + 1);
    } else {
      // Word is fully typed, wait then start deleting
      setIsTyping(false);
      setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
    }
  }, [currentCharIndex, currentWord.length, delayBetweenWords]);

  const deleteNextChar = useCallback(() => {
    if (currentCharIndex > 0) {
      setCurrentCharIndex(prev => prev - 1);
    } else {
      // Word is fully deleted, move to next word
      setIsDeleting(false);
      setIsTyping(true);

      if (loop || currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => (prev + 1) % words.length);
      }
    }
  }, [currentCharIndex, currentWordIndex, words.length, loop]);

  useEffect(() => {
    if (!isTyping && !isDeleting) return;

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          deleteNextChar();
        } else if (isTyping) {
          typeNextChar();
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [isTyping, isDeleting, typeNextChar, deleteNextChar, typeSpeed, deleteSpeed]);

  return {
    displayText,
    currentWordIndex,
    isTyping,
    isDeleting,
  };
}
