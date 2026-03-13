"use client";
import React from "react";
import { Download, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getArchiveUrl } from "@/lib/wayback";

interface WebsiteCardProps {
  name: string;
  domain?: string;
  description: string;
  year: number;
}

export function WebsiteCard({ name, domain, description, year }: WebsiteCardProps) {
  const archiveUrl = domain ? getArchiveUrl(domain, year) : "#";
  
  return (
    <div className="flex flex-col gap-3 p-4 bg-[var(--retro-surface)] retro-window transition-all hover:-translate-y-1 hover:shadow-xl group"
      style={{
        border: "2px solid var(--retro-border)",
        boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.1)",
      }}>
      <div className="flex items-center justify-between border-b pb-2 border-dashed border-[var(--retro-border)]">
        <h3 className="text-lg font-bold text-[var(--retro-primary)] flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          {name}
        </h3>
        <span className="text-xs font-mono bg-[var(--retro-bg)] px-2 py-1 border border-[var(--retro-border)]">{year}</span>
      </div>
      
      <p className="text-sm flex-grow min-h-[60px]">{description}</p>
      
      <div className="mt-2 pt-2 flex gap-2 w-full">
        {domain ? (
          <a
            href={archiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold uppercase bg-[var(--retro-primary)] text-white hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4" />
            View Archive
          </a>
        ) : null}
        <Link
          href={`/site/${encodeURIComponent(name.toLowerCase())}?year=${year}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold uppercase border border-[var(--retro-primary)] text-[var(--retro-primary)] hover:bg-[var(--retro-primary)] hover:text-white transition-colors"
        >
          Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
