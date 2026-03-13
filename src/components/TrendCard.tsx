"use client";
import React from "react";
import { Flame } from "lucide-react";

interface TrendCardProps {
  title: string;
  category: "Tech" | "Culture" | "Meme";
}

export function TrendCard({ title, category }: TrendCardProps) {
  const categoryColors = {
    Tech: "border-blue-500 text-blue-700 bg-blue-100",
    Culture: "border-purple-500 text-purple-700 bg-purple-100",
    Meme: "border-orange-500 text-orange-700 bg-orange-100"
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[var(--retro-surface)] border-l-4 border-[var(--retro-border)] shadow-sm hover:translate-x-1 transition-transform cursor-default">
      <div className={`p-2 rounded-full ${categoryColors[category]}`}>
        <Flame className="h-4 w-4" />
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{category}</span>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
    </div>
  );
}
