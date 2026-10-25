'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FadeReveal } from './RevealText';

export default function FinalCTA() {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const foregroundPlaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!h2Ref.current) return;
      const lines = h2Ref.current.querySelectorAll('[data-reveal-line]');
      if (lines.length) {
        gsap.set(lines, { y: '105%' });
        ScrollTrigger.create({
          trigger: h2Ref.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(lines, { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.09 });
          },
        });
      }

      // Parallax translation on scroll entry (Directive #8)
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { y: 30, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 85%',
              end: 'bottom 40%',
              scrub: 0.8,
            },
          }
        );
      }
      if (foregroundPlaneRef.current) {
        gsap.to(foregroundPlaneRef.current, {
          x: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 85%',
            end: 'bottom 30%',
            scrub: 1.2,
          },
        });
      }
    };
    run();
  }, []);

  return (
    <section
      id="cta"
      className="w-full bg-[var(--bg)] text-[var(--fg)] py-24 md:py-32 overflow-hidden border-t border-[var(--ln)]"
      aria-label="Let's Talk"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT: CTA Typography */}
          <div className="lg:col-span-6 z-10">

            <h2
              ref={h2Ref}
              className="font-bold text-[var(--fg)] leading-[0.90] tracking-[-0.04em] mb-6"
              style={{
                fontSize: 'clamp(48px, 5.8vw, 96px)',
                fontFamily: 'var(--d)',
              }}
            >
              <span className="block overflow-hidden">
                <span data-reveal-line className="block">Not Sure</span>
              </span>
              <span className="block overflow-hidden">
                <span data-reveal-line className="block text-[var(--ac)]">What You Need?</span>
              </span>
            </h2>

            <FadeReveal delay={0.3} className="mb-8 max-w-md">
              <p
                className="text-[16px] text-[var(--mut)] leading-relaxed"
                style={{ fontFamily: 'var(--b)' }}
              >
                Tell us what you&apos;re trying to achieve. We&apos;ll help you
                see the opportunity and find the right way forward.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.45}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[var(--ac)] text-white text-[13.5px] font-semibold rounded-full px-8 py-4 hover:bg-[var(--a2)] transition-all duration-200 shadow-md shadow-[var(--ac)]/25 group"
                style={{ fontFamily: 'var(--b)' }}
              >
                Let&apos;s Talk About Your Business
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </FadeReveal>
          </div>

          {/* RIGHT: Layered Digital Transformation Visualization */}
          <FadeReveal delay={0.15} className="lg:col-span-6 relative">
            <div
              ref={visualRef}
              className="relative rounded-2xl overflow-hidden aspect-[16/10] w-full bg-[var(--cd)] shadow-xl border border-[var(--ln)]"
            >
              <Image
                src="/cta-digital-flow.jpg"
                alt="Digital Transformation Visualization — Layered UI Planes Flowing into Structured Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

              {/* Foreground interactive annotation overlay */}
              <div
                ref={foregroundPlaneRef}
                className="absolute top-6 right-6 bg-[var(--cd)]/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-[var(--ln)] max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--ac)]" />
                  <span className="text-[10px] font-bold text-[var(--fg)] uppercase tracking-wider">CLEAR DIRECTION</span>
                </div>
                <p
                  className="text-[var(--mut)] text-[11px] leading-tight"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  From fragmented ideas to structured growth systems.
                </p>
              </div>
            </div>
          </FadeReveal>

        </div>
      </div>
    </section>
  );
}

