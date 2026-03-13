"use client";
import React, { useState } from "react";
import { Target, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { internetHistory } from "@/data/internetHistory";

export function RandomizerButton() {
  const router = useRouter();
  const [isJumping, setIsJumping] = useState(false);

  const jumpToRandom = () => {
    setIsJumping(true);
    // Grab a random entry from our curated historical periods
    const randomEntry = internetHistory[Math.floor(Math.random() * internetHistory.length)];
    const randomYear = randomEntry.year;
    
    // Slight artificial delay for the "Time Travel" feeling
    setTimeout(() => {
      router.push(`/year/${randomYear}`);
    }, 800);
  };

  return (
    <button 
      onClick={jumpToRandom}
      disabled={isJumping}
      className="bg-[var(--retro-primary)] text-white text-xl md:text-2xl font-black uppercase tracking-wider py-4 px-8 border-[4px] border-white shadow-[8px_8px_0px_#000] hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] active:translate-y-1 active:shadow-[4px_4px_0px_#000] transition-all flex items-center gap-3 mx-auto disabled:opacity-80"
    >
      {isJumping ? <Loader2 className="animate-spin h-8 w-8" /> : <Target className="h-8 w-8" />}
      {isJumping ? "Time Traveling..." : "Take Me Anywhere"}
    </button>
  );
}
