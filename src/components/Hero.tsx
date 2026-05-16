'use client';

import { Navbar } from './Navbar';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const DICT = {
  ID: {
    hookSubtitle: 'SPESIALIS PERENCANA REUNI',
    hook1: 'BIAR KAMI YANG',
    hook2: 'URUS REUNINYA.',
    hookDesc: 'Sebagai spesialis perencana reuni, Jumpa Lagi siap mengambil alih keribetan Anda. Mulai dari pencarian tujuan, booking tempat, hingga transportasi, kami atur semuanya agar Anda cukup datang dan nikmati momen.',
    cta: 'MULAI RENCANAKAN REUNI ANDA',
    ctaDesc: '*Konsultasi gratis 10 menit. Biar kami yang susun rencana.',
    trust1Title: '100% TERIMA BERES',
    trust1Desc: 'Singkirkan drama panitia. Kami urus semua pencarian destinasi, reservasi akomodasi, hingga transportasi acara.',
    trust2Title: 'PILIHAN DESTINASI',
    trust2Desc: 'Kami menyediakan ragam pilihan tempat reuni yang nyaman, aman, dan disesuaikan dengan gaya kumpul grup Anda.',
    marquee: 'REUNI TANPA DRAMA — SPESIALIS REUNI #1 — '
  },
  EN: {
    hookSubtitle: 'PROFESSIONAL REUNION SPECIALIST',
    hook1: 'LET US HANDLE',
    hook2: 'THE REUNION.',
    hookDesc: 'As a dedicated reunion specialist, Jumpa Lagi takes the hassle off your plate. From finding destinations and booking venues to transportation, we manage everything so you can just show up.',
    cta: 'START PLANNING YOUR REUNION',
    ctaDesc: '*Free 10-minute consultation. Let us draft the plan.',
    trust1Title: '100% HASSLE-FREE',
    trust1Desc: 'Eliminate committee drama. We handle all destination searches, accommodation bookings, and event transportation.',
    trust2Title: 'CURATED DESTINATIONS',
    trust2Desc: 'We provide a variety of comfortable and safe reunion venues, perfectly matched to your group\'s preferred gathering style.',
    marquee: 'DRAMA-FREE REUNIONS — #1 REUNION SPECIALIST — '
  }
};

export function Hero() {
  const WHATSAPP_LINK = "https://wa.me/6287754764598?text=Halo%20Tim%20Jumpa%20Lagi,%20saya%20butuh%20bantuan%20mewujudkan%20reuni%20kami.";
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <section className="relative w-full flex flex-col bg-bg overflow-hidden">
      <Navbar />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border mt-24">
        {/* Main Hook & Relate */}
        <div className="col-span-1 md:col-span-12 flex flex-col justify-center py-8 px-5 md:p-12 relative overflow-hidden group border-b-2 border-border">
          <span className="text-accent font-bold tracking-widest uppercase mb-3 md:mb-8 block text-xs md:text-sm">
            {t.hookSubtitle}
          </span>
          <div className="mb-4 md:mb-12">
            <div className="overflow-hidden mb-1 md:mb-2">
               <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-text animate-text-reveal cursor-default break-words leading-[0.9]" style={{animationDelay: '0.1s'}}>
                 {t.hook1}
               </h1>
            </div>
            <div className="overflow-hidden">
               <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-primary animate-text-reveal cursor-default break-words leading-[0.9]" style={{animationDelay: '0.2s'}}>
                 {t.hook2}
               </h1>
            </div>
          </div>
          <p className="hidden md:block text-sm sm:text-base md:text-2xl text-text max-w-4xl font-bold uppercase tracking-widest leading-snug md:leading-tight mb-6 md:mb-16 opacity-90">
            {t.hookDesc}
          </p>
          <div>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground px-4 md:px-12 py-4 md:py-8 text-sm md:text-lg font-black uppercase tracking-widest border-2 border-text transition-all duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_var(--text)] active:scale-[0.98] w-full sm:w-auto text-center"
            >
              {t.cta}
            </a>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-3 text-text/70">
              {t.ctaDesc}
            </p>
          </div>
        </div>

        {/* Trust Indicators - Hidden on mobile for compactness */}
        <div className="hidden md:flex col-span-1 md:col-span-6 flex-col border-b-2 md:border-r-2 border-border bg-muted text-text p-6 md:p-12 hover:bg-bg transition-colors duration-300 cursor-default">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase text-primary break-words">{t.trust1Title}</h3>
          <p className="font-bold uppercase tracking-widest text-sm leading-relaxed">
            {t.trust1Desc}
          </p>
        </div>
        <div className="hidden md:flex col-span-1 md:col-span-6 flex-col bg-bg text-text p-6 md:p-12 hover:bg-muted transition-colors duration-300 cursor-default border-b-2 border-border">
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter uppercase text-primary break-words">{t.trust2Title}</h3>
          <p className="font-bold uppercase tracking-widest text-sm leading-relaxed">
            {t.trust2Desc}
          </p>
        </div>
      </div>
      
      {/* Kinetic Marquee */}
      <div className="w-full overflow-hidden border-b-2 border-border bg-accent py-3 flex items-center border-t-2 max-w-7xl mx-auto border-l-2 border-r-2">
         <div className="flex whitespace-nowrap animate-marquee" style={{ width: '200%' }}>
            {Array(10).fill(t.marquee).map((text, i) => (
              <span key={i} className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-accent-foreground px-4">{text}</span>
            ))}
         </div>
      </div>
    </section>
  );
}
