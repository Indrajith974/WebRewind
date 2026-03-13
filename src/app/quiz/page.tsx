"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "@/components/ShareButtons";
import { internetHistory } from "@/data/internetHistory";

interface QuizResult {
  year: number;
  description: string;
  websites: string[];
  tech: string[];
  memes: string[];
}

export default function QuizPage() {
  const [yearInput, setYearInput] = useState("");
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const year = parseInt(yearInput, 10);
    
    // Find the closest era
    const validEra = internetHistory.reduce((prev, curr) => {
      return (Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev);
    });

    setResult(validEra);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--retro-bg)]">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-xl w-full bg-[var(--retro-surface)] p-8 border-4 border-[var(--retro-border)] shadow-2xl text-center">
          
          <h1 className="text-3xl font-black mb-6 text-[var(--retro-primary)] uppercase">Internet Age Quiz</h1>
          
          {!result ? (
            <form onSubmit={handleCalculate} className="flex flex-col gap-6">
              <label className="text-xl font-bold">
                What year did you first start using the internet?
              </label>
              <input 
                type="number" 
                min="1990" 
                max="2024" 
                required
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                placeholder="e.g. 2005"
                className="text-center text-2xl p-4 border-2 border-[var(--retro-border)] bg-[var(--retro-bg)] font-mono focus:outline-none focus:border-[var(--retro-primary)]"
              />
              <button type="submit" className="bg-[var(--retro-primary)] text-white font-bold text-xl py-4 uppercase hover:scale-105 transition-transform shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
                Calculate My Internet Age
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="text-4xl font-black">You are a {result.year} Internet User!</h2>
              <div className="text-left bg-gray-100 text-black p-6 border-2 border-gray-300">
                <p className="font-bold mb-2">You intimately experienced:</p>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li><strong>Websites:</strong> {result.websites.join(", ")}</li>
                  <li><strong>Tech:</strong> {result.tech.join(", ")}</li>
                  {result.memes.length > 0 && <li><strong>Memes:</strong> {result.memes.join(", ")}</li>}
                </ul>
              </div>

              <div className="mt-4">
                <ShareButtons 
                  title={`I am a ${result.year} Internet User on WebRewind! Discover your internet age.`} 
                  url="https://time-machine.app/quiz" 
                />
              </div>

              <button 
                onClick={() => setResult(null)}
                className="mt-4 underline font-bold text-[var(--retro-primary)] hover:opacity-80"
              >
                Retake Quiz
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
