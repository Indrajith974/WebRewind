"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getArchiveUrl } from "@/lib/wayback";
import { ArrowLeft, ArrowRight, RotateCw, Home, X } from "lucide-react";
import Link from "next/link";

export default function OldBrowserEmulator({ params }: { params: Promise<{ year: string }> }) {
  const [yearResolved, setYearResolved] = useState<string>("1995");
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get("url") || "yahoo.com";
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [activeUrl, setActiveUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params.then(p => setYearResolved(p.year));
  }, [params]);

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveUrl(urlInput);
    setIsLoading(true);
  };

  const domain = activeUrl.includes(".") ? activeUrl : `${activeUrl}.com`;
  
  let validYear = parseInt(yearResolved, 10);
  if (isNaN(validYear) || validYear < 1990) validYear = 1990;
  if (validYear > new Date().getFullYear()) validYear = new Date().getFullYear();

  const iframeSrc = getArchiveUrl(domain, validYear);

  return (
    <div className="h-screen w-full flex flex-col bg-[#c0c0c0] font-sans">
      
      {/* Title Bar */}
      <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between">
        <span className="font-bold text-sm tracking-wide">Netscape Navigator - {validYear}</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-[#c0c0c0] border border-white flex items-center justify-center text-black shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000]">_</div>
          <div className="w-4 h-4 bg-[#c0c0c0] border border-white flex items-center justify-center text-black shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000]">□</div>
          <Link href={`/year/${yearResolved}`} className="w-4 h-4 bg-[#c0c0c0] border border-white flex items-center justify-center text-black font-bold shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#000] cursor-pointer hover:bg-red-400">
            <X className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 text-sm border-b border-gray-500 shadow-[0_1px_0_#fff]">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Bookmarks</span>
        <span>Options</span>
        <span>Directory</span>
        <span>Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 px-2 py-2 border-b border-gray-500 shadow-[0_1px_0_#fff]">
        <button className="flex flex-col items-center justify-center w-12 h-12 border border-transparent hover:border-gray-500 hover:shadow-[1px_1px_0_#fff,inset_1px_1px_#fff]">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[10px]">Back</span>
        </button>
        <button className="flex flex-col items-center justify-center w-12 h-12 border border-transparent hover:border-gray-500 hover:shadow-[1px_1px_0_#fff,inset_1px_1px_#fff]">
          <ArrowRight className="w-5 h-5 text-gray-400" />
          <span className="text-[10px] text-gray-500">Forward</span>
        </button>
        <Link href="/" className="flex flex-col items-center justify-center w-12 h-12 border border-transparent hover:border-gray-500 hover:shadow-[1px_1px_0_#fff,inset_1px_1px_#fff]">
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <button 
          onClick={() => setIsLoading(true)}
          className="flex flex-col items-center justify-center w-12 h-12 border border-transparent hover:border-gray-500 hover:shadow-[1px_1px_0_#fff,inset_1px_1px_#fff]"
        >
          <RotateCw className="w-5 h-5" />
          <span className="text-[10px]">Reload</span>
        </button>
      </div>

      {/* Location Bar */}
      <form onSubmit={handleGo} className="flex items-center gap-2 px-2 py-2 border-b-2 border-gray-400">
        <span className="text-sm font-bold">Location:</span>
        <input 
          type="text" 
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="flex-grow px-1 py-0.5 border-2 border-gray-400 shadow-[inset_1px_1px_#000]"
        />
        <button type="submit" className="hidden">Go</button>
      </form>

      {/* Main Browser View */}
      <div className="flex-grow bg-white border-y-2 border-black relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 text-xl font-bold font-serif text-blue-900 border-[10px] border-blue-900 m-8 shadow-2xl">
            <span className="animate-pulse mb-8 text-4xl">Loading...</span>
            <div className="bg-yellow-100 p-4 border border-black text-sm text-black max-w-sm text-center font-sans font-normal">
              Downloading data from the Wayback Machine for <strong>{domain}</strong> from the year <strong>{validYear}</strong>. 
              <br/><br/>
              <em>Please wait, dial-up takes a moment.</em>
            </div>
          </div>
        )}
        <iframe 
          src={iframeSrc} 
          className="w-full h-full border-none" 
          onLoad={() => setIsLoading(false)}
          title="Wayback Machine Frame"
        />
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] px-2 py-1 text-xs border-t-2 border-white shadow-[inset_0_1px_#dfdfdf] flex justify-between">
        <span>{isLoading ? `Connect: Contacting host: ${domain}...` : `Document: Done (${domain})`}</span>
        <span className="font-bold text-blue-800">Viewing archived internet from {validYear}</span>
      </div>

    </div>
  );
}
