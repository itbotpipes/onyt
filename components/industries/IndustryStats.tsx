'use client';

import React from 'react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryStats() {
  const { stats } = INDUSTRIES_PAGE_DATA;

  return (
    <section
      className="py-24 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 border-b border-[var(--ln)] relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Eyebrow */}
        <div className="ey rv">Industries in numbers</div>

        {/* 4-COLUMN BALANCED METRICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--ln)] border-y border-[var(--ln)] py-10 sm:py-14 rv">
          {stats.items.map((item, idx) => {
            const numVal = item.value || parseFloat(item.number) || 0;
            const suffix = item.suffix || item.number.replace(/[0-9.]/g, '');

            return (
              <div
                key={idx}
                className="flex flex-col justify-center px-4 sm:px-8 lg:px-10 py-6 sm:py-2 first:pt-0 sm:first:pt-2 last:pb-0 sm:last:pb-2"
              >
                <div
                  data-n={numVal}
                  data-s={suffix}
                  className="text-[38px] sm:text-[48px] lg:text-[64px] font-extrabold leading-none tracking-[-0.035em] mb-3"
                  style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
                >
                  {item.number}
                </div>
                <div
                  className="text-xs sm:text-sm tracking-wider uppercase font-medium leading-relaxed"
                  style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
