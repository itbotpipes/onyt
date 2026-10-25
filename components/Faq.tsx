'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQ {
  num: string;
  q: string;
  a: string;
}

const FAQS: FAQ[] = [
  {
    num: '01',
    q: 'What types of projects does ONYT take on?',
    a: 'We partner with high-growth startups, scale-ups, and category-defining enterprises across performance marketing, brand identity systems, high-speed digital flagships (Next.js, React, Shopify Plus), and custom software application engineering.',
  },
  {
    num: '02',
    q: 'How does your sprint workflow and collaboration work?',
    a: 'We operate as an embedded senior extension of your team. You get direct access to dedicated strategists and engineers in a shared Slack channel, live Figma workstreams, and weekly production demos. Zero account management layers or bloated status meetings.',
  },
  {
    num: '03',
    q: 'What is your typical turnaround timeline?',
    a: 'Sprint engagements kick off within 48 hours of onboarding. Focused digital flagships, landing experiences, and brand overhauls typically ship in 2–4 weeks; complex platforms and compound performance media run in bi-weekly agile development cycles.',
  },
  {
    num: '04',
    q: 'Do we own 100% of the code, IP, and design assets?',
    a: 'Yes, completely and unconditionally. Upon milestone completion, all source code, Figma design systems, repositories, ad accounts, and analytics setups belong entirely to you with zero vendor lock-in or licensing fees.',
  },
  {
    num: '05',
    q: 'How do you approach performance marketing and ROI?',
    a: 'We treat media spend like capital allocation. Every creative test, conversion funnel, and paid media campaign is tied to blended CAC, ROAS, and customer LTV. You receive automated real-time telemetry dashboards tracking verified bottom-line growth.',
  },
  {
    num: '06',
    q: 'How is pricing structured?',
    a: 'We offer fixed-scope milestones for well-defined builds (flagship sites, rebrands, audits) and flexible monthly agile sprint retainers for ongoing media scaling, feature iteration, and continuous engineering. No hidden surprises or surprise change-orders.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-sec">
      <div className="faq-wrap">
        {/* Left Sticky Column */}
        <div className="faq-left rv">
          <h2>Got questions? We have clear answers.</h2>
          <p>
            Transparent details on how we build, our sprint velocity, pricing models, and full IP ownership.
          </p>
          <div className="faq-cta-box">
            <span className="faq-cta-label">Have a custom question?</span>
            <a href="#contact" className="btn faq-btn">
              Let’s talk ↗
            </a>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="faq-accordion rv">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.num}
                className={`faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-left">
                    <span className="faq-num">{faq.num}</span>
                    <span className="faq-title">{faq.q}</span>
                  </div>
                  <div className="faq-toggle-icon">
                    <span>+</span>
                  </div>
                </button>

                <div
                  className="faq-answer-wrap"
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
