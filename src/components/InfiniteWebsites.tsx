"use client";
import React, { useState, useEffect, useCallback } from "react";
import { WebsiteCard } from "./WebsiteCard";
import { supabase } from "@/lib/supabase";
import { Database } from "lucide-react";

interface InfiniteWebsitesProps {
  initialStaticSites: string[];
  year: number;
}

interface HistoricWebsite {
  id: number;
  name: string;
  category: string;
  description: string;
  year: number;
}

export function InfiniteWebsites({ initialStaticSites, year }: InfiniteWebsitesProps) {
  const [websites, setWebsites] = useState<HistoricWebsite[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const limit = 20;

  const fetchMore = useCallback(async () => {
    if (!supabase || loading || !hasMore) return;
    
    setLoading(true);
    
    const from = page * limit;
    const to = from + limit - 1;

    try {
      const { data, error } = await supabase
        .from("historic_websites")
        .select("*")
        .eq("year", year)
        .order("id", { ascending: true })
        .range(from, to);

      if (error) {
        console.error("Error fetching websites:", error);
      } else if (data) {
        if (data.length < limit) {
          setHasMore(false);
        }
        setWebsites((prev) => {
          const newItems = data.filter(d => !prev.some(p => p.id === d.id));
          return [...prev, ...newItems];
        });
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, year]);

  useEffect(() => {
    // Only invoke if supabase is configured
    if (supabase && page === 0) {
      fetchMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMore();
      }
    }, { threshold: 1.0 });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, fetchMore]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Render static sites highlight first */}
        {initialStaticSites.map((website) => (
          <WebsiteCard 
            key={`static-${website}`}
            name={website}
            domain={`${website.toLowerCase().replace(/ \(.+\)/,'').replace(/\s/g, '')}.com`}
            year={year}
            description={`One of the defining platforms of ${year}.`}
          />
        ))}

        {/* Render dynamically fetched ones pushed to database */}
        {websites.map((website) => (
          <WebsiteCard
            key={website.id}
            name={website.name}
            domain={website.name}
            year={website.year}
            description={website.description || `A popular site in ${year}.`}
          />
        ))}
      </div>
      
      {supabase ? (
        hasMore && (
          <div ref={loadMoreRef} className="mt-8 flex justify-center py-6">
            {loading ? (
              <div className="flex items-center gap-2 text-[var(--retro-primary)] opacity-80 animate-pulse font-bold tracking-widest uppercase">
                <Database className="w-5 h-5 animate-spin" />
                Loading Archives...
              </div>
            ) : (
              <div className="h-10"></div> /* Spacer when not loading but intersecting might happen */
            )}
          </div>
        )
      ) : (
        <div className="mt-4 border border-dashed border-gray-400 p-4 text-center text-sm text-gray-500 opacity-80">
          Supabase database is not connected. Connect it to dynamically load thousands of websites here.
        </div>
      )}

      {!hasMore && websites.length > 0 && (
        <p className="text-center text-sm opacity-50 mt-4 border-t border-[var(--retro-border)] pt-4">You&apos;ve reached the end of the archive for this year.</p>
      )}
    </div>
  );
}
