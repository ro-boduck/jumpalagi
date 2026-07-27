"use client";

import React, { useEffect, useRef, useState } from "react";

interface CursorProps {
  size?: number;
}

export const Cursor: React.FC<CursorProps> = ({ size = 20 }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect mobile / touch devices
    if (typeof window !== "undefined") {
      const isTouch = 
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768;
      
      if (isTouch) {
        setIsTouchDevice(true);
        return;
      }
    }

    // Inject global CSS rule to hide default cursor ONLY on desktop (glow removed)
    const styleEl = document.createElement("style");
    styleEl.id = "global-hide-native-cursor";
    styleEl.innerHTML = `
      *, *::before, *::after, html, body, a, button, input, textarea, select, label, [role="button"] {
        cursor: none !important;
      }
      @keyframes cursor-breath-inner {
        0%, 100% {
          transform: scale(1.3);
        }
        50% {
          transform: scale(1.65);
        }
      }
      .cursor-breathing {
        animation: cursor-breath-inner 1.2s ease-in-out infinite !important;
      }
    `;
    document.head.appendChild(styleEl);

    // High performance animation loop
    const animate = () => {
      if (cursorRef.current) {
        const tx = targetPos.current.x - size / 2;
        const ty = targetPos.current.y - size / 2;
        const cx = currentPos.current.x;
        const cy = currentPos.current.y;

        const newX = cx + (tx - cx) * 0.7;
        const newY = cy + (ty - cy) * 0.7;

        currentPos.current = { x: newX, y: newY };
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible && cursorRef.current) {
        isVisible = true;
        cursorRef.current.style.opacity = "1";
      }

      // Check if target element is clickable (direct DOM update)
      const target = e.target as HTMLElement | null;
      if (target && innerRef.current) {
        const isClickable = !!target.closest(
          'a, button, input, textarea, select, label, [role="button"], .cursor-pointer, .emil-button, [onClick]'
        );
        innerRef.current.classList.toggle("cursor-breathing", isClickable);
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        isVisible = true;
        cursorRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        isVisible = false;
        cursorRef.current.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      const existingStyle = document.getElementById("global-hide-native-cursor");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [size]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 transition-opacity duration-150 will-change-transform"
      style={{
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="w-full h-full rounded-full bg-[#E7AF36] border-2 border-[#0F2D4A] shadow-[1.5px_1.5px_0_0_#0F2D4A] transition-transform duration-200"
      />
    </div>
  );
};

export default Cursor;
