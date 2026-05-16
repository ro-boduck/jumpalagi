'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const DICT = {
  ID: {
    desc: 'Layanan concierge reuni #1 di Indonesia. Kami mengambil alih semua keribetan logistik, agar Anda bisa fokus merajut kembali kenangan.',
    linksTitle: 'Tautan Cepat',
    links: {
      home: 'Home',
      packages: 'Paket',
      about: 'Tentang Kami',
      contact: 'Kontak'
    },
    contactTitle: 'Hubungi Kami',
    copyright: '© 2026 Jumpa Lagi. Hak Cipta Dilindungi.',
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat & Ketentuan'
  },
  EN: {
    desc: 'The #1 reunion concierge service in Indonesia. We take over all logistics, so you can focus on reconnecting.',
    linksTitle: 'Quick Links',
    links: {
      home: 'Home',
      packages: 'Packages',
      about: 'About Us',
      contact: 'Contact'
    },
    contactTitle: 'Contact Us',
    copyright: '© 2026 Jumpa Lagi. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  }
};

export function Footer() {
  const { lang } = useLanguage();
  const t = DICT[lang];

  return (
    <footer id="kontak" className="w-full bg-text text-bg py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col gap-6 max-w-sm">
          <Image src="/images/JL TYPEFACE.webp" alt="Jumpa Lagi" width={200} height={40} className="w-48 h-auto grayscale invert brightness-0" />
          <p className="text-sm font-medium leading-relaxed opacity-80">{t.desc}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">{t.linksTitle}</h4>
            <Link href="/" className="text-sm hover:text-accent transition-colors">{t.links.home}</Link>
            <Link href="/paket" className="text-sm hover:text-accent transition-colors">{t.links.packages}</Link>
            <Link href="/about" className="text-sm hover:text-accent transition-colors">{t.links.about}</Link>
            <Link href="/contact" className="text-sm hover:text-accent transition-colors">{t.links.contact}</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">{t.contactTitle}</h4>
            <a href="mailto:hello@jumpalagi.com" className="text-sm hover:text-accent transition-colors">hello@jumpalagi.com</a>
            <a href="tel:+6287754764598" className="text-sm hover:text-accent transition-colors">+62 877-5476-4598</a>
            <p className="text-sm opacity-80 mt-2">Bali, Indonesia</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-bg/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold tracking-widest opacity-60 uppercase">{t.copyright}</p>
        <div className="flex gap-6">
          <Link href="#" className="text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors opacity-60 hover:opacity-100 block">{t.privacy}</Link>
          <Link href="#" className="text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors opacity-60 hover:opacity-100 block">{t.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
