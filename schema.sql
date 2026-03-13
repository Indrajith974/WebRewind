-- Paste this into the Supabase SQL Editor to create your table

CREATE TABLE public.historic_websites (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    year INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Add some indexes for faster querying
CREATE INDEX idx_historic_websites_year ON public.historic_websites(year);
CREATE INDEX idx_historic_websites_category ON public.historic_websites(category);
