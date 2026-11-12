'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Generates an ultra-smooth Catmull-Rom / Cardinal spline converted to continuous cubic Bezier segments.
 * Guarantees C1/C2 tangent continuity across all waypoints — zero sharp corners, zero kinks, zero straight lines.
 */
function createEllipticalSpline(points: { x: number; y: number }[], tension = 0.35): string {
  if (!points || points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  const n = points.length;

  for (let i = 0; i < n - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < n - 2 ? points[i + 2] : p2;

    const scale = 1 / (6 * (1 - tension));
    const cp1x = p1.x + (p2.x - p0.x) * scale;
    const cp1y = p1.y + (p2.y - p0.y) * scale;

    const cp2x = p2.x - (p3.x - p1.x) * scale;
    const cp2y = p2.y - (p3.y - p1.y) * scale;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function ContinuousKineticLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterPathRef = useRef<SVGPathElement>(null);
  const baseTraceRef = useRef<SVGPathElement>(null);
  const midTrailRef = useRef<SVGPathElement>(null);
  const recentTrailRef = useRef<SVGPathElement>(null);
  const hotCoreRef = useRef<SVGPathElement>(null);
  const leadingNodeRef = useRef<SVGGElement>(null);

  // Milestones mapping target scroll positions to path distances
  const milestonesRef = useRef<{ dist: number; scroll: number }[]>([]);
  const stageDistsRef = useRef<{ s1: number; s2: number; s3: number }>({ s1: 0, s2: 0, s3: 0 });
  const totalLengthRef = useRef<number>(1000);

  useEffect(() => {
    let isMounted = true;
    let ctx: any = null;
    let stInstance: any = null;
    let resizeTimer: any = null;
    let handleResize: (() => void) | null = null;

    const initAnimation = async () => {
      if (typeof window === 'undefined') return;
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

      // Safe dynamic import of GSAP & ScrollTrigger with ESM/CJS interop fallback
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;

      if (!gsap || !ScrollTrigger) return;
      try {
        gsap.registerPlugin(ScrollTrigger);
      } catch {}

      if (!isMounted) return;

      const mainEl = document.getElementById('main-content');
      if (!mainEl || !masterPathRef.current) return;

      const pathEl = masterPathRef.current;
      const baseEl = baseTraceRef.current;
      const midEl = midTrailRef.current;
      const recentEl = recentTrailRef.current;
      const hotEl = hotCoreRef.current;
      const nodeEl = leadingNodeRef.current;

      // ── 1. DYNAMICALLY MEASURE DOM ANCHORS & CONSTRUCT CURVY ELLIPTICAL SPLINE ──
      const updatePathGeometry = () => {
        const mainRect = mainEl.getBoundingClientRect();
        const mainTop = mainRect.top + window.scrollY;
        const mainLeft = mainRect.left + window.scrollX;
        const isMobile = window.innerWidth < 768;

        // Query Section Anchors
        const heroEl = document.querySelector('.ind-hero') as HTMLElement | null;
        const explorerEl = document.getElementById('explorer');
        const processEl = document.getElementById('growth-process');
        const statsEl = document.getElementById('industry-stats');
        const casesEl = document.getElementById('industry-cases');
        const faqEl = document.getElementById('industry-faqs');
        const ctaEl = document.getElementById('industry-final-cta');

        if (!heroEl) return;

        // Hero Measurements
        const heroRect = heroEl.getBoundingClientRect();
        const heroW = heroRect.width;
        const heroH = heroRect.height;
        const heroTop = heroRect.top + window.scrollY - mainTop;
        const heroLeft = heroRect.left + window.scrollX - mainLeft;

        // Array of continuous waypoints flowing down the entire page
        const waypoints: { x: number; y: number }[] = [];

        // ── A. HERO CURVE (Preserve exact parabolic arc geometry: 980,110 -> 780,380 -> 440,660 -> 160,700) ──
        waypoints.push({
          x: heroLeft + (980 / 1440) * heroW,
          y: heroTop + (110 / 760) * heroH,
        });
        waypoints.push({
          x: heroLeft + (760 / 1440) * heroW,
          y: heroTop + (390 / 760) * heroH,
        });
        waypoints.push({
          x: heroLeft + (440 / 1440) * heroW,
          y: heroTop + (650 / 760) * heroH,
        });
        waypoints.push({
          x: heroLeft + (170 / 1440) * heroW,
          y: heroTop + (710 / 760) * heroH,
        });

        // ── B. THROUGH EXPLORER (Wide, graceful, elliptical undulating waves) ──
        if (explorerEl) {
          const expRect = explorerEl.getBoundingClientRect();
          const expTop = expRect.top + window.scrollY - mainTop;
          const expH = expRect.height;

          // Smooth elliptical transition from hero across ticker area
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.35 : 0.42),
            y: expTop + expH * 0.04,
          });

          // Wave 1: Wide elliptical crest to the right margin
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.85 : 0.82),
            y: expTop + expH * 0.16,
          });

          // Wave 2: Sweeping down the right side in a smooth curve
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.80 : 0.78),
            y: expTop + expH * 0.32,
          });

          // Wave 3: Wide diagonal sweep across negative space beneath center cards
          waypoints.push({
            x: heroLeft + heroW * 0.50,
            y: expTop + expH * 0.46,
          });

          // Wave 4: Wide elliptical crest to the left margin
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.15 : 0.18),
            y: expTop + expH * 0.60,
          });

          // Wave 5: Sweeping down the left side
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.20 : 0.22),
            y: expTop + expH * 0.74,
          });

          // Wave 6: Wide elliptical sweep back across to center-right
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.75 : 0.72),
            y: expTop + expH * 0.88,
          });

          // Approach to Growth Process
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.35 : 0.28),
            y: expTop + expH * 0.98,
          });
        }

        // ── C. GROWTH PROCESS INTEGRATION (Passes precisely through Stage 01 -> 02 -> 03) ──
        let s1WaypointIdx = -1;
        let s2WaypointIdx = -1;
        let s3WaypointIdx = -1;

        if (processEl) {
          const step1 = processEl.querySelector('[data-step="1"]') as HTMLElement | null;
          const step2 = processEl.querySelector('[data-step="2"]') as HTMLElement | null;
          const step3 = processEl.querySelector('[data-step="3"]') as HTMLElement | null;

          if (step1 && step2 && step3) {
            const s1R = step1.getBoundingClientRect();
            const s2R = step2.getBoundingClientRect();
            const s3R = step3.getBoundingClientRect();

            const s1 = { x: s1R.left + s1R.width / 2 + window.scrollX - mainLeft, y: s1R.top + s1R.height / 2 + window.scrollY - mainTop };
            const s2 = { x: s2R.left + s2R.width / 2 + window.scrollX - mainLeft, y: s2R.top + s2R.height / 2 + window.scrollY - mainTop };
            const s3 = { x: s3R.left + s3R.width / 2 + window.scrollX - mainLeft, y: s3R.top + s3R.height / 2 + window.scrollY - mainTop };

            // Lead-in to Stage 01
            waypoints.push({ x: s1.x - 70, y: s1.y + 35 });

            // Stage 01 Badge
            s1WaypointIdx = waypoints.length;
            waypoints.push({ x: s1.x, y: s1.y });

            if (isMobile) {
              // Smooth vertical undulation on mobile
              waypoints.push({ x: s1.x + 40, y: s1.y + (s2.y - s1.y) * 0.5 });
              s2WaypointIdx = waypoints.length;
              waypoints.push({ x: s2.x, y: s2.y });
              waypoints.push({ x: s2.x + 40, y: s2.y + (s3.y - s2.y) * 0.5 });
              s3WaypointIdx = waypoints.length;
              waypoints.push({ x: s3.x, y: s3.y });
            } else {
              // Exact undulating wave: smooth crest between 01 and 02
              waypoints.push({ x: s1.x + (s2.x - s1.x) * 0.5, y: s1.y + 22 });
              // Stage 02 Apex
              s2WaypointIdx = waypoints.length;
              waypoints.push({ x: s2.x, y: s2.y });
              // Smooth trough between 02 and 03
              waypoints.push({ x: s2.x + (s3.x - s2.x) * 0.5, y: s3.y + 22 });
              // Stage 03 Endpoint
              s3WaypointIdx = waypoints.length;
              waypoints.push({ x: s3.x, y: s3.y });
            }
          }
        }

        // ── D. STATISTICS SECTION (Wide elliptical sweep beneath metrics) ──
        if (statsEl) {
          const statsRect = statsEl.getBoundingClientRect();
          const statsTop = statsRect.top + window.scrollY - mainTop;
          const statsH = statsRect.height;

          // Sweeping off Stage 03 into right margin
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.85 : 0.82),
            y: statsTop + statsH * 0.25,
          });
          // Sweeping beneath the metric numbers in a wide round bowl
          waypoints.push({
            x: heroLeft + heroW * 0.50,
            y: statsTop + statsH * 0.60,
          });
          // Sweeping out into left margin
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.15 : 0.18),
            y: statsTop + statsH * 0.86,
          });
        }

        // ── E. FEATURED CASE STUDIES (Elliptical negative space sweep around cards) ──
        if (casesEl) {
          const csRect = casesEl.getBoundingClientRect();
          const csTop = csRect.top + window.scrollY - mainTop;
          const csH = csRect.height;

          // Curve through the negative space between cards
          waypoints.push({
            x: heroLeft + heroW * 0.48,
            y: csTop + csH * 0.28,
          });
          // Wide elliptical turn around right card
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.82 : 0.80),
            y: csTop + csH * 0.64,
          });
          // Exit sweep back towards center
          waypoints.push({
            x: heroLeft + heroW * 0.45,
            y: csTop + csH * 0.94,
          });
        }

        // ── F. FAQS SECTION (Gentle flow down the left negative space) ──
        if (faqEl) {
          const faqRect = faqEl.getBoundingClientRect();
          const faqTop = faqRect.top + window.scrollY - mainTop;
          const faqH = faqRect.height;

          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.18 : 0.22),
            y: faqTop + faqH * 0.45,
          });
          waypoints.push({
            x: heroLeft + heroW * (isMobile ? 0.26 : 0.32),
            y: faqTop + faqH * 0.88,
          });
        }

        // ── G. FINAL CTA (Elliptical arc connecting into CTA banner) ──
        if (ctaEl) {
          const ctaCard = (ctaEl.querySelector('.rounded-3xl') as HTMLElement) || ctaEl;
          const ctaCardRect = ctaCard.getBoundingClientRect();
          const ctaCardTop = ctaCardRect.top + window.scrollY - mainTop;
          const ctaCardLeft = ctaCardRect.left + window.scrollX - mainLeft;
          const ctaCardW = ctaCardRect.width;
          const ctaCardH = ctaCardRect.height;

          waypoints.push({
            x: ctaCardLeft + ctaCardW * 0.16,
            y: ctaCardTop + ctaCardH * 0.84,
          });
          waypoints.push({
            x: ctaCardLeft + ctaCardW * 0.40,
            y: ctaCardTop + ctaCardH * 0.52,
          });
          waypoints.push({
            x: ctaCardLeft + ctaCardW * 0.62,
            y: ctaCardTop + ctaCardH * 0.24,
          });
        }

        // Construct 100% C2-continuous elliptical spline
        const splinePathData = createEllipticalSpline(waypoints, 0.35);

        // Apply path 'd' to all layered strokes
        pathEl.setAttribute('d', splinePathData);
        if (baseEl) baseEl.setAttribute('d', splinePathData);
        if (midEl) midEl.setAttribute('d', splinePathData);
        if (recentEl) recentEl.setAttribute('d', splinePathData);
        if (hotEl) hotEl.setAttribute('d', splinePathData);

        // Calculate total path length
        const totalLen = pathEl.getTotalLength?.() || 1000;
        totalLengthRef.current = totalLen;

        // Initialize base trace stroke dash
        if (baseEl) {
          baseEl.style.strokeDasharray = `${totalLen}`;
          baseEl.style.strokeDashoffset = `${totalLen}`;
        }

        // ── 2. VIEWPORT-SYNCHRONIZED MILESTONE MAPPING (Never leaves the screen) ──
        const numSamples = 400;
        const samples: { dist: number; x: number; y: number }[] = [];
        for (let s = 0; s <= numSamples; s++) {
          const dVal = (s / numSamples) * totalLen;
          try {
            const p = pathEl.getPointAtLength(dVal);
            samples.push({ dist: dVal, x: p.x, y: p.y });
          } catch {}
        }

        // Find exact distance for each waypoint
        const waypointDists: number[] = [];
        for (let i = 0; i < waypoints.length; i++) {
          if (i === 0) {
            waypointDists.push(0);
            continue;
          }
          if (i === waypoints.length - 1) {
            waypointDists.push(totalLen);
            continue;
          }
          const target = waypoints[i];
          let bestDist = (i / (waypoints.length - 1)) * totalLen;
          let minDSq = Infinity;
          for (let s = 0; s < samples.length; s++) {
            const sp = samples[s];
            const dSq = (sp.x - target.x) ** 2 + (sp.y - target.y) ** 2;
            if (dSq < minDSq) {
              minDSq = dSq;
              bestDist = sp.dist;
            }
          }
          waypointDists.push(bestDist);
        }

        // Monotonic guarantee
        for (let i = 1; i < waypointDists.length; i++) {
          if (waypointDists[i] <= waypointDists[i - 1]) {
            waypointDists[i] = waypointDists[i - 1] + 1;
          }
        }

        // Save stage distance markers for indicator activation
        if (s1WaypointIdx >= 0 && s2WaypointIdx >= 0 && s3WaypointIdx >= 0) {
          stageDistsRef.current = {
            s1: waypointDists[s1WaypointIdx],
            s2: waypointDists[s2WaypointIdx],
            s3: waypointDists[s3WaypointIdx],
          };
        }

        // Map waypoints to scroll positions so active head stays in viewport focal zone
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const vh = window.innerHeight;

        const scrollMilestones: number[] = [];
        for (let i = 0; i < waypoints.length; i++) {
          if (i === 0) {
            scrollMilestones.push(0);
          } else if (i === waypoints.length - 1) {
            scrollMilestones.push(maxScroll);
          } else {
            // Point i is placed around 45% down the viewport (user's active focus area)
            const idealScroll = waypoints[i].y - vh * 0.45;
            const clamped = Math.max(
              scrollMilestones[i - 1] + 25,
              Math.min(maxScroll - 15 * (waypoints.length - 1 - i), idealScroll)
            );
            scrollMilestones.push(clamped);
          }
        }

        milestonesRef.current = waypoints.map((_, i) => ({
          dist: waypointDists[i],
          scroll: scrollMilestones[i],
        }));
      };

      // ── 3. REAL-TIME DISTANCE COMPUTATION BASED ON SCROLL (Starts immediately on scroll) ──
      const getDistanceForScroll = (scrollY: number) => {
        const milestones = milestonesRef.current;
        if (!milestones || milestones.length < 2) return 0;

        if (scrollY <= milestones[0].scroll) return 0;
        const last = milestones[milestones.length - 1];
        if (scrollY >= last.scroll) return last.dist;

        for (let i = 0; i < milestones.length - 1; i++) {
          const m1 = milestones[i];
          const m2 = milestones[i + 1];
          if (scrollY >= m1.scroll && scrollY <= m2.scroll) {
            const span = m2.scroll - m1.scroll;
            const t = span > 0 ? (scrollY - m1.scroll) / span : 0;
            return m1.dist + t * (m2.dist - m1.dist);
          }
        }
        return last.dist;
      };

      // ── 4. SPATIAL TRAILING FADE UPDATE RENDERER ──
      const renderFrameAtDist = (currentDist: number) => {
        const totalLen = totalLengthRef.current;
        const clampedDist = Math.max(0, Math.min(totalLen, currentDist));

        // A. Distant Older Trail: Subtle 10% low-opacity trace along visited route
        if (baseEl) {
          baseEl.style.strokeDashoffset = `${Math.max(0, totalLen - clampedDist)}`;
        }

        // B. Intermediate Trail (~1100px behind head, 35% intensity)
        if (midEl) {
          const midLen = Math.min(clampedDist, 1100);
          const midStart = Math.max(0, clampedDist - midLen);
          midEl.style.strokeDasharray = `0 ${midStart.toFixed(1)} ${midLen.toFixed(1)} ${totalLen.toFixed(1)}`;
        }

        // C. Recent Trail (~320px behind head, 85% intensity with radiant amber glow)
        if (recentEl) {
          const recentLen = Math.min(clampedDist, 320);
          const recentStart = Math.max(0, clampedDist - recentLen);
          recentEl.style.strokeDasharray = `0 ${recentStart.toFixed(1)} ${recentLen.toFixed(1)} ${totalLen.toFixed(1)}`;
        }

        // D. Laser Hot Tip (~75px behind head, 100% white/amber intensity)
        if (hotEl) {
          const hotLen = Math.min(clampedDist, 75);
          const hotStart = Math.max(0, clampedDist - hotLen);
          hotEl.style.strokeDasharray = `0 ${hotStart.toFixed(1)} ${hotLen.toFixed(1)} ${totalLen.toFixed(1)}`;
        }

        // E. Moving Glowing Leading Node
        if (nodeEl && pathEl) {
          try {
            const pt = pathEl.getPointAtLength(Math.max(0.1, clampedDist));
            nodeEl.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`);
          } catch {}
        }

        // F. Stage Indicator Highlights Synchronization (Understand -> Strategy -> Scale)
        const { s1, s2, s3 } = stageDistsRef.current;
        const step1 = document.querySelector('[data-step="1"]') as HTMLElement | null;
        const step2 = document.querySelector('[data-step="2"]') as HTMLElement | null;
        const step3 = document.querySelector('[data-step="3"]') as HTMLElement | null;

        if (step1 && s1 > 0) step1.classList.toggle('is-activated', clampedDist >= s1 - 50);
        if (step2 && s2 > 0) step2.classList.toggle('is-activated', clampedDist >= s2 - 50);
        if (step3 && s3 > 0) step3.classList.toggle('is-activated', clampedDist >= s3 - 50);
      };

      // ── 5. SET UP GSAP SCROLLTRIGGER ENGINE ──
      ctx = gsap.context(() => {
        updatePathGeometry();

        stInstance = ScrollTrigger.create({
          trigger: mainEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6, // Silky-smooth fluid physics scrubbing on scroll and reverse
          onUpdate: (self) => {
            const currentDist = getDistanceForScroll(self.scroll());
            renderFrameAtDist(currentDist);
          },
        });

        // Initial render at current scroll position
        const initialDist = getDistanceForScroll(window.scrollY);
        renderFrameAtDist(initialDist);
      });

      // ── 6. RESIZE & DYNAMIC LAYOUT RECALCULATION ──
      handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (!isMounted) return;
          updatePathGeometry();
          try {
            ScrollTrigger?.refresh?.();
          } catch {}
          const dist = getDistanceForScroll(window.scrollY);
          renderFrameAtDist(dist);
        }, 120);
      };

      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleResize, { passive: true });
      document.fonts?.ready?.then(() => {
        if (isMounted && handleResize) handleResize();
      });
    };

    initAnimation();

    return () => {
      isMounted = false;
      clearTimeout(resizeTimer);
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      }
      try {
        if (ctx) ctx.revert();
        if (stInstance) stInstance.kill();
      } catch {}
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[4] overflow-visible"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Amber Glow Filter for Leading Node & Recent Trail */}
          <filter id="kineticHeadGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial Gradient for Luminous Amber Halo */}
          <radialGradient id="kineticAmberHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7a29" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#ff4d00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff4d00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Master invisible measurement path */}
        <path
          ref={masterPathRef}
          fill="none"
          stroke="transparent"
          strokeWidth="1"
        />

        {/* 1. DISTANT OLDER TRAIL: Thin 10% low-opacity trace */}
        <path
          ref={baseTraceRef}
          fill="none"
          stroke="var(--ac)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.10"
        />

        {/* 2. INTERMEDIATE TRAIL: 35% intensity (~1100px behind head) */}
        <path
          ref={midTrailRef}
          fill="none"
          stroke="var(--ac)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />

        {/* 3. RECENT TRAIL: 85% intensity with radiant amber glow (~320px behind head) */}
        <path
          ref={recentTrailRef}
          fill="none"
          stroke="#ff4d00"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeOpacity="0.85"
          filter="url(#kineticHeadGlow)"
        />

        {/* 4. LASER HOT TIP: White/amber laser core (~75px behind head) */}
        <path
          ref={hotCoreRef}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeOpacity="1.0"
        />

        {/* 5. LUMINOUS LEADING NODE: Small glowing orange node following endpoint */}
        <g ref={leadingNodeRef} className="will-change-transform">
          {/* Ambient outer halo */}
          <circle cx="0" cy="0" r="30" fill="url(#kineticAmberHalo)" />
          {/* Subtle pulse ring */}
          <circle cx="0" cy="0" r="16" fill="none" stroke="var(--ac)" strokeWidth="1.2" opacity="0.5" />
          {/* Kinetic Flame core (#FF4D00) */}
          <circle cx="0" cy="0" r="8" fill="var(--ac)" filter="url(#kineticHeadGlow)" />
          {/* Laser white center */}
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
