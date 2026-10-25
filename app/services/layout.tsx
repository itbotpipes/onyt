import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return await generateSeoMetadata('Page', 'services', {
    title: 'Digital Services & Solutions | ONYT Studio',
    description: 'Strategy, creativity, technology and data — brought together to help your business grow. Explore Website Development, SEO, Content, Performance Marketing, and Custom Development.',
  });
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
