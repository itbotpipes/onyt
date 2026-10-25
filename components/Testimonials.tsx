/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface Testimonial {
  num: string;
  company: string;
  industry: string;
  quote: string;
  author: string;
  role: string;
  metricNum: string;
  metricLabel: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    num: '01',
    company: 'Aura Lifestyle',
    industry: 'D2C & Performance',
    quote:
      'ONYT completely restructured our acquisition engine. In just 90 days, our blended ROAS scaled from 1.8x to 4.2x while customer acquisition cost dropped by 38%. They treat every rupee of growth capital like it is their own.',
    author: 'Aarav Mehta',
    role: 'Founder & CEO',
    metricNum: '4.2x',
    metricLabel: 'Blended ROAS',
  },
  {
    num: '02',
    company: 'Verve Technologies',
    industry: 'Brand & Digital Flagship',
    quote:
      'The brand overhaul and high-speed digital flagship ONYT created elevated our brand from a boutique player to a category authority. Conversion rate jumped 3.4x in our very first month post-launch.',
    author: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    metricNum: '3.4x',
    metricLabel: 'Conversion Lift',
  },
  {
    num: '03',
    company: 'Kinetix Cloud',
    industry: 'Application Engineering',
    quote:
      'Architecting our enterprise multi-tenant dashboard and native apps with ONYT was effortless. Their engineers achieved sub-second latency and an intuitive interface that enterprise clients genuinely praise.',
    author: 'Devraj Kapoor',
    role: 'VP of Product',
    metricNum: '99.99%',
    metricLabel: 'Platform Uptime',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="ts-sec">
      <div className="hd rv">
        <div>
          <div className="ey">Testimonials</div>
          <h2>What our partners say.</h2>
        </div>
        <p>Direct perspectives from founders, CMOs, and product leaders who build and scale with ONYT.</p>
      </div>

      <div className="ts-deck">
        {TESTIMONIALS.map((t) => (
          <div key={t.num} className="ts-item rv">
            <div className="ts-item-head">
              <div className="ts-meta">
                <span className="ts-num">{t.num}</span>
                <span className="ts-co">{t.company}</span>
              </div>
              <span className="ts-tag">{t.industry}</span>
            </div>

            <p className="ts-quote">
              “{t.quote}”
            </p>

            <div className="ts-item-foot">
              <div className="ts-author">
                <h4>{t.author}</h4>
                <p>{t.role} · <span>{t.company}</span></p>
              </div>
              <div className="ts-kpi">
                <span className="ts-kpi-val">{t.metricNum}</span>
                <span className="ts-kpi-lbl">{t.metricLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ts-bar rv">
        <div className="ts-bar-cell">
          <b>4.9 / 5.0</b>
          <span>Client Satisfaction</span>
        </div>
        <div className="ts-bar-cell">
          <b>98%</b>
          <span>Annual Retention</span>
        </div>
        <div className="ts-bar-cell">
          <b>₹35Cr+</b>
          <span>Growth Ad Spend Managed</span>
        </div>
        <div className="ts-bar-cell">
          <b>120+</b>
          <span>Brands &amp; Flagships Launched</span>
        </div>
      </div>
    </section>
  );
}
