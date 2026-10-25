'use client';

import React, { useState, useEffect } from 'react';
import { commentsService } from '@/services/comments.service';
import { ConfirmModalData } from '../ConfirmModal';

interface CommentsTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function CommentsTab({ showToast, setConfirmModal }: CommentsTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState<'all' | 'reported'>('all');
  const [searchName, setSearchName] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      let docs = await commentsService.getCommentsAdmin();
      if (searchName) {
        const searchLower = searchName.toLowerCase();
        docs = docs.filter((item: any) => item.name?.toLowerCase().includes(searchLower));
      }
      setData(docs || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to load comments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchName]);

  const handleToggleHide = async (id: string) => {
    try {
      const comment = data.find((item) => item._id === id);
      if (!comment) return;
      const nextHidden = !comment.isHidden;
      await commentsService.toggleHideComment(id, nextHidden);
      setData((prev) => prev.map((item) => (item._id === id ? { ...item, isHidden: nextHidden } : item)));
      showToast('Comment visibility updated successfully', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to update comment visibility', 'error');
    }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Comment',
      message: 'Are you sure you want to delete this comment? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await commentsService.deleteComment(id);
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Comment deleted successfully!', 'success');
        } catch (err) {
          console.error(err);
          showToast('Failed to delete comment', 'error');
        }
      }
    });
  };

  const displayedComments = data.filter((item) => {
    if (subTab === 'reported') {
      return item.isReported;
    }
    return true;
  });

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Header filter controls */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Filter Comments</span>
          <div className="flex bg-zinc-150 dark:bg-zinc-800 p-0.5 rounded-lg text-[11px] font-bold shrink-0">
            <button
              onClick={() => setSubTab('all')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                subTab === 'all'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
              }`}
            >
              All Comments
            </button>
            <button
              onClick={() => setSubTab('reported')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                subTab === 'reported'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
              }`}
            >
              Reported Comments
            </button>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by person's name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 w-full sm:w-64"
          />
          {searchName && (
            <button
              onClick={() => setSearchName('')}
              className="px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl text-xs font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading comments...
        </div>
      ) : displayedComments.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">
          {subTab === 'reported' ? 'No reported comments found.' : 'No comments found.'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Author</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Comment Content</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Post</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Likes</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Date</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {displayedComments.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                    <button
                      onClick={() => setSearchName(item.name)}
                      className="text-left font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer"
                      title="Click to view all comments from this person"
                    >
                      {item.name}
                    </button>
                  </td>
                  <td className="py-3 px-4 max-w-[300px]">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap break-words">{item.text}</div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {item.parentId && (
                        <span className="inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded">
                          Reply
                        </span>
                      )}
                      {item.isHidden && (
                        <span className="inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                    {item.isReported && (
                      <div className="mt-2 space-y-1">
                        <span className="inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase bg-red-50 dark:bg-red-950/20 text-red-500 rounded">
                          ⚠️ {item.reportsCount} Reports
                        </span>
                        {item.reports && item.reports.length > 0 && (
                          <ul className="mt-1 pl-2 border-l border-red-200 dark:border-red-800/60 text-[10px] text-zinc-500 dark:text-zinc-400 space-y-0.5">
                            {item.reports.map((r: any, rIdx: number) => (
                              <li key={rIdx}>
                                <span className="font-bold">{r.user?.name || 'User'}:</span> {r.reason}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 max-w-[200px] truncate text-zinc-600 dark:text-zinc-400">
                    {item.post?.title || 'Unknown Post'}
                  </td>
                  <td className="py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                    ❤️ {item.likesCount || item.likes?.length || 0}
                  </td>
                  <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleHide(item._id)}
                      className={`font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        item.isHidden
                          ? 'text-green-600 bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20'
                          : 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700/50'
                      }`}
                    >
                      {item.isHidden ? 'Unhide' : 'Hide'}
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
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
