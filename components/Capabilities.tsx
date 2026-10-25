/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

interface Capability {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  href: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    title: 'Performance Marketing',
    desc: 'High-ROI acquisition funnels, paid media scale, and conversion engineering.',
    tags: ['Paid Social', 'Google Ads 360', 'Technical SEO', 'Klaviyo CRM', 'CRO Funnels', 'Attribution'],
    href: '/services/performance-marketing',
  },
  {
    num: '02',
    title: 'Brand & Identity',
    desc: 'Distinctive visual language, identity systems, and category-defining positioning.',
    tags: ['Brand Strategy', 'Logo Systems', 'Packaging', 'Motion Graphics', '3D Visuals', 'Design Systems'],
    href: '/services/content-strategy-creation',
  },
  {
    num: '03',
    title: 'Websites & Digital Flagships',
    desc: 'Immersive interactive experiences built for sub-second speeds and maximum conversion.',
    tags: ['UI/UX Design', 'Next.js & React', 'Shopify Plus', 'Custom Webflow', 'Headless CMS', 'Speed 99+'],
    href: '/services/website-development',
  },
  {
    num: '04',
    title: 'Application Engineering',
    desc: 'Enterprise software architectures, native mobile apps, and autonomous workflows.',
    tags: ['iOS & Android', 'SaaS Platforms', 'Analytics Dashboards', 'REST & GraphQL', 'AI Automations'],
    href: '/services/application-development',
  },
];

export default function Capabilities() {
  return (
    <section className="caps-sec" id="capabilities">
      <div className="rv">
        <h2>Engineered for compound growth & category leadership.</h2>
      </div>

      <div className="caps-list">
        {CAPABILITIES.map((cap) => (
          <Link
            key={cap.num}
            href={cap.href}
            className="caps-row"
            aria-label={`${cap.title} services`}
          >
            <div className="caps-row-left">
              <span className="caps-num">{cap.num}</span>
              <div className="caps-info">
                <h3>{cap.title}</h3>
                <p>{cap.desc}</p>
              </div>
            </div>

            <div className="caps-tags">
              {cap.tags.map((tag, idx) => (
                <span key={idx} className="caps-pill">{tag}</span>
              ))}
            </div>

            <div className="caps-action">
              <div className="caps-arrow">
                <span>↗</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Compact Studio Telemetry & Impact Strip */}
      <div className="caps-strip">
        <div className="caps-strip-top">
          <div className="strip-live-badge">
            <span className="live-ping-dot"></span>
            <span>Live Studio Telemetry & Global Deployments</span>
          </div>
          <div className="strip-status">
            <span>Sprint 26 Active</span>
            <span className="strip-divider">/</span>
            <span>100% In-House</span>
            <span className="strip-divider">/</span>
            <span className="status-live-text">All Systems Operational</span>
          </div>
        </div>

        <div className="caps-strip-grid">
          <div className="strip-col">
            <div className="strip-stat-row">
              <span className="strip-val">14+</span>
              <span className="strip-pill">EMEA · APAC · US</span>
            </div>
            <div className="strip-label">Global Markets Active</div>
            <div className="strip-sub">Sub-100ms first paint worldwide</div>
          </div>

          <div className="strip-col">
            <div className="strip-stat-row">
              <span className="strip-val">&lt; 14d</span>
              <span className="strip-pill pill-accent">Guaranteed</span>
            </div>
            <div className="strip-label">Concept to Production</div>
            <div className="strip-sub">High-tempo sprints, zero agency fluff</div>
          </div>

          <div className="strip-col">
            <div className="strip-stat-row">
              <span className="strip-val">99.98%</span>
              <span className="strip-pill pill-green">SLA Uptime</span>
            </div>
            <div className="strip-label">Production SLA Uptime</div>
            <div className="strip-sub">Zero-downtime automated CI/CD</div>
          </div>

          <div className="strip-col">
            <div className="strip-stat-row">
              <span className="strip-val">99+</span>
              <span className="strip-pill pill-green">CWV Score</span>
            </div>
            <div className="strip-label">Lighthouse Performance</div>
            <div className="strip-sub">Sub-second LCP &amp; 0ms layout shift</div>
          </div>
        </div>
      </div>
    </section>
  );
}
