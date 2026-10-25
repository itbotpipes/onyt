'use client';

import React from 'react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailWhyChoose({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Headlines (~45%) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.whyChooseEyebrow}
              </span>
            </div>

            <h2
              className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              {data.whyChooseHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx === data.whyChooseHeadingLines.length - 1 ? 'text-[var(--ac)]' : ''}>
                    {line}
                  </span>
                  {idx < data.whyChooseHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[var(--mut)] leading-relaxed max-w-[480px] font-normal" style={{ fontFamily: 'var(--b)' }}>
              {data.whyChooseBody}
            </p>
          </div>

          {/* RIGHT COLUMN: Feature Items with Thin Dividers (~55%) */}
          <div className="lg:col-span-7 divide-y divide-[var(--ln)] border-t border-b border-[var(--ln)]">
            {data.whyChooseItems.map((item, idx) => (
              <div key={idx} className="py-6 sm:py-8 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--ac)] font-bold">
                    {item.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--fg)]" style={{ fontFamily: 'var(--b)' }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--mut)] leading-relaxed font-normal pl-7" style={{ fontFamily: 'var(--b)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
