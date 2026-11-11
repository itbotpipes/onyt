'use client';

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import LatestStories from "@/components/blog/LatestStories";

const Motion = dynamic(() => import("@/components/Motion"), { ssr: false });

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Studio Overlays: Progress bar, film grain, magnetic cursor */}
      <div className="pb" id="pb"></div>
      <div className="gr"></div>
      <div className="cur"></div>

      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 flex flex-col justify-between selection:bg-[var(--ac)] selection:text-white">
        <div>
          <Nav />
          <main className="pt-24 sm:pt-28 md:pt-32">
            <BlogHero 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <LatestStories 
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </main>
        </div>
        <Footer />
      </div>

      <Motion />
    </>
  );
}
