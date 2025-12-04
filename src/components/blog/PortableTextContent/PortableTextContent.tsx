import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).height(450).url();
      return (
        <figure className="my-8">
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
            <Image
              src={imageUrl || ''}
              alt={value.alt || 'Blog post image'}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-white/60 text-sm mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-white/90 mb-6 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-6 py-4 my-8 bg-white/5 backdrop-blur-sm rounded-r-xl">
        <div className="text-xl text-white/80 italic">{children}</div>
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={rel}
          className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 hover:decoration-purple-300 transition-colors"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-2 py-1 bg-white/10 border border-white/20 rounded text-purple-300 text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-6 text-white/90">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-6 text-white/90">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
};

interface PortableTextContentProps {
  value: PortableTextBlock[];
}

export default function PortableTextContent({ value }: PortableTextContentProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <PortableText
        value={value}
        components={components}
      />
    </div>
  );
}
