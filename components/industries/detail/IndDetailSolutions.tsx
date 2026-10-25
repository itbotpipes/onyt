'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { IndustryDetailContent } from './industryDetailData';

export default function IndDetailSolutions({ data }: { data: IndustryDetailContent }) {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--mut)] font-semibold">
                {data.solutionsEyebrow}
              </span>
            </div>
            <h2
              className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontFamily: 'var(--d)' }}
            >
              {data.solutionsHeadingLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  <span className={idx === data.solutionsHeadingLines.length - 1 ? 'text-[var(--ac)]' : ''}>
                    {line}
                  </span>
                  {idx < data.solutionsHeadingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-6 lg:pl-12">
            <p className="text-base sm:text-lg text-[var(--mut)] leading-relaxed max-w-[500px] font-normal" style={{ fontFamily: 'var(--b)' }}>
              {data.solutionsSubhead}
            </p>
          </div>
        </div>

        {/* 4 VISUAL SOLUTION TILES (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.solutionsItems.map((item, idx) => (
            <div
              key={idx}
              className="group block space-y-4 cursor-pointer"
            >
              {/* IMAGE TILE */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--cd)] border border-[var(--ln)] shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* TILE CONTENT */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-[var(--ac)] font-bold">
                      {item.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--fg)] transition-colors duration-300 group-hover:text-[var(--ac)]" style={{ fontFamily: 'var(--b)' }}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-8 h-8 rounded-full border border-[var(--ln)] bg-[var(--cd)] flex items-center justify-center text-[var(--fg)] group-hover:bg-[var(--ac)] group-hover:text-white group-hover:border-[var(--ac)] transition-all duration-300 shadow-xs">
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--mut)] leading-relaxed line-clamp-3 pr-2 font-normal" style={{ fontFamily: 'var(--b)' }}>
                  {item.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
