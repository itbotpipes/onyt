'use client';

import React, { createContext, useContext, useRef } from 'react';

const LenisContext = createContext<any>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const dummyRef = useRef<any>(null);

  return (
    <LenisContext.Provider value={dummyRef}>
      {children}
    </LenisContext.Provider>
  );
}

