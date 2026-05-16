'use client';

import React, { useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DICT = {
  ID: {
    title: 'HUBUNGI KAMI.',
    subtitle: 'KAMI SIAP MENDENGAR',
    description: 'Jangan ragu untuk bertanya, berdiskusi, atau sekadar menyapa tim Jumpa Lagi. Kunjungi markas kami atau hubungi secara langsung melalui saluran di bawah ini.',
    addressTitle: 'MARKAS KAMI',
    address: 'Politeknik Negeri Bali\nKampus Bukit Jimbaran, Kuta Selatan\nBadung, Bali 80364',
    socialTitle: 'SAPA KAMI',
    waBtn: 'CHAT VIA WHATSAPP',
    igBtn: 'DM DI INSTAGRAM'
  },
  EN: {
    title: 'CONTACT US.',
    subtitle: 'WE ARE LISTENING',
    description: 'Feel free to ask, discuss, or simply say hello to the Jumpa Lagi team. Visit our headquarters or reach out directly through the channels below.',
    addressTitle: 'OUR HQ',
    address: 'Bali State Polytechnic\nBukit Jimbaran Campus, South Kuta\nBadung, Bali 80364',
    socialTitle: 'SAY HELLO',
    waBtn: 'CHAT VIA WHATSAPP',
    igBtn: 'DM ON INSTAGRAM'
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
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 200 } }
  };

  return (
    <main className="flex-1 w-full flex flex-col bg-bg text-text selection:bg-accent selection:text-white min-h-screen relative overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border mt-24">
        
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
          <div className="col-span-1 md:col-span-5 p-6 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-border flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-text mb-6">
                {t.socialTitle}
              </h2>
              <div className="flex flex-col gap-4 mb-12">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border-2 border-text bg-bg hover:bg-primary hover:text-primary-foreground transition-all duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--text)] active:scale-[0.98]"
                >
                  <span className="font-bold uppercase tracking-widest text-sm md:text-base">{t.waBtn}</span>
                  <MessageCircle className="w-6 h-6" />
                </a>
                
                <a 
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border-2 border-text bg-bg hover:bg-accent hover:text-accent-foreground transition-all duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_var(--text)] active:scale-[0.98]"
                >
                  <span className="font-bold uppercase tracking-widest text-sm md:text-base">{t.igBtn}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-primary mb-4">
                {t.addressTitle}
              </h2>
              <p className="text-sm md:text-lg font-bold uppercase tracking-widest leading-relaxed text-text whitespace-pre-line">
                {t.address}
              </p>
            </div>
          </div>

          {/* Map Embed */}
          <div className="col-span-1 md:col-span-7 bg-bg min-h-[400px] md:min-h-[600px] relative p-6 md:p-12 flex flex-col justify-center">
            <div className="w-full h-full border-2 border-text overflow-hidden relative shadow-[8px_8px_0_0_var(--text)]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.864388147775!2d115.1599351740632!3d-8.798697691253018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd244c13ee9d753%3A0x6c05042449b50f81!2sPoliteknik%20Negeri%20Bali!5e0!3m2!1sen!2sid!4v1715873834159!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </section>
      </div>
      
      <Footer />
    </main>
  );
}
