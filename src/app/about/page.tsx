'use client';

import React, { useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const DICT = {
  ID: {
    heroTitle: 'BAGAIMANA JUMPA LAGI LAHIR.',
    chapters: [
      {
        num: '01',
        title: 'FRUSTRASI KOLEKTIF',
        text: 'Berawal dari rasa lelah melihat wacana reuni yang selalu kandas. Mengatur jadwal, selera, dan ekspektasi ratusan orang adalah pekerjaan penuh waktu yang tak seorang pun ingin lakukan secara sukarela.'
      },
      {
        num: '02',
        title: 'DRAMA KEPANITIAAN',
        text: 'Uang patungan yang mandek hingga perdebatan lokasi seringkali menghancurkan esensi sejati dari reuni itu sendiri: untuk sekadar kembali berjumpa dan bernostalgia tanpa beban.'
      },
      {
        num: '03',
        title: 'KAMI MENGAMBIL ALIH',
        text: 'Dari situlah Jumpa Lagi diciptakan. Kami mengambil alih peran "Si Paling Repot". Anda cukup datang, duduk manis, dan menikmati momen. Kami adalah spesialis perencana reuni Anda.'
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
        title: 'COLLECTIVE FRUSTRATION',
        text: 'It started from the exhaustion of seeing reunion plans constantly fall apart. Managing the schedules and expectations of hundreds is a full-time job no one wants to volunteer for.'
      },
      {
        num: '02',
        title: 'COMMITTEE DRAMA',
        text: 'Stalled payments and location debates often ruin the true essence of a reunion: to simply meet again and reminisce without any burden.'
      },
      {
        num: '03',
        title: 'WE TAKE OVER',
        text: 'That is why Jumpa Lagi was created. We take over the "heavy lifting". You just show up, relax, and enjoy the moment. We are your dedicated reunion specialists.'
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

// Footprint SVG Component (Bare Foot)
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
    
    // First step initialization
    if (lastPos.current.x === 0 && lastPos.current.y === 0) {
      lastPos.current = { x, y };
      return;
    }
    
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const now = Date.now();
    
    // Throttle spawning: must move > 100px AND > 150ms must have passed to prevent spam
    if (distance > 100 && now - lastStepTime.current > 150) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      // Calculate perpendicular vector for left/right offset
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
        // Hard limit on DOM nodes
        if (next.length > 15) return next.slice(next.length - 15);
        return next;
      });
      
      lastPos.current = { x, y };
      lastStepTime.current = now;
      stepCount.current += 1;
      
      // Remove step naturally
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
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="col-span-1 md:col-span-12 py-12 px-5 md:p-24 border-b-2 border-border bg-accent text-accent-foreground flex flex-col justify-center min-h-[50vh] relative overflow-hidden"
    >
      {/* Interactive Footsteps Layer */}
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
            className="absolute text-blue-900 pointer-events-none"
            style={{
              left: step.x,
              top: step.y,
            }}
          >
            <Footprint isLeft={step.isLeft} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Pop-up Staggered Title */}
      <motion.h1 
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] max-w-6xl z-10 pointer-events-none flex flex-wrap"
      >
        {t.heroTitle.split(" ").map((word: string, wordIdx: number) => (
          <span key={wordIdx} className="inline-block mr-[0.25em]">
            {word.split("").map((char, charIdx) => (
              <motion.span key={charIdx} variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>
    </section>
  );
}

function ChapterRow({ chapter }: { chapter: any }) {
  return (
    <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 border-b-2 border-border last:border-b-0 hover:bg-muted transition-colors duration-500">
      
      {/* Chapter Number & Title */}
      <div className="col-span-1 md:col-span-5 p-6 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col justify-start bg-bg md:bg-transparent">
        <span className="text-5xl md:text-8xl font-black text-primary opacity-50 mb-2 md:mb-6 leading-none">
          {chapter.num}
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-text leading-[0.9]">
          {chapter.title}
        </h2>
      </div>

      {/* Chapter Content */}
      <div className="col-span-1 md:col-span-7 p-6 md:p-12 flex items-center">
        <p className="text-base md:text-3xl font-bold uppercase tracking-widest leading-relaxed text-text opacity-90">
          {chapter.text}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <main className="flex-1 w-full flex flex-col bg-bg text-text selection:bg-accent selection:text-white min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border mt-24">
        
        <HeroSection t={t} />

        {/* Storytelling Chapters */}
        <section className="col-span-1 md:col-span-12 border-b-2 border-border bg-bg flex flex-col">
          {t.chapters.map((chapter, idx) => (
            <ChapterRow key={idx} chapter={chapter} />
          ))}
        </section>

        {/* Team Section Title */}
        <section className="col-span-1 md:col-span-12 py-8 px-5 md:p-12 border-b-2 border-border bg-bg">
          <span className="text-accent font-bold tracking-widest uppercase mb-4 block text-xs md:text-sm">
            {t.teamSubtitle}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            {t.teamTitle}
          </h2>
        </section>

        {/* Team List Editorial */}
        <section className="col-span-1 md:col-span-12 border-b-2 border-border flex flex-col">
          {TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className={`group relative overflow-hidden border-b-2 border-border last:border-b-0 py-8 md:py-16 px-5 md:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-end bg-bg hover:bg-accent transition-colors duration-500 cursor-default`}
            >
              {/* Decorative Background Slide */}
              <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-0"></div>

              {/* Giant Name */}
              <div className="flex flex-col z-10 relative">
                <span className="text-sm md:text-xl font-black text-text/30 group-hover:text-bg/50 transition-colors duration-500 mb-2 md:mb-4">
                  0{idx + 1} //
                </span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-text group-hover:text-bg transition-colors duration-500 max-w-4xl leading-[0.85]">
                  {member.name}
                </h3>
              </div>

              {/* Role with Decorative Line */}
              <div className="mt-8 lg:mt-0 flex items-center gap-4 md:gap-6 w-full lg:w-auto z-10 relative">
                <div className="h-[2px] flex-1 lg:w-32 bg-text/20 group-hover:bg-bg/30 transition-colors duration-500"></div>
                <p className="font-bold uppercase tracking-widest text-xs sm:text-sm md:text-lg text-primary transition-colors duration-500 shrink-0 bg-primary/10 group-hover:bg-bg text-text px-4 py-2 border-2 border-border group-hover:border-bg group-hover:text-primary">
                  {t.roles[member.roleKey as keyof typeof t.roles]}
                </p>
              </div>
            </div>
          ))}
        </section>

      </div>
      
      <Footer />
    </main>
  );
}
