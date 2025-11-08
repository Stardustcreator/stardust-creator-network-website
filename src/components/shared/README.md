# Shared Components

This directory contains reusable UI components that can be used across different sections of the website.

## SectionHeader

An animated section header component with scroll-triggered word-by-word animation effects.

### Features

- **Scroll-triggered animations**: Words appear one by one as the section enters the viewport
- **Multiple animation variants**: fadeUp (default), slideIn, scale, and flip animations
- **Configurable timing**: Adjustable stagger delays and animation thresholds
- **Flexible styling**: Support for custom classes on container, heading, and subtitle
- **TypeScript support**: Fully typed with comprehensive prop interfaces
- **Accessibility friendly**: Respects user motion preferences

### Basic Usage

```tsx
import { SectionHeader } from '@/components/shared';

function MySection() {
  return (
    <SectionHeader
      words={[
        { text: 'Connect.' },
        { text: 'Collaborate.', className: 'text-gradient-primary' },
        { text: 'Create.' },
      ]}
      subtitle="Your section description here"
    />
  );
}
```

### Advanced Usage

```tsx
<SectionHeader
  words={[
    { text: 'Build.' },
    { text: 'Launch.', className: 'text-purple-400' },
    { text: 'Scale.' },
  ]}
  subtitle="Transform your ideas into reality"
  level={1}
  variant="slideIn"
  staggerDelay={300}
  threshold={0.5}
  headingClassName="text-4xl font-bold"
  subtitleClassName="text-lg text-gray-600"
  className="mb-16"
  centered={false}
/>
```

### Props

| Prop                | Type                                         | Default    | Description                           |
| ------------------- | -------------------------------------------- | ---------- | ------------------------------------- |
| `words`             | `SectionHeaderWord[]`                        | -          | Array of words with optional styling  |
| `subtitle`          | `string`                                     | -          | Optional subtitle text                |
| `level`             | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                 | `2`        | Heading level                         |
| `staggerDelay`      | `number`                                     | `400`      | Delay between word animations (ms)    |
| `variant`           | `'fadeUp' \| 'slideIn' \| 'scale' \| 'flip'` | `'fadeUp'` | Animation variant                     |
| `threshold`         | `number`                                     | `0.3`      | Intersection observer threshold (0-1) |
| `rootMargin`        | `string`                                     | `'-50px'`  | Intersection observer root margin     |
| `centered`          | `boolean`                                    | `true`     | Center align the header               |
| `className`         | `string`                                     | `''`       | Container CSS classes                 |
| `headingClassName`  | `string`                                     | `''`       | Heading CSS classes                   |
| `subtitleClassName` | `string`                                     | `''`       | Subtitle CSS classes                  |

### Animation Variants

- **`fadeUp`**: Words fade in while moving up (default)
- **`slideIn`**: Words slide in from the left
- **`scale`**: Words scale up from 50% to 100%
- **`flip`**: Words flip in with a 3D rotation effect

### TypeScript Types

```typescript
interface SectionHeaderWord {
  text: string;
  className?: string;
}

interface SectionHeaderProps {
  words: SectionHeaderWord[];
  subtitle?: string;
  // ... other props
}
```
