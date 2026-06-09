import type { Metadata } from 'next';
import { Nunito, Geist } from 'next/font/google';
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
    <html lang="en" className={cn(nunito.variable, geist.variable, "font-sans")}>
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
