# Supabase Integration & Scraping

The Internet Timeline database utilizes a free-tier **Supabase PostgreSQL** cluster.

## Architecture 
All components access Supabase data read-only through the `src/lib/supabase.ts` initialization logic utilizing the `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_ANON_KEY` exposed in `.env.local`.

## Table Schema (`historic_websites`)

The schema generated in `schema.sql`:
```sql
CREATE TABLE public.historic_websites (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_historic_websites_year ON public.historic_websites(year);
CREATE INDEX idx_historic_websites_category ON public.historic_websites(category);
```

## Scaling to 50,000 Entries

The dataset relies heavily on the `scripts/importWebsites.ts` script.

### Generation Script Breakdown
1. **Curated Inject:** Manually injects the ~20 most structurally necessary domains (Yahoo, MySpace, Google Desktop Beta, etc.) with exact accurate release dates to guarantee timeline landmarks exist.
2. **Procedural Seed:** Uses arrays of retro-themed prefixes (`cyber`, `web`, `net`), TLDs, and random number allocations to procedurally seed an artificial historical snapshot totaling 50,000 unique records.
3. **Temporal Skew:** Code logic favors generating random sites roughly mimicking the peak dot-com explosion. (A 70% probability roll maps generated domains specifically to the `1995` to `2005` era, where classic emulation rules apply heavily in the web UI).
4. **Batch Insertion:** Protects the free-tier Supabase API limitations by `slice()` parsing the 50K recordset into 50 individual, deferred chunk payloads of `1,000` inserts per HTTPS request.
