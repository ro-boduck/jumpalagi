import React from 'react';
import { Hero } from '../components/Hero';
import { ValuePillars } from '../components/ValuePillars';
import { PackageCatalog } from '../components/PackageCatalog';
import { TrustSection } from '../components/TrustSection';
import { Footer } from '../components/Footer';

export default function LandingPage() {
  return (
    <main className="flex-1 w-full flex flex-col bg-bg text-text selection:bg-accent selection:text-white">
      <Hero />
      <ValuePillars />
      <PackageCatalog />
      <TrustSection />
      <Footer />
    </main>
  );
}
