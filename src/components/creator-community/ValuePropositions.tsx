'use client';

import { Text } from '@/components/typography';
import { VALUE_PROPOSITIONS } from '@/types/creator-community.types';

export default function ValuePropositions() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Why Join the Community?
        </h2>
        <Text
          variant="large"
          className="text-white/70 max-w-2xl mx-auto"
        >
          Be part of Africa&apos;s fastest-growing creator network
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {VALUE_PROPOSITIONS.map((prop, index) => (
          <div
            key={prop.id}
            className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Title */}
            <h3 className="text-white text-lg font-semibold mb-2 break-words">{prop.title}</h3>

            {/* Description */}
            <Text
              variant="body"
              className="text-white/60"
            >
              {prop.description}
            </Text>

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
