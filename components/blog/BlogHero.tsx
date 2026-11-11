'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { postsService } from '../../services/posts.service';
import { categoriesService } from '../../services/categories.service';

interface BlogHeroProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const dateObj = typeof dateString.toDate === 'function' ? dateString.toDate() : new Date(dateString);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
    title: "How Restaurants, Bars, and Breweries Can Slash Wastage and Unlock Growth Margins in 2025",
    slug: "how-restaurants-bars-and-breweries-can-slash-wastage",
    createdAt: "2026-07-15",
    featuredImage: "/How Restaurants, Bars.jpg"
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

  const defaultTitle = "How Restaurants, Bars, and Breweries Can Slash Wastage and Unlock Growth Margins in 2025";
  const defaultSlug = "how-restaurants-bars-and-breweries-can-slash-wastage";
  const defaultDate = "July 15, 2025";
  const defaultImage = "/How Restaurants, Bars.jpg";

  const title = featuredPost?.title || defaultTitle;
  const slug = featuredPost?.slug || defaultSlug;
  const date = featuredPost ? formatDate(featuredPost.createdAt || featuredPost.publishedAt) : defaultDate;
  const image = featuredPost?.featuredImage || defaultImage;

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-4">
      
      {/* Top Header Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-[var(--ln)]">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--mut)]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search articles & guides..."
            className="w-full pl-11 pr-5 py-2.5 text-xs sm:text-sm rounded-full border border-[var(--ln)] bg-[var(--cd)] text-[var(--fg)] placeholder:text-[var(--mut)] focus:outline-none focus:border-[var(--ac)] transition-colors"
            style={{ fontFamily: 'var(--b)' }}
          />
        </div>

        {/* Categories Pill Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--ac)] text-white border border-[var(--ac)] shadow-sm'
                    : 'bg-[var(--cd)] text-[var(--mut)] border border-[var(--ln)] hover:border-[var(--ac)] hover:text-[var(--fg)]'
                }`}
                style={{ fontFamily: 'var(--b)' }}
              >
                {category}
              </button>
            );
          })}
        </div>

      </div>

      {/* Featured Article Card */}
      {activeCategory === 'All Blogs' && searchQuery.trim() === '' && (
        <div className="mt-8 sm:mt-10 rounded-[28px] sm:rounded-[36px] border border-[var(--ln)] bg-[var(--cd)] p-6 sm:p-10 lg:p-12 relative overflow-hidden group hover:border-[var(--ac)]/40 transition-all duration-500 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[var(--ac)]/15 text-[var(--ac)] border border-[var(--ac)]/30 mb-4">
                  FEATURED ARTICLE
                </div>

                <Link href={`/blogs/${slug}`} className="block group">
                  <h1
                    className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--fg)] group-hover:text-[var(--ac)] transition-colors"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {title}
                  </h1>
                </Link>

                <p
                  className="text-xs uppercase tracking-widest font-semibold mt-4 text-[var(--mut)] font-mono"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  {date}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href={`/blogs/${slug}`}
                  className="btn"
                  style={{ fontFamily: 'var(--b)' }}
                >
                  <span>Read article</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <Link
                href={`/blogs/${slug}`}
                className="relative w-full rounded-[20px] overflow-hidden border border-[var(--ln)] bg-[var(--bg)] aspect-[16/10] block group cursor-pointer shadow-md"
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
              </Link>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
