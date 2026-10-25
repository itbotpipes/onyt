'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SolutionDetailData } from './solutionData';

export default function DetailHero({ data }: { data: SolutionDetailData }) {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const sideTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      try {
        const { gsap } = await import('gsap');
        if (!heroRef.current) return;

        ctx = gsap.context(() => {
          gsap.fromTo(
            [badgeRef.current, h1Ref.current, bodyRef.current, ctaRef.current, visualRef.current],
            { y: 15, opacity: 0.9 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
          );
        }, heroRef);
      } catch {
        // Silently continue without animations
      }
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [data]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full bg-[var(--bg)] text-[var(--fg)] pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 border-b border-[var(--ln)] overflow-hidden"
      aria-label={data.badge}
    >
      {/* Right Edge Vertical Annotation */}
      <div
        ref={sideTextRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-6 pointer-events-none"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1 text-right">
          <span
            className="text-[9.5px] tracking-[0.22em] text-[var(--mut)] uppercase font-medium select-none"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'var(--b)',
            }}
          >
            STRATEGY &bull; DESIGN &bull; DEVELOPMENT &bull; GROWTH
          </span>
          <span
            className="text-[11px] text-[var(--ac)] italic font-serif mt-2 select-none"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontFamily: 'Georgia, serif',
            }}
          >
            A Website That Works Harder.
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 pt-4">
          <div className="w-px h-8 bg-[var(--ln)] relative overflow-hidden">
            <div className="animate-scroll-line absolute inset-x-0 top-0 h-4 bg-[var(--ac)]" />
          </div>
          <span className="text-[9px] tracking-[0.18em] text-[var(--mut)] uppercase font-mono">Scroll</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col z-10">
            {/* Eyebrow */}
            <div ref={badgeRef} className="flex items-center gap-3 mb-6">
              <span className="w-4 h-px bg-[var(--ac)]" />
              <span
                className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-[var(--ac)]"
                style={{ fontFamily: 'var(--b)' }}
              >
                {data.badge}
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={h1Ref}
              className="font-bold text-[var(--fg)] leading-[0.93] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(46px, 5.5vw, 92px)',
                fontFamily: 'var(--d)',
              }}
            >
              {data.heroTitleLines.map((line, idx) => (
                <span key={idx} className={`block ${idx === data.heroTitleLines.length - 1 ? 'text-[var(--ac)]' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Copy */}
            <div ref={bodyRef} className="mb-8 max-w-[460px]">
              <p
                className="text-[15.5px] leading-relaxed text-[var(--mut)] font-normal"
                style={{ fontFamily: 'var(--b)' }}
              >
                {data.intro}
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-[var(--ac)] text-white text-[13px] font-bold rounded-full px-7 py-3.5 hover:bg-[var(--a2)] transition-all duration-200 shadow-md shadow-[var(--ac)]/25 group"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  {data.primaryCtaText}
                  <span className="text-[14px] group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-[var(--fg)] hover:text-[var(--ac)] transition-colors duration-200 px-3 py-3 group"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  <span className="w-7 h-7 rounded-full border border-[var(--ln)] bg-[var(--cd)] flex items-center justify-center text-[10px] group-hover:bg-[var(--ac)] group-hover:text-white group-hover:border-[var(--ac)] transition-all">
                    ▶
                  </span>
                  {data.secondaryCtaText}
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-1.5">
                  {['#ff4d00', '#ff6002', '#510f01', '#8f8780'].map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border-2 border-[var(--cd)] shadow-xs"
                      style={{ background: color }}
                    />
                  ))}
                </div>
                <span
                  className="text-[11.5px] text-[var(--mut)] font-medium"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  {data.trustText}
                </span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN — Device Mockups ── */}
          <div ref={visualRef} className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center">
              
              {/* Studio Concrete / Stone Plinth Base */}
              <div className="absolute inset-x-2 bottom-2 h-[45%] bg-[var(--cd)] rounded-xl shadow-lg border border-[var(--ln)] transform rotate-[-1deg]" />

              {/* Physical Laptop Frame Mockup */}
              <div className="relative z-10 w-[88%] aspect-[16/10] bg-[#0A0A0A] rounded-xl p-2 shadow-2xl border border-[var(--ln)] transform rotate-[1deg] transition-transform duration-500 hover:scale-[1.01]">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--bg)]">
                  <Image
                    src="/hero-device.jpg"
                    alt="ONYT — Websites That Work for Your Business"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Overlapping Mobile Smartphone Device (Right) */}
              <div className="absolute -bottom-1 right-2 sm:right-6 w-[150px] sm:w-[175px] aspect-[9/18] rounded-[22px] bg-[#0A0A0A] p-2 shadow-2xl border border-[var(--ln)] z-20 transform rotate-[-2deg] transition-transform duration-500 hover:rotate-[0deg]">
                <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-[var(--bg)]">
                  <Image
                    src="/svc-web.jpg"
                    alt="Responsive Mobile Web UX"
                    fill
                    priority
                    sizes="200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 p-3 flex flex-col justify-end">
                    <div className="bg-[var(--cd)]/95 backdrop-blur-md p-2 rounded-lg text-left border border-[var(--ln)]">
                      <span className="text-[8px] font-bold text-[var(--ac)] uppercase tracking-wider block">MOBILE UX</span>
                      <span className="text-[10px] font-bold text-[var(--fg)] block leading-tight">Ideas into Impact.</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
