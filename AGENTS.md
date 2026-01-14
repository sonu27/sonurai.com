# AGENTS.md - AI Coding Agent Guidelines

This document provides guidelines for AI coding agents working in the sonurai.com codebase.

## Project Overview

A Bing Wallpapers showcase website built with:
- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **React**: Version 19
- **Styling**: Tailwind CSS 4
- **Search**: Algolia (algoliasearch + react-instantsearch)
- **Deployment**: Vercel

## Build/Lint/Test Commands

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Linting
```

**Note**: No test framework is configured. There are no test commands or test files.

## Project Structure

```
sonurai.com/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout (metadata, header, footer)
│   ├── globals.css              # Global styles (Tailwind v4)
│   ├── header.tsx               # Navigation (client component)
│   ├── about/page.tsx           # About page
│   ├── bingwallpapers/
│   │   ├── [[...p]]/page.tsx    # Wallpaper listing with pagination
│   │   ├── [id]/page.tsx        # Individual wallpaper detail
│   │   ├── search/page.tsx      # Algolia search page
│   │   ├── tags/                # Tag-based browsing
│   │   └── rss.xml/route.ts     # RSS feed route handler
│   └── sitemap.xml/route.ts     # Dynamic sitemap
├── components/                   # Reusable React components
│   ├── WallpaperList.tsx        # Wallpaper grid (server component)
│   └── WallpaperSearch.tsx      # Algolia search (client component)
├── libs/                         # Utility libraries
│   ├── Client.ts                # API client for wallpaper backend
│   └── date.ts                  # Date formatting utilities
└── public/                       # Static assets
```

## Code Style Guidelines

### TypeScript

- **Strict mode** is enabled - respect all strict type checks
- Use the `@/*` path alias for imports (maps to project root)
- `@typescript-eslint/no-explicit-any` is disabled - `any` types are allowed but minimize usage
- Define types inline or use `type` declarations (not interfaces, unless extending)

```typescript
// Preferred: Type alias
export type Wallpaper = {
  id: string;
  title: string;
  copyright: string;
  date: string;
  tags: string[];
  colors?: string[];
};
```

### Imports

Order imports as follows:
1. React/Next.js imports
2. Third-party libraries
3. Local components/libs using `@/` alias
4. Types (can be inline with their source)

```typescript
import { Fragment } from "react";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/libs/Client";
import { colorsToDataURL } from "@/libs/image";
import { intToDate } from "@/libs/date";
import type { Metadata } from "next";
```

### React/Next.js Patterns

- **Server Components by default** - only add `"use client"` when needed (hooks, browser APIs, event handlers)
- Use `async` components for data fetching in server components
- Prefer Next.js `Image` component over `<img>` tags
- Prefer Next.js `Link` component over `<a>` tags
- Use `prefetch={false}` on links for dynamic/paginated content

```typescript
// Server component (default)
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await client.getWallpaper(params.id);
  // ...
}

// Client component (when needed)
"use client";
import { usePathname } from "next/navigation";
```

### Component Naming

- **Files**: PascalCase for components (`WallpaperList.tsx`), camelCase for utilities (`date.ts`)
- **Components**: PascalCase function names (`WallpaperList`, `ActiveLink`)
- **Hooks**: camelCase with `use` prefix (`useInstantSearch`)

### Styling

- Use Tailwind CSS classes exclusively
- Tailwind v4 syntax: `@import "tailwindcss"` in CSS files
- Custom theme colors defined in `globals.css` with `@theme` directive
- Responsive design: mobile-first with `md:` and `lg:` breakpoints

### Error Handling

- Use Next.js `notFound()` for 404 responses
- Use Next.js `redirect()` for URL redirects
- API client returns empty arrays/null for 404 responses (no exceptions)

```typescript
const data = await client.getWallpaper(params.id);
if (data.wallpaper == undefined) {
  notFound();
}
```

### Metadata & SEO

- Use `generateMetadata` for dynamic page metadata
- Export static `metadata` object for static pages
- Include canonical URLs, Open Graph, and Twitter card data

### Route Handlers

- Use `route.ts` files for API routes (RSS, sitemap)
- Return `Response` objects with appropriate headers

## Environment Variables

Required environment variables (set in `.env`):
- `NEXT_PUBLIC_NAME` - Site name
- `NEXT_PUBLIC_URL` - Site URL (e.g., `https://sonurai.com`)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## External Services

- **Images**: Served from `https://images.sonurai.com/`
- **Search**: Algolia (public keys in `WallpaperSearch.tsx`)
- **Analytics**: Umami at `https://abc.sonurai.com/`

## Common Patterns

### Data Fetching with Revalidation

```typescript
// No cache
const res = await fetch(url, { next: { revalidate: 0 } });

// Cache for 1 week
const res = await fetch(url, { next: { revalidate: 604800 } });

// Force cache
const res = await fetch(url, { cache: "force-cache" });
```

### Dynamic Routes

- `[param]` - Single dynamic segment
- `[[...param]]` - Optional catch-all (handles `/path`, `/path/a`, `/path/a/b`)

## ESLint Configuration

- Extends `next/core-web-vitals` and `next/typescript`
- Uses flat config format (`eslint.config.mjs`)
- `@typescript-eslint/no-explicit-any` is disabled
