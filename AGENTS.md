# AGENTS.md - AI Coding Agent Guidelines

Guidelines for AI coding agents working in the sonurai.com codebase.

## Project Overview

Bing Wallpapers showcase website: **Next.js 16** (App Router), **TypeScript 5** (strict), **React 19**, **Tailwind CSS 4**, **Algolia** search, deployed on **Vercel**.

## Commands

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

**No test framework configured** - no test commands or test files exist.

## Project Structure

```
app/                           # Next.js App Router
├── layout.tsx                 # Root layout
├── globals.css                # Tailwind v4 styles
├── header.tsx                 # Navigation (client)
├── bingwallpapers/
│   ├── [[...p]]/page.tsx      # Listing with pagination
│   ├── [id]/page.tsx          # Detail page
│   ├── search/page.tsx        # Algolia search
│   ├── tags/[tag]/page.tsx    # Tag-filtered listing
│   └── rss.xml/route.ts       # RSS feed
components/                    # Reusable components
libs/                          # API client, utilities
```

## Code Style

### TypeScript
- **Strict mode** - respect all type checks
- Use `@/*` path alias for imports
- Prefer `type` over `interface`

```typescript
export type Wallpaper = {
  id: string;
  title: string;
  tags: Record<string, number>;
  colors?: string[];
};
```

### Import Order
1. React/Next.js (`import { useState } from "react"`)
2. Third-party libraries
3. Local modules (`@/libs/Client`, `@/components/...`)
4. Types (`import type { Metadata } from "next"`)

### Components

**Server Components (default):**
```typescript
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await getWallpaper(params.id);
}
```

**Client Components** - add `"use client"` only when needed:
```typescript
"use client";
import { useState } from "react";
```

### Naming Conventions
- **Files**: PascalCase for components (`WallpaperList.tsx`), camelCase for utilities (`date.ts`)
- **Functions/Components**: PascalCase components, camelCase functions

### Styling
- Tailwind CSS classes only
- Mobile-first: `md:` and `lg:` breakpoints
- Custom colors in `globals.css` via `@theme`

### Error Handling
```typescript
const data = await getWallpaper(params.id);
if (data.wallpaper === null) notFound();  // 404
if (needsRedirect) redirect(`/bingwallpapers/${newId}`);
```

### Data Fetching
```typescript
fetch(url, { next: { revalidate: 3600 } });   // 1 hour
fetch(url, { next: { revalidate: 86400 } });  // 24 hours
fetch(url, { next: { revalidate: 604800 } }); // 1 week
fetch(url, { cache: "force-cache" });         // Static
```

### Metadata
```typescript
// Static
export const metadata: Metadata = {
  title: `Page - ${process.env.NEXT_PUBLIC_NAME}`,
  alternates: { canonical: `${process.env.NEXT_PUBLIC_URL}/path` },
};

// Dynamic
export async function generateMetadata(props): Promise<Metadata> {
  const params = await props.params;
  return { title: data.title, openGraph: {...}, twitter: {...} };
}
```

### Route Handlers
```typescript
export async function GET() {
  return new Response(content, {
    headers: { "Content-Type": "application/rss+xml", "Cache-Control": "public, max-age=3600" },
  });
}
```

## Dynamic Routes
- `[param]` - Single segment
- `[[...param]]` - Optional catch-all

## Environment Variables
- `NEXT_PUBLIC_NAME` - Site name
- `NEXT_PUBLIC_URL` - Site URL
- `NEXT_PUBLIC_API_URL` - Backend API

## External Services
- Images: `images.sonurai.com`
- Search: Algolia (keys in `WallpaperSearch.tsx`)
- Analytics: Umami (`abc.sonurai.com`)

## ESLint
Flat config extending `next/core-web-vitals` and `next/typescript`.
