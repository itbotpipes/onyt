import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return await generateSeoMetadata('Page', 'industries', {
    title: 'Industries We Serve | ONYT Studio',
    description: 'Bespoke performance marketing, branding, and digital platforms engineered for manufacturing, healthcare, e-commerce, and high-growth verticals.',
  });
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
