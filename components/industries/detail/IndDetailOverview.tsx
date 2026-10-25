'use client';

import React from 'react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailOverview({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Large Editorial Image (~50%) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[var(--cd)] border border-[var(--ln)] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] shadow-lg">
            <img
              src={data.overviewImage}
              alt={data.industryName}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Embedded Text Overlay */}
            {data.overviewImageOverlayText && (
              <div className="absolute bottom-8 left-8 text-white max-w-[280px] pointer-events-none">
                <h4 className="text-lg sm:text-xl font-bold tracking-tight leading-snug drop-shadow-md" style={{ fontFamily: 'var(--d)' }}>
                  {data.overviewImageOverlayText.join(" ")}
                </h4>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Content (~50%) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.overviewEyebrow}
              </span>
            </div>

            <h2
              className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              {data.overviewHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx === data.overviewHeadingLines.length - 1 ? 'text-[var(--ac)]' : ''}>
                    {line}
                  </span>
                  {idx < data.overviewHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[var(--mut)] leading-relaxed font-normal max-w-[540px]" style={{ fontFamily: 'var(--b)' }}>
              {data.overviewBody}
            </p>

            {/* 3 Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[var(--ln)]">
              {data.overviewPoints.map((point, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--ac)] mb-2" />
                  <p className="text-sm font-semibold text-[var(--fg)] tracking-tight" style={{ fontFamily: 'var(--b)' }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
