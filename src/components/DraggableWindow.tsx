"use client";
import React from "react";
import Draggable from "react-draggable";
import { X } from "lucide-react";

export default function DraggableWindow({ win, index, targetSite, archiveUrl, notepadContent, loadingText, bringToFront, closeWindow }: any) {
  const nodeRef = React.useRef(null);
  
  return (
    <Draggable key={win.id} handle=".drag-handle" bounds="parent" onMouseDown={() => bringToFront(win.id)} nodeRef={nodeRef}>
      <div 
        ref={nodeRef}
        className="absolute shadow-[2px_2px_0px_0px_#000000] border-2 border-[#dfdfdf] border-r-gray-800 border-b-gray-800 bg-[#C0C0C0]"
        style={{ 
          zIndex: 10 + index,
          // Stagger default positions
          top: win.type === "notepad" ? "10%" : "20%",
          left: win.type === "notepad" ? "10%" : "30%", 
          width: win.type === "browser" ? "800px" : "500px",
          height: win.type === "browser" ? "600px" : "450px"
        }}
      >
        {/* Classic Win95 Title Bar */}
        <div className="drag-handle bg-[#0000AA] text-white flex items-center justify-between p-1 m-[2px] cursor-move">
          <span className="font-bold text-sm tracking-wide pl-1 truncate">
            {win.title}
          </span>
          <div className="flex gap-1 pr-1">
            <button 
              onClick={() => closeWindow(win.id)}
              className="w-5 h-5 flex items-center justify-center bg-[#C0C0C0] text-black font-bold border-2 border-[#dfdfdf] border-r-gray-800 border-b-gray-800 shadow-sm active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] active:border-l-gray-800 active:border-t-gray-800"
            >
              <X className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="bg-white border-2 border-gray-800 border-r-[#dfdfdf] border-b-[#dfdfdf] m-1" style={{ height: "calc(100% - 34px)" }}>
          {win.type === "notepad" && (
            <div className="h-full flex flex-col bg-white">
              <div className="flex items-center gap-4 border-b border-gray-300 px-2 py-1 text-xs">
                <span className="cursor-pointer">File</span>
                <span className="cursor-pointer">Edit</span>
                <span className="cursor-pointer">Search</span>
                <span className="cursor-pointer">Help</span>
              </div>
              <textarea 
                readOnly
                value={notepadContent}
                className={`flex-grow w-full p-2 outline-none resize-none font-mono text-sm leading-relaxed ${loadingText ? 'animate-pulse text-gray-400' : 'text-black'}`}
              />
            </div>
          )}

          {win.type === "browser" && (
            <div className="flex flex-col h-full bg-[#C0C0C0]">
              {/* Toolbar */}
              <div className="flex items-center gap-2 border-b border-gray-400 pb-1 pt-1 px-2">
                <span className="text-xs px-2 cursor-pointer">File</span>
                <span className="text-xs px-2 cursor-pointer">Edit</span>
                <span className="text-xs px-2 cursor-pointer">View</span>
                <span className="text-xs px-2 cursor-pointer">Favorites</span>
                <span className="text-xs px-2 cursor-pointer">Help</span>
              </div>
              <div className="flex items-center gap-2 p-2 border-b border-gray-400">
                <span className="text-xs pl-2">Address</span>
                <div className="flex-grow bg-white border-2 border-gray-800 border-r-[#dfdfdf] border-b-[#dfdfdf] flex items-center px-1">
                  <input type="text" readOnly value={`http://${targetSite}`} className="flex-grow outline-none text-xs py-1 px-1 font-mono" />
                </div>
              </div>
              
              {/* Web Frame */}
              <div className="flex-grow bg-white flex items-center justify-center border-t-2 border-l-2 border-gray-800 border-r-[#dfdfdf] border-b-[#dfdfdf] m-1 overflow-hidden">
                <iframe
                  src={archiveUrl}
                  className="w-[1024px] h-[768px] origin-top-left"
                  style={{ 
                    transform: "scale(0.75)", // scale down slightly to fit the 800x600 window nicer
                    width: "133%" 
                  }}
                  title="Archived Browser"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}
