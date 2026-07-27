"use client";

import { useState } from "react";

interface CartoonButtonProps {
  label: string;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function CartoonButton({
  label,
  color = 'bg-accent text-[#0F2D4A]',
  hasHighlight = true,
  disabled = false,
  onClick,
}: CartoonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div
      className={`inline-block ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <button
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative h-12 px-6 text-lg rounded-full font-black uppercase tracking-wider border-2 border-[#0F2D4A] transition-all duration-150 overflow-hidden group
        ${color} hover:shadow-[4px_4px_0_0_#0F2D4A]
        ${disabled ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none'}`}
      >
        <span className="relative z-10 whitespace-nowrap pointer-events-none">{label}</span>
        {hasHighlight && !disabled && (
          <div
            className={`absolute inset-0 pointer-events-none transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/70 to-transparent ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
          />
        )}
      </button>
    </div>
  );
}
