import React from 'react';
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return await generateSeoMetadata('Page', 'blog', {
    title: 'Blog & Insights | ONYT',
    description: 'Read the latest stories, strategy insights, and technology guides.',
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
