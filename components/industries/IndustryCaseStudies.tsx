'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryCaseStudies() {
  const { caseStudies } = INDUSTRIES_PAGE_DATA;

  return (
    <section
      id="industry-cases"
      className="py-24 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-[var(--ln)] relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* SECTION HEADER: Eyebrow + Headline */}
        <div className="max-w-[720px] mb-14 sm:mb-18">
          <div className="ey rv">Featured Work</div>

          <div className="rv">
            <h2
              className="text-[34px] sm:text-[46px] lg:text-[56px] font-extrabold leading-[1.02] tracking-[-0.035em]"
              style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
            >
              {caseStudies.title}{' '}
              <span style={{ color: 'var(--ac)' }}>
                {caseStudies.highlightWord}
              </span>
            </h2>
          </div>
        </div>

        {/* 2-COLUMN CASE STUDIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {caseStudies.items.map((cs) => {
            const isShard = cs.variant === 'shard';

            return (
              <Link
                key={cs.id}
                href={cs.link}
                className="rv group relative rounded-3xl border border-[var(--ln)] overflow-hidden p-8 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] transition-all duration-500 hover:border-[color-mix(in_srgb,var(--ac)_60%,var(--ln))] hover:shadow-[0_20px_48px_-16px_rgba(255,77,0,0.18)]"
                style={{ background: 'var(--cd)' }}
              >
                {/* Background Architectural Artwork */}
                <div className="absolute right-0 bottom-0 w-[55%] sm:w-[50%] h-[75%] pointer-events-none z-0 overflow-hidden">
                  {isShard ? (
                    // Glowing isometric prism / tower geometry
                    <svg
                      viewBox="0 0 300 350"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <defs>
                        <linearGradient id="prismGrad1" x1="100" y1="350" x2="280" y2="120" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.85" />
                          <stop offset="60%" stopColor="#ff7a29" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="prismGrad2" x1="180" y1="350" x2="300" y2="80" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polygon points="120,350 120,170 190,130 190,350" fill="url(#prismGrad1)" opacity="0.6" />
                      <polygon points="190,130 240,160 240,350 190,350" fill="url(#prismGrad2)" opacity="0.4" />
                      <polygon points="120,170 170,140 240,160 190,190" fill="#ffffff" opacity="0.12" />

                      <polygon points="190,350 190,110 270,70 270,350" fill="url(#prismGrad1)" opacity="0.9" />
                      <polygon points="270,70 300,90 300,350 270,350" fill="url(#prismGrad2)" opacity="0.5" />
                      <polygon points="190,110 220,90 300,90 270,110" fill="#ffffff" opacity="0.2" />

                      <line x1="190" y1="350" x2="190" y2="110" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
                      <line x1="270" y1="350" x2="270" y2="70" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />
                    </svg>
                  ) : (
                    // Glowing concentric radar / wave arcs
                    <svg
                      viewBox="0 0 320 320"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <defs>
                        <radialGradient id="arcsGrad" cx="100%" cy="100%" r="90%">
                          <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.95" />
                          <stop offset="50%" stopColor="#ff7a29" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="var(--ac)" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <circle cx="320" cy="320" r="280" stroke="url(#arcsGrad)" strokeWidth="2.5" opacity="0.3" />
                      <circle cx="320" cy="320" r="220" stroke="url(#arcsGrad)" strokeWidth="3" opacity="0.5" />
                      <circle cx="320" cy="320" r="160" stroke="url(#arcsGrad)" strokeWidth="4" opacity="0.75" />
                      <circle cx="320" cy="320" r="100" stroke="url(#arcsGrad)" strokeWidth="5" opacity="0.9" />
                      <circle cx="320" cy="320" r="45" fill="var(--ac)" opacity="0.8" />
                    </svg>
                  )}
                </div>

                {/* Content top: Tag */}
                <div className="relative z-10 space-y-3">
                  <span
                    className="text-xs font-mono tracking-widest uppercase font-semibold"
                    style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                  >
                    {cs.number}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
                  >
                    {cs.title}
                  </h3>
                </div>

                {/* Content bottom: Summary & action arrow */}
                <div className="relative z-10 pt-16 flex items-end justify-between gap-6">
                  <p
                    className="text-xs sm:text-sm leading-relaxed max-w-[340px]"
                    style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                  >
                    {cs.summary}
                  </p>

                  <div
                    className="w-10 h-10 rounded-full border border-[var(--ln)] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[var(--ac)] group-hover:bg-[var(--ac)] group-hover:text-white"
                    style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)', color: 'var(--fg)' }}
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
