'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailFinalCTA({ data }: { data: SolutionDetailData }) {
  return (
    <section
      id="final-cta"
      className="w-full bg-[var(--bg)] text-[var(--fg)] py-20 md:py-28 overflow-hidden border-t border-[var(--ln)]"
      aria-label="Let's Build"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-6 z-10 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-bold text-[var(--ac)] uppercase tracking-[0.2em]">08</span>
              <span className="w-4 h-px bg-[var(--ln)]" />
              <span className="text-[11px] font-bold text-[var(--mut)] uppercase tracking-[0.2em]">LET&apos;S BUILD</span>
            </div>

            <h2
              className="font-bold text-[var(--fg)] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(42px, 5.2vw, 88px)',
                fontFamily: 'var(--d)',
              }}
            >
              {data.ctaTitleLines.map((line, idx) => (
                <span key={idx} className={`block ${idx === data.ctaTitleLines.length - 1 ? 'text-[var(--ac)]' : ''}`}>
                  {line}
                </span>
              ))}
            </h2>

            <p
              className="text-[15.5px] text-[var(--mut)] leading-relaxed mb-9 max-w-md font-normal"
              style={{ fontFamily: 'var(--b)' }}
            >
              {data.ctaBody}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[var(--ac)] text-white text-[13px] font-bold rounded-full px-7 py-3.5 hover:bg-[var(--a2)] transition-all duration-200 shadow-md shadow-[var(--ac)]/25 group"
                style={{ fontFamily: 'var(--b)' }}
              >
                {data.ctaPrimaryText}
                <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--fg)] hover:text-[var(--ac)] transition-colors duration-200 px-3 py-3"
                style={{ fontFamily: 'var(--b)' }}
              >
                {data.ctaSecondaryText}
              </Link>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Sculptural Flowing Architectural Pathway Visual ── */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] w-full bg-[var(--cd)] shadow-xl border border-[var(--ln)]">
              <Image
                src="/cta-digital-flow.jpg"
                alt="Sculptural architectural curved path"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

              {/* Annotation top-right */}
              <div className="absolute top-6 right-6 max-w-[170px] z-10">
                <p
                  className="text-white text-[13.5px] leading-snug text-right font-medium italic drop-shadow-md"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Ideas today.<br />
                  Opportunities<br />
                  <span className="text-[var(--ac)]">tomorrow.</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
