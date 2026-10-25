'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { INDUSTRY_DETAILS_MAP } from '@/components/industries/detail/industryDetailData';

import IndDetailHero from '@/components/industries/detail/IndDetailHero';
import IndDetailOverview from '@/components/industries/detail/IndDetailOverview';
import IndDetailSolutions from '@/components/industries/detail/IndDetailSolutions';
import IndDetailProcess from '@/components/industries/detail/IndDetailProcess';
import IndDetailCaseStudy from '@/components/industries/detail/IndDetailCaseStudy';
import IndDetailWhyChoose from '@/components/industries/detail/IndDetailWhyChoose';
import IndDetailFAQ from '@/components/industries/detail/IndDetailFAQ';
import IndDetailFinalCTA from '@/components/industries/detail/IndDetailFinalCTA';

export default function DynamicIndustryDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'manufacturing';

  // Fetch data or fallback to manufacturing
  const data = INDUSTRY_DETAILS_MAP[slug.toLowerCase()] || INDUSTRY_DETAILS_MAP['manufacturing'];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-[var(--ac)] selection:text-white">
      {/* 1. NAVBAR */}
      <Nav />

      {/* 2. HERO */}
      <IndDetailHero data={data} />

      {/* 3. INDUSTRY OVERVIEW / WHY IT MATTERS */}
      <IndDetailOverview data={data} />

      {/* 4. SOLUTIONS FOR THIS INDUSTRY */}
      <IndDetailSolutions data={data} />

      {/* 5. PROCESS */}
      <IndDetailProcess data={data} />

      {/* 6. FEATURED CASE STUDY */}
      <IndDetailCaseStudy data={data} />

      {/* 7. WHY CHOOSE ONYT */}
      <IndDetailWhyChoose data={data} />

      {/* 8. FAQ */}
      <IndDetailFAQ data={data} />

      {/* 9. FINAL CTA */}
      <IndDetailFinalCTA data={data} />

      {/* 10. FOOTER */}
      <Footer />
    </main>
  );
}
