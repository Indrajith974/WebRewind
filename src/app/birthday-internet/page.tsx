"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { getHistoryByYear, internetHistory } from "@/data/internetHistory";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface BirthdayResult {
  year: number;
  exactDate: string;
  description: string;
  websites: string[];
  tech: string[];
  memes: string[];
}

export default function BirthdayInternetPage() {
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState<BirthdayResult | null>(null);

  const calculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateStr) return;

    const bdate = new Date(dateStr);
    const year = bdate.getFullYear();
    
    // Fallbacks if out of bounds
    let targetYear = year;
    if (year < 1990) targetYear = 1990;
    if (year > 2024) targetYear = 2024;

    const data = getHistoryByYear(targetYear) || internetHistory.reduce((prev, curr) => (Math.abs(curr.year - targetYear) < Math.abs(prev.year - targetYear) ? curr : prev));
    setResult({ ...data, exactDate: bdate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--retro-bg)]">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-[#f8f9fa] p-8 border border-gray-300 shadow-xl text-center rounded-lg">
          
          <div className="flex justify-center mb-4">
            <div className="bg-red-500 p-4 rounded-full text-white shadow-lg">
              <Calendar className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-3xl font-black mb-2 text-gray-800">Trending on the Day You Were Born</h1>
          <p className="text-gray-500 mb-8">Discover what the internet looked like on your birthday.</p>
          
          {!result ? (
            <form onSubmit={calculate} className="flex flex-col gap-4">
              <input 
                type="date" 
                required
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full text-center text-xl text-black p-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              />
              <button type="submit" className="bg-red-500 text-white font-bold text-lg py-4 rounded hover:bg-red-600 transition-colors">
                Time Travel
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-6 text-left animate-fade-in">
              <h2 className="text-2xl font-boldtext-center border-b pb-4">
                The Internet on {result.exactDate}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-2 uppercase text-sm tracking-wider">Popular Websites</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {result.websites.map((w: string) => <li key={w}>{w}</li>)}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded border border-green-100">
                  <h3 className="font-bold text-green-800 mb-2 uppercase text-sm tracking-wider">Tech Trends</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {result.tech.map((t: string) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </div>

              {result.memes.length > 0 && (
                <div className="bg-orange-50 p-4 rounded border border-orange-100">
                  <h3 className="font-bold text-orange-800 mb-2 uppercase text-sm tracking-wider">Internet Culture</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {result.memes.map((m: string) => <li key={m}>{m}</li>)}
                  </ul>
                </div>
              )}

              <div className="mt-4 p-4 bg-gray-50 rounded border flex justify-between items-center flex-wrap gap-4">
                <span className="font-medium text-gray-600">Share your digital birthday:</span>
                <ShareButtons 
                  title={`This is what the internet looked like when I was born: ${result.exactDate}`} 
                  url="https://time-machine.app/birthday-internet" 
                />
              </div>

              <div className="mt-2 text-center">
                <Link 
                  href={`/simulator/birthday?date=${dateStr}`}
                  className="inline-block bg-[#008080] text-white font-bold px-8 py-4 border-b-4 border-r-4 border-black hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  🚀 BOOT UP BIRTHDAY SIMULATOR
                </Link>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="mt-2 text-red-500 font-bold hover:underline text-center"
              >
                Try Another Date
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
