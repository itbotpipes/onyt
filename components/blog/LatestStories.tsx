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
    <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 md:py-14">
      {/* Section Header: Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div>
          <div className="ey">Blog & Insights</div>
          <h2
            className="text-3xl sm:text-4xl md:text-[46px] font-bold tracking-tight text-[var(--fg)] leading-[1.08]"
            style={{ fontFamily: 'var(--d)' }}
          >
            Latest <span style={{ color: 'var(--ac)' }}>Stories</span>
          </h2>
        </div>
      </div>

      {/* Article Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-[var(--mut)] font-semibold animate-pulse" style={{ fontFamily: 'var(--b)' }}>
          Loading stories...
        </div>
      ) : (() => {
        const storiesToRender = isFiltering ? filteredStories : allStories;
        if (storiesToRender.length === 0) {
          return (
            <div className="text-center py-16 text-[var(--mut)] font-semibold rounded-2xl border border-[var(--ln)] bg-[var(--cd)]" style={{ fontFamily: 'var(--b)' }}>
              No stories found matching your criteria.
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {storiesToRender.slice(0, visibleCount).map((article) => (
              <Link
                key={article.id}
                href={`/blogs/${article.slug}`}
                className="group flex flex-col justify-between h-full bg-[var(--cd)] border border-[var(--ln)] hover:border-[var(--ac)]/60 rounded-[24px] p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Image Card Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[var(--bg)] border border-[var(--ln)]/60 mb-5">
                    <Image
                      src={encodeURI(article.image)}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Category Pill Tag */}
                  <div className="mb-2.5">
                    <span 
                      className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ac)] font-mono"
                      style={{ fontFamily: 'var(--b)' }}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Story Title */}
                  <h3
                    className="text-[18px] sm:text-[20px] font-bold leading-[1.28] tracking-[-0.02em] text-[var(--fg)] group-hover:text-[var(--ac)] transition-colors mb-2 line-clamp-2"
                    style={{ fontFamily: 'var(--d)' }}
                  >
                    {article.title}
                  </h3>
                </div>

                {/* Story Date / Footer */}
                <div className="mt-5 pt-4 border-t border-[var(--ln)]/50 flex items-center justify-between text-xs text-[var(--mut)]">
                  <span className="font-mono" style={{ fontFamily: 'var(--b)' }}>
                    {article.date}
                  </span>
                  <span className="text-[var(--ac)] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center text-sm">
                    &rarr;
                  </span>
                </div>
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
              className="btn px-8 py-3.5 text-sm cursor-pointer"
              style={{ fontFamily: 'var(--b)' }}
            >
              <span>Load More Stories</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
