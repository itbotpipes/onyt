'use client';

import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';

import IndustryHero from '@/components/industries/IndustryHero';
import IndustryTicker from '@/components/industries/IndustryTicker';
import IndustryGrid from '@/components/industries/IndustryGrid';
import IndustryProcess from '@/components/industries/IndustryProcess';
import IndustryStats from '@/components/industries/IndustryStats';
import IndustryCaseStudies from '@/components/industries/IndustryCaseStudies';
import IndustryFAQSection from '@/components/industries/IndustryFAQSection';
import IndustryFinalCTA from '@/components/industries/IndustryFinalCTA';

export default function IndustriesPage() {
  return (
    <>
      {/* Studio Overlays: Progress bar, film grain, magnetic cursor */}
      <div className="pb" id="pb"></div>
      <div className="gr"></div>
      <div className="cur"></div>

      {/* Global studio navbar */}
      <Nav />

      <main id="main-content" style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
        {/* 1. HERO */}
        <IndustryHero />

        {/* 2. TICKER STRIP */}
        <IndustryTicker />

        {/* 3. INDUSTRY EXPLORER */}
        <IndustryGrid />

        {/* 4. GROWTH PROCESS */}
        <IndustryProcess />

        {/* 5. PERFORMANCE STATISTICS */}
        <IndustryStats />

        {/* 6. FEATURED CASE STUDIES */}
        <IndustryCaseStudies />

        {/* 7. FAQS & TESTIMONIAL */}
        <IndustryFAQSection />

        {/* 8. FINAL CTA BANNER */}
        <IndustryFinalCTA />
      </main>

      {/* Global studio footer */}
      <Footer />

      {/* ONYT Homepage Motion Engine */}
      <Motion />
    </>
  );
}
