# Project Overview & Architecture

## Architecture Pattern

The Internet Timeline project utilizes the modern **Next.js 16 App Router**. It is a full-stack React project that heavily utilizes strict separation of concerns between Server Components, Route Handlers (APIs), and highly interactive Client Components (`"use client"`).

## Core Technologies

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS + Custom CSS Variables (`globals.css`)
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: Google Generative AI (Gemini 2.5 Flash)
- **Archive Backing**: Wayback Machine (archive.org) via iframes
- **Icons**: Lucide React
- **Drag & Drop**: `react-draggable`

## File Structure

```
├── public/                 # Static assets
├── scripts/
│   └── importWebsites.ts   # Node script for database seeding
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, APIs)
│   ├── components/         # Reusable React UI Components
│   ├── hooks/              # Custom React Hooks (e.g. useDebounce)
│   └── lib/                # Utility functions (Supabase client, Wayback logic)
├── schema.sql              # Supabase table schema definition
├── tailwind.config.ts      # Tailwind configuration
└── .env.local              # Secrets & Keys
```

## Styling & Themes

The project implements an overarching design system housed primarily in `globals.css`. We utilize CSS variables for dynamic retro theming:

- `--retro-bg`: Primary background color
- `--retro-surface`: Foreground container color
- `--retro-primary`: Accent color (buttons, borders)
- `--retro-text`: Typographical color
- `--retro-border`: Main border color

The `Navbar` component dynamically toggles these base variable scopes by appending CSS classes (`theme-1995`, `theme-2005`, `theme-2015`) to the `<html>` root node, seamlessly modifying the entire site's interface instantly.
