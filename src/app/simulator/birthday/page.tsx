"use client";
import React, { useState, useEffect, Suspense } from "react";
import Draggable from "react-draggable";
import { Folder, X, Square, Minus, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getArchiveUrl } from "@/lib/wayback";

import DraggableWindow from "@/components/DraggableWindow";


function BirthdaySimulatorContent() {
  const searchParams = useSearchParams();
  const dateStr = searchParams.get("date");
  
  // Windows state
  const [windows, setWindows] = useState<{ id: string; title: string; type: string }[]>([]);
  const [notepadContent, setNotepadContent] = useState<string>("Loading historical archives...");
  const [loadingText, setLoadingText] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Exact year and date formatting
  const birthDate = dateStr ? new Date(dateStr) : new Date();
  const isValidDate = !isNaN(birthDate.getTime());
  const year = isValidDate ? birthDate.getFullYear() : new Date().getFullYear();
  const validYear = Math.max(1990, Math.min(year, 2024));
  
  // Pick an iconic site to load in the browser based on their era
  const getIconicSite = (y: number) => {
    if (y < 1995) return "info.cern.ch";
    if (y < 1998) return "yahoo.com";
    if (y < 2005) return "google.com";
    if (y < 2010) return "myspace.com";
    return "youtube.com";
  };
  
  const targetSite = getIconicSite(validYear);
  const archiveUrl = getArchiveUrl(targetSite, validYear);

  useEffect(() => {
    setMounted(true);
    // Auto-open both windows on load
    setWindows([
      { id: "notepad", title: "diary.txt - Notepad", type: "notepad" },
      { id: "browser", title: "Internet Explorer", type: "browser" }
    ]);

    // Fetch dynamic history from Gemini API
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/birthday-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: dateStr })
        });
        
        if (res.ok) {
          const data = await res.json();
          setNotepadContent(data.text);
        } else {
          setNotepadContent("Error: The connection to the historical archive was interrupted. Please try again later.");
        }
      } catch (err) {
        setNotepadContent("Error connecting to timeline servers.");
      } finally {
        setLoadingText(false);
      }
    };

    if (dateStr && isValidDate) {
      fetchHistory();
    } else {
      setNotepadContent(!isValidDate && dateStr ? "Error: Invalid date format provided." : "No date provided.");
      setLoadingText(false);
    }
  }, [dateStr]);

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const bringToFront = (id: string) => {
    setWindows((prev) => {
      const active = prev.find(w => w.id === id);
      if (!active) return prev;
      return [...prev.filter(w => w.id !== id), active];
    });
  };

  return (
    <div 
      className="h-screen w-full overflow-hidden flex flex-col font-sans select-none relative" 
      style={{ backgroundColor: "#008080" }} // Classic Win95 Teal
    >
      {/* Desktop Icons */}
      <div className="flex-grow p-4 flex flex-col gap-6 items-start">
        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group">
          <Globe className="h-10 w-10 text-white fill-blue-800 drop-shadow-md" />
          <span className="text-white text-center text-xs px-1 hover:bg-blue-800">Internet</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group">
          <FileText className="h-10 w-10 text-white fill-yellow-200 drop-shadow-md" />
          <span className="text-white text-center text-xs px-1 hover:bg-blue-800">diary.txt</span>
        </div>
      </div>

      {/* Render Open Windows */}
      {windows.map((win, index) => (
        <DraggableWindow 
          key={win.id}
          win={win}
          index={index}
          targetSite={targetSite}
          archiveUrl={archiveUrl}
          notepadContent={notepadContent}
          loadingText={loadingText}
          bringToFront={bringToFront}
          closeWindow={closeWindow}
        />
      ))}

      {/* Taskbar */}
      <div className="h-8 w-full flex items-center bg-[#C0C0C0] border-t-2 border-white z-50 px-1 absolute bottom-0">
        <Link 
          href="/birthday-internet" 
          className="h-6 px-2 mr-2 bg-[#C0C0C0] border-2 border-[#dfdfdf] border-r-gray-800 border-b-gray-800 flex items-center font-bold text-sm active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] active:border-l-gray-800 active:border-t-gray-800"
        >
          <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="start" className="w-4 h-4 mr-1" />
          Exit
        </Link>
        
        {/* Active Windows on Taskbar */}
        <div className="flex-grow flex items-center gap-1 h-full pr-2">
          {windows.map((win) => (
            <div 
              key={`task-${win.id}`} 
              onClick={() => bringToFront(win.id)}
              className="h-6 px-2 min-w-[100px] bg-[#C0C0C0] border-2 border-[#dfdfdf] border-r-gray-800 border-b-gray-800 flex items-center font-bold text-xs truncate cursor-pointer active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] active:border-l-gray-800 active:border-t-gray-800"
            >
              {win.title}
            </div>
          ))}
        </div>

        {/* System Tray */}
        <div className="h-6 px-2 bg-[#C0C0C0] border-2 border-gray-800 border-r-[#dfdfdf] border-b-[#dfdfdf] flex items-center">
          <span className="text-black text-xs font-mono">{mounted ? birthDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>
        </div>
      </div>
    </div>
  );
}

export default function BirthdaySimulatorPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#008080] flex items-center justify-center text-white">Booting...</div>}>
      <BirthdaySimulatorContent />
    </Suspense>
  );
}
