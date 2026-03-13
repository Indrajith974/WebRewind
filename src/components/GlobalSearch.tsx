"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Search } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchResult {
  id: number;
  name: string;
  category: string;
  year: number;
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim() || !supabase) {
        setResults([]);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("historic_websites")
        .select("id, name, category, year")
        .or(`name.ilike.%${debouncedQuery}%,description.ilike.%${debouncedQuery}%`)
        .order("year", { ascending: true })
        .limit(8);

      if (!error && data) {
        setResults(data);
      }
      setLoading(false);
      setIsOpen(true);
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg z-50">
      <div className="flex items-center bg-white border-2 border-[var(--retro-border)] shadow-[2px_2px_0px_#000] p-1 focus-within:ring-2 focus-within:ring-[var(--retro-primary)]">
        <Search className="w-5 h-5 ml-2 text-gray-500" />
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search 50,000+ historical websites..."
          className="w-full bg-transparent px-3 py-2 text-black font-sans font-bold outline-none placeholder-gray-400"
        />
        {loading && <div className="mr-3 w-4 h-4 border-2 border-[var(--retro-primary)] border-t-transparent rounded-full animate-spin"></div>}
      </div>

      {/* Dropdown Results */}
      {isOpen && query.trim() && (results.length > 0 || !loading) && (
        <div className="absolute top-full left-0 w-full mt-1 bg-[var(--retro-surface)] border-2 border-[var(--retro-border)] shadow-[4px_4px_0px_#000] max-h-[300px] overflow-y-auto">
          {results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((site) => (
                <Link 
                  key={site.id} 
                  href={`/browser/${site.year}?url=${site.name}`}
                  className="flex items-center justify-between p-3 border-b border-[var(--retro-border)] hover:bg-[var(--retro-primary)] hover:text-white group transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col">
                    <span className="font-bold">{site.name}</span>
                    <span className="text-xs opacity-70">{site.category}</span>
                  </div>
                  <div className="text-sm font-bold bg-[#c0c0c0] text-black px-2 py-1 border border-black shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000] group-hover:bg-white group-hover:shadow-[inset_1px_1px_#000]">
                    {site.year}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm font-bold opacity-70">
              {loading ? "Searching archive..." : "No websites found in the archive."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
