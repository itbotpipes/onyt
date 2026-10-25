import React from 'react';
import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/services/SmoothScrollProvider';
import Nav from '@/components/Nav';
import SolutionsHero from '@/components/services/SolutionsHero';
import SolutionsRail from '@/components/services/SolutionsRail';
import ConnectedSolutions from '@/components/services/ConnectedSolutions';
import ApproachTimeline from '@/components/services/ApproachTimeline';
import WhyQuest from '@/components/services/WhyQuest';
import CaseStudiesShowcase from '@/components/services/CaseStudiesShowcase';
import FinalCTA from '@/components/services/FinalCTA';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/services/CustomCursor';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return (
    <SmoothScrollProvider>
      {/* Custom cursor — desktop only, disabled on reduced motion */}
      <CustomCursor />

      {/* Navigation */}
      <Nav />

      <main id="main-content" className="bg-[var(--bg)] text-[var(--fg)] min-h-screen">
        {/* 00 — Hero */}
        <SolutionsHero />

        {/* 01 — Services horizontal rail */}
        <SolutionsRail />

        {/* 02 — Connected ecosystem */}
        <ConnectedSolutions />

        {/* 03 — Our approach */}
        <ApproachTimeline />

        {/* 04 — Why ONYT */}
        <WhyQuest />

        {/* 05 — Case studies */}
        <CaseStudiesShowcase />

        {/* 06 — Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
