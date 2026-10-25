import React from 'react';
import BlogDetails from './BlogDetails';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { postsService } from '@/services/posts.service';
import { notFound } from 'next/navigation';

interface BlogDetailsPageSharedProps {
  slug: string;
}

export async function BlogDetailsPageShared({ slug }: BlogDetailsPageSharedProps) {
  const post = await postsService.getPublishedPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Sanitize: convert all Firestore Timestamps / non-plain values to plain JSON
  const plainPost = JSON.parse(JSON.stringify(post));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300 flex flex-col justify-between selection:bg-[var(--ac)] selection:text-white">
      <div>
        <Nav />
        <div className="pt-24 sm:pt-28 md:pt-32">
          <BlogDetails blog={plainPost} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
