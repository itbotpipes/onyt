'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryGrid() {
  const { grid } = INDUSTRIES_PAGE_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItem = grid.items[activeIndex] || grid.items[0];

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      if (window.innerWidth < 1024) return; // Keep normal flow on mobile

      const rect = container.getBoundingClientRect();
      const totalScroll = container.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      // Progress ranges from 0 to 1 while the section is pinned
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      const count = grid.items.length;
      const nextIndex = Math.min(count - 1, Math.floor(progress * count));

      setActiveIndex(nextIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [grid.items.length]);

  const handleItemClick = (idx: number) => {
    setActiveIndex(idx);
    const container = containerRef.current;
    if (!container || window.innerWidth < 1024) return;

    const rect = container.getBoundingClientRect();
    const totalScroll = container.offsetHeight - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + (idx / grid.items.length) * totalScroll + 10;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      id="explorer"
      className="relative"
      style={{ height: '360vh' }}
    >
      {/* Sticky Screen-Locked Stage */}
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-16 border-b border-[var(--ln)]"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1440px] w-full mx-auto">
          
          {/* SECTION GRID: Left Navigation List & Right Showcase Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Eyebrow, Heading & 6 Sectors */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
              
              {/* Header */}
              <div>
                <div className="ey">Sectors</div>
                <h2
                  className="text-[34px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.04] tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
                >
                  {grid.heading}
                </h2>
              </div>

              {/* Vertical Numbered List of All 6 Industries */}
              <div className="space-y-2">
                {grid.items.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(idx)}
                      className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center gap-6 transition-all duration-300 group cursor-pointer ${
                        isActive
                          ? 'bg-[color-mix(in_srgb,var(--cd)_80%,transparent)] border border-[var(--ln)] shadow-md'
                          : 'hover:bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-mono tracking-wider transition-colors duration-300 ${
                          isActive ? 'text-[var(--ac)] font-bold' : 'text-[var(--mut)] group-hover:text-[var(--fg)]'
                        }`}
                        style={{ fontFamily: 'var(--b)' }}
                      >
                        {item.number}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-[var(--fg)]' : 'text-[var(--mut)] group-hover:text-[var(--fg)]'
                        }`}
                        style={{ fontFamily: 'var(--d)' }}
                      >
                        {item.title}
                      </span>

                      {/* Glowing orange active pill/dot */}
                      {isActive && (
                        <span className="ml-auto flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--ac)] shadow-[0_0_10px_var(--ac)] animate-pulse" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Subtle Scroll Progress Indicator */}
              <div className="hidden lg:flex items-center gap-3 pt-2 text-xs font-mono uppercase tracking-widest text-[var(--mut)]">
                <span>0{activeIndex + 1} / 0{grid.items.length}</span>
                <div className="w-24 h-[2px] bg-[var(--ln)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--ac)] transition-all duration-300 ease-out"
                    style={{ width: `${((activeIndex + 1) / grid.items.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] lowercase text-[var(--mut)]/60">scroll to advance</span>
              </div>

            </div>

            {/* RIGHT COLUMN: Active Stage Card with Cross-Fade */}
            <div className="lg:col-span-7">
              <div
                key={activeItem.id}
                className="relative rounded-3xl border border-[var(--ln)] overflow-hidden p-8 sm:p-12 lg:p-14 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between group shadow-2xl transition-all duration-500 animate-fadeIn"
                style={{ background: 'var(--cd)' }}
              >
                {/* Background Radiant Geometric Artwork */}
                <div className="absolute right-0 bottom-0 w-full h-full pointer-events-none overflow-hidden z-0">
                  <div className="absolute -right-20 -bottom-20 w-[460px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.36)_0%,rgba(255,77,0,0.08)_50%,transparent_75%)] blur-2xl" />
                  
                  {/* Sector-Specific Generative Geometric SVG Artwork */}
                  {activeIndex === 0 && (
                    // 01 E-Commerce: Dynamic Diagonal Blade Shard
                    <svg
                      viewBox="0 0 600 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-[85%] sm:w-[70%] h-auto max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <defs>
                        <linearGradient id="artGrad1" x1="150" y1="500" x2="550" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#ff7a29" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#ffb076" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      <polygon points="320,500 560,240 600,260 420,500" fill="url(#artGrad1)" opacity="0.85" />
                      <polygon points="220,500 520,310 560,330 310,500" fill="url(#artGrad1)" opacity="0.45" />
                      <line x1="280" y1="500" x2="590" y2="210" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
                      <circle cx="590" cy="210" r="3" fill="#ffffff" />
                    </svg>
                  )}

                  {activeIndex === 1 && (
                    // 02 Healthcare: Radiant Pulse & Concentric Rings
                    <svg
                      viewBox="0 0 600 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-[85%] sm:w-[70%] h-auto max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <circle cx="480" cy="380" r="220" stroke="var(--ac)" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 6" />
                      <circle cx="480" cy="380" r="160" stroke="var(--ac)" strokeWidth="2" strokeOpacity="0.6" />
                      <circle cx="480" cy="380" r="100" stroke="#ff7a29" strokeWidth="2.5" strokeOpacity="0.8" />
                      <circle cx="480" cy="380" r="40" fill="var(--ac)" opacity="0.5" />
                      <line x1="260" y1="380" x2="600" y2="380" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                      <line x1="480" y1="160" x2="480" y2="500" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                    </svg>
                  )}

                  {activeIndex === 2 && (
                    // 03 Real Estate: Isometric Architectural Towers
                    <svg
                      viewBox="0 0 600 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-[85%] sm:w-[70%] h-auto max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <polygon points="340,500 340,260 440,200 440,500" fill="var(--ac)" opacity="0.4" />
                      <polygon points="440,200 520,240 520,500 440,500" fill="#ff7a29" opacity="0.3" />
                      <polygon points="440,500 440,160 560,90 560,500" fill="var(--ac)" opacity="0.85" />
                      <polygon points="560,90 600,120 600,500 560,500" fill="#ff7a29" opacity="0.55" />
                      <line x1="440" y1="500" x2="440" y2="160" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
                      <line x1="560" y1="500" x2="560" y2="90" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" />
                    </svg>
                  )}

                  {activeIndex === 3 && (
                    // 04 Manufacturing: Hexagonal Industrial Matrix
                    <svg
                      viewBox="0 0 600 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-[85%] sm:w-[70%] h-auto max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <polygon points="420,240 480,200 540,240 540,320 480,360 420,320" stroke="var(--ac)" strokeWidth="2" strokeOpacity="0.8" fill="var(--ac)" fillOpacity="0.15" />
                      <polygon points="480,360 540,320 600,360 600,440 540,480 480,440" stroke="var(--ac)" strokeWidth="1.5" strokeOpacity="0.5" />
                      <polygon points="360,360 420,320 480,360 480,440 420,480 360,440" stroke="var(--ac)" strokeWidth="1.5" strokeOpacity="0.5" />
                      <circle cx="480" cy="280" r="4" fill="#ffffff" />
                    </svg>
                  )}

                  {activeIndex === 4 && (
                    // 05 SaaS & Technology: Multi-Layered Product Planes
                    <svg
                      viewBox="0 0 600 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-[85%] sm:w-[70%] h-auto max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <polygon points="300,420 540,280 580,300 340,440" fill="var(--ac)" opacity="0.3" />
                      <polygon points="320,360 560,220 600,240 360,380" fill="var(--ac)" opacity="0.6" />
                      <polygon points="340,300 580,160 600,170 380,310" fill="#ff7a29" opacity="0.9" />
                      <line x1="340" y1="300" x2="580" y2="160" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
                    </svg>
                  )}

                  {activeIndex === 5 && (
                    // 06 Education: Ascending Radiating Stepped Arcs
                    <svg
                      viewBox="0 0 600 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-0 bottom-0 w-[85%] sm:w-[70%] h-auto max-h-[380px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    >
                      <circle cx="600" cy="500" r="380" stroke="var(--ac)" strokeWidth="1.5" strokeOpacity="0.25" />
                      <circle cx="600" cy="500" r="300" stroke="var(--ac)" strokeWidth="2" strokeOpacity="0.5" />
                      <circle cx="600" cy="500" r="220" stroke="#ff7a29" strokeWidth="3" strokeOpacity="0.75" />
                      <circle cx="600" cy="500" r="140" stroke="var(--ac)" strokeWidth="4" strokeOpacity="0.95" />
                      <line x1="380" y1="500" x2="600" y2="280" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.7" />
                      <circle cx="600" cy="280" r="4" fill="#ffffff" />
                    </svg>
                  )}
                </div>

                {/* CARD TOP ROW: Number & Arrow Link */}
                <div className="relative z-10 flex items-center justify-between pb-8">
                  <span
                    className="text-sm sm:text-base font-mono tracking-widest uppercase font-semibold"
                    style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                  >
                    {activeItem.number}
                  </span>

                  <Link
                    href={`/industries/${activeItem.slug}`}
                    className="w-11 h-11 rounded-full border border-[var(--ln)] flex items-center justify-center transition-all duration-300 hover:border-[var(--ac)] hover:bg-[var(--ac)] hover:text-white"
                    style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)', color: 'var(--fg)' }}
                    aria-label={`View ${activeItem.title} details`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* CARD MIDDLE & BOTTOM: Title, description, tags */}
                <div className="relative z-10 max-w-[500px] space-y-6 pt-8 sm:pt-12">
                  <h3
                    className="text-[34px] sm:text-[48px] lg:text-[58px] font-extrabold tracking-[-0.035em] leading-[1.02]"
                    style={{ fontFamily: 'var(--d)', color: 'var(--fg)' }}
                  >
                    {activeItem.title}
                  </h3>

                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ fontFamily: 'var(--b)', color: 'var(--mut)' }}
                  >
                    {activeItem.shortDesc}
                  </p>

                  {/* Capability Pills */}
                  {activeItem.tags && (
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {activeItem.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1.5 rounded-full border border-[var(--ln)] text-xs font-medium tracking-wide"
                          style={{ fontFamily: 'var(--b)', background: 'rgba(255,255,255,0.04)', color: 'var(--fg)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
