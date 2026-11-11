'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface Offering {
  id: string;
  number: string;
  title: string;
  category: string;
  href: string;
  tagline: string;
  metric: string;
}

const OFFERINGS: Offering[] = [
  {
    id: '01',
    number: '01',
    title: 'WEBSITE DEVELOPMENT',
    category: 'Web & UI Architecture',
    href: '/services/website-development',
    tagline: 'High-conversion digital flagships built with Next.js, bespoke motion & headless performance.',
    metric: '99.8% Perf Score',
  },
  {
    id: '02',
    number: '02',
    title: 'SEARCH ENGINE OPTIMIZATION',
    category: 'Search Visibility',
    href: '/services/search-engine-optimization',
    tagline: 'Technical architecture, semantic indexing, and high-intent programmatic visibility.',
    metric: '+310% Organic Reach',
  },
  {
    id: '03',
    number: '03',
    title: 'CONTENT STRATEGY & COPY',
    category: 'Copy & Editorial',
    href: '/services/content-strategy-creation',
    tagline: 'Precision positioning, editorial narrative engineering, and conversion-focused copy systems.',
    metric: '4.2× Engagement',
  },
  {
    id: '04',
    number: '04',
    title: 'PERFORMANCE MARKETING',
    category: 'Acquisition & ROI',
    href: '/services/performance-marketing',
    tagline: 'Full-funnel acquisition, paid media scaling, algorithmic creative loops, and ROAS engineering.',
    metric: '3.8× Avg. Return',
  },
  {
    id: '05',
    number: '05',
    title: 'CUSTOM AI & SYSTEMS',
    category: 'Custom Technology',
    href: '/services/custom-technology-development',
    tagline: 'Scalable cloud backends, intelligent workflow integrations, and bespoke technology architectures.',
    metric: 'Zero-Latency Ops',
  },
  {
    id: '06',
    number: '06',
    title: 'BRAND STRATEGY & IDENTITY',
    category: 'Identity Systems',
    href: '/services/website-development',
    tagline: 'Category-defining market positioning, typographic systems, design tokens, and visual languages.',
    metric: 'Signature Identity',
  },
  {
    id: '07',
    number: '07',
    title: 'E-COMMERCE ARCHITECTURE',
    category: 'Omnichannel Scale',
    href: '/services/website-development',
    tagline: 'Headless storefronts, friction-free checkout loops, and long-term retention engines.',
    metric: '+42% AOV Boost',
  },
  {
    id: '08',
    number: '08',
    title: 'CREATIVE & ART DIRECTION',
    category: 'Visual Storytelling',
    href: '/services/content-strategy-creation',
    tagline: 'Cinematic brand media, interactive 3D motion, and avant-garde editorial execution.',
    metric: 'Award-Grade Motion',
  },
  {
    id: '09',
    number: '09',
    title: 'AND MORE...',
    category: 'Holistic Partnership',
    href: '/contact',
    tagline: 'Bespoke hybrid solutions tailored for ambitious brands ready to lead their category.',
    metric: '100% Tailored',
  },
];

export default function SolutionsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // 3D Cylinder geometry calculations
  const renderWheel = useCallback((currentPos: number, isMobile = false) => {
    const R = isMobile ? 260 : 360; // Cylinder radius in pixels
    const stepDeg = isMobile ? 28 : 25; // Degrees per item

    for (let i = 0; i < OFFERINGS.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const d = i - currentPos;
      const theta = d * stepDeg;

      // If item is on the back hemisphere of the cylinder, hide it
      if (Math.abs(theta) > 85) {
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        continue;
      }

      const rad = (theta * Math.PI) / 180;
      const y = R * Math.sin(rad);
      const z = R * (Math.cos(rad) - 1);
      const rotX = -theta;
      const scale = 0.65 + 0.35 * Math.cos(rad);
      const opacity = Math.pow(Math.max(0, Math.cos(rad)), 2.2);

      const isActive = Math.abs(d) < 0.45;

      el.style.visibility = 'visible';
      el.style.transform = `translate3d(-50%, calc(-50% + ${y}px), ${z}px) rotateX(${rotX}deg) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.pointerEvents = isActive ? 'auto' : 'none';
      el.style.zIndex = `${Math.round(100 - Math.abs(d) * 10)}`;

      if (isActive) {
        el.setAttribute('data-active', 'true');
      } else {
        el.removeAttribute('data-active');
      }
    }
  }, []);

  useEffect(() => {
    let ctx: any;

    const setup = async () => {
      if (typeof window === 'undefined') return;

      const isMobile = window.innerWidth < 768;
      renderWheel(0, isMobile);

      // Reduced motion fallback: don't pin, simply render
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!triggerRef.current) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: 'top top',
          end: isMobile ? '+=220%' : '+=300%',
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const pos = self.progress * (OFFERINGS.length - 1);
            const mobileNow = window.innerWidth < 768;
            renderWheel(pos, mobileNow);
          },
        });
      }, triggerRef);
    };

    setup();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [renderWheel]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="w-full bg-[var(--bg)] text-[var(--fg)] relative border-t border-b border-[var(--ln)] overflow-hidden"
      aria-label="Our Offerings"
    >
      {/* ── PINNED SECTION CONTAINER ── */}
      <div
        ref={triggerRef}
        className="w-full min-h-screen flex flex-col justify-between relative overflow-hidden py-10 sm:py-14 box-border select-none"
      >
        {/* Top Header */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center shrink-0 z-20">
          <div className="ey mb-2">OUR OFFERINGS</div>
          <h2
            className="text-[28px] sm:text-[40px] lg:text-[48px] font-extrabold text-[var(--fg)] tracking-[-0.03em] leading-[1.08] max-w-2xl"
            style={{ fontFamily: 'var(--d)' }}
          >
            Everything You Need <span className="text-[var(--ac)]">to Grow Digitally.</span>
          </h2>
        </div>

        {/* ── 3D CYLINDRICAL DRUM STAGE ── */}
        <div
          ref={stageRef}
          className="w-full flex-1 h-[480px] sm:h-[580px] lg:h-[660px] relative flex items-center justify-center overflow-hidden my-auto"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top & bottom gradient vignettes for deep cylindrical fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-20" />

          {/* Central subtle horizon glow line */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--ac)]/25 to-transparent z-10" />

          {/* The Offerings on the 3D Wheel */}
          <div className="w-full max-w-[1440px] h-full relative" style={{ transformStyle: 'preserve-3d' }}>
            {OFFERINGS.map((svc, i) => {
              return (
                <Link
                  key={svc.id}
                  href={svc.href}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-cursor
                  data-cursor-label="EXPLORE"
                  className="absolute left-1/2 top-1/2 will-change-transform text-center whitespace-nowrap cursor-pointer transition-colors duration-300 group block focus:outline-none"
                  style={{
                    transformOrigin: '50% 50%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <span
                    className="block font-extrabold tracking-[-0.03em] uppercase transition-colors duration-300 text-[var(--fg)] group-hover:text-[var(--ac)] group-data-[active=true]:text-[var(--fg)] text-[32px] sm:text-[50px] md:text-[64px] lg:text-[80px] leading-none"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {svc.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
