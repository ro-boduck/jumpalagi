'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Map3D = dynamic(() => import('@/components/Map3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F9F6EE] flex items-center justify-center border-2 border-[#111827] shadow-[8px_8px_0_0_#111827] min-h-[400px] md:min-h-[600px]">
      <div className="animate-pulse text-[#111827] font-black uppercase tracking-widest text-sm">
        MEMUAT PETA 3D...
      </div>
    </div>
  )
});

const DICT = {
  ID: {
    title: 'HUBUNGI KAMI.',
    subtitle: 'KAMI SIAP MENDENGAR',
    description: 'Jangan ragu untuk bertanya, berdiskusi, atau sekadar menyapa tim Jumpa Lagi. Kunjungi markas kami atau hubungi secara langsung melalui saluran di bawah ini.',
    addressTitle: 'MARKAS KAMI',
    address: 'POLITEKNIK NEGERI BALI\nKAMPUS BUKIT JIMBARAN, KUTA\nSELATAN\nBADUNG, BALI 80364',
    socialTitle: 'SAPA KAMI',
    waBtn: 'CHAT VIA WHATSAPP',
    igBtn: 'DM DI INSTAGRAM',
    infoText: 'TIM KAMI SIAP MELAYANI ANDA. HUBUNGI KAMI LANGSUNG UNTUK KONSULTASI GRATIS MENGENAI RENCANA PERJALANAN ANDA.'
  },
  EN: {
    title: 'CONTACT US.',
    subtitle: 'WE ARE LISTENING',
    description: 'Feel free to ask, discuss, or simply say hello to the Jumpa Lagi team. Visit our headquarters or reach out directly through the channels below.',
    addressTitle: 'OUR HQ',
    address: 'BALI STATE POLYTECHNIC\nBUKIT JIMBARAN CAMPUS, SOUTH KUTA\nBADUNG, BALI 80364',
    socialTitle: 'SAY HELLO',
    waBtn: 'CHAT VIA WHATSAPP',
    igBtn: 'DM ON INSTAGRAM',
    infoText: 'OUR TEAM IS READY TO SERVE YOU. CONTACT US DIRECTLY FOR A FREE CONSULTATION REGARDING YOUR TRAVEL PLAN.'
  }
};

const WHATSAPP_LINK = "https://wa.me/6287754764598?text=Halo%20Tim%20Jumpa%20Lagi,%20saya%20butuh%20bantuan%20mewujudkan%20reuni%20kami.";
const INSTAGRAM_LINK = "https://instagram.com/jumpalagi_tourtravel"; 

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = DICT[lang];

  // Title staggered animation
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, damping: 12, stiffness: 200 } }
  };

  return (
    <main className="flex-1 w-full flex flex-col bg-bg text-text selection:bg-accent selection:text-white min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
        
        {/* Header Section */}
        <section className="col-span-1 md:col-span-12 py-12 px-5 md:p-24 border-b-2 border-border bg-accent text-accent-foreground flex flex-col justify-center">
          <span className="font-bold tracking-widest uppercase mb-4 block text-xs md:text-sm">
            {t.subtitle}
          </span>
          <motion.h1 
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 flex flex-wrap"
          >
            {t.title.split(" ").map((word: string, wordIdx: number) => (
              <span key={wordIdx} className="inline-block mr-[0.25em]">
                {word.split("").map((char, charIdx) => (
                  <motion.span key={charIdx} variants={charVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
          <p className="text-base md:text-2xl font-bold uppercase tracking-widest leading-relaxed max-w-4xl opacity-90">
            {t.description}
          </p>
        </section>

        {/* Content Section */}
        <section className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 border-b-2 border-border bg-bg">
          
          {/* Contact Details */}
          <div className="col-span-1 md:col-span-5 p-6 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col justify-start gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-accent mb-6">
                {t.socialTitle}
              </h2>
              <div className="flex flex-col gap-5 mb-6">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-left"
                >
                  <div className="w-[72px] h-[72px] border-2 border-border bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[4px_4px_0_0_#111827]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-[#111827]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-black text-xl md:text-2xl uppercase tracking-wider text-accent leading-none group-hover:underline">
                      WHATSAPP
                    </div>
                    <div className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-[#111827] mt-1.5 opacity-80 leading-none">
                      {t.waBtn}
                    </div>
                  </div>
                </a>
                
                <a 
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 text-left"
                >
                  <div className="w-[72px] h-[72px] border-2 border-border bg-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:shadow-[4px_4px_0_0_#111827]">
                    <Instagram className="w-9 h-9 text-[#111827] stroke-[2px]" />
                  </div>
                  <div>
                    <div className="font-black text-xl md:text-2xl uppercase tracking-wider text-accent leading-none group-hover:underline">
                      INSTAGRAM
                    </div>
                    <div className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-[#111827] mt-1.5 opacity-80 leading-none">
                      {t.igBtn}
                    </div>
                  </div>
                </a>
              </div>
              
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-[#7A756D] border-t-2 border-dashed border-border/20 pt-6 mt-6">
                {t.infoText}
              </p>
            </div>
            
            <div className="mt-2">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-primary mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary stroke-[3px] shrink-0" />
                <span>{t.addressTitle}</span>
              </h2>
              <p className="text-sm md:text-lg font-black uppercase tracking-widest leading-relaxed text-accent whitespace-pre-line pl-0">
                {t.address}
              </p>
            </div>
          </div>

          {/* Map Embed */}
          <div className="col-span-1 md:col-span-7 bg-bg min-h-[400px] md:min-h-[600px] relative p-6 md:p-12 flex flex-col justify-center">
            <Map3D />
          </div>

        </section>
      </div>
      
      <Footer />
    </main>
  );
}
