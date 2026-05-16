'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const DICT = {
  ID: {
    subtitle: 'PAKET PERJALANAN',
    title: 'PILIHAN DESTINASI REUNI',
    desc: 'Kami menyediakan kurasi paket all-in-one yang mencakup akomodasi, transportasi, dan itinerary khusus untuk reuni Anda.',
    packages: [
      { 
        name: 'Paket Dieng', 
        price: 'Start from 3,2 Jt/pax', 
        duration: '3 Hari 2 Malam',
        desc: 'Nikmati sejuknya udara dataran tinggi dengan suasana hangat. Termasuk penginapan, makan bersama, dan tur ke kawah serta telaga warna.',
        label: 'NATURE'
      },
      { 
        name: 'Paket Solo', 
        price: 'Start from 4,2 Jt/pax', 
        duration: '4 Hari 3 Malam',
        desc: 'Eksplorasi budaya dan kuliner khas keraton. Suasana tenang yang cocok untuk reuni santai penuh nostalgia.',
        label: 'CULTURE'
      },
      { 
        name: 'Paket Bandung', 
        price: 'Start from 6,5 Jt/pax', 
        duration: '5 Hari 4 Malam',
        desc: 'Pengalaman premium di villa Lembang. Kombinasi sempurna antara relaksasi pegunungan dan akses mudah ke tempat hits.',
        label: 'PREMIUM'
      },
      { 
        name: 'Paket Custom', 
        price: 'Sesuai Budget', 
        duration: 'Fleksibel',
        desc: 'Punya destinasi impian sendiri? Tim concierge kami siap merancang itinerary eksklusif yang menyesuaikan jadwal dan budget angkatan Anda.',
        label: 'CUSTOM'
      }
    ],
    cta: 'PESAN SEKARANG'
  },
  EN: {
    subtitle: 'TRAVEL PACKAGES',
    title: 'REUNION DESTINATIONS',
    desc: 'We provide curated all-in-one packages that include accommodation, transportation, and custom itineraries for your reunion.',
    packages: [
      { 
        name: 'Dieng Package', 
        price: 'Start from Rp 3.2M/pax', 
        duration: '3 Days 2 Nights',
        desc: 'Enjoy the cool highland breeze with a warm atmosphere. Includes accommodation, group dining, and tours to the craters and color lake.',
        label: 'NATURE'
      },
      { 
        name: 'Solo Package', 
        price: 'Start from Rp 4.2M/pax', 
        duration: '4 Days 3 Nights',
        desc: 'Explore royal culture and culinary delights. A calm atmosphere perfectly suited for a relaxed and nostalgic reunion.',
        label: 'CULTURE'
      },
      { 
        name: 'Bandung Package', 
        price: 'Start from Rp 6.5M/pax', 
        duration: '5 Days 4 Nights',
        desc: 'Premium experience in Lembang villas. The perfect combination of mountain relaxation and easy access to trendy spots.',
        label: 'PREMIUM'
      },
      { 
        name: 'Custom Package', 
        price: 'Per Budget', 
        duration: 'Flexible',
        desc: 'Have your own dream destination? Our concierge team is ready to design an exclusive itinerary tailored to your batch\'s schedule and budget.',
        label: 'CUSTOM'
      }
    ],
    cta: 'BOOK NOW'
  }
};

function InteractiveLetter({ char, mouseX, mouseY }: { char: string, mouseX: any, mouseY: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  const bounds = useRef({ x: 0, y: 0 });
  const distValue = useMotionValue(9999);

  useEffect(() => {
    const updateBounds = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        bounds.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
    };
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      if (mx === 9999 || my === 9999) {
        distValue.set(9999);
        return;
      }
      const dx = mx - bounds.current.x;
      const dy = my - bounds.current.y;
      distValue.set(Math.sqrt(dx * dx + dy * dy));
    };

    const unsubX = mouseX.on("change", handleUpdate);
    const unsubY = mouseY.on("change", handleUpdate);

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, distValue]);

  // Derived transforms using safe math functions to avoid Framer Motion array interpolation bugs
  const scaleRaw = useTransform(distValue, (val: number) => val < 150 ? 1 + (1 - val / 150) * 0.4 : 1);
  const yRaw = useTransform(distValue, (val: number) => val < 150 ? (val / 150 - 1) * 20 : 0);
  const blueIntensityRaw = useTransform(distValue, (val: number) => val < 80 ? 1 - (val / 80) : 0);

  // Strong spring config for immediate but fluid response (Emil Kowalski guidelines)
  const scale = useSpring(scaleRaw, { stiffness: 400, damping: 25, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 400, damping: 25, mass: 0.5 });
  const blueOpacity = useSpring(blueIntensityRaw, { stiffness: 400, damping: 25, mass: 0.5 });

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", scale, y, transformOrigin: "bottom center", position: "relative" }}
      className="pointer-events-none"
    >
      <span className="text-text">{char}</span>
      <motion.span 
        aria-hidden="true" 
        style={{ position: "absolute", left: 0, top: 0, opacity: blueOpacity, color: "#3B82F6" }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}

function InteractiveTitle({ text }: { text: string }) {
  const mouseX = useMotionValue(9999);
  const mouseY = useMotionValue(9999);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(9999);
    mouseY.set(9999);
  };

  return (
    <h1 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.85] cursor-default flex flex-wrap text-text"
    >
      {text.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="inline-flex mr-[0.3em]">
          {word.split("").map((char, cIdx) => (
            <InteractiveLetter key={cIdx} char={char} mouseX={mouseX} mouseY={mouseY} />
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function PaketPage() {
  const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Tim%20Jumpa%20Lagi,%20saya%20ingin%20tanya%20detail%20mengenai%20paket%20reuni.";
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <main className="w-full min-h-screen bg-bg flex flex-col">
      <Navbar />

      <section className="w-full bg-bg border-b-2 border-border mt-24">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
          
          <div className="col-span-1 md:col-span-12 bg-accent text-accent-foreground p-6 md:p-12 border-b-2 border-border">
            <span className="font-bold tracking-widest uppercase mb-6 block text-sm">
              {t.subtitle}
            </span>
            {/* INTERACTIVE KINETIC TYPOGRAPHY */}
            <InteractiveTitle text={t.title} />
            <p className="text-base md:text-lg font-bold uppercase tracking-widest max-w-3xl leading-relaxed mt-4">
              {t.desc}
            </p>
          </div>

          {t.packages.map((pkg, i) => (
            <div 
              key={i}
              className={`col-span-1 md:col-span-6 bg-bg group ${i % 2 !== 0 ? 'md:border-l-2' : ''} border-b-2 border-border`}
            >
              <div className="w-full h-full flex flex-col justify-between p-6 md:p-12 bg-bg border-2 border-transparent group-hover:border-text transition-all duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[8px_8px_0_0_var(--text)] group-hover:bg-muted/30">
                <div className="flex justify-between items-start mb-8">
                  <span className="font-black text-sm md:text-base tracking-tight border-2 border-text text-text px-3 py-1 uppercase">{pkg.label}</span>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground p-3 active:scale-[0.95] transition-all duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] rounded-none border-2 border-text hover:bg-text hover:text-bg">
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>
                <div className="mb-8">
                  <h3 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter text-text group-hover:text-primary transition-colors duration-[250ms] break-words">{pkg.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-6">
                    <span className="bg-primary/10 px-2 py-1">{pkg.price}</span>
                    <span className="bg-primary/10 px-2 py-1">{pkg.duration}</span>
                  </div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm leading-relaxed text-text/80">{pkg.desc}</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block self-start border-b-2 border-text text-text font-black uppercase tracking-widest text-sm pb-1 hover:text-primary hover:border-primary active:scale-[0.97] transition-all duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-left">
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
          
        </div>
      </section>

      <Footer />
    </main>
  );
}
