'use client';

import React, { useEffect, useRef } from 'react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryProcess() {
  const { process } = INDUSTRIES_PAGE_DATA;
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="growth-process"
      className="py-24 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-[var(--ln)] relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER: Eyebrow + Heading */}
        <div className="max-w-[760px] mb-16 sm:mb-20 lg:mb-24">
          <div className="ey rv">The ONYT Approach</div>

          <div className="rv">
            <h2
              className="text-[34px] sm:text-[46px] lg:text-[56px] font-extrabold leading-[1.02] tracking-[-0.035em]"
              style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
            >
              {process.title.prefix}{' '}
              <span style={{ color: 'var(--ac)' }}>
                {process.title.highlight}
              </span>
            </h2>
          </div>
        </div>

        {/* INTERACTIVE 3-STAGE UNDULATING WAVE DIAGRAM */}
        <div className="relative pt-6 pb-12">
          
          {/* Desktop Connecting SVG Spline */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg
              viewBox="0 0 1200 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-contain"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="processPathGrad" x1="100" y1="200" x2="1100" y2="240" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#ff7a29" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="var(--ac)" stopOpacity="1" />
                </linearGradient>
                <filter id="processGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background faint guide track */}
              <path
                d="M 120 220 Q 380 230, 600 120 T 1080 230"
                stroke="var(--ln)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            </svg>
          </div>

          {/* STAGES CONTENT GRID (3 Nodes aligned with the wave peaks/troughs) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            
            {/* Stage 01: Understand the industry */}
            <div className="rv flex flex-col items-start md:pt-16">
              <div className="flex items-center gap-3 mb-5">
                <div
                  data-step="1"
                  className="step-badge w-9 h-9 rounded-full border border-[var(--ac)] flex items-center justify-center text-xs font-mono font-bold shadow-[0_0_12px_rgba(255,77,0,0.3)] transition-all duration-300"
                  style={{ background: 'color-mix(in srgb, var(--cd) 80%, transparent)', color: 'var(--ac)' }}
                >
                  {process.steps[0].number}
                </div>
                <span className="w-8 h-[1px] bg-[var(--ac)]/40 hidden md:inline-block" />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold tracking-tight mb-2"
                style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
              >
                {process.steps[0].title}
              </h3>
              <p
                className="text-xs sm:text-sm leading-relaxed max-w-[320px]"
                style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
              >
                {process.steps[0].description}
              </p>
            </div>

            {/* Stage 02: Build a tailored strategy (Apex) */}
            <div className="rv flex flex-col items-start md:pt-2">
              <div className="flex items-center gap-3 mb-5">
                <div
                  data-step="2"
                  className="step-badge w-9 h-9 rounded-full border border-[var(--ac)] flex items-center justify-center text-xs font-mono font-bold shadow-[0_0_12px_rgba(255,77,0,0.3)] transition-all duration-300"
                  style={{ background: 'color-mix(in srgb, var(--cd) 80%, transparent)', color: 'var(--ac)' }}
                >
                  {process.steps[1].number}
                </div>
                <span className="w-8 h-[1px] bg-[var(--ac)]/40 hidden md:inline-block" />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold tracking-tight mb-2"
                style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
              >
                {process.steps[1].title}
              </h3>
              <p
                className="text-xs sm:text-sm leading-relaxed max-w-[320px]"
                style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
              >
                {process.steps[1].description}
              </p>
            </div>

            {/* Stage 03: Execute & scale */}
            <div className="rv flex flex-col items-start md:pt-20">
              <div className="flex items-center gap-3 mb-5">
                <div
                  data-step="3"
                  className="step-badge w-9 h-9 rounded-full border border-[var(--ac)] flex items-center justify-center text-xs font-mono font-bold shadow-[0_0_12px_rgba(255,77,0,0.3)] transition-all duration-300"
                  style={{ background: 'color-mix(in srgb, var(--cd) 80%, transparent)', color: 'var(--ac)' }}
                >
                  {process.steps[2].number}
                </div>
                <span className="w-8 h-[1px] bg-[var(--ac)]/40 hidden md:inline-block" />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold tracking-tight mb-2"
                style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
              >
                {process.steps[2].title}
              </h3>
              <p
                className="text-xs sm:text-sm leading-relaxed max-w-[320px]"
                style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
              >
                {process.steps[2].description}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
