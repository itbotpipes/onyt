'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryFinalCTA() {
  const { finalCta } = INDUSTRIES_PAGE_DATA;

  return (
    <section
      id="industry-final-cta"
      className="py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* Luminous Pill-Shaped Banner Card */}
        <div
          className="rv relative rounded-3xl border border-[var(--ln)] overflow-hidden p-8 sm:p-14 lg:p-16 flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-2xl"
          style={{ background: 'var(--cd)' }}
        >
          {/* Sweeping Radiant Orange Light Beam from bottom-left */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Ambient radiant orange glow */}
            <div className="absolute -left-20 -bottom-20 w-[420px] h-[320px] bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.45)_0%,rgba(255,77,0,0.12)_45%,transparent_75%)] blur-2xl" />

            {/* Sweeping arc curve SVG */}
            <svg
              viewBox="0 0 900 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 bottom-0 w-full sm:w-[60%] h-full object-cover"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="ctaArcGrad" x1="0" y1="400" x2="600" y2="100" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="#ff7a29" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M -50 400 C 180 380, 360 260, 580 80"
                stroke="url(#ctaArcGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M -50 400 C 180 380, 360 260, 580 80"
                stroke="var(--ac)"
                strokeWidth="28"
                opacity="0.12"
                filter="blur(16px)"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="relative z-10 max-w-[620px]">
            <h2
              className="text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.08] tracking-[-0.035em]"
              style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
            >
              {finalCta.title}
            </h2>
          </div>

          {/* Action Button */}
          <div className="relative z-10 flex-shrink-0">
            <Link
              href={finalCta.ctaHref}
              className="btn"
              style={{ fontFamily: 'var(--b)', fontSize: '15px', padding: '14px 28px' }}
            >
              <span>{finalCta.ctaText}</span>
              <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
