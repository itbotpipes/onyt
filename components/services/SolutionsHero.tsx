'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SolutionsHero() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const primaryImgRef = useRef<HTMLDivElement>(null);
  const layerAnalyticsRef = useRef<HTMLDivElement>(null);
  const layerSeoRef = useRef<HTMLDivElement>(null);
  const layerCodeRef = useRef<HTMLDivElement>(null);
  const sideTextRef = useRef<HTMLDivElement>(null);

  // Mount intro animation + subtle Parallax
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!heroRef.current) return;

      ctx = gsap.context(() => {
        // Intro Timeline
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
          .fromTo(line1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.35)
          .fromTo(line2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, 0.5)
          .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
          .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.85)
          .fromTo(visualWrapperRef.current, { opacity: 0, scale: 0.96, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power4.out' }, 0.4)
          .fromTo(sideTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.0);

        // Smooth Parallax on Scroll (No sticky pinning to avoid whitespace voids)
        if (window.innerWidth >= 1024 && heroRef.current) {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          });

          if (primaryImgRef.current) {
            scrollTl.to(primaryImgRef.current, { y: 25, ease: 'none' }, 0);
          }
          if (layerAnalyticsRef.current) {
            scrollTl.to(layerAnalyticsRef.current, { y: -35, x: -10, ease: 'none' }, 0);
          }
          if (layerSeoRef.current) {
            scrollTl.to(layerSeoRef.current, { y: 30, x: 10, ease: 'none' }, 0);
          }
          if (layerCodeRef.current) {
            scrollTl.to(layerCodeRef.current, { y: -40, ease: 'none' }, 0);
          }
        }
      }, heroRef);
    };

    run();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)] overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24"
      aria-label="Ideas to Impact"
    >
      {/* Right-edge vertical indicator */}
      <div
        ref={sideTextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-6 opacity-0 pointer-events-none"
        aria-hidden
      >
        <span
          className="text-[10px] tracking-[0.22em] text-[var(--mut)] uppercase select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--b)',
          }}
        >
          Digital Solutions — Ideas to Impact.
        </span>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-px h-8 bg-[var(--ln)] relative overflow-hidden">
            <div className="animate-scroll-line absolute inset-x-0 top-0 h-4 bg-[var(--ac)]" />
          </div>
          <span className="text-[9px] tracking-[0.18em] text-[var(--mut)] uppercase">Scroll</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT COLUMN (Typography) ── */}
          <div className="lg:col-span-6 flex flex-col z-20">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-6 opacity-0">
              <span className="w-5 h-px bg-[var(--ac)]" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ac)]"
                style={{ fontFamily: 'var(--b)' }}
              >
                DIGITAL SOLUTIONS
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-bold text-[var(--fg)] leading-[0.92] tracking-[-0.04em] mb-7"
              style={{ fontFamily: 'var(--d)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span
                  ref={line1Ref}
                  className="block opacity-0"
                  style={{ fontSize: 'clamp(54px, 7.5vw, 120px)' }}
                >
                  Ideas to
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span
                  ref={line2Ref}
                  className="block opacity-0 text-[var(--ac)]"
                  style={{ fontSize: 'clamp(58px, 8vw, 130px)' }}
                >
                  Impact.
                </span>
              </span>
            </h1>

            {/* Body */}
            <div ref={bodyRef} className="opacity-0 mb-8 max-w-[460px]">
              <p
                className="text-[16px] leading-relaxed text-[var(--mut)] font-normal"
                style={{ fontFamily: 'var(--b)' }}
              >
                Strategy, creativity, technology and data &mdash;<br className="hidden sm:inline" />
                brought together to help your business grow sustainably.
              </p>
            </div>

            {/* CTA + Social Proof */}
            <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[var(--ac)] text-white text-[13px] font-semibold rounded-full px-7 py-3.5 hover:bg-[var(--a2)] transition-all duration-200 shadow-md shadow-[var(--ac)]/25 group"
                style={{ fontFamily: 'var(--b)' }}
              >
                Let&apos;s Talk
                <span className="text-[15px] group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['#ff4d00', '#ff6002', '#510f01', '#8f8780'].map((bg, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-[var(--cd)] shadow-xs"
                      style={{ background: bg }}
                    />
                  ))}
                </div>
                <span
                  className="text-[11.5px] text-[var(--mut)] font-medium"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  Integrated Digital Capabilities
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Layered Spatial Visual Ecosystem ── */}
          <div
            ref={visualWrapperRef}
            className="lg:col-span-6 relative flex items-center justify-center opacity-0 mt-4 lg:mt-0"
          >
            <div className="relative w-full max-w-[580px] aspect-[4/3]">

              {/* Background technical code fragment layer */}
              <div
                ref={layerCodeRef}
                className="absolute -top-4 -right-4 w-[56%] p-4 bg-[var(--cd)] text-[var(--fg)] rounded-xl shadow-2xl z-0 transform rotate-[-2deg] border border-[var(--ln)] hidden sm:block"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="text-[9px] text-[var(--mut)] ml-2 font-mono">architecture.ts</span>
                </div>
                <pre className="text-[10px] font-mono leading-tight text-[var(--mut)]">
                  <code>
                    <span className="text-[var(--ac)]">export const</span> system = &#123;<br />
                    &nbsp;&nbsp;strategy: <span className="text-emerald-500">&apos;outcomes&apos;</span>,<br />
                    &nbsp;&nbsp;stack: [<span className="text-emerald-500">&apos;web&apos;</span>, <span className="text-emerald-500">&apos;seo&apos;</span>, <span className="text-emerald-500">&apos;ai&apos;</span>]<br />
                    &#125;;
                  </code>
                </pre>
              </div>

              {/* Secondary Analytics Panel layer (behind, left offset) */}
              <div
                ref={layerAnalyticsRef}
                className="absolute bottom-4 -left-4 w-[60%] p-4 bg-[var(--cd)]/95 backdrop-blur-md rounded-xl shadow-2xl border border-[var(--ln)] z-10 hidden sm:block transform rotate-[1deg]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-[var(--fg)] uppercase tracking-wider">Organic Growth</span>
                  <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+142% YoY</span>
                </div>
                <div className="h-14 w-full flex items-end gap-1.5 pt-2">
                  {[35, 45, 40, 65, 55, 80, 75, 95, 90, 110].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-[var(--fg)] rounded-t-xs transition-all duration-300"
                      style={{ height: `${val}%`, opacity: 0.25 + (idx / 10) * 0.75 }}
                    />
                  ))}
                </div>
              </div>

              {/* Primary Browser Surface (Front layer) */}
              <div
                ref={primaryImgRef}
                className="relative z-20 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--ln)] bg-[var(--cd)] transform transition-transform duration-500"
              >
                {/* Browser top header */}
                <div className="w-full bg-[var(--cd)] px-4 py-2.5 flex items-center justify-between border-b border-[var(--ln)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--ln)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--ln)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--ln)]" />
                  </div>
                  <div className="bg-[var(--bg)] px-4 py-1 rounded-md text-[10px] font-mono text-[var(--mut)] tracking-wide border border-[var(--ln)]">
                    onyt.com / services
                  </div>
                  <div className="w-12" />
                </div>

                {/* Visual container */}
                <div className="relative w-full h-[calc(100%-37px)] bg-[var(--bg)]">
                  <Image
                    src="/hero-digital-ecosystem.jpg"
                    alt="ONYT Digital Studio Ecosystem — Strategy, Web, SEO, Performance and Custom Systems"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Floating SEO pill (front right overlay) */}
              <div
                ref={layerSeoRef}
                className="absolute -bottom-3 right-6 z-30 bg-[var(--cd)]/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-[var(--ln)] flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--ac)] animate-pulse" />
                <span className="text-[11px] font-semibold text-[var(--fg)]">
                  Search Visibility: <span className="text-[var(--ac)]">Top 1% Rank</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
