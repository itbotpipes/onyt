'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { postsService } from '@/services/posts.service';
import { ConfirmModalData } from '../ConfirmModal';

interface BlogsTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function BlogsTab({ showToast, setConfirmModal }: BlogsTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const posts = await postsService.getPosts();
      setData(posts || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to load blog posts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Blog Post',
      message: 'Are you sure you want to permanently delete this blog post?',
      onConfirm: async () => {
        try {
          await postsService.deletePost(id);
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Post deleted successfully', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to delete post', 'error');
        }
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Header action */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
        <Link
          href="/admin/blogs/add"
          className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm transform hover:-translate-y-0.5 duration-200"
        >
          + Create New Post
        </Link>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading blog posts...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">No blog posts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Title</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Category</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Author</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Published</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white max-w-sm truncate">{item.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.category?.name || item.category || 'General'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{item.author?.name || item.author || 'Admin'}</td>
                  <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/admin/blogs/${item._id}`}
                      className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-bold text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
