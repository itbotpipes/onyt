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

const TECH_ITEMS_1 = [
  'Meta Ads',
  'Google Ads 360',
  'TikTok Ads',
  'GA4 & BigQuery',
  'Klaviyo',
  'Figma',
  'After Effects',
  'Shopify Plus',
  'Webflow',
  'HubSpot',
  'PostHog',
];

const TECH_ITEMS_2 = [
  'Next.js 15',
  'React',
  'TypeScript',
  'TailwindCSS',
  'Node.js',
  'Python',
  'PostgreSQL',
  'GraphQL',
  'Docker',
  'AWS',
  'Vercel',
  'Flutter',
];

export default function Capabilities() {
  return (
    <section id="caps" className="caps-sec">
      <div className="hd rv">
        <div>
          <div className="ey">Capabilities</div>
          <h2>Everything under one roof.</h2>
        </div>
        <p>Specialists across growth, design and engineering, operating as a synchronized high-velocity engine.</p>
      </div>

      <div className="caps-list">
        {CAPABILITIES.map((cap) => (
          <Link 
            key={cap.num} 
            href={cap.href}
            className="caps-row rv"
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

      <div className="caps-tech">
        <div className="caps-tech-meta">
          <span className="rec"></span>
          <span>Engineered with modern tools & infrastructure</span>
        </div>

        <div className="tk">
          <div>
            {TECH_ITEMS_1.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        <div className="tk rv2">
          <div>
            {TECH_ITEMS_2.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
