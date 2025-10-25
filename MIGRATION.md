# Migration from Create React App to Next.js 16

This document summarizes the migration of the ACNH Fish app from Create React App to Next.js 16.

## Summary of Changes

### 1. Project Structure
- Created `app/` directory for Next.js App Router
- Added `app/layout.js` - Root layout with metadata and global CSS imports
- Added `app/page.js` - Home page (marked as client component with `'use client'`)
- Preserved `src/` directory with all existing components and utilities

### 2. Dependencies Updated

**Removed:**
- `react-scripts` (Create React App)
- `@craco/craco` (CRA configuration override)
- `@testing-library/*` packages
- Old Tailwind PostCSS 7 compatibility packages

**Added:**
- `next@^16.0.0` - Next.js 16 framework
- `react@^19.0.0` - React 19
- `react-dom@^19.0.0` - React DOM 19
- `recoil@^0.7.7` - Updated Recoil for React 19 compatibility
- `tailwindcss@^3.4.17` - Modern Tailwind CSS 3
- `postcss@^8.4.49` - PostCSS 8
- `autoprefixer@^10.4.20` - Autoprefixer 10
- `eslint-config-next@^16.0.0` - Next.js ESLint config

### 3. Configuration Files

**Created:**
- `next.config.js` - Next.js configuration with Cloudinary image optimization
- `postcss.config.js` - PostCSS configuration for Tailwind
- `.eslintrc.json` - ESLint configuration for Next.js
- `jsconfig.json` - Path aliases configuration

**Modified:**
- `tailwind.config.js` - Updated `purge` to `content` with Next.js paths
- `.gitignore` - Added `.next/` and `/out` directories
- `package.json` - Updated scripts and dependencies

**Removed:**
- `craco.config.js` - No longer needed with Next.js

### 4. Scripts Updated

| Old Command | New Command | Purpose |
|------------|-------------|---------|
| `yarn start` | `pnpm dev` | Development server |
| `yarn build` | `pnpm build` | Production build |
| `yarn test` | (removed) | Tests |
| - | `pnpm start` | Run production build |
| - | `pnpm lint` | Run ESLint |

### 5. Package Manager Migration

**Migrated from Yarn to pnpm:**
- Removed `yarn.lock` and `package-lock.json`
- Created `pnpm-lock.yaml`
- Using pnpm for faster, more efficient dependency management
- Disk space savings through content-addressable storage

### 6. Key Technical Notes

**Client-Side Rendering:**
- The app uses Recoil for state management, which requires client-side rendering
- `app/page.js` is marked with `'use client'` directive
- Components are dynamically imported with `{ ssr: false }` to prevent SSR issues
- All existing components work without modification

**Static Assets:**
- Files in `public/` are served from root as before
- Fish images remain hosted on Cloudinary

**Styling:**
- Tailwind CSS works identically
- Custom theme colors and spacing preserved
- `base.css` and `index.css` imported in `app/layout.js`

## Migration Benefits

1. **Modern Stack**: React 19 and Next.js 16 with latest features
2. **Better Performance**: Turbopack for faster builds and HMR
3. **Image Optimization**: Next.js Image component support (configured for Cloudinary)
4. **SEO Ready**: Metadata API for better SEO
5. **Type Safety Ready**: Easy to add TypeScript later
6. **Production Ready**: Optimized builds and deployment options

## Backward Compatibility

- All existing components remain in `src/` and work without changes
- Component logic unchanged
- Recoil state management works identically
- Tailwind classes work the same way

## Next Steps (Optional)

1. **Migrate to TypeScript**: Add `.ts`/`.tsx` extensions for type safety
2. **Optimize Images**: Replace `<img>` tags with Next.js `<Image>` component
3. **Add Server Components**: Move non-interactive components to server components
4. **API Routes**: Add `/app/api` routes if backend functionality needed
5. **Replace Moment.js**: Consider migrating to `date-fns` or native `Intl` APIs (lighter bundle)

## Testing the Migration

Start the development server:
```bash
pnpm dev
```

Visit http://localhost:3000 to verify:
- Fish tiles display correctly
- Hemisphere selection works
- Filter buttons function properly
- Time-based filtering works
- Responsive design intact

Build for production:
```bash
pnpm build
pnpm start
```

## Rollback Instructions

If you need to rollback to Create React App:

1. Checkout the previous commit
2. Run `pnpm install` (or `yarn install` if reverting to yarn) to restore old dependencies
3. Delete `app/`, `next.config.js`, `postcss.config.js`, `.eslintrc.json`
4. Restore old `package.json` and `tailwind.config.js`

## Why pnpm?

- **Faster**: Up to 2x faster than npm/yarn
- **Disk efficient**: Uses content-addressable storage (saves gigabytes)
- **Strict**: Better dependency resolution without phantom dependencies
- **Monorepo friendly**: Built-in workspace support
