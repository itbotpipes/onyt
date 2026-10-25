'use client';

import React from 'react';
import Link from 'next/link';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailFinalCTA({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-[var(--bg)] text-[var(--fg)] overflow-hidden border-t border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN (~50%) */}
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.finalCtaEyebrow}
              </span>
            </div>

            <h2
              className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold leading-[0.95] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              {data.finalCtaHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx === data.finalCtaHeadingLines.length - 1 ? 'text-[var(--ac)]' : ''}>
                    {line}
                  </span>
                  {idx < data.finalCtaHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[var(--mut)] leading-relaxed max-w-[480px] font-normal" style={{ fontFamily: 'var(--b)' }}>
              {data.finalCtaBody}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={data.finalCtaPrimaryHref}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--ac)] hover:bg-[var(--a2)] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md shadow-[var(--ac)]/25 group"
                style={{ fontFamily: 'var(--b)' }}
              >
                <span>{data.finalCtaPrimaryText}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>

              <Link
                href={data.finalCtaSecondaryHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--ln)] bg-[var(--cd)] hover:border-[var(--ac)] text-[var(--fg)] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-xs"
                style={{ fontFamily: 'var(--b)' }}
              >
                <span>{data.finalCtaSecondaryText}</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN (~50%) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--cd)] border border-[var(--ln)] shadow-xl group">
              <img
                src={data.finalCtaImage}
                alt={data.industryName}
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Handwritten Cursive Annotation Overlay */}
              {data.finalCtaAnnotationLines && (
                <div className="absolute bottom-8 right-8 text-right pointer-events-none hidden sm:block">
                  <p className="font-serif italic text-white/95 text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-md">
                    {data.finalCtaAnnotationLines.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < data.finalCtaAnnotationLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
