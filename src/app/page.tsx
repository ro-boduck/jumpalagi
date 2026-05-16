import React from 'react';
import { Hero } from '../components/Hero';
import dynamic from 'next/dynamic';

const ValuePillars = dynamic(() => import('../components/ValuePillars').then(mod => mod.ValuePillars));
const PackageCatalog = dynamic(() => import('../components/PackageCatalog').then(mod => mod.PackageCatalog));
const TrustSection = dynamic(() => import('../components/TrustSection').then(mod => mod.TrustSection));
const Footer = dynamic(() => import('../components/Footer').then(mod => mod.Footer));

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
