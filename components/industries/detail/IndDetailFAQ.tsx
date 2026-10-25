'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailFAQ({ data }: { data: IndustryDetailContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.faqEyebrow}
              </span>
            </div>

            <h2
              className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              {data.faqHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx === data.faqHeadingLines.length - 1 ? 'text-[var(--ac)]' : ''}>
                    {line}
                  </span>
                  {idx < data.faqHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            <p className="text-base sm:text-lg text-[var(--mut)] leading-relaxed max-w-[440px] font-normal" style={{ fontFamily: 'var(--b)' }}>
              {data.faqSubhead}
            </p>
          </div>

          {/* RIGHT COLUMN: Accordion (Thin Dividers, No Cards) */}
          <div className="lg:col-span-7 divide-y divide-[var(--ln)] border-t border-b border-[var(--ln)]">
            {data.faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-6 sm:py-8">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-colors ${isOpen ? 'text-[var(--ac)]' : 'text-[var(--fg)] group-hover:text-[var(--ac)]'}`} style={{ fontFamily: 'var(--b)' }}>
                      {item.question}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[var(--ln)] bg-[var(--cd)] flex items-center justify-center text-[var(--fg)] shrink-0 group-hover:border-[var(--ac)] group-hover:text-[var(--ac)] transition-colors">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-sm sm:text-base text-[var(--mut)] leading-relaxed font-normal pr-6 animate-fadeIn" style={{ fontFamily: 'var(--b)' }}>
                      {item.answer}
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
