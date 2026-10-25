'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { postsService } from '../../services/posts.service';
import { categoriesService } from '../../services/categories.service';

interface BlogHeroProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

// Formatting helper
const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const dateObj = typeof dateString.toDate === 'function' ? dateString.toDate() : new Date(dateString);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function BlogHero({
  selectedCategory = 'All Blogs',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
}: BlogHeroProps) {
  const [internalCategory, setInternalCategory] = useState('All Blogs');
  const [featuredPost, setFeaturedPost] = useState<any>({
    title: "How Performance Marketing & Modern Engineering Accelerate Sustainable Business Growth",
    slug: "how-restaurants-bars-and-breweries-can-slash-wastage",
    createdAt: "2026-07-15",
    featuredImage: "/blogpage.jpg"
  });
  const [isLoading, setIsLoading] = useState(false);

  const activeCategory = onSelectCategory ? selectedCategory : internalCategory;

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        const posts = await postsService.getPosts({ status: 'Published', isFeatured: true, limitCount: 1 });
        if (isMounted && posts && posts.length > 0) {
          setFeaturedPost(posts[0]);
        }
      } catch (err) {
        // Fallback already in state
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadFeatured();
    return () => { isMounted = false; };
  }, []);

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      setInternalCategory(category);
    }
  };

  const [categories, setCategories] = useState<string[]>([
    'All Blogs',
    'Inventory',
    'Restaurant Operations',
    'Kitchen',
    'Strategy',
    'Automation',
  ]);

  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const cats = await categoriesService.getCategories();
        if (isMounted && cats && cats.length > 0) {
          const names = Array.from(new Set(['All Blogs', ...cats.map((c: any) => c.name)]));
          setCategories(names);
        }
      } catch (err) {
        // Fallback already in state
      }
    }
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  // Static Fallback values
  const defaultTitle = "How Performance Marketing & Modern Engineering Accelerate Sustainable Business Growth";
  const defaultSlug = "how-performance-marketing-modern-engineering-accelerate-growth";
  const defaultDate = "October 2026";
  const defaultImage = "/blogpage.jpg";

  // Use dynamic backend post if available, else static default
  const title = featuredPost?.title || defaultTitle;
  const slug = featuredPost?.slug || defaultSlug;
  const date = featuredPost ? formatDate(featuredPost.createdAt || featuredPost.publishedAt) : defaultDate;
  const image = featuredPost?.featuredImage || defaultImage;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 md:pt-10 md:pb-10">
      {/* Top Header Bar: Explore Topics & Categories + Right-aligned Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 md:pb-12 border-b border-[var(--ln)]">

        {/* Left aligned Search Bar */}
        <div className="relative w-full sm:w-72 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--fg)]/40">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search articles & guides..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-[var(--ln)] bg-[var(--cd)] text-[var(--fg)] placeholder:[var(--fg)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--ac)]/30 focus:border-[var(--ac)] transition-all shadow-2xs"
          />
        </div>

        {/* Right aligned Categories */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 justify-start lg:justify-end">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-sm font-medium transition-colors cursor-pointer ${isActive
                  ? 'text-[var(--ac)] font-bold'
                  : 'text-[var(--fg)]/70 hover:text-[var(--fg)]'
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Article Section */}
      {(activeCategory === 'All Blogs' && searchQuery.trim() === '') && (
        isLoading ? (
          <div className="pt-8 md:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-pulse">
            {/* Left Content Column Skeleton */}
            <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4 space-y-4 w-full">
              <div className="h-6 w-32 bg-[var(--cd)] rounded-full" />
              <div className="h-10 w-full bg-[var(--cd)] rounded-lg" />
              <div className="h-10 w-3/4 bg-[var(--cd)] rounded-lg" />
              <div className="h-4 w-24 bg-[var(--cd)] rounded-md" />
              <div className="h-12 w-36 bg-[var(--cd)] rounded-full" />
            </div>

            {/* Right Image Column Skeleton */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-[620px] rounded-[28px] bg-[var(--cd)] aspect-[16/9]" />
            </div>
          </div>
        ) : (
          <div className="pt-8 md:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[var(--ac)]/15 text-[11px] font-bold text-[var(--ac)] tracking-widest uppercase mb-4 border border-[var(--ac)]/25">
                FEATURED ARTICLE
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--fg)] leading-[1.15] mb-4 text-left font-display">
                {title}
              </h1>

              <p className="text-xs font-semibold text-[var(--fg)]/60 mb-6 uppercase tracking-wider font-mono">
                {date}
              </p>

              <Link
                href={`/blogs/${slug}`}
                className="inline-flex justify-center items-center text-center rounded-full bg-[var(--ac)] hover:bg-[var(--a2)] px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,77,0,0.25)] hover:shadow-[0_6px_25px_rgba(255,77,0,0.4)] hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Read article</span>
                <svg
                  className="w-4 h-4 text-white ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[620px] rounded-[28px] overflow-hidden shadow-2xs border border-[var(--ln)] bg-[var(--cd)] aspect-[16/9]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="w-full h-full object-cover block"
                  priority
                />
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
