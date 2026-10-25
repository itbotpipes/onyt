import React from 'react';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'contact', {
    title: 'Contact Us | ONYT',
    description: 'Get in touch with the ONYT team to collaborate, engineer digital experiences, and accelerate growth.',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
