'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, AnimatePresence } from 'motion/react';

interface Stage {
  num: string;
  tag: string;
  timeline: string;
  title: string;
  desc: string;
  deliverables: string[];
  milestone: string;
  metric: string;
  metricLabel: string;
}

const STAGES: Stage[] = [
  {
    num: '01',
    tag: 'COMMERCE & TECH FORENSICS',
    timeline: 'Week 01',
    title: 'Understand & Audit',
    desc: 'Deep-dive forensics into your existing unit economics, customer acquisition bottlenecks, code architecture, and competitive delta. We identify exactly where revenue is leaking before touching a single line of code.',
    deliverables: ['Growth Bottleneck Map', 'Tech Debt & Speed Audit', 'Competitor Delta Analysis', 'Core KPI Baseline'],
    milestone: 'Comprehensive Growth Forensics & Baseline Sign-Off',
    metric: '100%',
    metricLabel: 'Forensic Stack Coverage',
  },
  {
    num: '02',
    tag: 'AUDIENCE & SEARCH INTENT',
    timeline: 'Week 02',
    title: 'Research & Anthropology',
    desc: 'High-intent buyer search graphs, competitor ad spend teardowns, audience psychology analysis, and programmatic opportunity mapping to uncover uncontested market angles and demand pockets.',
    deliverables: ['Intent Search Demand Graph', 'Audience Persona Blueprint', 'Competitor Paid Ad Forensics', 'High-Converting Hook Matrix'],
    milestone: 'Demand Map & Hook Strategy Sign-Off',
    metric: '4.8x',
    metricLabel: 'Search Intent Density',
  },
  {
    num: '03',
    tag: 'SYSTEM & UX BLUEPRINT',
    timeline: 'Week 03',
    title: 'Architecture & Strategy',
    desc: 'Engineering the technical stack architecture, high-conversion wireframes, brand design tokens, and a multi-channel revenue plan before writing a single line of production code.',
    deliverables: ['Component Architecture Spec', 'Frictionless Wireframe UX', 'Design Tokens & Typography', 'Milestone Commercial Roadmap'],
    milestone: 'Approved Architectural Spec & UX Blueprint',
    metric: '99.9%',
    metricLabel: 'Architecture Feasibility',
  },
  {
    num: '04',
    tag: 'BESPOKE PRODUCTION SPRINT',
    timeline: 'Weeks 04–06',
    title: 'Build & Rapid Execute',
    desc: 'High-velocity production development on Next.js, bespoke micro-motion, conversion copy implementation, creative ad production, and server-side tracking pixel infrastructure.',
    deliverables: ['Production Next.js Deployment', 'Sub-second LCP & WebGL', 'High-ROAS Ad Creative Suite', 'Server-Side Attribution Sync'],
    milestone: 'Staging Deployment & Production Launch',
    metric: '<0.8s',
    metricLabel: 'Core Web Vitals LCP',
  },
  {
    num: '05',
    tag: 'ATTRIBUTION & VALIDATION',
    timeline: 'Week 07',
    title: 'Telemetry & Measure',
    desc: 'Real-time telemetry monitoring, blended CAC cohort tracking, user session recordings, and conversion funnel drop-off analytics under live high-volume market conditions.',
    deliverables: ['Live Executive Dashboard', 'Blended ROAS Telemetry', 'Heatmap & Session Diagnostics', 'Milestone Sign-Off'],
    milestone: 'Conversion Telemetry & Attribution Sign-Off',
    metric: '100%',
    metricLabel: 'Attribution Fidelity',
  },
  {
    num: '06',
    tag: 'COMPOUNDING VELOCITY',
    timeline: 'Ongoing Velocity',
    title: 'Scale & Compounding',
    desc: 'Algorithmic paid budget scaling across top-performing ad angles, automated multivariate CRO experiments, programmatic SEO expansion, and continuous compounding iterations.',
    deliverables: ['Bi-Weekly Growth Sprints', 'Multivariate CRO Experiments', 'Programmatic Topic Scaling', 'Compounding ARR Lift'],
    milestone: 'Continuous Compounding Growth Cadence',
    metric: '3.2x+',
    metricLabel: 'Compounding Revenue Lift',
  },
];

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map 0 -> 1 progress cleanly into 6 stages
      const stage = Math.min(5, Math.max(0, Math.floor(latest * 6)));
      setActiveIdx(stage);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToStage = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / 5.5) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
    setActiveIdx(index);
  };

  const activeStage = STAGES[activeIdx];

  return (
    <section
      ref={containerRef}
      id="approach"
      className="relative w-full h-[380vh] bg-[var(--bg)] text-[var(--fg)] border-b border-[var(--ln)]"
      aria-label="The ONYT Delivery Protocol"
    >
      {/* ── PINNED FULL-VIEWPORT STAGE (LOCKS WHEN SCROLLING) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-5 sm:pb-6 z-10">
        
        {/* TOP BAR: Header & Progress Segment Readout */}
        <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--ln)]/60 pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold tracking-widest uppercase text-[var(--ac)]">
              <span className="w-2 h-2 rounded-full bg-[var(--ac)] animate-pulse" />
              <span>THE DELIVERY PROTOCOL // 6-STAGE ENGINE</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[var(--fg)] leading-tight"
              style={{ fontFamily: 'var(--d)' }}
            >
              From Understanding <span className="text-[var(--ac)]">to Real Outcomes.</span>
            </h2>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex flex-col md:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[var(--mut)] uppercase tracking-wider">PHASE PROGRESS</span>
              <span className="text-[var(--fg)] font-bold text-sm tracking-tight">
                0{activeIdx + 1} <span className="text-[var(--mut)]">/ 06</span>
              </span>
              <span className="text-[var(--ac)] font-bold">({Math.round(((activeIdx + 1) / 6) * 100)}%)</span>
            </div>

            {/* 6 glowing progress bar segments */}
            <div className="flex items-center gap-1.5 w-44 sm:w-56 h-1.5">
              {STAGES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx <= activeIdx
                      ? 'bg-[var(--ac)] shadow-[0_0_8px_rgba(255,77,0,0.6)]'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CENTER VIEWPORT: Monolithic Stage Display & Technical Graphic */}
        <div className="w-full max-w-[1440px] mx-auto flex-1 flex items-center min-h-0 py-4 my-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Monolithic Typographic Narrative */}
            <div className="lg:col-span-7 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.num}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Giant Watermark Numeral */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-12 sm:-top-16 -left-3 text-7xl sm:text-9xl lg:text-[120px] font-black text-white/[0.04] select-none pointer-events-none tracking-tighter"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {activeStage.num}
                  </div>

                  {/* Stage Eyebrow Meta */}
                  <div className="flex items-center gap-3 mb-2.5 text-xs sm:text-sm font-mono font-bold text-[var(--ac)] uppercase tracking-wider">
                    <span>STAGE {activeStage.num}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--ac)]" />
                    <span className="text-[var(--mut)]">{activeStage.timeline}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--ln)]" />
                    <span className="text-white/60">{activeStage.tag}</span>
                  </div>

                  {/* Monumental Headline */}
                  <h3
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--fg)] tracking-tight leading-[1.06] mb-3.5"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {activeStage.title}
                  </h3>

                  {/* Strategic Overview */}
                  <p
                    className="text-sm sm:text-base lg:text-lg text-[var(--mut)] font-normal leading-relaxed max-w-xl"
                    style={{ fontFamily: 'var(--b)' }}
                  >
                    {activeStage.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Bespoke Technical Blueprint Visual */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.num}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[400px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 p-6 sm:p-7 relative flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md"
                >
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Visual Header */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                    <span className="text-[var(--ac)] font-bold">// TELEMETRY PROTOCOL</span>
                    <span className="text-white/40">{activeStage.timeline}</span>
                  </div>

                  {/* Dynamic Graphic Per Stage */}
                  <div className="relative z-10 flex-1 flex items-center justify-center my-4">
                    {activeIdx === 0 && (
                      /* Stage 01: Forensics Radar Scanner */
                      <div className="relative w-44 h-44 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-white/10" />
                        <div className="absolute inset-4 rounded-full border border-dashed border-white/15" />
                        <div className="absolute inset-10 rounded-full border border-[var(--ac)]/30" />
                        <div className="absolute inset-0 rounded-full border-t-2 border-[var(--ac)] animate-spin" style={{ animationDuration: '4s' }} />
                        <div className="w-3 h-3 rounded-full bg-[var(--ac)] shadow-[0_0_12px_#ff4d00]" />
                        {/* Target Blips */}
                        <div className="absolute top-8 left-10 w-2 h-2 rounded-full bg-[var(--ac)] animate-ping" />
                        <div className="absolute bottom-10 right-12 w-2 h-2 rounded-full bg-white/80" />
                        <div className="absolute bottom-6 left-16 text-[9px] font-mono text-[var(--ac)]">LEAK DETECTED</div>
                      </div>
                    )}

                    {activeIdx === 1 && (
                      /* Stage 02: Search & Intent Matrix */
                      <div className="w-full flex flex-col gap-3 font-mono text-xs">
                        <div className="p-3 rounded-lg border border-white/10 bg-black/40 flex items-center justify-between">
                          <span className="text-white/60">High-Intent Keywords</span>
                          <span className="text-[var(--ac)] font-bold">94.8% Demand</span>
                        </div>
                        <div className="p-3 rounded-lg border border-white/10 bg-black/40 flex items-center justify-between">
                          <span className="text-white/60">Competitor Ad Gap</span>
                          <span className="text-white font-bold">12 Angles</span>
                        </div>
                        <div className="p-3 rounded-lg border border-[var(--ac)]/30 bg-[var(--ac)]/5 flex items-center justify-between">
                          <span className="text-[var(--ac)]">Audience Psychology</span>
                          <span className="text-[var(--ac)] font-bold">Validated</span>
                        </div>
                      </div>
                    )}

                    {activeIdx === 2 && (
                      /* Stage 03: Architecture & System Spec */
                      <div className="w-full grid grid-cols-2 gap-3 font-mono text-xs">
                        <div className="p-3 rounded-lg border border-white/10 bg-black/40">
                          <div className="text-[var(--ac)] text-[10px] mb-1">LAYER 01</div>
                          <div className="text-white font-bold">Next.js Edge</div>
                        </div>
                        <div className="p-3 rounded-lg border border-white/10 bg-black/40">
                          <div className="text-[var(--ac)] text-[10px] mb-1">LAYER 02</div>
                          <div className="text-white font-bold">Micro-Motion</div>
                        </div>
                        <div className="p-3 rounded-lg border border-white/10 bg-black/40">
                          <div className="text-[var(--ac)] text-[10px] mb-1">LAYER 03</div>
                          <div className="text-white font-bold">Server Sync</div>
                        </div>
                        <div className="p-3 rounded-lg border border-[var(--ac)]/40 bg-[var(--ac)]/10">
                          <div className="text-[var(--ac)] text-[10px] mb-1">LAYER 04</div>
                          <div className="text-[var(--ac)] font-bold">CRO Architecture</div>
                        </div>
                      </div>
                    )}

                    {activeIdx === 3 && (
                      /* Stage 04: Build & Rapid Deployment */
                      <div className="w-full flex flex-col gap-2 font-mono text-xs">
                        <div className="flex items-center justify-between text-white/50 pb-1 border-b border-white/10">
                          <span>DEPLOYMENT PIPELINE</span>
                          <span className="text-emerald-400">● LIVE</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-white/70">Next.js 15 Staging</span>
                          <span className="text-emerald-400 font-bold">PASSED</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-white/70">Sub-second LCP (0.68s)</span>
                          <span className="text-emerald-400 font-bold">PASSED</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-white/70">Attribution Pixel Sync</span>
                          <span className="text-[var(--ac)] font-bold">ACTIVE</span>
                        </div>
                      </div>
                    )}

                    {activeIdx === 4 && (
                      /* Stage 05: Telemetry & Measurement */
                      <div className="w-full flex flex-col gap-3 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-white/50">COHORT ATTRIBUTION</span>
                          <span className="text-[var(--ac)] font-bold">+184% ROAS</span>
                        </div>
                        {/* Waveform graphic */}
                        <div className="h-16 w-full flex items-end gap-1 px-1">
                          {[30, 45, 60, 40, 75, 90, 65, 85, 100, 70, 95, 110, 130].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t bg-gradient-to-t from-[var(--ac)]/30 to-[var(--ac)] transition-all duration-300"
                              style={{ height: `${h * 0.45}%` }}
                            />
                          ))}
                        </div>
                        <div className="text-[10px] text-white/40 flex justify-between">
                          <span>Real-Time Events</span>
                          <span>Zero Signal Loss</span>
                        </div>
                      </div>
                    )}

                    {activeIdx === 5 && (
                      /* Stage 06: Compounding Acceleration */
                      <div className="relative w-full text-center flex flex-col items-center">
                        <div
                          className="text-6xl font-black text-[var(--ac)] tracking-tight leading-none mb-2"
                          style={{ fontFamily: 'var(--d)' }}
                        >
                          {activeStage.metric}
                        </div>
                        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                          {activeStage.metricLabel}
                        </div>
                        <div className="text-[11px] font-mono text-[var(--mut)] max-w-xs">
                          Continuous bi-weekly CRO testing and compounding market expansion.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Visual Footer Metric */}
                  <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">GATE KPI</div>
                      <div className="text-xs font-mono font-bold text-white">{activeStage.metricLabel}</div>
                    </div>
                    <div
                      className="text-2xl font-black text-[var(--ac)]"
                      style={{ fontFamily: 'var(--d)' }}
                    >
                      {activeStage.metric}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR: Direct Stage Jumps (01-06) & Action CTA */}
        <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--ln)]/60 pt-3 shrink-0">
          
          {/* Direct Stage Click Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--mut)] mr-1 hidden sm:inline">
              SELECT STAGE:
            </span>
            {STAGES.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                onClick={() => scrollToStage(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-[var(--ac)] text-white shadow-[0_0_12px_rgba(255,77,0,0.5)]'
                    : 'bg-white/5 text-[var(--mut)] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {s.num} <span className="hidden md:inline font-normal">{s.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Action CTA & Scroll Hint */}
          <div className="flex items-center gap-5">
            <span className="text-[11px] font-mono text-[var(--mut)] hidden md:inline">
              SCROLL DOWN TO ADVANCE ↓
            </span>
            <Link
              href="/contact"
              className="btn px-5 py-2 text-xs sm:text-sm font-semibold cursor-pointer shrink-0"
              style={{ fontFamily: 'var(--b)' }}
            >
              <span>Discuss Your Project</span>
              <span className="text-xs">&rarr;</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
