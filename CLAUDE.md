# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Animal Crossing: New Horizons (ACNH) fishing companion app built with Next.js and React. It helps players track which fish are currently available to catch based on time, season, and hemisphere.

## Development Commands

### Start Development Server
```bash
pnpm dev
```
Runs the app at http://localhost:3000 with hot reload enabled.

### Build for Production
```bash
pnpm build
```
Creates optimized production build in the `.next/` folder.

### Start Production Server
```bash
pnpm start
```
Runs the production build locally.

### Lint Code
```bash
pnpm lint
```
Runs ESLint with Next.js configuration.

### Install Dependencies
```bash
pnpm install
```
Installs all project dependencies using pnpm.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript with strict mode
- **Recoil** - State management for hemisphere and filter selections
- **Tailwind CSS 3** - Utility-first CSS framework
- **Native JavaScript** - Date/time handling using Intl API (no external dependencies)

## Architecture

### Next.js App Structure

This project uses the Next.js App Router:
- `app/layout.js` - Root layout with metadata, imports global CSS
- `app/page.js` - Home page (client component with 'use client' directive)
- `src/` - Contains all React components, utilities, and services (legacy CRA structure preserved)
- `public/` - Static assets served from root

### State Management (Recoil)

Global state is managed in `src/services/Recoil.js`:
- `hemisphere` atom: Stores selected hemisphere (North/South) - defaults to South
- `filters` atom: Stores active filter (Now/This month/Last chance/All) - defaults to "Now"

**Important**: Recoil requires client-side rendering. The root `app/page.js` is marked with `'use client'` directive to enable RecoilRoot. Components are dynamically imported with `{ ssr: false }` to prevent server-side rendering issues during build.

### Data Model

Fish data is structured in `src/utils/database/fishes_data.js` as an array of objects with:
- `id`, `name`, `price`, `location`, `shadow`
- `seasons`: Object with `North` and `South` arrays containing month ranges
- `schedule`: Array of hours when fish appears (empty array = all day)
- `imageURL`: Cloudinary-hosted fish images

The `Fish` class (`src/utils/models/Fish.js`) provides methods to:
- `appearsThisMonth(hemisphere)`: Check if fish is available in current month
- `appearsNow(hemisphere)`: Check if fish is available at current time
- Static filtering methods: `allFishesAppearsThisMonth()`, `allFishesAppearsNow()`

### Component Structure

```
App.js (RecoilRoot)
├── Header (Clock + hemisphere selector)
├── Actions (Title + ButtonGroup for filters)
└── Fishes (Main component)
    └── Fish tiles (grid layout)
```

The `Fishes.js` component contains the core filtering logic:
- `isInWater(season, schedule)`: Determines if fish is currently catchable based on hemisphere, month, and hour
- `renderFishes()`: Filters fish data based on selected filter value
- Uses Moment.js to get current month/hour and compare against fish data

### Tailwind Configuration

Custom Tailwind theme in `tailwind.config.js` defines:
- Fish-specific color palette (`fish-background`, `fish-accent-cian`, etc.)
- Custom spacing for fish tiles (`fishTileWMin`, `fishHTileDefault`)
- Font family: Poppins
- Content configuration targets `app/**/*.{js,ts,jsx,tsx,mdx}` and `src/**/*.{js,ts,jsx,tsx}`

Tailwind is configured via `postcss.config.js` for Next.js compatibility.

## Key Filtering Logic

Filters work as follows:
- **"Now"**: Shows fish available at current time AND season (combines month + hour check)
- **"This month"**: Shows fish available in current month (ignores time)
- **"Last chance"**: Shows fish whose season ends this month
- **"All"**: Shows all fish in database

The filtering respects the selected hemisphere since fish availability differs between Northern and Southern hemispheres.

## Constants

`src/utils/index.js` exports:
- `HEMISPHERES`: `{ North: 'North', South: 'South' }`
- `FILTERS_FUNC`: `{ all: 'All', now: 'Now', thisMonth: 'This month', lastChance: 'Last chance' }`

Use these constants instead of hardcoded strings.
