# CSS and JavaScript Optimization Guide

This document explains how CSS and JavaScript are minified and optimized in this project, and how to identify unused code.

## What's Already Optimized

### Automatic Optimizations (Built-in)

1. **JavaScript Minification**
   - ✅ Next.js automatically minifies all JavaScript in production builds
   - ✅ Uses SWC minifier (faster than Terser)
   - ✅ Removes console.log statements in production
   - ✅ Tree-shaking removes unused code automatically

2. **CSS Minification**
   - ✅ Next.js automatically minifies all CSS in production builds
   - ✅ Tailwind CSS 4 automatically purges unused CSS classes
   - ✅ Only CSS classes actually used in your code are included in the final bundle

3. **Code Splitting**
   - ✅ Next.js automatically splits code by route
   - ✅ Dynamic imports are code-split automatically
   - ✅ Shared code is extracted into separate chunks

## Tools Installed

We've added several tools to help you analyze and optimize your code:

1. **@next/bundle-analyzer** - Visualizes what's in your JavaScript bundles
2. **depcheck** - Finds unused npm dependencies
3. **unimport** - Detects unused JavaScript imports

## Available Commands

### Analyze Bundle Size

```bash
npm run analyze:bundles
```

This will:

- Build your project for production
- Open a visual report showing the size of each bundle
- Help you identify large dependencies

### Check for Unused Dependencies

```bash
npm run check:unused-deps
```

This will:

- Scan your code to find npm packages that aren't being used
- **Note**: Some results may be false positives (packages used in config files)

### Check for Unused Imports

```bash
npm run check:unused-imports
```

This will:

- Find JavaScript/TypeScript imports that aren't being used
- Help you clean up your code

### Full Analysis

```bash
npm run analyze:unused
```

This will:

- Run all checks and provide a summary
- Show optimization tips

## Understanding the Results

### Unused Dependencies

When you run `npm run check:unused-deps`, you might see packages listed as "unused". However, some packages are used in ways that the tool can't detect:

- **Config files**: Packages used in `next.config.mjs`, `postcss.config.mjs`, etc.
- **Build tools**: Packages used during the build process
- **Type definitions**: `@types/*` packages for TypeScript
- **Testing tools**: Packages used in tests

**Always review manually** before removing dependencies.

### Tailwind CSS Purging

Tailwind CSS 4 automatically removes unused CSS classes. This means:

- ✅ You can use any Tailwind class in your code
- ✅ Only classes you actually use will be in the final CSS
- ✅ No manual configuration needed

### Bundle Size

When analyzing bundles:

- **Large chunks** might indicate opportunities for code splitting
- **Unexpected dependencies** might be imported incorrectly
- **Duplicate code** across chunks can sometimes be optimized

## Best Practices

### 1. Use Dynamic Imports for Heavy Components

```typescript
// Instead of:
import HeavyComponent from './HeavyComponent';

// Use:
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 2. Remove Unused Imports

Regularly run `npm run check:unused-imports` and remove unused imports.

### 3. Review Large Dependencies

If a dependency is large, consider:

- Finding a lighter alternative
- Using dynamic imports
- Checking if you're using the full library or just parts

### 4. Monitor Bundle Size

Run `npm run analyze:bundles` periodically to track bundle size over time.

## Production Build

When you run `npm run build`:

1. All JavaScript is minified
2. All CSS is minified
3. Unused code is removed (tree-shaking)
4. Console.log statements are removed
5. Source maps are disabled (for smaller bundles)

## Troubleshooting

### "Package is unused but I know it's used"

- Check if it's used in config files (next.config.mjs, etc.)
- Check if it's used in build scripts
- Some packages are only used at build time

### "Bundle size is still large"

- Run `npm run analyze:bundles` to see what's taking up space
- Look for opportunities to use dynamic imports
- Check if you're importing entire libraries instead of specific functions

### "CSS file is large"

- Tailwind CSS should automatically purge unused classes
- Check if you have custom CSS that's not being used
- Review your `globals.css` file for unused styles

## Additional Resources

- [Next.js Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Tailwind CSS Optimization](https://tailwindcss.com/docs/optimizing-for-production)
- [Bundle Analyzer Guide](https://www.npmjs.com/package/@next/bundle-analyzer)

