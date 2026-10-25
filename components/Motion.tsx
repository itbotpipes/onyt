'use client';
import { useEffect } from 'react';
import { initMotion } from '@/lib/motion';

export default function Motion() {
  useEffect(() => {
    const cleanup = initMotion();
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);
  return null;
}
