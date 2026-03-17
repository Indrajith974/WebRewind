# NetNostalgia

## Overview

NetNostalgia is a nostalgic web application built with **Next.js**, **React**, and **Tailwind CSS**. It allows users to travel through the history of the web, exploring an archive of over 50,000 historical websites powered by **Supabase**. The platform features retro UI themes (1995 Web, 2005 Web 2.0, 2015 Modern), a functional 1990s desktop emulator for the "Birthday Simulator," and a functional vintage Netscape Navigator emulator powered by the **Wayback Machine API**.

For detailed architecture and module information, please refer to the `/docs` folder.

## Key Features

- **Endless Timeline Archive:** Browse over 50,000 domains natively fetched from a Supabase database via an infinite-scrolling intersection observer.
- **Birthday Simulator:** Enter your birthdate to spin up a virtual Windows 95 desktop environment. A custom **Gemini 2.5 Flash LLM** integration generates historically accurate "Notepad" diary entries, while an integrated iframe browses iconic websites from that exact era.
- **Retro Emulation View:** The `/browser/[year]` route spins up a classic Netscape Navigator interface that loads functional, click-through web archives natively fetched from the Wayback Machine API.
- **Global Search:** Find any specific site in history using the debounced global search bar in the sticky navigation menu.
- **Dynamic Theming:** Switch instantly between 1995, 2005, and 2015 CSS design languages, heavily utilizing CSS Variables and Tailwind.

## Getting Started

### Prerequisites
- Node.js 20+
- Supabase Account
- Google Gemini API Key

### Installation

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup**
   Run the SQL schema located in `schema.sql` within your Supabase SQL Editor. 
   Then, populate the database by running the scraping script:
   ```bash
   npx tsx scripts/importWebsites.ts
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Documentation Structure

For a deeper dive into the codebase, check out the `/docs` directory:
- [docs/overview.md](docs/overview.md) - High-level app architecture and Tech Stack
- [docs/components.md](docs/components.md) - Deep dive into UI modules (Search, Timeline, Windows)
- [docs/routes.md](docs/routes.md) - Insight into Next.js App Router endpoints and APIs
- [docs/database.md](docs/database.md) - Supabase integration and the 50,000 site data scraper

## License
MIT License.
