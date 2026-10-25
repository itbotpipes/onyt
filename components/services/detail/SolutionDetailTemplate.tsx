'use client';

import React from 'react';
import SmoothScrollProvider from '@/components/services/SmoothScrollProvider';
import Nav from '@/components/Nav';
import CustomCursor from '@/components/services/CustomCursor';
import Footer from '@/components/Footer';

import { getSolutionDetailData, SolutionDetailData } from './solutionData';
import DetailHero from './DetailHero';
import DetailWhyMatters from './DetailWhyMatters';
import DetailBusinessNeeds from './DetailBusinessNeeds';
import DetailProcessJourney from './DetailProcessJourney';
import DetailWebsiteAnatomy from './DetailWebsiteAnatomy';
import DetailProofResults from './DetailProofResults';
import DetailFAQ from './DetailFAQ';
import DetailFinalCTA from './DetailFinalCTA';

interface SolutionDetailTemplateProps {
  slug?: string;
  overrideData?: Partial<SolutionDetailData>;
}

export default function SolutionDetailTemplate({
  slug = 'website-development',
  overrideData,
}: SolutionDetailTemplateProps) {
  // Load structured data for this solution slug
  const baseData = getSolutionDetailData(slug);
  const data: SolutionDetailData = overrideData
    ? { ...baseData, ...overrideData }
    : baseData;

  return (
    <SmoothScrollProvider>
      {/* Custom Cursor — Desktop only */}
      <CustomCursor />

      {/* Navigation */}
      <Nav />

      <main id="main-content" className="bg-[var(--bg)] text-[var(--fg)] min-h-screen">
        {/* 01 — HERO SECTION */}
        <DetailHero data={data} />

        {/* 02 — WHY IT MATTERS */}
        <DetailWhyMatters data={data} />

        {/* 03 — BUILT FOR DIFFERENT BUSINESS NEEDS (Interactive Showcase Stage) */}
        <DetailBusinessNeeds data={data} />

        {/* 04 — PROCESS / BUILD JOURNEY (Spatial Staircase Pathway) */}
        <DetailProcessJourney data={data} />

        {/* 05 — WHAT GOES INTO AN ONYT WEBSITE (Website Anatomy Breakdown) */}
        <DetailWebsiteAnatomy data={data} />

        {/* 06 — PROOF & RESULTS (Asymmetrical Showcase) */}
        <DetailProofResults data={data} />

        {/* 07 — FAQ (Minimal Accordion) */}
        <DetailFAQ data={data} />

        {/* 08 — FINAL CTA */}
        <DetailFinalCTA data={data} />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScrollProvider>
  );
}
