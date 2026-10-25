'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { postsService } from '@/services/posts.service';
import { ARTICLES_DATA } from '@/data/blogData';

export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
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

const INITIAL_STORIES: Article[] = Object.values(ARTICLES_DATA).map((article: any) => ({
  id: article.slug,
  slug: article.slug,
  title: (article.title || '').replace(/Digitory/gi, 'ONYT'),
  date: article.date || 'July 2026',
  image: article.image || '/blogpage.jpg',
  category: article.category || 'Strategy',
}));

interface LatestStoriesProps {
  selectedCategory?: string;
  searchQuery?: string;
}

export default function LatestStories({
  selectedCategory = 'All Blogs',
  searchQuery = '',
}: LatestStoriesProps) {
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [allStories, setAllStories] = React.useState<Article[]>(INITIAL_STORIES);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      try {
        const posts = await postsService.getPosts({ status: 'Published', contentType: 'blog' });
        if (isMounted && posts && posts.length > 0) {
          const mapped: Article[] = posts.map((p: any) => ({
            id: p._id || p.id || p.slug,
            slug: p.slug,
            title: (p.title || '').replace(/Digitory/gi, 'ONYT'),
            date: formatDate(p.createdAt || p.publishedAt),
            image: p.featuredImage || '/hero-workspace.jpg',
            category: p.category?.name || p.categoryName || 'Strategy',
          }));
          setAllStories(mapped);
        }
      } catch (err) {
        console.warn('Backend posts fetch note:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadPosts();
    return () => { isMounted = false; };
  }, []);

  const matchesFilter = (article: Article) => {
    const matchesCategory =
      selectedCategory === 'All Blogs' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const isFiltering = searchQuery.trim() !== '' || selectedCategory !== 'All Blogs';
  const filteredStories = allStories.filter(matchesFilter);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Section Header: Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div>
          <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-[var(--ac)] block mb-2">
            Blog & Insights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-[var(--fg)] leading-[1.15] font-display">
            Latest <span className="text-[var(--ac)]">Stories</span>
          </h2>
        </div>
      </div>

      {/* Article Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-[var(--fg)]/50 font-semibold animate-pulse">Loading stories...</div>
      ) : (() => {
        const storiesToRender = isFiltering ? filteredStories : allStories;
        if (storiesToRender.length === 0) {
          return (
            <div className="text-center py-16 text-[var(--fg)]/60 font-semibold">
              No stories found matching your criteria.
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {storiesToRender.slice(0, visibleCount).map((article) => (
              <Link
                key={article.id}
                href={`/blogs/${article.slug}`}
                className="flex flex-col h-full bg-transparent group cursor-pointer"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[20px] bg-[var(--cd)] mb-4 border border-[var(--ln)] shadow-2xs shrink-0">
                  <Image
                    src={encodeURI(article.image)}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--ac)] mb-1">
                  {article.category}
                </span>
                <h3 className="text-base font-bold leading-snug text-[var(--fg)] group-hover:text-[var(--ac)] transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs font-semibold text-[var(--fg)]/60 mt-auto font-mono">
                  {article.date}
                </p>
              </Link>
            ))}
          </div>
        );
      })()}

      {/* Load More Button */}
      {!isLoading && (() => {
        const storiesToRender = isFiltering ? filteredStories : allStories;
        return visibleCount < storiesToRender.length && (
          <div className="pt-12 md:pt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--ac)] hover:bg-[var(--a2)] text-sm font-bold text-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,77,0,0.25)] hover:shadow-[0_6px_25px_rgba(255,77,0,0.4)] active:scale-[0.98] cursor-pointer"
            >
              <span>Load More Stories</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        );
      })()}
    </section>
  );
}
