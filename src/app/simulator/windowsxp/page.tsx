"use client";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { Monitor, Globe, Trash2, Folder, X, Square, Minus } from "lucide-react";
import Link from "next/link";

export default function WindowsXPSimulator() {
  const [windows, setWindows] = useState<{ id: string; title: string; type: string }[]>([]);

  const openWindow = (title: string, type: string) => {
    if (!windows.find((w) => w.title === title)) {
      setWindows([...windows, { id: Math.random().toString(), title, type }]);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  return (
    <div 
      className="h-screen w-full overflow-hidden flex flex-col font-sans select-none relative" 
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=2670&auto=format&fit=crop')", // A bliss-like green rolling hill placeholder
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      
      {/* Desktop Area */}
      <div className="flex-grow p-4 flex flex-col gap-6 items-start">
        
        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group" onDoubleClick={() => openWindow("My Computer", "computer")}>
          <Monitor className="h-12 w-12 text-blue-200 fill-blue-500 drop-shadow-md group-hover:drop-shadow-xl" />
          <span className="text-white text-center text-xs px-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">My Computer</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group" onDoubleClick={() => openWindow("Internet Explorer 6", "browser")}>
          <Globe className="h-12 w-12 text-blue-300 fill-blue-600 drop-shadow-md group-hover:drop-shadow-xl" />
          <span className="text-white text-center text-xs px-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Internet Explorer</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group" onDoubleClick={() => openWindow("Recycle Bin", "bin")}>
          <Trash2 className="h-12 w-12 text-white fill-gray-400 drop-shadow-md group-hover:drop-shadow-xl" />
          <span className="text-white text-center text-xs px-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Recycle Bin</span>
        </div>

      </div>

      {/* Render Open Windows */}
      {windows.map((win, index) => (
        <Draggable key={win.id} handle=".bg-gradient-to-r">
          <div className="absolute top-20 left-20 shadow-2xl rounded-t-lg border border-[#0054E3]" style={{ zIndex: 10 + index }}>
            <div className="w-[500px] h-[350px] flex flex-col bg-[#ECE9D8] rounded-t-lg">
              
              {/* Luna Theme Title Bar */}
              <div className="bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#0058EE] text-white flex items-center justify-between p-1 rounded-t border-b border-[#003B9D]">
                <div className="flex items-center gap-2 pl-2">
                  <span className="font-bold text-sm tracking-wide text-shadow-md">{win.title}</span>
                </div>
                <div className="flex gap-1 pr-1">
                  <button className="w-6 h-6 flex items-center justify-center bg-[#245DDA] border border-white/40 hover:bg-[#3C81F3] rounded-sm shadow-sm transition-colors">
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center bg-[#245DDA] border border-white/40 hover:bg-[#3C81F3] rounded-sm shadow-sm transition-colors">
                    <Square className="w-3 h-3 text-white" />
                  </button>
                  <button 
                    onClick={() => closeWindow(win.id)}
                    className="w-6 h-6 flex items-center justify-center bg-[#E45B4B] hover:bg-[#F07A6D] text-white font-bold rounded-sm border border-white/40 shadow-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="flex-grow bg-white border-2 border-[#ECE9D8] m-1 overflow-hidden flex flex-col">
                {win.type === "computer" && (
                  <div className="flex gap-6 p-6">
                    <div className="flex flex-col items-center gap-2">
                      <Folder className="h-12 w-12 text-blue-400 fill-blue-500 mx-auto" />
                      <span className="text-sm">Local Disk (C:)</span>
                    </div>
                  </div>
                )}

                {win.type === "browser" && (
                  <div className="flex flex-col h-full bg-[#ECE9D8]">
                    {/* IE Toolbar */}
                    <div className="flex items-center gap-2 border-b border-gray-300 pb-1 pt-1 px-2">
                      <span className="text-sm text-gray-500 px-2 cursor-pointer">File</span>
                      <span className="text-sm text-gray-500 px-2 cursor-pointer">Edit</span>
                      <span className="text-sm text-gray-500 px-2 cursor-pointer">View</span>
                      <span className="text-sm text-gray-500 px-2 cursor-pointer">Favorites</span>
                      <span className="text-sm text-gray-500 px-2 cursor-pointer">Tools</span>
                      <span className="text-sm text-gray-500 px-2 cursor-pointer">Help</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 border-b border-gray-300">
                      <span className="text-sm pl-2">Address</span>
                      <div className="flex-grow bg-white border border-blue-300 flex items-center px-1">
                        <Globe className="h-4 w-4 text-blue-500 mr-1" />
                        <input type="text" readOnly value="http://time-machine.app" className="flex-grow outline-none text-sm py-1" />
                      </div>
                      <Link href="/browser/2002" className="px-4 py-1 flex items-center gap-1 bg-gradient-to-b from-[#f2f2f2] to-[#d6d6d6] border border-gray-400 rounded-sm hover:from-[#fdfdfd] hover:to-[#e0e0e0] text-sm">
                        Go
                      </Link>
                    </div>
                    {/* IE Body */}
                    <div className="flex-grow bg-white flex items-center justify-center p-4 text-center border-t border-gray-400">
                      <div className="max-w-sm">
                        <h2 className="text-xl font-bold text-blue-800 mb-2">You are connected to the Internet.</h2>
                        <p className="text-sm text-gray-600 mb-4">Click &quot;Go&quot; to browse the archives from the early 2000s.</p>
                      </div>
                    </div>
                  </div>
                )}

                {win.type === "bin" && (
                  <div className="p-4 text-gray-500 text-center flex items-center justify-center h-full">
                    Recycle Bin is empty.
                  </div>
                )}
              </div>

            </div>
          </div>
        </Draggable>
      ))}

      {/* Taskbar */}
      <div className="h-10 w-full flex items-center z-50 bg-gradient-to-b from-[#245DDA] via-[#1140A7] to-[#245DDA]">
        {/* Start Button */}
        <Link href="/" className="h-full bg-gradient-to-b from-[#3C81F3] to-[#2051B8] hover:from-[#5190F5] hover:to-[#2B60CC] px-4 flex items-center gap-2 rounded-r-[16px] shadow-[2px_0_5px_rgba(0,0,0,0.5)] cursor-pointer">
          <Globe className="h-6 w-6 text-white bg-[#E45B4B] rounded-full p-1" />
          <span className="text-white italic font-bold text-xl pr-2 tracking-wide text-shadow-md">start</span>
        </Link>
        
        {/* Active Windows on Taskbar */}
        <div className="flex-grow flex items-center px-2 gap-1 h-full pt-1">
          {windows.map((win) => (
            <div key={win.id} className="h-8 px-3 flex items-center min-w-[120px] max-w-[160px] bg-gradient-to-b from-[#5586F4] to-[#245DDA] rounded-t-md text-white font-bold text-xs truncate shadow-inner border-x border-[#1140A7] border-t">
              {win.title}
            </div>
          ))}
        </div>

        {/* System Tray */}
        <div className="h-full bg-gradient-to-b from-[#119ED8] to-[#0A6CA0] px-4 flex items-center justify-end min-w-[100px] shadow-[inset_1px_0_0_#A8D7F1] border-l border-[#000000]/20">
          <span className="text-white text-xs">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
    </div>
  );
}
