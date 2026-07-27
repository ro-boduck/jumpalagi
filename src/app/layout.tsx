import type { Metadata } from 'next';
import { Nunito, Geist, Caveat, Quicksand } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwritten',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JumpaLagi | Reunion Specialist',
  description: 'Effortless group travel for unforgettable family and school reunions across Indonesia.',
  icons: {
    icon: '/images/JL LOGO.webp',
  },
};

import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConsultationProvider } from '@/contexts/ConsultationContext';
import { WhatsAppRedirectProvider } from '@/contexts/WhatsAppRedirectContext';
import { ConsultationModal } from '@/components/ConsultationModal';
import { Cursor } from '@/components/ui/inverted-cursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(nunito.variable, geist.variable, caveat.variable, quicksand.variable, "font-sans")}>
      <body className="antialiased min-h-screen flex flex-col">
        <Cursor size={20} />
        <LanguageProvider>
          <ConsultationProvider>
            <WhatsAppRedirectProvider>
              {children}
              <ConsultationModal />
            </WhatsAppRedirectProvider>
          </ConsultationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
