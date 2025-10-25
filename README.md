# ACNH Fish Tracker

An Animal Crossing: New Horizons fishing companion app that helps players track which fish are currently available based on time, season, and hemisphere.

## Tech Stack

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - Latest React version
- **TypeScript** - Full type safety with strict mode
- **Recoil** - State management
- **Tailwind CSS 3** - Utility-first styling
- **pnpm** - Fast, disk-efficient package manager
- **Native JavaScript APIs** - Zero dependencies for date/time operations

## Getting Started

### Prerequisites

Make sure you have [pnpm](https://pnpm.io/) installed:

```bash
npm install -g pnpm
```

### Installation

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Linting

```bash
pnpm lint
```

## Features

- **Time-based filtering**: See which fish are available right now
- **Seasonal tracking**: View fish available this month
- **Last chance alerts**: Don't miss fish leaving soon
- **Hemisphere support**: Switch between Northern and Southern hemispheres
- **Responsive design**: Works on desktop and mobile

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `src/components/` - React components
- `src/utils/` - Utility functions and data models
- `src/services/` - Recoil state management
- `public/` - Static assets

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recoil Documentation](https://recoiljs.org)

## Code Quality

This project follows modern best practices:
- ✅ **TypeScript** for type safety
- ✅ **ESLint** with strict rules
- ✅ **Next.js Image** optimization
- ✅ **Error boundaries** for graceful error handling
- ✅ **Loading states** for better UX
- ✅ **Zero legacy dependencies** (removed Moment.js - saved 200KB!)

See [CODE_QUALITY_IMPROVEMENTS.md](./CODE_QUALITY_IMPROVEMENTS.md) for details.

## Migration Notes

This project was migrated from Create React App to Next.js 16. See [MIGRATION.md](./MIGRATION.md) for details.
