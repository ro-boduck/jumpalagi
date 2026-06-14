'use client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';

const DICT = {
  ID: {
    subtitle: 'PAKET PERJALANAN',
    title: 'PILIHAN DESTINASI REUNI',
    desc: 'Kami menyediakan kurasi paket all-in-one yang mencakup akomodasi, transportasi, dan itinerary khusus untuk reuni Anda.',
    packages: [
      { 
        name: 'Paket Bandung', 
        price: 'Start from 6,5 Jt/pax', 
        duration: '5 Hari 4 Malam',
        desc: 'Pengalaman premium di villa Lembang. Kombinasi sempurna antara relaksasi pegunungan dan akses mudah ke tempat hits.',
        label: 'PREMIUM',
        image: '/images/bandung.webp'
      },
      { 
        name: 'Paket Dieng', 
        price: 'Start from 3,2 Jt/pax', 
        duration: '3 Hari 2 Malam',
        desc: 'Nikmati sejuknya udara dataran tinggi dengan suasana hangat. Termasuk penginapan, makan bersama, dan tur ke kawah serta telaga warna.',
        label: 'NATURE',
        image: '/images/dieng.webp'
      },
      { 
        name: 'Paket Solo', 
        price: 'Start from 4,2 Jt/pax', 
        duration: '4 Hari 3 Malam',
        desc: 'Eksplorasi budaya dan kuliner khas keraton. Suasana tenang yang cocok untuk reuni santai penuh nostalgia.',
        label: 'CULTURE',
        image: '/images/solo.webp'
      },
      { 
        name: 'Paket Custom', 
        price: 'Sesuai Budget', 
        duration: 'Fleksibel',
        desc: 'Punya destinasi impian sendiri? Tim concierge kami siap merancang itinerary eksklusif yang menyesuaikan jadwal dan budget angkatan Anda.',
        label: 'CUSTOM',
        image: null
      },
    ],
    cta: 'PESAN SEKARANG'
  },
  EN: {
    subtitle: 'TRAVEL PACKAGES',
    title: 'REUNION DESTINATIONS',
    desc: 'We provide curated all-in-one packages that include accommodation, transportation, and custom itineraries for your reunion.',
    packages: [
      { 
        name: 'Bandung Package', 
        price: 'Start from Rp 6.5M/pax', 
        duration: '5 Days 4 Nights',
        desc: 'Premium experience in Lembang villas. The perfect combination of mountain relaxation and easy access to trendy spots.',
        label: 'PREMIUM',
        image: '/images/bandung.webp'
      },
      { 
        name: 'Dieng Package', 
        price: 'Start from Rp 3.2M/pax', 
        duration: '3 Days 2 Nights',
        desc: 'Enjoy the cool highland breeze with a warm atmosphere. Includes accommodation, group dining, and tours to the craters and color lake.',
        label: 'NATURE',
        image: '/images/dieng.webp'
      },
      { 
        name: 'Solo Package', 
        price: 'Start from Rp 4.2M/pax', 
        duration: '4 Days 3 Nights',
        desc: 'Explore royal culture and culinary delights. A calm atmosphere perfectly suited for a relaxed and nostalgic reunion.',
        label: 'CULTURE',
        image: '/images/solo.webp'
      },
      { 
        name: 'Custom Package', 
        price: 'Per Budget', 
        duration: 'Flexible',
        desc: 'Have your own dream destination? Our concierge team is ready to design an exclusive itinerary tailored to your batch\'s schedule and budget.',
        label: 'CUSTOM',
        image: null
      },
    ],
    cta: 'BOOK NOW'
  }
};

export default function PaketPage() {
  const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Tim%20Jumpa%20Lagi,%20saya%20ingin%20tanya%20detail%20mengenai%20paket%20reuni.";
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <main className="w-full min-h-screen bg-bg flex flex-col text-text selection:bg-accent selection:text-white">
      <Navbar />

      <section className="w-full bg-bg border-b-2 border-border">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 border-l-2 border-r-2 border-border">
          
          <div className="col-span-1 md:col-span-12 bg-accent p-6 md:p-12 border-b-2 border-border">
            <span className="font-bold tracking-widest uppercase mb-6 block text-sm text-bone">
              {t.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.85] cursor-default text-bone">
              {t.title}
            </h1>
            <p className="text-base md:text-lg font-bold uppercase tracking-widest max-w-3xl leading-relaxed mt-4 text-bone">
              {t.desc}
            </p>
          </div>

          {t.packages.map((pkg, i) => (
            <div 
              key={i}
              className={`col-span-1 md:col-span-6 bg-bg group ${i % 2 !== 0 ? 'md:border-l-2' : ''} border-b-2 border-border`}
            >
              <div className="neo-card-hover p-6 md:p-12 overflow-hidden">
                {/* Hover background image + dark mask */}
                {pkg.image && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }} />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                )}

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <span className="neo-label text-sm md:text-base px-3 py-1">{pkg.label}</span>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-primary group-hover:bg-accent text-primary-foreground p-3 active:scale-[0.95] transition-all duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] rounded-none border-2 border-text group-hover:border-accent hover:bg-text hover:text-bg">
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>
                <div className="mb-8 relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black mb-2 uppercase tracking-tighter text-text group-hover:text-accent transition-colors duration-[250ms] break-words">{pkg.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs md:text-sm font-bold uppercase tracking-widest text-primary group-hover:text-accent/80 transition-colors duration-[250ms] mb-6">
                    <span className="bg-primary/10 group-hover:bg-accent/10 px-2 py-1 transition-colors duration-[250ms]">{pkg.price}</span>
                    <span className="bg-primary/10 group-hover:bg-accent/10 px-2 py-1 transition-colors duration-[250ms]">{pkg.duration}</span>
                  </div>
                  <p className="font-bold uppercase tracking-widest text-xs md:text-sm leading-relaxed text-text/80 group-hover:text-accent/70 transition-colors duration-[250ms]">{pkg.desc}</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block self-start border-b-2 border-text group-hover:border-accent text-text group-hover:text-accent font-black uppercase tracking-widest text-sm pb-1 hover:text-primary hover:border-primary active:scale-[0.97] transition-all duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-left">
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
