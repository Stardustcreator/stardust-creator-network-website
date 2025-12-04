import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names with Tailwind CSS conflict resolution
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Encodes image paths to handle spaces and special characters in URLs
 * This is necessary when using unoptimized images with spaces in paths
 * @param path - Image path (e.g., "/who we are/brands.webp")
 * @returns URL-encoded path (e.g., "/who%20we%20are/brands.webp")
 */
export function encodeImagePath(path: string): string {
  // Split the path into parts and encode each part separately
  // This preserves slashes while encoding spaces and special characters
  return path
    .split('/')
    .map(part => (part ? encodeURIComponent(part) : ''))
    .join('/');
}
