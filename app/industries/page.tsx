'use client';

import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/services/SmoothScrollProvider';
import CustomCursor from '@/components/services/CustomCursor';
import IndustryHero from '@/components/industries/IndustryHero';
import IndustryGrid from '@/components/industries/IndustryGrid';
import IndustryStats from '@/components/industries/IndustryStats';
import IndustryCaseStudies from '@/components/industries/IndustryCaseStudies';
import IndustryFAQSection from '@/components/industries/IndustryFAQSection';
import IndustryTestimonial from '@/components/industries/IndustryTestimonial';
import IndustryFinalCTA from '@/components/industries/IndustryFinalCTA';

export default function IndustriesPage() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />

      <Nav />

      <main id="main-content" className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-[var(--ac)] selection:text-white">
        {/* 1. HERO */}
        <IndustryHero />

        {/* 2. INDUSTRY HORIZONTAL RAIL */}
        <IndustryGrid />

        {/* 3. STATS */}
        <IndustryStats />

        {/* 4. CASE STUDIES */}
        <IndustryCaseStudies />

        {/* 5. FAQ */}
        <IndustryFAQSection />

        {/* 6. TESTIMONIAL */}
        <IndustryTestimonial />

        {/* 7. FINAL CTA */}
        <IndustryFinalCTA />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}

