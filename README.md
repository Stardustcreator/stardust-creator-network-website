# Stardust Creator Network Website

A modern, SEO-optimized website built with Next.js 14, TypeScript, and Tailwind CSS. This project serves as the foundation for the Stardust Creator Network platform, empowering creators with tools, resources, and community connections.

## Features

- **SEO Optimized**: Server-side rendering, dynamic Open Graph images, structured data, and automatic sitemap generation
- **Performance First**: Optimized images, fonts, and bundle sizes with Next.js App Router
- **Security Hardened**: Security headers, CSP, HSTS, and bot protection via middleware
- **Developer Experience**: TypeScript, ESLint, Prettier, Husky git hooks, and comprehensive testing setup
- **CI/CD Ready**: GitHub Actions workflow with automated testing, security audits, and deployment
- **Accessibility**: Built with a11y best practices and automated testing with Playwright and Axe

## Tech Stack

### Core

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: Node.js 20+

### Development Tools

- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with EditorConfig
- **Git Hooks**: Husky + lint-staged
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Type Checking**: TypeScript strict mode

### Production Services

- **Analytics**: Vercel Analytics
- **Error Tracking**: Sentry
- **SEO**: next-sitemap for sitemaps/robots.txt
- **OG Images**: Dynamic generation with @vercel/og
- **Deployment**: Vercel (recommended) or any Node.js host

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 8.0.0 or later

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd stardust-creator-network-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server                |
| `npm run build`        | Build for production + generate sitemap |
| `npm run start`        | Start production server                 |
| `npm run lint`         | Run ESLint                              |
| `npm run lint:fix`     | Fix ESLint issues                       |
| `npm run type-check`   | Check TypeScript types                  |
| `npm run format`       | Format code with Prettier               |
| `npm run format:check` | Check code formatting                   |
| `npm run test`         | Run unit tests                          |
| `npm run test:watch`   | Run tests in watch mode                 |
| `npm run e2e`          | Run end-to-end tests                    |
| `npm run sitemap`      | Generate sitemap and robots.txt         |
| `npm run clean`        | Clean build artifacts                   |
| `npm run ci`           | Run full CI pipeline locally            |

## Project Structure

```
src/
├── app/                          # App Router pages and layouts
│   ├── (marketing)/             # Route group for public pages
│   │   ├── blog/               # Blog pages
│   │   └── legal/              # Legal pages (privacy, terms)
│   ├── api/                    # API route handlers
│   ├── og/                     # Dynamic OG image generation
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout with SEO
│   └── page.tsx                # Homepage
├── components/                  # Reusable UI components
├── lib/                        # Utilities and configurations
│   ├── services/               # Service layer (API, database)
│   └── seo.ts                  # SEO utilities
├── content/                    # Content files (MDX, etc.)
└── types/                      # TypeScript type definitions

docs/
└── architecture/               # Architecture Decision Records

.github/
└── workflows/                  # CI/CD workflows
```

## SEO Configuration

This project includes comprehensive SEO setup:

### Automatic Features

- **Metadata API**: Dynamic titles, descriptions, and Open Graph tags
- **Structured Data**: JSON-LD for organization, website, and articles
- **Sitemap**: Auto-generated XML sitemap with proper priorities
- **Robots.txt**: SEO-friendly robot instructions
- **Canonical URLs**: Prevent duplicate content issues

### Dynamic OG Images

Generate beautiful social media images automatically:

```
/og?title=Page Title&subtitle=Description&type=blog&author=Author&date=2024
```

### Content Guidelines

- Use the metadata API in each page/layout
- Include proper headings hierarchy (h1 → h2 → h3)
- Add alt text for all images
- Use semantic HTML elements
- Optimize images with Next.js Image component

## Performance

### Optimization Features

- **Image Optimization**: WebP/AVIF with lazy loading
- **Font Optimization**: Preloaded Google Fonts with display: swap
- **Bundle Analysis**: Use `npm run analyze` to check bundle size
- **Code Splitting**: Automatic with App Router
- **Edge Runtime**: Available for API routes and OG generation

### Performance Budgets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 300ms

## Security

### Security Headers

The middleware automatically adds:

- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options, X-Content-Type-Options
- Referrer Policy and Permissions Policy

### Best Practices

- Environment variables for sensitive data
- Input validation with Zod schemas
- Bot detection and rate limiting
- Secure cookie settings
- HTTPS redirect in production

## Content Management

### File-Based Content

- Store content in `src/content/` as MDX files
- Use frontmatter for metadata
- Automatic slug generation from filenames

### Headless CMS Integration

Ready for integration with:

- **Contentful**: Structured content with rich media
- **Sanity**: Real-time collaboration and rich editing
- **Strapi**: Self-hosted with full control
- **Hygraph**: GraphQL-native headless CMS

## Testing

### Unit Tests (Vitest)

```bash
npm run test                    # Run once
npm run test:watch             # Watch mode
npm run test:ui                # Visual test runner
```

### End-to-End Tests (Playwright)

```bash
npm run e2e                    # Run E2E tests
npm run e2e:ui                 # Interactive test runner
```

### Accessibility Testing

- Automated a11y testing with @axe-core/playwright
- Manual testing checklist included
- Screen reader compatibility

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

This is a standard Next.js application and can be deployed to:

- AWS (Amplify, EC2, or containerized)
- Google Cloud Platform
- Digital Ocean
- Railway, Render, or similar platforms

### Environment Setup

- **Development**: `.env.local` with local configuration
- **Staging**: Environment variables in platform dashboard
- **Production**: Secure environment variables, enable all optimizations

## Contributing

### Development Workflow

1. Create a feature branch from `develop`
2. Make your changes following our coding standards
3. Run the full test suite: `npm run ci`
4. Submit a pull request with a clear description

### Code Standards

- **TypeScript**: Strict mode, no `any` types in exports
- **Components**: One component per file, default exports
- **Styling**: Tailwind CSS classes, semantic naming
- **Commits**: Conventional commit format
- **Testing**: Unit tests for utilities, E2E for user flows

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Individual feature development
- `hotfix/*`: Critical production fixes

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required

- `SITE_URL`: Your site's base URL

### Optional

- `SENTRY_DSN`: Error tracking
- Analytics keys (Google Analytics, PostHog, etc.)
- CMS configuration (Contentful, Sanity, etc.)
- Authentication providers (NextAuth.js)

### Google Sheets Integration

For syncing Nigeria creator applications and brand briefs to Google Sheets:

- `GOOGLE_SHEETS_SPREADSHEET_ID`: The ID of your Google Sheet (from the URL)
- `GOOGLE_SHEETS_SHEET_NAME`: The name of the sheet tab for creator applications (default: "Nigeria Applications")
- `GOOGLE_SHEETS_BRAND_SHEET_NAME`: The name of the sheet tab for brand briefs (default: "brands registration ng")
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email from Google Cloud
- `GOOGLE_PRIVATE_KEY`: Private key from the service account JSON (with `\n` preserved)

Setup guides:

- Creator applications: [docs/google-sheets-setup.md](docs/google-sheets-setup.md)
- Brand briefs: [docs/google-sheets-brand-brief-setup.md](docs/google-sheets-brand-brief-setup.md)
- Email notifications for brand briefs: [docs/google-sheets-brand-brief-email-setup.md](docs/google-sheets-brand-brief-email-setup.md)

## Troubleshooting

### Common Issues

**Build Fails with TypeScript Errors**

```bash
npm run type-check              # Check types
npm run lint:fix                # Fix linting issues
```

**Images Not Loading**

- Check `next.config.mjs` for allowed domains
- Ensure images are in the `public/` directory
- Use Next.js `Image` component for optimization

**Styles Not Applying**

- Restart development server after Tailwind config changes
- Check for typos in class names
- Ensure imports are correct

### Performance Issues

```bash
npm run analyze                 # Check bundle size
npm run lighthouse              # Run performance audit
```

### SEO Issues

- Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)
- Check sitemap: Visit `/sitemap.xml`
- Verify robots.txt: Visit `/robots.txt`

## License

[MIT License](LICENSE) - feel free to use this project as a foundation for your own websites.

## Support

- **Documentation**: Check this README and code comments
- **Issues**: Create a GitHub issue with reproduction steps
- **Discussions**: Use GitHub Discussions for questions and ideas

---

Built with love by the Stardust Creator Network team. Empowering creators to build amazing digital experiences.
