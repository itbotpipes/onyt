'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'motion/react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';
import AlbumRail, { type Album, type AlbumRailHandle } from '@/components/ui/AlbumRail';

export default function IndustryGrid() {
  const { grid } = INDUSTRIES_PAGE_DATA;
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<AlbumRailHandle>(null);

  // Transform industry items into Album format with ONYT branding
  const albumItems: Album[] = grid.items.map((item) => ({
    src: item.image || '/svc-dev.jpg',
    alt: item.title,
    title: item.title,
    subtitle: item.shortDesc,
    href: `/industries/${item.slug}`,
    tags: item.tags,
    number: item.number,
    accent: '#ff4d00',
  }));

  const count = albumItems.length;

  // Track page scroll to lock the screen and drive 3D card motion continuously
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress with buffers at start and end so Card 0 starts dead center
  // and Card 5 ends dead center before unpinning
  const rawPosition = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 0, count - 1, count - 1]
  );

  // Spring physics engine: silky-smooth fluid response on mouse wheel & trackpad
  const smoothPosition = useSpring(rawPosition, {
    stiffness: 220,
    damping: 32,
    mass: 0.6,
  });

  // Smooth scroll sync when arrows or scrubber are clicked
  const handleGoTo = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (count - 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="explorer"
      className="relative w-full h-[380vh] bg-[var(--bg)] border-b border-[var(--ln)]"
      aria-label="Sectors we drive forward"
    >
      {/* ── STICKY SCREEN-LOCKED VIEWPORT (FITS 100% IN ONE SCREEN) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 lg:px-12 z-10">
        
        {/* Subtle ambient orange backdrop glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.12)_0%,rgba(255,77,0,0.02)_60%,transparent_80%)] blur-3xl pointer-events-none"
        />

        {/* 1. CLEAN SECTION HEADER */}
        <div className="w-full max-w-[1680px] mx-auto text-center shrink-0 pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2 mb-1.5 text-xs font-mono font-bold tracking-widest uppercase text-[var(--ac)]">
            <span className="w-2 h-2 rounded-full bg-[var(--ac)] animate-pulse" />
            <span>SECTORS // EXPLORE BY VERTICAL</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-none"
            style={{ fontFamily: 'var(--d)' }}
          >
            Sectors we drive <span className="text-[var(--ac)]">forward.</span>
          </h2>
        </div>

        {/* 2. MAIN 3D COVER FLOW STAGE (WIDER WIDTH, AMPLE VERTICAL HEADROOM) */}
        <div className="w-full max-w-[1680px] mx-auto flex-1 flex flex-col items-center justify-center my-auto min-h-0">
          <AlbumRail
            ref={railRef}
            items={albumItems}
            startIndex={0}
            visible={3}
            size={290}
            aspect={1}
            accentColor="#ff4d00"
            loop={true}
            draggable={true}
            captions={true}
            controls={false}
            scrubber={false}
            externalPosition={smoothPosition}
            onGoTo={handleGoTo}
          />
        </div>
      </div>
    </section>
  );
}
