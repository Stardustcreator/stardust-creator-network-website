# Stardust Creator Network Brand Guidelines

Welcome to the Stardust Creator Network brand guidelines. This document outlines the visual identity, color palette, typography, and usage standards for the Stardust Creator Network website and all related brand materials.

## 🎨 Color Palette

### Primary Colors

The foundation of our brand identity relies on these three core colors:

| Color           | Hex Code  | Usage                                          |
| --------------- | --------- | ---------------------------------------------- |
| **White**       | `#FFFFFF` | Background, text on dark surfaces, clean space |
| **Deep Purple** | `#57058B` | Primary brand color, headers, key UI elements  |
| **Black**       | `#000000` | Body text, high contrast elements, emphasis    |

### Secondary Colors

Supporting colors that complement our primary palette:

| Color             | Hex Code  | Usage                                             |
| ----------------- | --------- | ------------------------------------------------- |
| **Light Grey**    | `#E6E6E6` | Subtle backgrounds, borders, inactive states      |
| **Bright Purple** | `#A51CFF` | Interactive elements, highlights, calls-to-action |
| **Vivid Violet**  | `#8500D1` | Accent elements, secondary highlights             |

### Accent Colors

High-energy colors for contrast and emphasis:

| Color           | Hex Code  | Usage                                        |
| --------------- | --------- | -------------------------------------------- |
| **Yellow Gold** | `#FFCC00` | Success states, important highlights, energy |
| **Orange Red**  | `#FF5400` | Alerts, urgent actions, dynamic elements     |

### Brand Gradient

Our signature gradient creates depth and visual interest:

**Primary Gradient:** `linear-gradient(135deg, #A51CFF 0%, #57058B 100%)`

- Use for hero sections, buttons, and prominent UI elements
- Can be applied at various opacities for subtle effects
- Always maintain the direction from Bright Purple to Deep Purple

## ✍️ Typography

### Primary Typeface: Lato

**Lato** is our primary typeface across all brand communications and digital experiences.

#### Characteristics:

- Clean, geometric sans-serif design
- Excellent readability across all sizes
- Modern and approachable personality
- Full character set with extensive language support

#### Usage Guidelines:

**Headers (H1-H6)**

- Font Family: Lato
- Weights: Bold (700) for main headers, Semi-Bold (600) for sub-headers
- Color: Deep Purple (#57058B) or White (#FFFFFF) on dark backgrounds

**Body Text**

- Font Family: Lato
- Weight: Regular (400) for standard text, Medium (500) for emphasis
- Color: Black (#000000) or White (#FFFFFF) on dark backgrounds
- Line Height: 1.6 for optimal readability

**UI Elements**

- Font Family: Lato
- Weight: Medium (500) for buttons, Semi-Bold (600) for navigation
- Letter Spacing: Slight increase (0.5px) for button text

## 🎯 Brand Identity

### Brand Personality

- **Creative**: Inspiring innovation and artistic expression
- **Professional**: Trustworthy and reliable platform
- **Energetic**: Dynamic and forward-thinking
- **Inclusive**: Welcoming to creators of all backgrounds

### Visual Style

- Clean, modern design with strategic use of gradients
- Balanced composition with plenty of white space
- Purple-dominant palette with strategic pops of accent colors
- Typography-driven hierarchy for clear information architecture

## 📐 Design Principles

### Color Application

**Do:**

- Use Deep Purple (#57058B) for primary brand elements
- Apply the gradient for hero sections and key interactive elements
- Maintain high contrast ratios for accessibility (minimum 4.5:1)
- Use accent colors sparingly for maximum impact

**Don't:**

- Overwhelm designs with too many purple variations
- Use accent colors as primary elements
- Apply gradients to body text or small UI elements
- Mix our purple palette with other brand purples

### Typography Hierarchy

**Heading Structure:**

```
H1: 48px / Bold (700) / Deep Purple
H2: 36px / Semi-Bold (600) / Deep Purple
H3: 28px / Semi-Bold (600) / Deep Purple
H4: 24px / Medium (500) / Black
H5: 20px / Medium (500) / Black
H6: 18px / Medium (500) / Black
```

**Body Text:**

```
Large: 18px / Regular (400) / Black
Medium: 16px / Regular (400) / Black
Small: 14px / Regular (400) / Black
Caption: 12px / Regular (400) / Light Grey
```

## 🌐 Digital Implementation

### CSS Custom Properties

Implement these color variables in your CSS for consistent brand application:

```css
:root {
  /* Primary Colors */
  --color-white: #ffffff;
  --color-deep-purple: #57058b;
  --color-black: #000000;

  /* Secondary Colors */
  --color-light-grey: #e6e6e6;
  --color-bright-purple: #a51cff;
  --color-vivid-violet: #8500d1;

  /* Accent Colors */
  --color-yellow-gold: #ffcc00;
  --color-orange-red: #ff5400;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #a51cff 0%, #57058b 100%);

  /* Typography */
  --font-family-primary: 'Lato', sans-serif;
}
```

### Tailwind CSS Configuration

For projects using Tailwind CSS, extend the default theme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'deep-purple': '#57058B',
        black: '#000000',
        'light-grey': '#E6E6E6',
        'bright-purple': '#A51CFF',
        'vivid-violet': '#8500D1',
        'yellow-gold': '#FFCC00',
        'orange-red': '#FF5400',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #A51CFF 0%, #57058B 100%)',
      },
    },
  },
};
```

## ♿ Accessibility Standards

### Color Contrast

- Maintain WCAG AA compliance (4.5:1 contrast ratio minimum)
- Test all color combinations, especially accent colors on backgrounds
- Provide alternative indicators beyond color for important information

### Typography Accessibility

- Minimum font size of 16px for body text
- Line height of at least 1.5 for optimal readability
- Adequate spacing between interactive elements (minimum 44px touch targets)

## 📱 Responsive Considerations

### Mobile Typography Scale

Adjust typography sizes for mobile devices:

```
H1: 36px (reduced from 48px)
H2: 28px (reduced from 36px)
Body: 16px (maintained)
Small: 14px (maintained)
```

### Color Adaptations

- Ensure gradients remain visually appealing on smaller screens
- Test color combinations in both light and dark modes
- Maintain brand consistency across all viewport sizes

## 🚀 Implementation Checklist

When implementing these brand guidelines:

- [ ] Install Lato font family with appropriate weights
- [ ] Set up CSS custom properties or design tokens
- [ ] Test color contrast ratios for accessibility compliance
- [ ] Implement responsive typography scales
- [ ] Create reusable gradient classes/components
- [ ] Document any brand extensions or variations
- [ ] Test across different devices and browsers

## 📞 Brand Contact

For questions about brand implementation or requests for brand assets, please contact the design team or refer to the project documentation.

---

**Version:** 1.0  
**Last Updated:** November 2024  
**Next Review:** February 2025

_These guidelines ensure consistent brand application across all Purple Stardust touchpoints while maintaining flexibility for creative expression within the established framework._
