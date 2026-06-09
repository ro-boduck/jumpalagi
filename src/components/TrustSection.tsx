'use client';
import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DICT = {
  ID: {
    subtitle: 'TESTIMONI & BUKTI NYATA',
    title: 'MEREKA YANG TELAH MEMBUKTIKAN.',
    description: 'Ratusan grup telah mempercayakan momen reuni mereka kepada layanan profesional kami.',
    testimonials: [
      { quote: "Gak nyangka reuni angkatan bisa kejadian tanpa ada drama cari-cari destinasi dan penginapan di grup.", author: "Ibu Rina", role: "Alumni '98" },
      { quote: "Biasanya yang inisiatif ngajak kumpul yang paling capek ngurusin ini itu. Pakai Jumpa Lagi, malah bisa ikutan enjoy tanpa pusing mikirin booking tempat dan transport.", author: "Pak Aryo", role: "Reuni Keluarga" },
      { quote: "Wacana 3 tahun akhirnya pecah juga. 10 tahun gak ketemu, pemilihan tempat dan transportasinya super rapi.", author: "Siska", role: "Geng Kampus" }
    ]
  },
  EN: {
    subtitle: 'TESTIMONIALS & PROOF',
    title: 'THOSE WHO HAVE PROVEN IT.',
    description: 'Hundreds of groups have trusted their reunion moments to our professional service.',
    testimonials: [
      { quote: "Didn't expect the batch reunion to happen without the drama of searching for destinations and accommodations in the group chat.", author: "Ibu Rina", role: "Alumni '98" },
      { quote: "Usually the one initiating the meetup gets the most tired organizing things. With Jumpa Lagi, I could actually enjoy it without worrying about booking venues and transport.", author: "Pak Aryo", role: "Family Reunion" },
      { quote: "3 years of just talk finally happened. 10 years not meeting, the venue selection and transportation were super neat.", author: "Siska", role: "College Gang" }
    ]
  }
};

export function TrustSection() {
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <section id="testimoni" className="w-full bg-bg">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
        <div className="col-span-1 md:col-span-12 bg-muted text-text p-5 md:p-12 border-b-2 border-border">
          <span className="font-bold tracking-widest uppercase mb-4 md:mb-6 block text-xs md:text-sm text-primary opacity-80">
            {t.subtitle}
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-3 md:mb-4 leading-[0.9] md:leading-[0.85] cursor-default text-primary break-words">
            {t.title}
          </h2>
          <p className="hidden md:block text-sm md:text-lg font-bold uppercase tracking-widest opacity-90 max-w-2xl leading-relaxed">
            {t.description}
          </p>
        </div>

        {t.testimonials.map((testi, i) => (
          <div 
            key={i} 
            className={`col-span-1 md:col-span-4 group bg-bg border-b-2 border-border ${i === t.testimonials.length - 1 ? '' : 'md:border-r-2'}`}
          >
            <div className="neo-card-hover p-6 md:p-10">
              <div>
                <Quote className="w-8 h-8 md:w-12 md:h-12 text-accent mb-4 md:mb-6 opacity-80" />
                <p className="font-bold uppercase tracking-widest text-[11px] md:text-sm leading-relaxed mb-6 md:mb-8">
                  &quot;{testi.quote}&quot;
                </p>
              </div>
              <div>
                <p className="font-black uppercase tracking-tighter text-base md:text-xl text-primary">{testi.author}</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60 mt-1">{testi.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
