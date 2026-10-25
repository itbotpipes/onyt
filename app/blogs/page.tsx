'use client';

import React, { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import LatestStories from "@/components/blog/LatestStories";

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 flex flex-col justify-between font-sans selection:bg-[var(--ac)] selection:text-white">
      <div>
        <Nav />
        <div className="pt-24 sm:pt-28 md:pt-32">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
