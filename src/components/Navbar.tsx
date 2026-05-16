'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const DICT = {
  ID: {
    home: 'Home',
    packages: 'Paket',
    about: 'Tentang Kami',
    contact: 'Kontak'
  },
  EN: {
    home: 'Home',
    packages: 'Packages',
    about: 'About Us',
    contact: 'Contact'
  }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const t = DICT[lang];

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50 border-b-2 border-border bg-bg/95 backdrop-blur-sm">
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4 border-l-2 border-r-2 border-border">
        <Link href="/" className="hover:opacity-80 transition-opacity shrink-0 flex items-center py-1">
          <Image src="/images/JL LOGO+TYPE.webp" alt="Jumpa Lagi" width={400} height={100} className="h-16 md:h-24 w-auto object-contain" priority />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.home}</Link>
            <Link href="/paket" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.packages}</Link>
            <Link href="/about" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.about}</Link>
            <Link href="/contact" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">{t.contact}</Link>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <button 
            onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')} 
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold border-2 border-text bg-bg text-text shadow-[2px_2px_0_0_var(--text)] hover:bg-accent hover:text-accent-foreground hover:-translate-y-[1px] hover:-translate-x-[1px] hover:shadow-[3px_3px_0_0_var(--text)] active:scale-[0.95] transition-all duration-200 uppercase tracking-widest"
          >
            <Globe className="w-4 h-4" /> {lang === 'ID' ? 'ID' : 'EN'}
          </button>
        </div>

        {/* Mobile Nav Actions */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')} 
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold border-2 border-text bg-bg text-text shadow-[2px_2px_0_0_var(--text)] hover:bg-accent hover:text-accent-foreground active:scale-[0.95] transition-all duration-200 uppercase tracking-widest"
          >
            <Globe className="w-3 h-3" /> {lang === 'ID' ? 'ID' : 'EN'}
          </button>
          <button className="p-1 text-text hover:text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg border-b-2 border-border max-w-7xl mx-auto flex flex-col p-6 gap-6 shadow-xl origin-top"
          >
            <Link onClick={() => setIsOpen(false)} href="/" className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors border-b-2 border-border pb-4">{t.home}</Link>
            <Link onClick={() => setIsOpen(false)} href="/paket" className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors border-b-2 border-border pb-4">{t.packages}</Link>
            <Link onClick={() => setIsOpen(false)} href="/about" className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors border-b-2 border-border pb-4">{t.about}</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors pb-2">{t.contact}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
