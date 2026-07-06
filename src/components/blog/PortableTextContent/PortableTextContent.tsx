import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      try {
        const imageUrl = urlFor(value).width(800).height(450).url();
        if (!imageUrl) return null;

        return (
          <figure className="my-8">
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={value.alt || 'Blog post image'}
                fill
                className="object-cover"
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
                loading="lazy"
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-gray-600 text-sm mt-3 font-lato">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      } catch (error) {
        console.warn('Failed to resolve image URL in PortableText:', error);
        return null;
      }
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bricolage-grotesque font-bold text-black mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bricolage-grotesque font-bold text-black mt-10 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-black mb-6 leading-relaxed font-lato">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-6 py-4 my-8 bg-gray-100 rounded-r-xl">
        <div className="text-xl text-black italic font-lato">{children}</div>
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
          className="text-purple-600 hover:text-purple-700 underline decoration-purple-300 hover:decoration-purple-600 transition-colors font-lato"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-black font-lato">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-black font-lato">{children}</em>,
    code: ({ children }) => (
      <code className="px-2 py-1 bg-gray-200 border border-gray-300 rounded text-purple-700 text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-6 text-black font-lato">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-6 text-black font-lato">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4 text-black font-lato">{children}</li>,
    number: ({ children }) => <li className="ml-4 text-black font-lato">{children}</li>,
  },
};

interface PortableTextContentProps {
  value: PortableTextBlock[];
}

export default function PortableTextContent({ value }: PortableTextContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText
        value={value}
        components={components}
      />
    </div>
  );
}
