'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailCaseStudy({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.caseStudyEyebrow}
              </span>
            </div>
            <h2
              className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              Featured <span className="text-[var(--ac)]">Work</span>
            </h2>
          </div>

          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--fg)] hover:text-[var(--ac)] transition-colors"
            style={{ fontFamily: 'var(--b)' }}
          >
            <span>{data.caseStudyCtaText || "Explore All Work →"}</span>
          </Link>
        </div>

        {/* FEATURED CASE STUDY CARD SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 bg-[var(--cd)] border border-[var(--ln)] rounded-2xl p-6 sm:p-10 lg:p-12 items-center shadow-lg">
          
          {/* LEFT: Large Image (~45%) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-[var(--bg)] border border-[var(--ln)]">
            <img
              src={data.caseStudyImage}
              alt={data.caseStudyTag}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[var(--cd)]/90 backdrop-blur-md text-[var(--fg)] text-[11px] font-mono uppercase tracking-wider font-semibold border border-[var(--ln)]">
                {data.caseStudyTag}
              </span>
            </div>
          </div>

          {/* RIGHT: Content & Metrics (~55%) */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <div className="space-y-4">
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--fg)] leading-tight"
                style={{ fontFamily: 'var(--d)' }}
              >
                {data.caseStudyHeadingLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < data.caseStudyHeadingLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>

              <p className="text-base sm:text-lg text-[var(--mut)] leading-relaxed font-normal" style={{ fontFamily: 'var(--b)' }}>
                {data.caseStudyBody}
              </p>
            </div>

            {/* Metrics Column */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--ln)]">
              {data.caseStudyMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--ac)]" style={{ fontFamily: 'var(--d)' }}>
                    {metric.value}
                  </p>
                  <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[var(--mut)] line-clamp-2">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Case Study Link CTA */}
            <div className="pt-2">
              <Link
                href="/#work"
                className="inline-flex items-center gap-3 text-sm font-semibold text-[var(--fg)] group hover:text-[var(--ac)] transition-colors"
                style={{ fontFamily: 'var(--b)' }}
              >
                <span>Read Full Case Study</span>
                <div className="w-8 h-8 rounded-full border border-[var(--ln)] bg-[var(--bg)] flex items-center justify-center text-[var(--fg)] group-hover:bg-[var(--ac)] group-hover:text-white group-hover:border-[var(--ac)] transition-all">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
