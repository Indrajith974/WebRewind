# Next.js Application Routes

## Client Pages

### `app/page.tsx`
The primary homepage and core timeline feed.
Renders all presentational `WebsiteCard` lists and conditionally initiates client-side infinite scroll components via the `InfiniteWebsites` module to hydrate historical site data dynamically from Supabase.

### `app/simulator/birthday/page.tsx`
A fully immersive emulation of a custom Windows 95 desktop environment.
- Captures the user's input date from the query parameter (`?date=2002-01-24`).
- Renders `DraggableWindow` components encapsulating dynamic iFrames mapped to the `getArchiveUrl(url, year)` Wayback utility wrapper.
- Interrogates the `/api/birthday-history` backend route on load to query Gemini LLM for AI-generated historical diary entries set to that exact day.

### `app/browser/[year]/page.tsx`
A dedicated emulation view mimicking Netscape Navigator for any specific year.
Provides a client-side URL input form allowing users to artificially browse an entire proxy session through the Wayback Machine locked entirely to the target era constraints. Handles fallback formatting via parseInt checks.

---

## Server Routes & APIs

### `app/api/birthday-history/route.ts`
An API route executing entirely on the secure Next.js backend (prevents exposing the `GEMINI_API_KEY` to the client).
- Recieves the date payload from the client.
- Computes strict epoch date bounds and parsing rules.
- Assembles a custom textual prompt and passes it to Google Generative AI (`gemini-2.5-flash`).
- Returns raw, unstyled text generation intended strictly for presentation inside the simulated front-end "Notepad."
