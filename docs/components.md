# File Component Details

## `InfiniteWebsites.tsx`
Responsible for querying the `historic_websites` table in Supabase. It uses pagination (limits of 20 per fetch) combined with an `IntersectionObserver`. When a user scrolls to the bottom of the visible timeline, the component silently queries the next 20 pages from Supabase and appends them to the DOM, creating a seamless scroll experience.

## `DraggableWindow.tsx`
A wrapper around `react-draggable` used on the Birthday Simulator desktop page. It simulates an authentic Windows 95 application window context by encapsulating dragging handles (restricted to the title bar using the `.drag-handle` selector), bringing windows to the forefront in the `z-index` stack upon click, and capturing the bounds to the parent window so it can't be dragged off-screen.

## `GlobalSearch.tsx`
A component embedded inside the main Navigation bar. It utilizes a `useDebounce` hook to throttle keyboard input to 300ms. It sends queries directly to Supabase using a `.ilike` match against website domains or descriptions. Results output to a custom overlapping dropdown `div` with z-index elevation.

## `Timeline.tsx`
Constructs the central core of the homepage, iterating through the pivotal years of the internet. It maps through individual years, mounting specific `WebsiteCard`, `MemeCard`, and `InfiniteWebsites` datasets inside absolute-positioned layouts. 

## `WebsiteCard.tsx` / `MemeCard.tsx` / `TrendCard.tsx`
Modular UI presentational components designed entirely with Tailwind `shadow-[inset_...]` box-shadows to mock early internet CSS 2.0 aesthetics.
