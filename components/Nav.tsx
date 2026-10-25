'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUN_PATH = "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3z";
const MOON_PATH = "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z";

const NAV_ITEMS = [
  { label: 'Services', href: '/services', match: (p: string) => p.startsWith('/services') },
  { label: 'Industries', href: '/industries', match: (p: string) => p.startsWith('/industries') },
  { label: 'Blog', href: '/blogs', match: (p: string) => p.startsWith('/blog') || p.startsWith('/resources') },
  { label: 'Contact', href: '/contact', match: (p: string) => p.startsWith('/contact') },
];

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nvRef = useRef<HTMLDivElement>(null);
  const niRef = useRef<HTMLElement>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    document.body.classList.remove('mo');
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    document.body.classList.toggle('mo', next);
  };

  const closeMobileMenu = () => {
    document.body.classList.remove('mo');
    setIsMenuOpen(false);
  };



  // Indicator sliding logic
  const moveIndicator = (targetEl: HTMLElement | null) => {
    const ni = niRef.current;
    if (!ni) return;
    if (!targetEl) {
      ni.style.opacity = '0';
      return;
    }
    ni.style.opacity = '1';
    ni.style.width = targetEl.offsetWidth + 'px';
    ni.style.transform = `translateX(${targetEl.offsetLeft}px)`;
  };

  const getActiveElement = () => {
    if (!nvRef.current) return null;
    const activeItem = NAV_ITEMS.find(item => item.match(pathname));
    if (!activeItem) return null;
    return nvRef.current.querySelector<HTMLElement>(`a[data-label="${activeItem.label}"]`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const activeEl = getActiveElement();
      moveIndicator(activeEl);
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <nav className="nb" id="nb">
        <Link className="nbl" href="/" aria-label="ONYT Home">
          <img className="logo" alt="ONYT" src="/logo.png" />
        </Link>

        <div 
          className="nv" 
          id="nv" 
          ref={nvRef}
          onMouseLeave={() => moveIndicator(getActiveElement())}
        >
          <i id="ni" ref={niRef}></i>
          {NAV_ITEMS.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                data-label={item.label}
                className={isActive ? 'ix' : ''}
                onMouseEnter={(e) => moveIndicator(e.currentTarget)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="nr">
          <Link className="btn nbt" href="/contact">
            Let’s talk ↗
          </Link>

          <button 
            className="bgb" 
            id="mb" 
            aria-label="Menu" 
            aria-expanded={isMenuOpen}
            type="button"
            onClick={toggleMobileMenu}
          >
            <i></i><i></i>
          </button>
        </div>
      </nav>

      <div className="mm" id="mm">
        <div>
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label}
              className="mx" 
              href={item.href}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mf">hello@onyt.com</div>
      </div>
    </>
  );
}
