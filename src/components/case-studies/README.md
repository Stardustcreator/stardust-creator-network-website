# Case Studies Component

## Overview

The Case Studies page displays 27 case studies with background images. Each case study card has a black overlay to ensure text readability.

## Adding Images

### Step 1: Prepare Your Images

1. Optimize your images (recommended: WebP format, max 1920px width)
2. Name them sequentially: `case-study-1.webp`, `case-study-2.webp`, etc.
3. Place all images in the `/public/case-studies/` directory

### Step 2: Update the Component

Open `src/components/case-studies/CaseStudiesContent.tsx` and update the `caseStudies` array:

```typescript
const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Your Case Study Title',
    subtitle: 'Brand Name or Campaign Type',
    imagePath: '/case-studies/case-study-1.webp',
    content: 'Your case study content here...', // Optional
  },
  {
    id: 'case-study-2',
    title: 'Another Case Study',
    subtitle: 'Another Brand',
    imagePath: '/case-studies/case-study-2.webp',
  },
  // ... continue for all 27 case studies
];
```

### Step 3: Add Content (Optional)

You can add detailed content to each case study by:

1. Adding a `content` field to each case study object
2. Creating a detail page for individual case studies
3. Or expanding the card component to show more information on hover/click

## Image Requirements

- **Format**: WebP (recommended) or JPG/PNG
- **Dimensions**: 1200x800px minimum (3:2 aspect ratio works best)
- **File Size**: Keep under 500KB per image for optimal performance
- **Naming**: Use lowercase with hyphens (e.g., `case-study-1.webp`)

## Overlay Settings

The black overlay is set to:

- **Default**: `bg-black/60` (60% opacity)
- **Hover**: `bg-black/70` (70% opacity)
- **Gradient**: Additional gradient overlay for better text readability

You can adjust these in the `CaseStudyCard` component if needed.

## Styling

The component uses:

- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Card height: 400px (mobile), 500px (desktop)
- Hover effects: Scale and overlay opacity changes
- Smooth transitions for all interactive elements

## Next Steps

1. Add your 27 images to `/public/case-studies/`
2. Update the `caseStudies` array with your content
3. Customize titles, subtitles, and add detailed content
4. Test on mobile, tablet, and desktop views
