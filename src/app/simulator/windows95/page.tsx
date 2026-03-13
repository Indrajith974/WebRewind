"use client";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { RetroWindow } from "@/components/RetroWindow";
import { Monitor, Folder, Globe, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Windows95Simulator() {
  const [windows, setWindows] = useState<{ id: string, title: string, type: string }[]>([]);

  const openWindow = (title: string, type: string) => {
    if (!windows.find((w) => w.title === title)) {
      setWindows([...windows, { id: Math.random().toString(), title, type }]);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  return (
    <div className="h-screen w-full bg-[#008080] overflow-hidden flex flex-col font-mono text-sm select-none" style={{ backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928GBgYmBggwAAgwADcBAwP0ePz8AAAAAElFTkSuQmCC')"}}>
      
      {/* Desktop Area */}
      <div className="flex-grow p-4 flex flex-col gap-6 items-start">
        
        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group" onClick={() => openWindow("My Computer", "computer")}>
          <Monitor className="h-10 w-10 text-white fill-blue-500 stroke-1 drop-shadow-md group-hover:brightness-110" />
          <span className="text-white text-center text-xs px-1 bg-transparent group-active:bg-blue-800 group-focus:bg-blue-800">My Computer</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group" onClick={() => openWindow("Internet Explorer", "browser")}>
          <Globe className="h-10 w-10 text-blue-300 fill-blue-800 stroke-1 drop-shadow-md group-hover:brightness-110" />
          <span className="text-white text-center text-xs px-1 bg-transparent group-active:bg-blue-800 group-focus:bg-blue-800">Internet Explorer</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group" onClick={() => openWindow("Recycle Bin", "bin")}>
          <Trash2 className="h-10 w-10 text-white fill-gray-300 stroke-1 drop-shadow-md group-hover:brightness-110" />
          <span className="text-white text-center text-xs px-1 bg-transparent group-active:bg-blue-800 group-focus:bg-blue-800">Recycle Bin</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer w-20 group">
          <Folder className="h-10 w-10 text-yellow-300 fill-yellow-400 stroke-1 drop-shadow-md group-hover:brightness-110" />
          <span className="text-white text-center text-xs px-1 bg-transparent group-active:bg-blue-800 group-focus:bg-blue-800">Internet History</span>
        </div>

      </div>

      {/* Render Open Windows */}
      {windows.map((win, index) => (
        <Draggable key={win.id} handle=".bg-\\[\\#000080\\]">
          <div className="absolute top-20 left-20" style={{ zIndex: 10 + index }}>
            <RetroWindow title={win.title} onClose={() => closeWindow(win.id)} className="w-[400px] h-[300px]">
              
              {win.type === "computer" && (
                <div className="flex gap-4 p-4">
                  <div className="text-center">
                    <Folder className="h-8 w-8 text-yellow-500 mx-auto" />
                    <span>C:</span>
                  </div>
                  <div className="text-center">
                    <Folder className="h-8 w-8 text-yellow-500 mx-auto" />
                    <span>D:</span>
                  </div>
                </div>
              )}

              {win.type === "browser" && (
                <div className="flex flex-col h-full bg-white">
                  <div className="flex items-center gap-2 border-b-2 border-gray-300 pb-2 mb-2 p-2 bg-[#e0dfdf]">
                    <span className="text-xs">Address:</span>
                    <input type="text" readOnly value="http://time-machine.app" className="flex-grow border px-1" />
                    <Link href="/browser/1995" className="px-2 py-0.5 border border-gray-500 bg-gray-200 shadow-[1px_1px_0_0_#fff_inset,-1px_-1px_0_0_#000_inset] active:shadow-[1px_1px_0_0_#000_inset,-1px_-1px_0_0_#fff_inset]">
                      Go
                    </Link>
                  </div>
                  <div className="flex-grow flex items-center justify-center p-4 text-center">
                    <p>Welcome to the World Wide Web!<br/>Click &quot;Go&quot; to open the full Emulator.</p>
                  </div>
                </div>
              )}

              {win.type === "bin" && (
                <div className="p-4 text-gray-500 text-center flex items-center justify-center h-full">
                  Recycle Bin is empty.
                </div>
              )}

            </RetroWindow>
          </div>
        </Draggable>
      ))}

      {/* Taskbar */}
      <div className="h-8 bg-[#c0c0c0] w-full border-t-[2px] border-white flex items-center px-1 gap-1 z-50">
        <Link href="/" className="h-6 px-2 flex items-center gap-1 font-bold shadow-[1px_1px_0_0_#fff_inset,-1px_-1px_0_0_#000_inset] active:shadow-[1px_1px_0_0_#000_inset,-1px_-1px_0_0_#fff_inset] cursor-pointer">
          <Monitor className="h-4 w-4" /> Start
        </Link>
        
        <div className="w-[2px] h-6 border-r-[2px] border-gray-500 border-l-[2px] border-white mx-1" />

        {/* Taskbar items */}
        {windows.map((win) => (
          <div key={win.id} className="h-6 px-4 flex items-center min-w-[120px] max-w-[150px] font-bold shadow-[1px_1px_0_0_#000_inset,-1px_-1px_0_0_#fff_inset] bg-[#d3d3d3] text-xs truncate">
            {win.title}
          </div>
        ))}

        <div className="ml-auto h-6 px-2 flex items-center shadow-[1px_1px_0_0_#000_inset,-1px_-1px_0_0_#fff_inset] text-xs">
          12:00 PM
        </div>
      </div>
    </div>
  );
}
