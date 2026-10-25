'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailProofResults({ data }: { data: SolutionDetailData }) {
  const primaryProof = data.proofCards[0];
  const secondaryProof = data.proofCards[1];

  return (
    <section
      id="proof-results"
      className="w-full bg-[var(--bg)] text-[var(--fg)] py-20 md:py-28 border-b border-[var(--ln)] overflow-hidden"
      aria-label="Real Results"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-bold text-[var(--ac)] uppercase tracking-[0.2em]">06</span>
              <span className="w-4 h-px bg-[var(--ln)]" />
              <span className="text-[11px] font-bold text-[var(--mut)] uppercase tracking-[0.2em]">REAL RESULTS</span>
            </div>
            <h2
              className="font-bold text-[var(--fg)] leading-[1.04] tracking-[-0.03em] max-w-xl"
              style={{
                fontSize: 'clamp(32px, 4vw, 62px)',
                fontFamily: 'var(--d)',
              }}
            >
              {data.proofTitleLines.map((line, idx) => (
                <span key={idx} className={`block whitespace-normal sm:whitespace-nowrap ${idx === data.proofTitleLines.length - 1 ? 'text-[var(--ac)]' : ''}`}>
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="max-w-xs flex flex-col items-start gap-3">
            <p
              className="text-[14px] text-[var(--mut)] leading-relaxed font-normal"
              style={{ fontFamily: 'var(--b)' }}
            >
              {data.proofSubhead}
            </p>
            <Link
              href="/#work"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--fg)] hover:text-[var(--ac)] transition-colors duration-200"
              style={{ fontFamily: 'var(--b)' }}
            >
              View Our Work &rarr;
            </Link>
          </div>
        </div>

        {/* ── Asymmetrical Featured Case Studies ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* PRIMARY FEATURED CASE STUDY */}
          {primaryProof && (
            <div className="lg:col-span-8 flex">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--cd)] border border-[var(--ln)] p-8 sm:p-10 flex flex-col justify-between shadow-md group">
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={primaryProof.image}
                    alt={primaryProof.headline}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 grayscale contrast-125"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--cd)] via-[var(--cd)]/60 to-transparent" />

                {/* Top Label */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10.5px] font-mono font-bold text-[var(--ac)] uppercase tracking-widest">
                    {primaryProof.client}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--mut)]">01 / 02</span>
                </div>

                {/* Bottom Title & Circular Arrow */}
                <div className="relative z-10 pt-28 max-w-md">
                  <h3
                    className="text-[26px] sm:text-[32px] font-bold text-[var(--fg)] leading-tight tracking-tight mb-4 whitespace-pre-line"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {primaryProof.headline}
                  </h3>

                  <div className="w-9 h-9 rounded-full bg-[var(--bg)] border border-[var(--ln)] flex items-center justify-center text-[var(--fg)] shadow-sm group-hover:bg-[var(--ac)] group-hover:text-white group-hover:border-[var(--ac)] transition-all duration-300">
                    <span className="text-[14px]">&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECONDARY CASE STUDY */}
          {secondaryProof && (
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--cd)] border border-[var(--ln)] p-7 flex flex-col justify-between shadow-md group">
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10.5px] font-mono font-bold text-[var(--ac)] uppercase tracking-widest">
                    {secondaryProof.client}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--mut)]">02 / 02</span>
                </div>

                <div className="relative z-10 pt-14">
                  <h3
                    className="text-[20px] sm:text-[24px] font-bold text-[var(--fg)] leading-snug tracking-tight mb-5 whitespace-pre-line"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {secondaryProof.headline}
                  </h3>

                  <div className="w-8 h-8 rounded-full border border-[var(--ln)] bg-[var(--bg)] flex items-center justify-center text-[var(--fg)] group-hover:bg-[var(--ac)] group-hover:text-white group-hover:border-[var(--ac)] transition-all duration-300 shadow-xs">
                    <span className="text-[13px]">&rarr;</span>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  aria-label="Previous project"
                  className="w-8 h-8 rounded-full border border-[var(--ln)] bg-[var(--cd)] flex items-center justify-center text-[var(--mut)] hover:text-[var(--fg)] hover:border-[var(--ac)] transition-colors"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  className="w-8 h-8 rounded-full border border-[var(--ln)] bg-[var(--cd)] flex items-center justify-center text-[var(--mut)] hover:text-[var(--fg)] hover:border-[var(--ac)] transition-colors"
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
