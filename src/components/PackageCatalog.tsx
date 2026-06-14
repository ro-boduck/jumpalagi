'use client';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConsultation } from '@/contexts/ConsultationContext';

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
  const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20berkonsultasi%20mengenai%20opsi%20layanan%20reuni.";
  const { lang } = useLanguage();
  const { openConsult } = useConsultation();
  const t = DICT[lang];

  return (
    <section id="layanan" className="w-full bg-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
        
        <div className="col-span-1 md:col-span-12 bg-accent text-accent-foreground py-6 px-5 md:p-12 border-b-2 border-border">
          <span className="font-bold tracking-widest uppercase mb-3 md:mb-6 block text-xs md:text-sm">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-2 md:mb-4 leading-[0.9] md:leading-[0.85] cursor-default break-words">
            {t.title}
          </h2>
          <p className="hidden md:block text-sm md:text-lg font-bold uppercase tracking-widest max-w-3xl leading-relaxed opacity-90">
            {t.desc}
          </p>
        </div>

        <div 
          className="col-span-1 md:col-span-12 flex flex-row md:grid md:grid-cols-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-0 bg-text/5 md:bg-transparent py-6 md:p-0 px-5 md:px-0 [&::-webkit-scrollbar]:hidden scroll-pl-5 md:scroll-pl-0 border-b-2 border-border"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {t.packages.map((pkg, i) => {
            const packageKey = pkg.label.toLowerCase();
            return (
              <button 
                key={i}
                onClick={() => openConsult(packageKey)}
                className={`text-left cursor-pointer shrink-0 w-[85vw] sm:w-[400px] md:w-auto md:col-span-6 flex flex-col justify-between p-5 md:p-12 border-2 md:border-y-0 md:border-l-0 md:border-r-0 md:border-b-2 border-text md:border-border snap-center md:snap-align-none group transition-all duration-300 bg-bg hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary emil-button overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none ${i % 2 !== 0 ? 'md:border-l-2' : ''} ${i >= 2 ? 'md:border-b-0' : ''} ${i === t.packages.length - 1 ? 'md:border-b-0' : ''}`}
              >
                <div className="flex justify-between items-start mb-6 md:mb-16 w-full">
                  <span className="neo-label text-xs md:text-xl px-2 md:px-3 py-1 leading-none">{pkg.label}</span>
                  <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-primary group-hover:rotate-45 group-hover:scale-125 transition-transform duration-500 shrink-0" />
                </div>
                <div className="group-hover:-translate-y-2 transition-transform duration-500 mt-2 md:mt-0 text-left">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-4 uppercase tracking-tighter text-text group-hover:text-primary transition-colors break-words">{pkg.name}</h3>
                  <p className="hidden md:block font-bold uppercase tracking-widest text-[10px] md:text-sm mb-3 md:mb-4 leading-relaxed text-text/80">{pkg.desc}</p>
                  <div className="inline-block border-b-2 border-primary text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs pb-1 mt-2 md:mt-4">
                    {t.learnMore}
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
