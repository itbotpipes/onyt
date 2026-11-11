'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryHero() {
  const { hero } = INDUSTRIES_PAGE_DATA;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="ind-hero">
      {/* Background ambient warm radiant light bleed */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
      >
        {/* Soft bottom flare radiating up */}
        <div className="absolute -bottom-24 left-[18%] w-[580px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.32)_0%,rgba(255,77,0,0.08)_50%,transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute top-[12%] right-[22%] w-[420px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,96,2,0.14)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      </div>

      {/* Sweeping Parabolic Arc & Focal Node SVG */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="heroArcGrad" x1="280" y1="720" x2="980" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.05" />
              <stop offset="25%" stopColor="var(--ac)" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#ff7a29" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="var(--ac)" />
              <stop offset="100%" stopColor="var(--ac)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bottomBeamGrad" x1="420" y1="760" x2="680" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--ac)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Luminous light cone rising from bottom edge */}
          <polygon
            points="340,760 760,280 840,320 520,760"
            fill="url(#bottomBeamGrad)"
            opacity="0.25"
            filter="blur(24px)"
          />

          {/* Broad atmospheric soft arc */}
          <path
            d="M 160 700 C 440 660, 780 380, 980 110"
            stroke="url(#heroArcGrad)"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.14"
            filter="blur(18px)"
          />

          {/* Core sharp laser arc */}
          <path
            d="M 160 700 C 440 660, 780 380, 980 110"
            stroke="url(#heroArcGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#arcGlow)"
          />

          {/* Glowing Focal Node at (980, 110) */}
          <g>
            <circle cx="980" cy="110" r="34" fill="url(#nodeGlow)" opacity="0.45" />
            <circle cx="980" cy="110" r="8" fill="var(--ac)" />
            <circle cx="980" cy="110" r="3.5" fill="#ffffff" />
            <circle cx="980" cy="110" r="16" stroke="var(--ac)" strokeWidth="1" opacity="0.6">
              <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* HERO 3-COLUMN STUDIO GRID */}
      <div className="ind-hero-grid">
        
        {/* COLUMN 1: Eyebrow + 4-Line Editorial Headline */}
        <div>
          <div className="ey rv">Industries</div>

          <div className="rv">
            <h1 className="ind-hero-h1">
              <span>Industry</span>
              <span>expertise</span>
              <span>that scales</span>
              <span className="acc">brands.</span>
            </h1>
          </div>
        </div>

        {/* COLUMN 2: Center-Right Narrative & Explore Action */}
        <div className="ind-hero-mid rv">
          <p>
            {hero.body}
          </p>

          <a href="#explorer" className="pill">
            <span>Explore Industries ↘</span>
          </a>
        </div>

        {/* COLUMN 3: Right Vertical Stacked Metric Cards */}
        <div className="ind-hero-kpi-stack rv">
          {/* KPI 1 */}
          <div className="ind-hero-kpi-cell">
            <div data-n="6" className="ind-hero-kpi-num">
              06
            </div>
            <div className="ind-hero-kpi-lbl">
              Industries
            </div>
          </div>

          {/* KPI 2 */}
          <div className="ind-hero-kpi-cell">
            <div data-n="250" data-s="+" className="ind-hero-kpi-num">
              250+
            </div>
            <div className="ind-hero-kpi-lbl">
              Projects
            </div>
          </div>

          {/* KPI 3 */}
          <div className="ind-hero-kpi-cell">
            <div data-n="3.5" data-s="×" className="ind-hero-kpi-num">
              3.5×
            </div>
            <div className="ind-hero-kpi-lbl">
              Avg. growth
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
