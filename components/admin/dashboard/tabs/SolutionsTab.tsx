'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { solutionsService } from '@/services/solutions.service';
import { settingsService } from '@/services/settings.service';
import { ConfirmModalData } from '../ConfirmModal';

interface SolutionsTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function SolutionsTab({ showToast, setConfirmModal }: SolutionsTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Settings
  const [gridTitle, setGridTitle] = useState('');
  const [gridDesc, setGridDesc] = useState('');
  const [savingGridSettings, setSavingGridSettings] = useState(false);
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [items, s] = await Promise.all([
        solutionsService.getSolutions({ useCache: false }),
        settingsService.getSettings(true)
      ]);
      setData(items || []);
      if (s) {
        setGridTitle(s.solutionsGridTitle || 'Twelve powerful features to help your restaurant run better');
        setGridDesc(
          s.solutionsGridDesc || 'Click on any feature card below to open its full specifications and details on a new page.'
        );
        setCustomCategories(s.customCategories || []);
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to load solutions data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveGridSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGridSettings(true);
    try {
      await settingsService.saveSettings({
        solutionsGridTitle: gridTitle,
        solutionsGridDesc: gridDesc
      });
      showToast('Solutions grid headers saved successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to save grid headers', 'error');
    } finally {
      setSavingGridSettings(false);
    }
  };

  const handleAddCategory = async () => {
    const input = document.getElementById('newCategoryInput') as HTMLInputElement;
    const val = input?.value?.trim();
    if (val) {
      if (customCategories.includes(val)) {
        alert('Category already exists!');
        return;
      }
      const updatedCats = [...customCategories, val];
      setCustomCategories(updatedCats);
      await settingsService.saveSettings({
        solutionsGridTitle: gridTitle,
        solutionsGridDesc: gridDesc,
        customCategories: updatedCats
      });
      input.value = '';
      showToast('Category added successfully!', 'success');
    }
  };

  const handleDeleteCategory = async (cat: string) => {
    const updatedCats = customCategories.filter((c) => c !== cat);
    setCustomCategories(updatedCats);
    await settingsService.saveSettings({
      solutionsGridTitle: gridTitle,
      solutionsGridDesc: gridDesc,
      customCategories: updatedCats
    });
    showToast('Category deleted successfully!', 'success');
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Solution',
      message: 'Are you sure you want to permanently delete this solution?',
      onConfirm: async () => {
        try {
          await solutionsService.deleteSolution(id);
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Solution deleted successfully', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to delete solution', 'error');
        }
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Settings Form Header */}
      <div className="p-6 bg-zinc-50/50 dark:bg-black/10 border-b border-zinc-200 dark:border-zinc-800/80">
        <form onSubmit={handleSaveGridSettings} className="space-y-4 max-w-4xl">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 mb-2">Solutions Grid Header Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Title</label>
              <input
                type="text"
                value={gridTitle}
                onChange={(e) => setGridTitle(e.target.value)}
                placeholder="Twelve powerful features to help your restaurant run better"
                className="w-full px-3 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Subtitle / Description</label>
              <input
                type="text"
                value={gridDesc}
                onChange={(e) => setGridDesc(e.target.value)}
                placeholder="Click on any feature card below to open its full specifications..."
                className="w-full px-3 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
              />
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <button
              type="submit"
              disabled={savingGridSettings}
              className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-50 cursor-pointer"
            >
              {savingGridSettings ? 'Saving...' : 'Save Header Settings'}
            </button>

            <Link
              href="/admin/solutions/new"
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            >
              + Create New Solution Card
            </Link>
          </div>
        </form>

        {/* Custom Categories Section */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 max-w-4xl space-y-4 text-left">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500">Custom Categories Settings</h3>
            <p className="text-[11px] text-zinc-400 mt-1">
              Add custom category tabs to filter features dynamically on the solutions landing page.
            </p>
          </div>
          <div className="flex gap-3 max-w-md">
            <input
              type="text"
              placeholder="e.g. Marketing & Promo"
              id="newCategoryInput"
              className="flex-1 px-3 py-2 rounded-xl text-xs border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-800 dark:text-zinc-200 font-semibold"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm select-none hover:bg-zinc-800 dark:hover:bg-zinc-200"
            >
              + Add Category
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1.5">
            {customCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-200/60 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full text-xs font-bold"
              >
                {cat}
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  className="text-zinc-400 hover:text-red-500 font-bold ml-1 transition-colors cursor-pointer text-sm leading-none"
                >
                  ×
                </button>
              </span>
            ))}
            {customCategories.length === 0 && (
              <p className="text-xs text-zinc-400">No custom categories registered. Default ones are always active.</p>
            )}
          </div>
        </div>
      </div>

      {/* Solutions Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading solutions...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">No solutions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Title</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Category</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Slug</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white max-w-sm truncate">{item.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.category || 'General'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">{item.slug || '—'}</td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <Link
                      href={`/admin/solutions/${item._id}`}
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
