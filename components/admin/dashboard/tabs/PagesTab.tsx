'use client';

import React, { useState, useEffect } from 'react';
import { pagesService } from '@/services/pages.service';
import { ConfirmModalData } from '../ConfirmModal';

interface PagesTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function PagesTab({ showToast, setConfirmModal }: PagesTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [pageForm, setPageForm] = useState({ title: '', slug: '', status: 'Published', content: '' });
  const [savingPage, setSavingPage] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const items = await pagesService.getPages();
      setData(items || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to load pages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingPage(null);
    setPageForm({ title: '', slug: '', status: 'Published', content: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (page: any) => {
    setEditingPage(page);
    setPageForm({
      title: page.title || '',
      slug: page.slug || '',
      status: page.status || 'Published',
      content: page.content || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPage(true);
    try {
      if (editingPage) {
        const updated = await pagesService.updatePage(editingPage._id, pageForm);
        setData((prev) => prev.map((item) => (item._id === editingPage._id ? updated : item)));
        showToast('Page content updated successfully', 'success');
      } else {
        const created = await pagesService.createPage(pageForm);
        setData((prev) => [...prev, created]);
        showToast('Page created successfully', 'success');
      }
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to save page', 'error');
    } finally {
      setSavingPage(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Page',
      message: 'Are you sure you want to delete this custom page?',
      onConfirm: async () => {
        try {
          await pagesService.deletePage(id);
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Page deleted successfully', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to delete page', 'error');
        }
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Header action */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-black/20">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          Manage and edit live content for Privacy Policy (<code className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">/privacy</code>), Terms of Service (<code className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">/terms</code>), and custom pages.
        </p>
        <button
          onClick={handleOpenCreate}
          className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm transform hover:-translate-y-0.5 duration-200 cursor-pointer shrink-0"
        >
          + Create New Page
        </button>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading pages...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">No custom pages found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Page Title</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Slug</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Status</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">{item.title}</td>
                  <td className="py-3 px-4 text-zinc-500 font-mono text-[11px]">/{item.slug}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        item.status === 'Published'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {item.status || 'Published'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-bold text-xs cursor-pointer"
                    >
                      Edit
                    </button>
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

      {/* Page Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-2xl shadow-2xl animate-scale-up">
            <h3 className="text-xl font-bold mb-4 text-[#111111] dark:text-white">
              {editingPage ? 'Edit Page Content' : 'Create New Page'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Page Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Privacy Policy"
                    value={pageForm.title}
                    onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Slug (URL Path)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. privacy"
                    value={pageForm.slug}
                    onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Status</label>
                <select
                  value={pageForm.status}
                  onChange={(e) => setPageForm({ ...pageForm, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Page Content</label>
                <textarea
                  required
                  rows={10}
                  value={pageForm.content}
                  onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                  placeholder="Write the page content here..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white font-normal resize-y"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPage}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {savingPage ? 'Saving...' : editingPage ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
