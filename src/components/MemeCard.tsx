"use client";
import React from "react";
import { Laugh } from "lucide-react";

interface MemeCardProps {
  name: string;
  year: number;
}

export function MemeCard({ name, year }: MemeCardProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-yellow-50 border-2 border-yellow-400 border-dashed rounded-lg transform rotate-1 hover:rotate-0 transition-transform hover:shadow-lg cursor-pointer max-w-[200px]">
      <Laugh className="h-8 w-8 text-yellow-500 mb-2" />
      <h3 className="text-lg font-bold text-center text-yellow-900 leading-tight">
        {name}
      </h3>
      <span className="mt-2 text-xs font-mono bg-yellow-200 px-2 py-1 rounded text-yellow-800">
        Viral in {year}
      </span>
    </div>
  );
}
