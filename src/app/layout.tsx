import type { Metadata } from 'next';
import { Montserrat, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'JumpaLagi | Reunion Specialist',
  description: 'Effortless group travel for unforgettable family and school reunions across Indonesia.',
  icons: {
    icon: '/images/JL LOGO.webp',
  },
};

import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(montserrat.className, "font-sans", geist.variable)}>
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
