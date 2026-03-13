"use client";
import React, { useState } from "react";
import { Share2, Twitter, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-6 p-4 bg-[var(--retro-surface)] border-2 border-[var(--retro-border)]">
      <span className="text-sm font-bold uppercase mr-2 flex items-center gap-2">
        <Share2 className="h-4 w-4" /> Share:
      </span>
      
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase border-2 border-[var(--retro-border)] hover:bg-[var(--retro-bg)] transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : "Copy Link"}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        <Twitter className="h-4 w-4" /> Twitter
      </a>

      <a
        href={redditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase bg-orange-600 text-white hover:bg-orange-700 transition-colors"
      >
        Reddit
      </a>
    </div>
  );
}
