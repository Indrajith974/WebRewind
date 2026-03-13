"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { internetHistory } from "@/data/internetHistory";

export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-hidden bg-[var(--retro-surface)] py-12 relative border-y-4 border-[var(--retro-border)]">
      <div className="container mx-auto px-4 mb-6 relative">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--retro-primary)]">
          Time Travel Portal
        </h2>
        <p className="text-sm opacity-70">Scroll horizontally to explore the timeline</p>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-8 pt-4 px-4 sm:px-12 gap-16 snap-x snap-mandatory hide-scroll-bar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* The line connecting everything */}
        <div className="absolute top-[50%] left-0 w-[4000px] h-1 bg-[var(--retro-border)] -z-10" />

        {internetHistory.map((entry, idx) => (
          <motion.div
            key={entry.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1 }}
            className="flex-shrink-0 snap-center relative flex flex-col items-center group w-64"
          >
            {/* Year marker */}
            <div className="w-8 h-8 rounded-full bg-[var(--retro-primary)] border-4 border-white mb-4 z-10 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            
            <Link href={`/year/${entry.year}`} className="block w-full">
              <div className="bg-[var(--retro-bg)] border-2 border-[var(--retro-border)] p-4 hover:-translate-y-2 transition-transform cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                <h3 className="text-3xl font-black text-center mb-2 tracking-tighter">
                  {entry.year}
                </h3>
                <p className="text-xs text-center border-t border-dashed border-[var(--retro-border)] pt-2 h-12 overflow-hidden text-ellipsis line-clamp-2">
                  {entry.description}
                </p>
                
                <div className="mt-4 pt-2 border-t border-[var(--retro-border)] flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-[var(--retro-primary)]">Highlights:</span>
                  <p className="text-[10px] truncate">{entry.websites[0]}</p>
                  <p className="text-[10px] truncate">{entry.tech[0]}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
