import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './admin.css';
import { AuthProvider } from '@/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'ONYT — Performance, Brand & Digital Studio',
  description: 'ONYT is a digital studio for performance marketing, branding, website and application development.',
};

const themeInit = `(function(){try{var t=localStorage.getItem('onyt-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ fontFamily: "var(--font-b, 'DM Sans', sans-serif)" }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
