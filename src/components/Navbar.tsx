'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();

  const t = DICT[lang];

  useEffect(() => {
    setClickedHref(null);
  }, [pathname]);

  const activeHref = clickedHref ?? pathname;

  const isActive = (href: string) => {
    if (href === '/') return activeHref === '/';
    return activeHref.startsWith(href);
  };

  const links = [
    { href: '/', label: t.home },
    { href: '/paket', label: t.packages },
    { href: '/about', label: t.about },
    { href: '/contact', label: t.contact }
  ];

  return (
    <header className="w-full sticky top-0 z-50 border-b-2 border-border bg-bg/95 backdrop-blur-sm">
      <nav className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-2.5 border-l-2 border-r-2 border-border">
        <Link href="/" className="hover:opacity-80 transition-opacity shrink-0 flex items-center py-1">
          <Image src="/images/JL LOGO+TYPE.webp" alt="Jumpa Lagi" width={400} height={100} className="h-16 md:h-22 w-auto object-contain" priority />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative flex items-center border-2 border-primary rounded-full p-1 bg-bg select-none w-auto">
            {/* Background Gooey Layer */}
            <div 
              className="absolute inset-0 p-1 grid grid-cols-4 pointer-events-none z-0" 
              style={{ filter: 'url(#gooey-nav)' }}
            >
              {links.map((item) => {
                const active = isActive(item.href);
                return (
                  <div key={`bg-${item.href}`} className="relative h-full rounded-full flex items-center justify-center">
                    {/* Faint static yellow dot to pull liquid gooey bottleneck */}
                    <div className="w-2.5 h-2.5 bg-accent/20 rounded-full" />
                    
                    {/* Active Pill */}
                    {active && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 90, damping: 15, mass: 1.1 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Foreground Links Layer (Interactive & Sharp) */}
            <div className="relative z-10 grid grid-cols-4 w-full">
              {links.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link 
                    key={item.href}
                    href={item.href}
                    onClick={() => setClickedHref(item.href)}
                    className={`text-center px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-colors duration-300 rounded-full whitespace-nowrap ${
                      active ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-px h-4 bg-border"></div>
          <button 
            onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')} 
            className="neo-btn-secondary"
          >
            <Globe className="w-4 h-4" />
            <span className="overflow-hidden h-4 flex items-center relative min-w-[20px] justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={lang}
                  initial={{ rotateX: -90, y: 10, opacity: 0 }}
                  animate={{ rotateX: 0, y: 0, opacity: 1 }}
                  exit={{ rotateX: 90, y: -10, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="inline-block origin-center font-bold"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {lang}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </div>

        {/* Mobile Nav Actions */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')} 
            className="neo-btn-secondary"
          >
            <Globe className="w-3 h-3" />
            <span className="overflow-hidden h-4 flex items-center relative min-w-[20px] justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={lang}
                  initial={{ rotateX: -90, y: 10, opacity: 0 }}
                  animate={{ rotateX: 0, y: 0, opacity: 1 }}
                  exit={{ rotateX: 90, y: -10, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="inline-block origin-center font-bold"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {lang}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
          <button className="p-1 text-text hover:text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* SVG Gooey Filter definition */}
      <svg className="absolute w-0 h-0 invisible" width="0" height="0">
        <defs>
          <filter id="gooey-nav">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

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
            {[
              { href: '/', label: t.home },
              { href: '/paket', label: t.packages },
              { href: '/about', label: t.about },
              { href: '/contact', label: t.contact }
            ].map((item) => {
              const active = isActive(item.href);
              return (
                <Link 
                  key={item.href}
                  onClick={() => setIsOpen(false)} 
                  href={item.href} 
                  className={`text-2xl font-black uppercase tracking-tighter transition-all duration-200 border-b-2 border-border pb-4 flex items-center justify-between ${
                    active ? 'text-primary' : 'text-text hover:text-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="bg-accent text-border px-3 py-1 text-xs font-black uppercase rounded-full border-2 border-border">
                      {lang === 'ID' ? 'AKTIF' : 'ACTIVE'}
                    </span>
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
