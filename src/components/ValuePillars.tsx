'use client';
import { useLanguage } from '@/contexts/LanguageContext';

const DICT = {
  ID: {
    subtitle: 'KENAPA MEMILIH JUMPA LAGI',
    title: 'KAMI MENGAMBIL ALIH SEMUA KERIBETAN ANDA.',
    desc1: 'Membangun kembali koneksi lama tidak seharusnya diawali dengan stres karena males ribet ngurus persiapan.',
    desc2: 'Percayakan logistik pada ahlinya. Anda dan teman-teman cukup membawa diri dan bersiap merangkai memori baru.',
    pillars: [
      { num: '01', title: 'MANAJEMEN KEUANGAN AMAN', desc: 'Sistem pembayaran patungan terpusat yang transparan. Tidak ada uang yang nyangkut.' },
      { num: '02', title: 'TIM CONCIERGE DEDIKASI', desc: 'Dibantu oleh profesional yang mengurus tiket, itinerary, hingga detail terkecil.' },
      { num: '03', title: 'PRIVASI TERJAMIN', desc: 'Seluruh lokasi dan dokumentasi ditangani secara tertutup untuk kenyamanan.' }
    ]
  },
  EN: {
    subtitle: 'WHY CHOOSE JUMPA LAGI',
    title: 'WE TAKE OVER ALL YOUR HASSLES.',
    desc1: "Rebuilding old connections shouldn't start with the stress of organizing.",
    desc2: 'Trust the logistics to the experts. You and your friends just need to show up and get ready to create new memories.',
    pillars: [
      { num: '01', title: 'SECURE FINANCIAL MANAGEMENT', desc: 'Transparent centralized group payment system. No stuck money.' },
      { num: '02', title: 'DEDICATED CONCIERGE TEAM', desc: 'Assisted by professionals who handle tickets, itineraries, to the smallest details.' },
      { num: '03', title: 'GUARANTEED PRIVACY', desc: 'All locations and documentation are handled privately for your comfort.' }
    ]
  }
};

export function ValuePillars() {
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <section className="w-full bg-bg border-b-2 border-border -mt-[2px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
        
        <div className="col-span-1 md:col-span-12 bg-text text-bg py-6 px-5 md:p-12 border-b-2 border-border">
          <span className="text-accent font-bold tracking-widest uppercase mb-3 md:mb-6 block text-xs md:text-sm">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter max-w-4xl leading-[0.9] md:leading-[0.85] break-words">
            {t.title}
          </h2>
        </div>

        <div className="hidden md:flex col-span-1 md:col-span-6 bg-muted text-text flex-col justify-center py-6 px-5 md:p-12 border-b-2 border-r-0 md:border-r-2 border-border">
          <p className="font-bold text-sm md:text-2xl uppercase tracking-widest leading-snug md:leading-tight mb-4 md:mb-12">
            {t.desc1}
          </p>
          <p className="font-bold text-sm md:text-2xl uppercase tracking-widest leading-snug md:leading-tight text-primary">
            {t.desc2}
          </p>
        </div>

        <div className="col-span-1 md:col-span-6 flex flex-col border-b-2 border-border">
          {t.pillars.map((pillar, i) => (
            <div key={i} className={`flex-1 flex flex-col md:flex-row items-start md:items-center py-4 px-5 md:p-8 bg-bg hover:bg-muted transition-colors duration-300 border-border group overflow-hidden ${i < t.pillars.length - 1 ? 'border-b-2' : ''}`}>
               <span className="text-2xl md:text-5xl font-black uppercase tracking-tighter w-10 md:w-20 group-hover:scale-110 transition-transform duration-500 text-primary shrink-0 leading-none mb-1 md:mb-0">{pillar.num}</span>
               <div className="flex flex-col flex-1 group-hover:translate-x-4 transition-transform duration-500">
                 <h3 className="text-base md:text-3xl font-black uppercase tracking-tighter text-text group-hover:text-primary transition-colors">{pillar.title}</h3>
                 <p className="hidden md:block text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 md:mt-2 text-text/80 leading-relaxed opacity-90">{pillar.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
