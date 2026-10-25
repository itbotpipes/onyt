import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './admin.css';
import { AuthProvider } from '@/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'ONYT — Performance, Brand & Digital Studio',
  description: 'ONYT is a digital studio for performance marketing, branding, website and application development.',
  icons: {
    icon: [
      { url: '/ONYT-06.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/ONYT-06.png',
    apple: '/ONYT-06.png',
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('onyt-theme')||'dark';document.documentElement.setAttribute('data-theme',t);if(t==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`;

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
