/**
 * SectionHeader Usage Examples
 *
 * This file demonstrates various ways to use the SectionHeader component
 * across different sections of the website.
 */

import { SectionHeader } from '@/components/shared';

// Example 1: Basic Usage (like current Connect.Collaborate.Create)
export function BasicHeaderExample() {
  return (
    <SectionHeader
      words={[
        { text: 'Connect.' },
        { text: 'Collaborate.', className: 'text-gradient-primary' },
        { text: 'Create.' },
      ]}
      subtitle="We connect leading brands with Nigeria and the UK's most dynamic creators."
      headingClassName="text-white"
      subtitleClassName="max-w-4xl mx-auto"
    />
  );
}

// Example 2: Hero Section with Scale Animation
export function HeroHeaderExample() {
  return (
    <SectionHeader
      words={[
        { text: 'Build.' },
        { text: 'Launch.', className: 'text-purple-400' },
        { text: 'Scale.' },
      ]}
      subtitle="Transform your creative ideas into sustainable businesses."
      level={1}
      variant="scale"
      staggerDelay={300}
      headingClassName="text-5xl lg:text-7xl font-black text-white"
      subtitleClassName="text-xl text-gray-300 max-w-3xl mx-auto"
      className="mb-12"
    />
  );
}

// Example 3: Feature Section with Slide Animation
export function FeatureHeaderExample() {
  return (
    <SectionHeader
      words={[
        { text: 'Learn.' },
        { text: 'Grow.', className: 'text-green-400' },
        { text: 'Succeed.' },
      ]}
      subtitle="Join our creator community and unlock your potential."
      variant="slideIn"
      staggerDelay={200}
      headingClassName="text-4xl font-bold text-gray-900"
      subtitleClassName="text-lg text-gray-600 max-w-2xl mx-auto"
      threshold={0.5}
    />
  );
}

// Example 4: About Section with Flip Animation
export function AboutHeaderExample() {
  return (
    <SectionHeader
      words={[{ text: 'Our' }, { text: 'Story', className: 'text-gradient-primary' }]}
      subtitle="Discover the journey that led us to revolutionize the creator economy."
      level={2}
      variant="flip"
      staggerDelay={500}
      headingClassName="text-6xl font-light text-white"
      subtitleClassName="text-lg text-gray-400 max-w-2xl mx-auto mt-8"
      centered={true}
    />
  );
}

// Example 5: Left-aligned Section Header
export function LeftAlignedHeaderExample() {
  return (
    <SectionHeader
      words={[{ text: 'Ready' }, { text: 'to', className: 'text-orange-400' }, { text: 'Start?' }]}
      subtitle="Join thousands of creators building their dreams with us."
      variant="fadeUp"
      staggerDelay={250}
      headingClassName="text-4xl font-bold text-gray-900"
      subtitleClassName="text-lg text-gray-600 mt-4"
      centered={false}
      className="text-left"
    />
  );
}

// Example 6: Fast Animation for Call-to-Action
export function CTAHeaderExample() {
  return (
    <SectionHeader
      words={[{ text: 'Join' }, { text: 'Now', className: 'text-red-500 font-black' }]}
      subtitle="Don't miss out on the creator revolution."
      staggerDelay={150}
      threshold={0.2}
      headingClassName="text-5xl font-bold text-white"
      subtitleClassName="text-xl text-gray-300"
      variant="scale"
    />
  );
}

// Example 7: Testimonial Section
export function TestimonialHeaderExample() {
  return (
    <SectionHeader
      words={[
        { text: 'Creator' },
        { text: 'Success', className: 'text-gradient-primary' },
        { text: 'Stories' },
      ]}
      subtitle="See how our platform has transformed creators' lives and businesses."
      level={2}
      variant="slideIn"
      staggerDelay={350}
      headingClassName="text-4xl font-semibold text-gray-900"
      subtitleClassName="text-lg text-gray-700 max-w-3xl mx-auto"
      rootMargin="-100px"
    />
  );
}
