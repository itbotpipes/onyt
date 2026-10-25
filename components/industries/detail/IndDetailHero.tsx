'use client';

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailHero({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 bg-[var(--bg)] text-[var(--fg)] overflow-hidden border-b border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-7 z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)] animate-pulse" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              {data.heroHeadlineLines.map((line, idx) => (
                <span key={idx} className={`block whitespace-normal sm:whitespace-nowrap ${idx === data.heroHeadlineLines.length - 1 ? 'text-[var(--ac)]' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Body */}
            <p
              className="text-base sm:text-lg text-[var(--mut)] leading-relaxed max-w-[500px] font-normal"
              style={{ fontFamily: 'var(--b)' }}
            >
              {data.heroBody}
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={data.primaryCtaHref}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--ac)] hover:bg-[var(--a2)] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md shadow-[var(--ac)]/25 group"
                style={{ fontFamily: 'var(--b)' }}
              >
                <span>{data.primaryCtaText}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>

              {data.secondaryCtaText && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full border border-[var(--ln)] bg-[var(--cd)] hover:border-[var(--ac)] text-[var(--fg)] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-xs"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--ac)]/15 flex items-center justify-center text-[var(--ac)]">
                    <Play size={10} className="fill-[var(--ac)] translate-x-0.5" />
                  </div>
                  <span>{data.secondaryCtaText}</span>
                </button>
              )}
            </div>

            {/* Trust Line */}
            {data.trustText && (
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--mut)] pt-2">
                {data.trustText}
              </p>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 xl:col-span-7 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[var(--cd)] border border-[var(--ln)] group">
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full relative">
                <img
                  src={data.heroImage}
                  alt={data.industryName}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                
                {/* Soft daylight gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Top Right Cursive Editorial Annotation */}
                {data.heroAnnotationLines && (
                  <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-right pointer-events-none">
                    <p className="font-serif italic text-white/95 text-xl sm:text-2xl lg:text-3xl leading-snug drop-shadow-md">
                      {data.heroAnnotationLines.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx < data.heroAnnotationLines.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
