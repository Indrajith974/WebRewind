"use client";
import React, { ReactNode } from "react";

interface RetroWindowProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function RetroWindow({ title, children, onClose, className = "" }: RetroWindowProps) {
  return (
    <div className={`retro-window-container flex flex-col ${className}`} style={{
      border: "2px solid",
      borderTopColor: "#dfdfdf",
      borderLeftColor: "#dfdfdf",
      borderBottomColor: "#000000",
      borderRightColor: "#000000",
      backgroundColor: "#c0c0c0",
      boxShadow: "inset 1px 1px #ffffff, inset -1px -1px #808080",
    }}>
      {/* Title Bar */}
      <div className="bg-[#000080] flex items-center justify-between p-1 select-none">
        <div className="flex items-center gap-2 px-1">
          <span className="text-white font-bold text-sm truncate">{title}</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center bg-[#c0c0c0] font-bold text-xs"
            style={{
              border: "1px solid",
              borderTopColor: "#fff",
              borderLeftColor: "#fff",
              borderBottomColor: "#000",
              borderRightColor: "#000",
            }}
          >
            x
          </button>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-4 flex-grow bg-white border m-[2px]" style={{
        borderTopColor: "#808080",
        borderLeftColor: "#808080",
        borderBottomColor: "#ffffff",
        borderRightColor: "#ffffff",
      }}>
        {children}
      </div>
    </div>
  );
}
