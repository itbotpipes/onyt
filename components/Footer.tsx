'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
  const fbigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fbigRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('on');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('on');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <footer id="ft">
        <div ref={fbigRef} className="fbig rv">
          <img alt="ONYT" src="/logo-large.png" />
        </div>
        <div className="fcols">
          <div>
            <h4>Focus</h4>
            <p>Performance Marketing / Branding / Websites / Apps</p>
            <p className="m">India · Working worldwide</p>
            <p className="m" style={{marginTop:'8px'}}>
              <Link href="/services" style={{color:'var(--ac)',fontSize:'14px'}}>
                Explore all solutions ↗
              </Link>
            </p>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="mailto:hello@onyt.com">hello@onyt.com</a>
            <a href="tel:+910000000000">+91 00000 00000</a>
            <Link href="/contact" style={{marginTop:'8px',color:'var(--ac)'}}>
              Contact form ↗
            </Link>
          </div>
          <div>
            <h4>Quick links</h4>
            <Link href="/services">Services</Link>
            <Link href="/industries">Industries</Link>
            <Link href="/blogs">Blog &amp; Insights</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#process">Process</Link>
            <Link href="/#caps">Capabilities</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h4>Industries</h4>
            <Link href="/industries/manufacturing">Manufacturing</Link>
            <Link href="/industries/healthcare">Healthcare</Link>
            <Link href="/industries/ecommerce">E-Commerce</Link>
            <Link href="/industries/fintech">FinTech &amp; SaaS</Link>
            <Link href="/industries" style={{color:'var(--ac)'}}>All Industries ↗</Link>
          </div>
        </div>
        <div className="fb2">
          <span>© 2026 ONYT. All rights reserved.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
