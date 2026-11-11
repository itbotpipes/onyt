'use client';

import React from 'react';
import { INDUSTRIES_PAGE_DATA } from './industriesData';

export default function IndustryTicker() {
  const { ticker } = INDUSTRIES_PAGE_DATA;

  return (
    <div
      className="mq"
      style={{
        background: 'color-mix(in srgb, var(--cd) 40%, var(--bg))',
        borderTop: '1px solid var(--ln)',
        borderBottom: '1px solid var(--ln)',
        padding: '16px 0',
      }}
    >
      <div style={{ display: 'inline-flex', gap: '40px', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--b)',
            fontSize: '11.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ac)',
            fontWeight: 700,
          }}
        >
          {ticker.prefix}
        </span>

        {ticker.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span
              style={{
                fontFamily: 'var(--d)',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--fg)',
              }}
            >
              {item}
            </span>
            <b style={{ color: 'var(--ac)' }}>/</b>
          </React.Fragment>
        ))}

        {/* Seamless duplicate */}
        <span
          style={{
            fontFamily: 'var(--b)',
            fontSize: '11.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ac)',
            fontWeight: 700,
          }}
        >
          {ticker.prefix}
        </span>

        {ticker.items.map((item, idx) => (
          <React.Fragment key={`dup-${idx}`}>
            <span
              style={{
                fontFamily: 'var(--d)',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--fg)',
              }}
            >
              {item}
            </span>
            <b style={{ color: 'var(--ac)' }}>/</b>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
