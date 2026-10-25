'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailFAQ({ data }: { data: SolutionDetailData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="w-full bg-[var(--bg)] text-[var(--fg)] py-20 md:py-28 border-b border-[var(--ln)] overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-bold text-[var(--ac)] uppercase tracking-[0.2em]">07</span>
              <span className="w-4 h-px bg-[var(--ln)]" />
              <span className="text-[11px] font-bold text-[var(--mut)] uppercase tracking-[0.2em]">FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2
              className="font-bold text-[var(--fg)] leading-[0.92] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(36px, 4.2vw, 72px)',
                fontFamily: 'var(--d)',
              }}
            >
              Got Questions?<br />
              <span className="text-[var(--ac)]">We&apos;ve Got Answers.</span>
            </h2>

            <p
              className="text-[15px] text-[var(--mut)] leading-relaxed mb-8 max-w-sm font-normal"
              style={{ fontFamily: 'var(--b)' }}
            >
              Quick answers to help you get started with our solutions.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--fg)] hover:text-[var(--ac)] transition-colors duration-200"
              style={{ fontFamily: 'var(--b)' }}
            >
              View All FAQs &rarr;
            </Link>
          </div>

          {/* ── RIGHT COLUMN — Accordion with Clean Dividers ── */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[var(--ln)] border-t border-b border-[var(--ln)]">
            {data.faqs.slice(0, 4).map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-5 transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => toggleIdx(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer focus:outline-none"
                  >
                    <h3
                      className={`text-[16px] sm:text-[19px] font-bold transition-colors duration-200 ${
                        isOpen ? 'text-[var(--ac)]' : 'text-[var(--fg)] group-hover:text-[var(--ac)]'
                      }`}
                      style={{ fontFamily: 'var(--b)' }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className={`text-[16px] font-medium transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[var(--ac)]' : 'text-[var(--mut)] group-hover:text-[var(--fg)]'
                      }`}
                    >
                      &#9662;
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-2.5 pr-6 animate-fadeIn">
                      <p
                        className="text-[14.5px] text-[var(--mut)] leading-relaxed font-normal"
                        style={{ fontFamily: 'var(--b)' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
