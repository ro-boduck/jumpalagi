'use client';

import React, { useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const DICT = {
  ID: {
    heroTitle: 'BAGAIMANA JUMPA LAGI LAHIR.',
    chapters: [
      {
        num: '01',
        title: 'Frustrasi Kolektif',
        subtitle: 'The Drift // Momentum yang Hilang',
        coord: 'COORD: 8.7991° S, 115.1625° E',
        text: 'Berawal dari rasa lelah melihat wacana reuni yang selalu kandas. Mengatur jadwal, selera, dan ekspektasi ratusan orang adalah pekerjaan penuh waktu yang tak seorang pun ingin lakukan secara sukarela.'
      },
      {
        num: '02',
        title: 'Drama Kepanitiaan',
        subtitle: 'The Friction // Beban di Balik Rindu',
        coord: 'T-02 // MATRIX: F-COLLAPSE',
        text: 'Uang patungan yang mandek hingga perdebatan lokasi seringkali menghancurkan esensi sejati dari reuni itu sendiri: untuk sekadar kembali berjumpa dan bernostalgia tanpa beban.'
      },
      {
        num: '03',
        title: 'Kami Mengambil Alih',
        subtitle: 'The Convergence // Jalan Kembali Pulang',
        coord: 'T-03 // SYSTEM: CLOSE-LOOP',
        text: 'Dari situlah Jumpa Lagi diciptakan. Kami mengambil alih peran "Si Paling Repot". Anda cukup datang, duduk manis, dan menikmati momen. Kami adalah spesialis perencana reuni Anda.',
        quote: '"Koneksi seharusnya tanpa beban. Saat kita mulai disibukkan dengan urusan logistik, kita lupa alasan mengapa kita ingin berjumpa."'
      }
    ],
    teamTitle: 'TIM KAMI',
    teamSubtitle: 'ORANG-ORANG DI BALIK LAYAR',
    roles: {
      pm: 'Project Manager',
      finance: 'Finance',
      pr: 'PR & Marketing',
      ops: 'Operational & Event Manager'
    }
  },
  EN: {
    heroTitle: 'HOW JUMPA LAGI WAS BORN.',
    chapters: [
      {
        num: '01',
        title: 'Collective Frustration',
        subtitle: 'The Drift // The Lost Momentum',
        coord: 'COORD: 8.7991° S, 115.1625° E',
        text: 'It started from the exhaustion of seeing reunion plans constantly fall apart. Managing the schedules and expectations of hundreds is a full-time job no one wants to volunteer for.'
      },
      {
        num: '02',
        title: 'Committee Drama',
        subtitle: 'The Friction // The Weight of Nostalgia',
        coord: 'T-02 // MATRIX: F-COLLAPSE',
        text: 'Stalled payments and location debates often ruin the true essence of a reunion: to simply meet again and reminisce without any burden.'
      },
      {
        num: '03',
        title: 'We Take Over',
        subtitle: 'The Convergence // The Road Back Home',
        coord: 'T-03 // SYSTEM: CLOSE-LOOP',
        text: 'That is why Jumpa Lagi was created. We take over the "heavy lifting". You just show up, relax, and enjoy the moment. We are your dedicated reunion specialists.',
        quote: '"Connection should be effortless. The moment we start coordinating is the moment we start forgetting why we wanted to meet."'
      }
    ],
    teamTitle: 'OUR TEAM',
    teamSubtitle: 'THE PEOPLE BEHIND THE SCENES',
    roles: {
      pm: 'Project Manager',
      finance: 'Finance',
      pr: 'PR & Marketing',
      ops: 'Operational & Event Manager'
    }
  }
};

const TEAM = [
  { name: 'Aisyah Ramadhania Putri', roleKey: 'pm' },
  { name: 'Made Ayu Mahadewi Wicaksana Putri', roleKey: 'finance' },
  { name: 'Komang Ayu Verra Fridayani', roleKey: 'pr' },
  { name: 'Zaneta Uli Callista Siregar', roleKey: 'ops' },
];

const Footprint = ({ isLeft }: { isLeft: boolean }) => (
  <svg width="40" height="80" viewBox="0 0 100 200" fill="currentColor" style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}>
    <ellipse cx="50" cy="160" rx="20" ry="30" />
    <path d="M 30 110 C 10 90, 20 40, 50 40 C 80 40, 80 90, 70 110 C 60 130, 40 130, 30 110 Z" />
    <circle cx="65" cy="20" r="12" />
    <circle cx="45" cy="15" r="9" />
    <circle cx="30" cy="18" r="7" />
    <circle cx="18" cy="28" r="6" />
    <circle cx="10" cy="40" r="5" />
  </svg>
);

// ponytail: pre-computed swarm grid, 15×6 = 90 squares per member
const SWARM_SQUARES = (() => {
  const cols = 15, rows = 6;
  const squares: { left: string; top: string; w: string; h: string; delay: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      squares.push({
        left: `${(c / cols) * 100}%`,
        top: `${(r / rows) * 100}%`,
        w: `${100 / cols}%`,
        h: `${100 / rows}%`,
        delay: c * 35 + ((r * 7 + c * 3) % 4) * 20,
      });
    }
  }
  return squares;
})();

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

const RewindIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z" />
  </svg>
);

const getRoleIcon = (roleKey: string) => {
  switch (roleKey) {
    case 'pm':
      return (
        <svg className="w-4 h-4 mr-2 text-[#1D699B] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
        </svg>
      );
    case 'finance':
      return (
        <svg className="w-4 h-4 mr-2 text-[#1D699B] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      );
    case 'pr':
      return (
        <svg className="w-4 h-4 mr-2 text-[#1D699B] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a4 4 0 0 1 0 7M19 6a7 7 0 0 1 0 12" />
        </svg>
      );
    case 'ops':
      return (
        <svg className="w-4 h-4 mr-2 text-[#1D699B] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    default:
      return null;
  }
};

interface FootstepData {
  id: number;
  x: number;
  y: number;
  rotation: number;
  isLeft: boolean;
}

function HeroSection({ t }: { t: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [footsteps, setFootsteps] = useState<FootstepData[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastStepTime = useRef(0);
  const stepCount = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (lastPos.current.x === 0 && lastPos.current.y === 0) {
      lastPos.current = { x, y };
      return;
    }
    
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const now = Date.now();
    
    if (distance > 100 && now - lastStepTime.current > 150) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      const nx = dx / distance;
      const ny = dy / distance;
      
      const offsetDistance = 35; 
      const isLeft = stepCount.current % 2 === 0;
      
      const offsetX = (isLeft ? ny : -ny) * offsetDistance;
      const offsetY = (isLeft ? -nx : nx) * offsetDistance;

      const newStep: FootstepData = {
        id: now + Math.random(),
        x: x + offsetX,
        y: y + offsetY,
        rotation: angle,
        isLeft,
      };
      
      setFootsteps((prev) => {
        const next = [...prev, newStep];
        if (next.length > 15) return next.slice(next.length - 15);
        return next;
      });
      
      lastPos.current = { x, y };
      lastStepTime.current = now;
      stepCount.current += 1;
      
      setTimeout(() => {
        setFootsteps((prev) => prev.filter(step => step.id !== newStep.id));
      }, 2000);
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, damping: 12, stiffness: 200 },
    },
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="col-span-1 md:col-span-12 py-12 px-5 md:p-24 border-b-2 border-border bg-[#E7AF36] bg-[radial-gradient(rgba(15,45,74,0.1)_2px,transparent_2px)] [background-size:24px_24px] text-[#0F2D4A] flex flex-col justify-center min-h-[50vh] relative overflow-hidden"
    >
      <AnimatePresence>
        {footsteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.95, rotate: step.rotation, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, rotate: step.rotation, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, rotate: step.rotation, x: "-50%", y: "-50%" }}
            transition={{ 
              opacity: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
              scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } 
            }}
            className="absolute text-[#1D699B]/60 pointer-events-none"
            style={{
              left: step.x,
              top: step.y,
            }}
          >
            <Footprint isLeft={step.isLeft} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.h1 
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl lg:text-[8rem] font-heading font-black text-white uppercase tracking-tighter leading-[0.85] max-w-6xl z-10 pointer-events-none flex flex-wrap"
      >
        {t.heroTitle.split(" ").map((word: string, wordIdx: number) => (
          <span key={wordIdx} className="inline-block mr-[0.25em]">
            {word.split("").map((char, charIdx) => (
              <motion.span key={charIdx} variants={charVariants} className="inline-block text-white">
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>
    </section>
  );
}

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = DICT[lang];
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (idx: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const formatSubtitle = (subtitle: string) => {
    return subtitle.split('//').map(s => s.trim()).join(' • ');
  };

  return (
    <main className="flex-1 w-full flex flex-col bg-bg bg-[linear-gradient(to_right,rgba(17,24,39,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.03)_1px,transparent_1px)] bg-[size:40px_40px] text-[#0F2D4A] selection:bg-accent selection:text-white min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
        
        <HeroSection t={t} />

        <section 
          className="col-span-1 md:col-span-12 border-b-2 border-border py-12 px-5 md:py-24 md:px-12 relative bg-[#F4EAD4] bg-[linear-gradient(to_right,rgba(15,45,74,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,45,74,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto z-10 relative">
            
            {/* Chapter 01 */}
            <div 
              className="[perspective:1000px] h-[400px] cursor-pointer group"
              onClick={() => toggleFlip(0)}
            >
              <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${flippedCards[0] ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* Front Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] p-2 bg-black/5 border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:scale-[1.01] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="p-8 bg-[#0F2D4A] text-white rounded-[2rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-sans uppercase tracking-wider text-white/55">
                          Chapter 01
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E7AF36]"></span>
                      </div>
                      <span className="block font-semibold text-xs sm:text-sm text-[#E7AF36] mb-3">
                        {formatSubtitle(t.chapters[0].subtitle)}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
                        {t.chapters[0].title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
                      <span className="text-[11px] font-sans tracking-wider text-white/55 uppercase">Read Story</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 shadow-sm group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                        <ArrowIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-2 bg-black/5 border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                  <div className="p-6 bg-[#0F2D4A] text-white rounded-[2rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-sans uppercase tracking-wider text-white/55">
                          Chapter 01
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E7AF36]"></span>
                      </div>
                      <p className="font-handwritten text-xl md:text-2xl font-semibold leading-snug text-white/95">
                        {t.chapters[0].text}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
                      <span className="text-[11px] font-sans tracking-wider text-white/55 uppercase">Flip Back</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 shadow-sm group-hover:-translate-x-1">
                        <RewindIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Chapter 02 */}
            <div 
              className="[perspective:1000px] h-[400px] cursor-pointer group"
              onClick={() => toggleFlip(1)}
            >
              <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${flippedCards[1] ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* Front Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] p-2 bg-black/5 border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:scale-[1.01] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="p-8 bg-[#E7AF36] text-[#0F2D4A] rounded-[2rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-sans uppercase tracking-wider text-[#0F2D4A]/55">
                          Chapter 02
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F2D4A]"></span>
                      </div>
                      <span className="block font-semibold text-xs sm:text-sm text-[#0F2D4A]/85 mb-3">
                        {formatSubtitle(t.chapters[1].subtitle)}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-4xl font-heading font-extrabold tracking-tight text-[#0F2D4A] leading-tight">
                        {t.chapters[1].title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#0F2D4A]/10 pt-5 mt-auto">
                      <span className="text-[11px] font-sans tracking-wider text-[#0F2D4A]/70 uppercase">Read Story</span>
                      <div className="w-10 h-10 rounded-full bg-black/5 border border-black/10 flex items-center justify-center transition-transform duration-300 shadow-sm group-hover:translate-x-1 group-hover:-translate-y-[1px] text-[#0F2D4A]">
                        <ArrowIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-2 bg-black/5 border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                  <div className="p-6 bg-[#E7AF36] text-[#0F2D4A] rounded-[2rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-sans uppercase tracking-wider text-[#0F2D4A]/55">
                          Chapter 02
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F2D4A]"></span>
                      </div>
                      <p className="font-handwritten text-xl md:text-2xl font-semibold leading-snug text-[#0F2D4A]/95">
                        {t.chapters[1].text}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#0F2D4A]/10 pt-5 mt-auto">
                      <span className="text-[11px] font-sans tracking-wider text-[#0F2D4A]/70 uppercase">Flip Back</span>
                      <div className="w-10 h-10 rounded-full bg-black/5 border border-black/10 flex items-center justify-center transition-transform duration-300 shadow-sm group-hover:-translate-x-1 text-[#0F2D4A]">
                        <RewindIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Chapter 03 */}
            <div 
              className="[perspective:1000px] h-[400px] cursor-pointer group"
              onClick={() => toggleFlip(2)}
            >
              <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${flippedCards[2] ? '[transform:rotateY(180deg)]' : ''}`}>
                
                {/* Front Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] p-2 bg-black/5 border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:scale-[1.01] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <div className="p-8 bg-[#1D699B] text-white rounded-[2rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-sans uppercase tracking-wider text-white/55">
                          Chapter 03
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E7AF36]"></span>
                      </div>
                      <span className="block font-semibold text-xs sm:text-sm text-[#E7AF36] mb-3">
                        {formatSubtitle(t.chapters[2].subtitle)}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-4xl font-heading font-extrabold tracking-tight text-white leading-tight">
                        {t.chapters[2].title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
                      <span className="text-[11px] font-sans tracking-wider text-white/55 uppercase">Read Story</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 shadow-sm group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                        <ArrowIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-2 bg-black/5 border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                  <div className="p-6 bg-[#1D699B] text-white rounded-[2rem] h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-sans uppercase tracking-wider text-white/55">
                          Chapter 03
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E7AF36]"></span>
                      </div>
                      <p className="font-handwritten text-lg md:text-xl font-semibold leading-snug text-white/95 my-1">
                        {t.chapters[2].text}
                      </p>
                      {t.chapters[2].quote && (
                        <p className="text-[11px] md:text-xs italic text-white/75 border-l-2 border-white/20 pl-3 mt-2.5 font-sans leading-relaxed">
                          {t.chapters[2].quote}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                      <span className="text-[11px] font-sans tracking-wider text-white/55 uppercase">Flip Back</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white transition-transform duration-300 shadow-sm group-hover:-translate-x-1">
                        <RewindIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Team Section Title */}
        <section className="col-span-1 md:col-span-12 border-b-2 border-border bg-[#E7AF36] py-12 px-5 md:py-20 md:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="text-xs font-nunito font-black uppercase tracking-widest text-white/80 block mb-2">
              {t.teamSubtitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-black tracking-tight text-white uppercase">
              {t.teamTitle}
            </h2>
          </div>
          <div className="absolute right-0 bottom-0 top-0 flex items-center justify-end pr-5 md:pr-12 pointer-events-none select-none z-0">
            <span className="text-[#1D699B]/15 font-nunito font-black text-[7rem] md:text-[12rem] lg:text-[15rem] uppercase tracking-tighter leading-none">
              CREW
            </span>
          </div>
        </section>

        {/* Team Section List */}
        <section className="col-span-1 md:col-span-12 border-b-2 border-border flex flex-col bg-bg">
          {TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden border-b-2 border-border last:border-b-0 py-8 md:py-16 px-5 md:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-end bg-bg transition-colors duration-300 ease-out cursor-default"
            >
              {/* Square Swarm */}
              {(() => {
                const swarmColor = idx % 2 === 0 ? '#1D699B' : '#E7AF36';
                return SWARM_SQUARES.map((sq, i) => (
                  <div
                    key={i}
                    className="absolute scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-350 ease-out"
                    style={{
                      backgroundColor: swarmColor,
                      left: sq.left,
                      top: sq.top,
                      width: sq.w,
                      height: sq.h,
                      transitionDelay: `${sq.delay}ms`,
                    }}
                  />
                ));
              })()}

              <div className="flex flex-col z-10 relative">
                <span className="text-sm md:text-xl font-bold text-[#E7AF36]/50 group-hover:text-white/70! transition-all duration-300 block mb-2 md:mb-4 group-hover:-rotate-6 origin-left">
                  0{idx + 1}
                </span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-[#E7AF36] group-hover:text-white! transition-all duration-300 group-hover:translate-x-4 max-w-4xl leading-[0.85]">
                  {member.name}
                </h3>
              </div>

              <div className="mt-8 lg:mt-0 flex items-center gap-4 md:gap-6 w-full lg:w-auto z-10 relative">
                <div className="h-[2px] w-0 lg:w-16 group-hover:w-32 bg-[#E7AF36]/30 group-hover:bg-white/30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                <div className="font-nunito font-semibold uppercase tracking-widest text-xs sm:text-sm md:text-base text-[#1D699B] bg-white border border-[#1D699B]/15 px-5 py-2.5 rounded-full shadow-sm flex items-center shrink-0">
                  {getRoleIcon(member.roleKey)}
                  <span>{t.roles[member.roleKey as keyof typeof t.roles]}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

      </div>
      
      <Footer />
    </main>
  );
}
