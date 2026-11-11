'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';

interface Discipline {
  num: string;
  category: string;
  title: string;
  shortTitle: string;
  tagline: string;
  desc: string;
  deliverables: string[];
  metric: { val: string; label: string };
  href: string;
  renderGraphic: () => React.ReactNode;
}

const DISCIPLINES: Discipline[] = [
  {
    num: '01',
    category: 'GROWTH ENGINE',
    title: 'Performance Marketing',
    shortTitle: 'Performance Marketing',
    tagline: 'High-ROI acquisition funnels',
    desc: 'Paid media and funnels tuned for profitable revenue, compounding ROAS, and customer LTV rather than vanity metrics.',
    deliverables: ['Meta & Google Ads 360', 'CRO & Funnel Optimization', 'Blended CAC Attribution'],
    metric: { val: '4.2x', label: 'Average ROAS lift' },
    href: '/services/performance-marketing',
    renderGraphic: () => (
      <svg className="svc-vector" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Subtle coordinate grid */}
        <line x1="20" y1="140" x2="220" y2="140" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
        <line x1="20" y1="90" x2="220" y2="90" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
        <line x1="20" y1="40" x2="220" y2="40" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
        <line x1="70" y1="20" x2="70" y2="140" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
        <line x1="150" y1="20" x2="150" y2="140" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="3 3" />
        {/* Fill gradient area under curve */}
        <path d="M 24 135 Q 80 125, 120 85 T 216 28 L 216 140 L 24 140 Z" fill="url(#perfGlow)" opacity="0.35" />
        {/* Growth Curve */}
        <path d="M 24 135 Q 80 125, 120 85 T 216 28" stroke="var(--ac)" strokeWidth="3" strokeLinecap="round" />
        {/* Active peak point */}
        <circle cx="216" cy="28" r="5" fill="var(--ac)" />
        <circle cx="216" cy="28" r="11" stroke="var(--ac)" strokeOpacity="0.4" strokeWidth="2" />
        <defs>
          <linearGradient id="perfGlow" x1="120" y1="28" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--ac)" stopOpacity="0.4" />
            <stop offset="1" stopColor="var(--ac)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    num: '02',
    category: 'BRAND ARCHITECTURE',
    title: 'Branding & Content',
    shortTitle: 'Branding & Content',
    tagline: 'Distinctive visual language',
    desc: 'Identities, design systems, and narrative strategy that turn high-growth ventures into instantly recognisable category leaders.',
    deliverables: ['Logo & Identity Systems', 'Brand Strategy & Positioning', 'Guidelines & Collateral'],
    metric: { val: '120+', label: 'Identities launched' },
    href: '/services/content-strategy-creation',
    renderGraphic: () => (
      <svg className="svc-vector" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Geometric golden ratio & typography construct */}
        <circle cx="120" cy="80" r="56" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
        <circle cx="120" cy="80" r="36" stroke="var(--ac)" strokeWidth="2" strokeOpacity="0.8" />
        <circle cx="156" cy="80" r="36" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="30" y1="80" x2="210" y2="80" stroke="currentColor" strokeOpacity="0.2" />
        <line x1="120" y1="16" x2="120" y2="144" stroke="currentColor" strokeOpacity="0.2" />
        {/* Monogram geometry */}
        <path d="M 106 102 L 120 54 L 134 102 Z" stroke="var(--fg)" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="111" y1="88" x2="129" y2="88" stroke="var(--ac)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: '03',
    category: 'DIGITAL FLAGSHIPS',
    title: 'Website Development',
    shortTitle: 'Website Development',
    tagline: 'High-speed digital flagships',
    desc: 'Fast, immersive flagships with motion that converts, built on modern Next.js and React stacks for sub-second load times.',
    deliverables: ['UI/UX Experience Design', 'Next.js & Custom Builds', 'Shopify Plus & Headless CMS'],
    metric: { val: '99+', label: 'Lighthouse score' },
    href: '/services/website-development',
    renderGraphic: () => (
      <svg className="svc-vector" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Browser viewport frame */}
        <rect x="28" y="24" width="184" height="116" rx="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <line x1="28" y1="46" x2="212" y2="46" stroke="currentColor" strokeOpacity="0.18" />
        <circle cx="42" cy="35" r="3" fill="var(--ac)" />
        <circle cx="52" cy="35" r="3" fill="currentColor" fillOpacity="0.25" />
        <circle cx="62" cy="35" r="3" fill="currentColor" fillOpacity="0.25" />
        {/* Code & layout wireframe */}
        <rect x="42" y="58" width="68" height="12" rx="3" fill="currentColor" fillOpacity="0.12" />
        <rect x="42" y="76" width="94" height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
        <rect x="42" y="87" width="80" height="6" rx="2" fill="currentColor" fillOpacity="0.08" />
        {/* Code Tag bracket */}
        <path d="M 172 70 L 186 84 L 172 98" stroke="var(--ac)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 154 70 L 140 84 L 154 98" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="166" y1="66" x2="160" y2="102" stroke="var(--ac)" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '04',
    category: 'SOFTWARE & SAAS',
    title: 'Application Development',
    shortTitle: 'Application Development',
    tagline: 'Scalable software engineering',
    desc: 'Web and mobile products engineered to scale smoothly from day one with resilient APIs and intuitive dashboards.',
    deliverables: ['iOS & Android Native Apps', 'SaaS Platform Architecture', 'APIs & Live Dashboards'],
    metric: { val: '<14d', label: 'Sprint cycle MVP' },
    href: '/services/custom-technology-development',
    renderGraphic: () => (
      <svg className="svc-vector" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* System Node Topology */}
        <rect x="36" y="58" width="46" height="46" rx="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <rect x="158" y="32" width="46" height="40" rx="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <rect x="158" y="90" width="46" height="40" rx="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        {/* Bus connection lines */}
        <path d="M 82 81 L 120 81 L 120 52 L 158 52" stroke="var(--ac)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 120 81 L 120 110 L 158 110" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Pulse indicators */}
        <circle cx="120" cy="81" r="3.5" fill="var(--ac)" />
        <circle cx="59" cy="81" r="7" stroke="var(--ac)" strokeWidth="2" />
        <circle cx="181" cy="52" r="4" fill="var(--ac)" fillOpacity="0.8" />
        <circle cx="181" cy="110" r="4" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section id="services" className="svc-sec" aria-label="Our Services & Disciplines">
      {/* Sleek Clean Header */}
      <div className="svc-header rv">
        <h2 className="svc-heading">Four disciplines. One growth engine.</h2>
        <div className="svc-header-meta">
          <p>Use them together or on their own. Built to stand out and scale.</p>
          <Link href="/services" className="btn g svc-explore-btn">
            Explore all services ↗
          </Link>
        </div>
      </div>

      {/* The Single-Screen Architectural Console Matrix */}
      <div className="svc-matrix rv" role="tablist">
        {DISCIPLINES.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={item.num}
              className={`svc-panel ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIdx(idx);
                }
              }}
            >
              {/* Collapsed State View (always horizontal, ultra-clean) */}
              <div className="svc-panel-collapsed">
                <div className="svc-col-top">
                  <span className="svc-col-num">{item.num}</span>
                  <span className="svc-col-dot" />
                </div>

                <div className="svc-col-mid">
                  <h3 className="svc-col-title">{item.shortTitle}</h3>
                  <span className="svc-col-tag">{item.category}</span>
                </div>

                <div className="svc-col-graphic">
                  {item.renderGraphic()}
                </div>

                <div className="svc-col-bottom">
                  <div className="svc-col-metric">
                    <span className="svc-col-val">{item.metric.val}</span>
                    <span className="svc-col-lbl">{item.metric.label}</span>
                  </div>
                  <div className="svc-col-expand-hint" aria-hidden="true">+</div>
                </div>
              </div>

              {/* Expanded State View (deep rich content, all details preserved) */}
              <div className="svc-panel-expanded">
                {/* Top Bar inside expanded panel */}
                <div className="svc-exp-top">
                  <div className="svc-exp-badge">
                    <span className="svc-exp-pulse" />
                    <span>{item.num} // {item.category}</span>
                  </div>
                  <div className="svc-exp-metric">
                    <span className="svc-exp-metric-val">{item.metric.val}</span>
                    <span className="svc-exp-metric-lbl">{item.metric.label}</span>
                  </div>
                </div>

                {/* Content Core */}
                <div className="svc-exp-content">
                  <div className="svc-exp-headline-group">
                    <h3 className="svc-exp-title">{item.title}</h3>
                    <p className="svc-exp-tagline">{item.tagline}</p>
                    <p className="svc-exp-desc">{item.desc}</p>
                  </div>

                  {/* Visual Artwork inside expanded */}
                  <div className="svc-exp-artwork" aria-hidden="true">
                    {item.renderGraphic()}
                  </div>
                </div>

                {/* Deliverables & CTA Bottom Row */}
                <div className="svc-exp-bottom">
                  <div className="svc-exp-deliverables">
                    <span className="svc-deliv-title">KEY DELIVERABLES</span>
                    <div className="svc-deliv-tags">
                      {item.deliverables.map((d, dIdx) => (
                        <span key={dIdx} className="svc-deliv-pill">
                          <span className="svc-deliv-dot" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href={item.href} className="btn p svc-exp-cta">
                    Explore discipline ↗
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
