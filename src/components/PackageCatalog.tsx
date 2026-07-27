'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWhatsAppRedirect } from '@/contexts/WhatsAppRedirectContext';
import { Text_03 } from '@/components/ui/wave-text';

const DICT = {
  ID: {
    subtitle: 'MOMEN YANG KAMI TANGANI',
    title: 'UNTUK SETIAP JENIS REUNI',
    desc: 'Apapun formatnya, kami menyediakan perencanaan reuni yang aman, intim, dan profesional. Anda pilih jenis reuninya, kami urus sisanya.',
    learnMore: 'KONSULTASI SEKARANG',
    packages: [
      { name: 'Alumni Korporat', desc: 'Perencanaan reuni skala besar untuk rekan profesional. Berjalan formal, elegan, namun tetap terasa santai.', label: 'CORPORATE' },
      { name: 'Teman Masa Kecil', desc: 'Reuni hangat dan sangat intim untuk bernostalgia bersama sahabat lama tanpa pusing mikirin booking tempat.', label: 'INTIMATE' },
      { name: 'Teman Sekolah', desc: 'Kumpul angkatan yang seru dan berkesan tanpa drama panitia. Kami tangani semua akomodasi dan transportasi.', label: 'BATCH' },
      { name: 'Keluarga Besar', desc: 'Gathering lintas generasi yang nyaman, 100% aman, dan tentu menyenangkan untuk seluruh anggota keluarga.', label: 'FAMILY' }
    ]
  },
  EN: {
    subtitle: 'MOMENTS WE HANDLE',
    title: 'FOR EVERY TYPE OF REUNION',
    desc: 'Whatever the format, we provide safe, intimate, and professional reunion planning. You choose the reunion type, we handle the rest.',
    learnMore: 'CONSULT NOW',
    packages: [
      { name: 'Corporate Alumni', desc: 'Large-scale reunion planning for professional peers. Runs formally and elegantly, yet remains relaxed.', label: 'CORPORATE' },
      { name: 'Childhood Friends', desc: 'Warm and highly intimate reunions to reminisce with old best friends without worrying about booking venues.', label: 'INTIMATE' },
      { name: 'School Friends', desc: 'Exciting and memorable batch gatherings without committee drama. We handle all accommodations and transport.', label: 'BATCH' },
      { name: 'Extended Family', desc: 'Cross-generational gatherings that are comfortable, 100% safe, and absolutely fun for the whole family.', label: 'FAMILY' }
    ]
  }
};

export function PackageCatalog() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const { lang } = useLanguage();
  const { triggerRedirect } = useWhatsAppRedirect();
  const t = DICT[lang];

  return (
    <section id="layanan" className="w-full bg-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
        
        {/* Header Section */}
        <div className="col-span-1 md:col-span-12 bg-accent text-accent-foreground py-6 px-5 md:p-12 border-b-2 border-border">
          <span className="font-bold tracking-widest uppercase mb-2 md:mb-4 block text-xs md:text-sm">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-2 md:mb-4 leading-[0.9] md:leading-[0.85] cursor-default break-words">
            {t.title}
          </h2>
          <p className="text-xs md:text-lg font-bold uppercase tracking-widest max-w-3xl leading-relaxed opacity-90 mt-2">
            {t.desc}
          </p>
        </div>

        {/* Responsive Grid for Cards */}
        <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-0 bg-bg border-b-2 border-border">
          {t.packages.map((pkg, i) => {
            return (
              <button 
                key={i}
                onClick={() => triggerRedirect(pkg.name)}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={`text-left cursor-pointer col-span-1 md:col-span-6 flex flex-col justify-between p-6 md:p-12 border-b-2 border-border ${
                  i % 2 !== 0 ? 'md:border-l-2' : ''
                } ${i >= 2 ? 'md:border-b-0' : ''} ${
                  i === t.packages.length - 1 ? 'border-b-0 md:border-b-0' : ''
                } group transition-all duration-300 bg-bg hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary emil-button overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-4 md:mb-12 w-full">
                  <span className="neo-label text-xs md:text-sm px-2.5 md:px-3 py-1 leading-none">{pkg.label}</span>
                  <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 text-primary group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500 shrink-0" />
                </div>
                <div className="group-hover:-translate-y-1 transition-transform duration-500 mt-2 md:mt-0 text-left">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 uppercase tracking-tighter text-text group-hover:text-primary transition-colors break-words">
                    {pkg.name}
                  </h3>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm mb-4 leading-relaxed text-text/80">
                    {pkg.desc}
                  </p>
                  <div className="inline-flex items-center gap-1.5 border-b-2 border-primary text-primary font-black uppercase tracking-widest text-xs md:text-sm pb-1 mt-2">
                    <Text_03 text={t.learnMore} isHovered={hoveredCardIndex === i} className="inline-block text-inherit font-inherit" />
                    <ArrowUpRight className="w-4 h-4 md:hidden text-primary" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
