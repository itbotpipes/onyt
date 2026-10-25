'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryGrid() {
  const { grid } = INDUSTRIES_PAGE_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Disable horizontal pin on mobile screens
      if (window.innerWidth < 1024) return;

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !trackRef.current) return;

      ctx = gsap.context(() => {
        const track = trackRef.current!;
        const totalScrollWidth = track.scrollWidth - window.innerWidth + 200;

        gsap.to(track, {
          x: -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalScrollWidth * 1.2}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                grid.items.length - 1,
                Math.floor(self.progress * grid.items.length)
              );
              setActiveIndex(idx);
            },
          },
        });
      }, sectionRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [grid.items.length]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--bg)] text-[var(--fg)] overflow-hidden border-b border-[var(--ln)]"
    >
      {/* ── DESKTOP PINNED HORIZONTAL RAIL (lg+) ── */}
      <div className="hidden lg:flex flex-col justify-between h-screen w-full py-16">
        
        {/* Section Header */}
        <div className="max-w-[1440px] w-full mx-auto px-16 flex items-end justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--fg)]/60 font-semibold">
                {grid.eyebrow}
              </span>
            </div>
            <h2 
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold leading-[0.95] tracking-[-0.04em] text-[var(--fg)] font-display"
            >
              Built Around<br />
              Your Industry.
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-end gap-3 pb-1">
            <p className="text-sm text-[var(--fg)]/70 leading-relaxed text-right font-normal">
              {grid.subhead}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-mono font-bold text-[var(--ac)]">
                0{activeIndex + 1}
              </span>
              <span className="text-[11px] text-[var(--fg)]/50 uppercase tracking-wider font-semibold">
                / 0{grid.items.length} &mdash; {grid.items[activeIndex]?.title}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Track of Industry Cards */}
        <div className="w-full overflow-hidden flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex items-start gap-10 px-16 will-change-transform"
          >
            {grid.items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <Link
                  key={item.id}
                  href={`/industries/${item.slug}`}
                  className={`group relative shrink-0 w-[360px] flex flex-col cursor-pointer transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-45 hover:opacity-85 scale-[0.97]'
                  }`}
                >
                  {/* Image Tile with Next.js Image */}
                  <div className="relative overflow-hidden aspect-[16/11] w-full bg-[var(--cd)] rounded-xl mb-3 border border-[var(--ln)] shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                    {/* Arrow Button Overlay */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[var(--cd)]/90 backdrop-blur-md flex items-center justify-center text-[var(--fg)] group-hover:bg-[var(--ac)] group-hover:text-white transition-all duration-300 shadow-sm border border-[var(--ln)]">
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Tile Info */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-mono font-bold text-[var(--fg)]/50">
                      {item.number}
                    </span>
                    <h3
                      className={`font-bold tracking-tight text-[var(--fg)] transition-all duration-300 ${
                        isActive ? 'text-[22px] text-[var(--ac)]' : 'text-[20px] group-hover:text-[var(--ac)]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--fg)]/70 leading-snug line-clamp-2 font-normal">
                      {item.shortDesc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE FALLBACK GRID (No scroll-jacking) ── */}
      <div className="block lg:hidden px-6 sm:px-10 py-16">
        <div className="mb-10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--fg)]/60 font-semibold">
              {grid.eyebrow}
            </span>
          </div>
          <h2 className="text-[36px] sm:text-[48px] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--fg)] font-display">
            Built Around{' '}
            Your Industry.
          </h2>
          <p className="text-base text-[var(--fg)]/70 leading-relaxed">
            {grid.subhead}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {grid.items.map((item) => (
            <Link
              key={item.id}
              href={`/industries/${item.slug}`}
              className="group block space-y-4 cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--cd)] border border-[var(--ln)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-[var(--fg)]/50 font-medium">{item.number}</span>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--fg)] group-hover:text-[var(--ac)] transition-colors">{item.title}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[var(--ln)] flex items-center justify-center text-[var(--fg)] group-hover:bg-[var(--ac)] group-hover:text-white transition-colors">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
                <p className="text-xs text-[var(--fg)]/70 leading-relaxed line-clamp-2">{item.shortDesc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
