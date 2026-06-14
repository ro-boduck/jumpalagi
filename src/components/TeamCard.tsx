'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Kanban, Calculator, Radio, ShieldCheck } from 'lucide-react';

// Bold Swiss Modernism color palettes for each member
const PALETTES: Record<string, { bg: string; border: string; accent: string; text: string; index: string; doorBg: string; doorText: string }> = {
  pm: {
    bg: '#F9F6EE', // Bone White interior
    border: '#111827',
    accent: '#E7AF36', // Yellow/Gold accent
    text: '#111827',
    index: '01',
    doorBg: '#0F2D4A', // Navy Blue door
    doorText: '#F9F6EE', // White text on Navy door
  },
  finance: {
    bg: '#F9F6EE',
    border: '#111827',
    accent: '#1D699B', // Medium Blue accent
    text: '#111827',
    index: '02',
    doorBg: '#E7AF36', // Yellow door
    doorText: '#0F2D4A', // Navy text on Yellow door
  },
  pr: {
    bg: '#F9F6EE',
    border: '#111827',
    accent: '#E7AF36', // Yellow/Gold accent
    text: '#111827',
    index: '03',
    doorBg: '#0F2D4A', // Navy Blue door
    doorText: '#F9F6EE', // White text on Navy door
  },
  ops: {
    bg: '#F9F6EE',
    border: '#111827',
    accent: '#1D699B', // Medium Blue accent
    text: '#111827',
    index: '04',
    doorBg: '#E7AF36', // Yellow door
    doorText: '#0F2D4A', // Navy text on Yellow door
  },
};

const getIcon = (roleKey: string, className: string) => {
  switch (roleKey) {
    case 'pm':
      return <Kanban className={className} />;
    case 'finance':
      return <Calculator className={className} />;
    case 'pr':
      return <Radio className={className} />;
    case 'ops':
      return <ShieldCheck className={className} />;
    default:
      return <Kanban className={className} />;
  }
};

interface TeamCardProps {
  nickname: string;
  name: string;
  role: string;
  idCode: string;
  contactUrl: string;
  roleKey: string;
  motto: string;
  isOpened: boolean;
  onToggle: () => void;
  borderClasses: string;
}

export function TeamCard({ nickname, name, role, idCode, contactUrl, roleKey, motto, isOpened, onToggle, borderClasses }: TeamCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const startCoordsRef = useRef({ x: 0, y: 0 });
  const currentDragPctRef = useRef(0);
  const dragInitialOpenedRef = useRef(false);

  const palette = PALETTES[roleKey] || PALETTES.pm;

  // GSAP Sticker Peel Animation (Driven by isOpened state)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpened) {
        // Peel open
        gsap.to(coverRef.current, {
          xPercent: -108,
          yPercent: -108,
          rotate: -15,
          skewX: -6,
          skewY: -6,
          boxShadow: '-10px 10px 25px rgba(17, 24, 39, 0.25)',
          '--peel-amount': '100%',
          '--peel-shadow-opacity': 1,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(interiorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        // Stick back closed
        gsap.to(coverRef.current, {
          xPercent: 0,
          yPercent: 0,
          rotate: 0,
          skewX: 0,
          skewY: 0,
          boxShadow: '0px 0px 0px rgba(0,0,0,0)',
          '--peel-amount': '0%',
          '--peel-shadow-opacity': 0,
          duration: 0.65,
          ease: 'power2.inOut',
        });
        gsap.to(interiorRef.current, {
          scale: 0.96,
          opacity: 0.8,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, [isOpened]);

  // Pointer Gesture Handlers (for interactive drag-to-peel experience)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Prevent dragging if clicking inside CTA link
    if ((e.target as HTMLElement).closest('a')) return;
    
    isDraggingRef.current = true;
    dragInitialOpenedRef.current = isOpened;
    startCoordsRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.touchAction = 'none';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !coverRef.current || !containerRef.current) return;
    
    const dx = e.clientX - startCoordsRef.current.x;
    const dy = e.clientY - startCoordsRef.current.y;
    
    const cardWidth = containerRef.current.getBoundingClientRect().width || 300;
    const maxDragDistance = cardWidth * 1.1; // scale factor
    
    let dragPct = 0;
    if (dragInitialOpenedRef.current) {
      // Dragging to close: starting at 1.0, dragging bottom-right (positive dx, dy) reduces it
      const distance = dx + dy;
      dragPct = Math.min(Math.max(1.0 - distance / maxDragDistance, 0), 1.0);
    } else {
      // Dragging to open: starting at 0.0, dragging top-left (negative dx, dy) increases it
      const distance = -dx - dy;
      dragPct = Math.min(Math.max(distance / maxDragDistance, 0), 1.0);
    }
    
    currentDragPctRef.current = dragPct;

    // Live update GSAP styles during dragging
    gsap.to(coverRef.current, {
      xPercent: dragPct * -108,
      yPercent: dragPct * -108,
      rotate: dragPct * -15,
      skewX: dragPct * -6,
      skewY: dragPct * -6,
      boxShadow: `-${dragPct * 10}px ${dragPct * 10}px ${dragPct * 25}px rgba(17, 24, 39, ${dragPct * 0.25})`,
      '--peel-amount': `${dragPct * 100}%`,
      '--peel-shadow-opacity': dragPct,
      duration: 0.05,
      overwrite: 'auto',
    });
    
    gsap.to(interiorRef.current, {
      scale: Math.min(0.96 + dragPct * 0.04, 1),
      opacity: Math.min(0.8 + dragPct * 0.2, 1),
      duration: 0.05,
      overwrite: 'auto',
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    const dx = e.clientX - startCoordsRef.current.x;
    const dy = e.clientY - startCoordsRef.current.y;
    const clickDistance = Math.sqrt(dx * dx + dy * dy);
    
    const dragPct = currentDragPctRef.current;
    currentDragPctRef.current = 0;

    if (clickDistance < 6) {
      // Trigger normal toggle on clean click/tap
      onToggle();
    } else {
      if (dragInitialOpenedRef.current) {
        // Dragging to close
        // If dragged more than 35% towards closed (dragPct < 0.65)
        if (dragPct < 0.65) {
          onToggle(); // sets openedCardIdx to null/other
        } else {
          // Snap back open
          gsap.to(coverRef.current, {
            xPercent: -108,
            yPercent: -108,
            rotate: -15,
            skewX: -6,
            skewY: -6,
            boxShadow: '-10px 10px 25px rgba(17, 24, 39, 0.25)',
            '--peel-amount': '100%',
            '--peel-shadow-opacity': 1,
            duration: 0.45,
            ease: 'power2.out',
          });
          gsap.to(interiorRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
          });
        }
      } else {
        // Dragging to open
        // If dragged more than 35% towards open (dragPct > 0.35)
        if (dragPct > 0.35) {
          onToggle(); // sets openedCardIdx to this index
        } else {
          // Snap back closed
          gsap.to(coverRef.current, {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            skewX: 0,
            skewY: 0,
            boxShadow: '0px 0px 0px rgba(0,0,0,0)',
            '--peel-amount': '0%',
            '--peel-shadow-opacity': 0,
            duration: 0.45,
            ease: 'power2.out',
          });
          gsap.to(interiorRef.current, {
            scale: 0.96,
            opacity: 0.8,
            duration: 0.45,
            ease: 'power2.out',
          });
        }
      }
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent closing if clicking inside secondary links
    if ((e.target as HTMLElement).closest('a')) return;
    if (isOpened) {
      onToggle();
    }
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleCardClick}
      className="flex flex-col items-center select-none w-full relative cursor-pointer overflow-visible"
    >
      {/* Square aspect ratio card */}
      <div className="w-full aspect-square relative overflow-visible bg-transparent">
        
        {/* INTERIOR (REVEAL CONTAINER) */}
        <div 
          ref={interiorRef}
          className={`w-full h-full absolute inset-0 flex flex-col p-6 justify-between rounded-none bg-[#F9F6EE] z-10 ${borderClasses}`}
          style={{ 
            color: palette.text,
            backgroundImage: 'radial-gradient(rgba(17, 24, 39, 0.08) 0.75px, transparent 0.75px)',
            backgroundSize: '12px 12px',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-[1.5px] border-[#111827]/10 pb-2.5 shrink-0">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#7A756D]">MOTTO PANEL //</span>
            <span 
              className="text-[8px] font-mono font-bold px-1.5 py-0.5 border border-[#111827]"
              style={{ backgroundColor: `${palette.accent}15`, color: palette.accent }}
            >
              {idCode}
            </span>
          </div>

          {/* Handwriting Motto Container */}
          <div className="flex-1 flex items-center justify-center py-4 px-2">
            <p 
              className="text-center font-handwriting leading-relaxed text-3xl md:text-4xl select-none"
              style={{ 
                fontFamily: 'var(--font-handwriting), cursive',
                color: palette.accent,
              }}
            >
              &ldquo;{motto}&rdquo;
            </p>
          </div>

          {/* CTA Link & Full Name Footer */}
          <div className="mt-auto shrink-0 flex flex-col gap-2.5">
            <div className="flex justify-between items-end border-t-[1.5px] border-[#111827]/10 pt-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[7px] font-mono font-bold text-[#7A756D] tracking-widest leading-none">MEMBER //</span>
                <span className="text-xs font-black uppercase tracking-tight truncate leading-tight mt-0.5">{name}</span>
              </div>
            </div>
            <a 
              href={contactUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <button 
                className="w-full py-1.5 border-[1.5px] border-[#111827] font-black text-[9px] uppercase tracking-widest transition-all duration-150 active:scale-[0.98] select-none hover:-translate-y-0.5"
                style={{ 
                  backgroundColor: palette.accent, 
                  color: '#FFFFFF',
                  boxShadow: `2px 2px 0px 0px ${palette.border}`,
                }}
              >
                Contact Member
              </button>
            </a>
          </div>
        </div>

        {/* STICKER COVER (Peels back on Pointer Drag) */}
        <div
          ref={coverRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`absolute z-20 flex flex-col justify-between rounded-none ${borderClasses}`}
          // Slight boundary offset to envelop the interior borders when closed
          style={{ 
            left: '-1.5px',
            top: '-1.5px',
            width: 'calc(100% + 3.5px)',
            height: 'calc(100% + 3.5px)',
            backgroundColor: palette.doorBg,
            color: palette.doorText,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - var(--peel-amount, 0%)), calc(100% - var(--peel-amount, 0%)) 100%, 0% 100%)',
            '--peel-amount': isOpened ? '100%' : '0%',
            '--peel-shadow-opacity': isOpened ? 1 : 0,
          } as React.CSSProperties}
        >
          {/* Top Section (2/3 of card height) */}
          <div className="flex-1 flex flex-col p-5 justify-between">
            <div className="flex justify-between items-start">
              {/* Asymmetrical Swiss Index */}
              <span 
                className="text-6xl font-black tracking-tighter leading-none"
                style={{ color: palette.accent }}
              >
                {palette.index}
              </span>
              <span 
                className="text-[8px] font-mono font-bold px-2 py-0.5 border bg-[#F9F6EE] text-[#111827] shadow-[1.5px_1.5px_0px_0px_#111827]"
                style={{ borderColor: palette.border }}
              >
                STAFF
              </span>
            </div>

            {/* Center: Lucide Icon in bordered square */}
            <div className="flex justify-center my-auto py-2">
              <div 
                className="w-16 h-16 border-[1.5px] bg-[#F9F6EE] flex items-center justify-center p-3.5 rounded-none shadow-[2.5px_2.5px_0px_0px_#111827]"
                style={{ color: palette.accent, borderColor: palette.border }}
              >
                {getIcon(roleKey, 'w-8 h-8')}
              </div>
            </div>
          </div>

          {/* Horizontal Swiss Divider Line */}
          <div className="w-full h-[1.5px]" style={{ backgroundColor: palette.border }} />

          {/* Bottom Section (1/3 of card height) */}
          <div className="p-5 flex justify-between items-end bg-[#111827]/5">
            {/* Nickname (Left) */}
            <div className="flex flex-col">
              <span className="text-[8px] font-mono font-bold tracking-widest opacity-60">NAME //</span>
              <span className="text-xl font-black uppercase tracking-tight leading-none truncate">
                {nickname}
              </span>
            </div>

            {/* Role title (Right) */}
            <div className="flex flex-col text-right">
              <span className="text-[8px] font-mono font-bold tracking-widest opacity-60">ROLE //</span>
              <span className="text-xs font-black uppercase tracking-tight leading-none truncate max-w-[110px]">
                {role}
              </span>
            </div>
          </div>

          {/* FOLD SHADOW (Casts shadow on interior panel) */}
          <div
            className="pointer-events-none absolute transition-opacity duration-75"
            style={{
              bottom: '0px',
              right: '0px',
              width: 'var(--peel-amount, 0%)',
              height: 'var(--peel-amount, 0%)',
              background: 'rgba(17, 24, 39, 0.4)',
              filter: 'blur(8px)',
              clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
              transform: 'translate(-6px, -6px)',
              opacity: 'var(--peel-shadow-opacity, 0)',
            }}
          />

          {/* FOLD BACKSIDE (Paper sticker backside with diagonal gradient) */}
          <div
            className="pointer-events-none absolute border-l-[1.5px] border-t-[1.5px]"
            style={{
              bottom: '-1.5px',
              right: '-1.5px',
              width: 'calc(var(--peel-amount, 0%) + 1.5px)',
              height: 'calc(var(--peel-amount, 0%) + 1.5px)',
              background: 'linear-gradient(135deg, #FEFCFF 0%, #F3F4F6 40%, #E5E7EB 70%, #94A3B8 100%)',
              clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)',
              borderColor: palette.border,
            }}
          />
        </div>

      </div>
    </div>
  );
}
