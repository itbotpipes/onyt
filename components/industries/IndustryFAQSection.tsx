'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryFAQSection() {
  const { faq } = INDUSTRIES_PAGE_DATA;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="py-24 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-[var(--ln)] relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* 3-COLUMN INTEGRATED SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Eyebrow + Headline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="ey rv">FAQs</div>

            <div className="rv">
              <h2
                className="text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold leading-[1.04] tracking-[-0.035em]"
                style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
              >
                {faq.title}{' '}
                <span style={{ color: 'var(--ac)', display: 'block' }}>
                  {faq.highlightWord}
                </span>
              </h2>
            </div>
          </div>

          {/* CENTER COLUMN: FAQ Accordion items */}
          <div className="lg:col-span-5 divide-y divide-[var(--ln)] border-y border-[var(--ln)] rv">
            {faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="transition-colors duration-200">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-6 flex items-center justify-between gap-4 text-left group cursor-pointer"
                  >
                    <span
                      className={`text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 ${
                        isOpen ? 'text-[var(--ac)]' : 'group-hover:text-[var(--ac)]'
                      }`}
                      style={{ fontFamily: 'var(--d)', color: isOpen ? 'var(--ac)' : 'var(--fg)' }}
                    >
                      {item.question}
                    </span>

                    <span
                      className={`w-6 h-6 rounded-full border border-[var(--ln)] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 border-[var(--ac)] text-[var(--ac)]' : 'group-hover:border-[var(--ac)]'
                      }`}
                      style={{ color: 'var(--fg)' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p
                      className="text-xs sm:text-sm leading-relaxed pr-6"
                      style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Studio Testimonial Card */}
          <div
            className="rv lg:col-span-3 flex flex-col justify-between p-8 rounded-3xl border border-[var(--ln)] min-h-[340px] shadow-sm"
            style={{ background: 'color-mix(in srgb, var(--cd) 70%, var(--bg))' }}
          >
            <div>
              {/* Kinetic Orange Double Quote */}
              <div
                className="text-[48px] font-serif leading-none select-none mb-3"
                style={{ fontFamily: 'var(--d)', color: 'var(--ac)' }}
              >
                “
              </div>

              <blockquote
                className="text-base sm:text-lg font-medium italic leading-snug tracking-tight"
                style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
              >
                &ldquo;{faq.testimonial.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author Block */}
            <div className="pt-8 flex items-center gap-3.5 border-t border-[var(--ln)]/40 mt-6">
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold uppercase tracking-wider flex-shrink-0"
                style={{ background: 'rgba(255,77,0,0.15)', borderColor: 'rgba(255,77,0,0.4)', color: 'var(--ac)' }}
              >
                MH
              </div>
              <div className="text-xs">
                <div
                  className="font-bold"
                  style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
                >
                  {faq.testimonial.author}
                </div>
                <div
                  className="font-medium text-[11px]"
                  style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                >
                  {faq.testimonial.company}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
