'use client';

import React, { useState, useEffect, useRef } from 'react';
import { announcementsService } from '@/services/announcements.service';
import { ConfirmModalData } from '../ConfirmModal';

interface UpdatesTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function UpdatesTab({ showToast, setConfirmModal }: UpdatesTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<any | null>(null);
  const [updateForm, setUpdateForm] = useState({
    title: '',
    category: 'PRODUCT UPDATE',
    excerpt: '',
    content: '',
    featuredImage: '',
    publishedAt: ''
  });
  const [savingUpdate, setSavingUpdate] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const items = await announcementsService.getAnnouncements();
      setData(items || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to load announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingUpdate(null);
    setUpdateForm({
      title: '',
      category: 'PRODUCT UPDATE',
      excerpt: '',
      content: '',
      featuredImage: '',
      publishedAt: new Date().toISOString().split('T')[0]
    });
    setImagePreviewUrl(null);
    setShowModal(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingUpdate(item);
    setUpdateForm({
      title: item.title || '',
      category: item.category || 'PRODUCT UPDATE',
      excerpt: item.excerpt || '',
      content: item.content || '',
      featuredImage: item.featuredImage || '',
      publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().split('T')[0] : ''
    });
    setImagePreviewUrl(item.featuredImage || null);
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagePreviewUrl(localUrl);
    setUploadingImage(true);

    try {
      const uformData = new FormData();
      uformData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uformData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const { url } = await res.json();
      setImagePreviewUrl(url);
      setUpdateForm((prev) => ({ ...prev, featuredImage: url }));
    } catch (err: any) {
      console.error(err);
      setImagePreviewUrl(null);
      setUpdateForm((prev) => ({ ...prev, featuredImage: '' }));
      showToast(err.message || 'Failed to upload image', 'error');
    } finally {
      setUploadingImage(false);
      URL.revokeObjectURL(localUrl);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingUpdate(true);
    try {
      if (editingUpdate) {
        const updated = await announcementsService.updateAnnouncement(editingUpdate._id, updateForm);
        setData((prev) =>
          prev.map((item) =>
            item._id === editingUpdate._id ? { ...item, ...updated, updatedAt: new Date().toISOString() } : item
          )
        );
        showToast('Announcement updated successfully', 'success');
      } else {
        const created = await announcementsService.createAnnouncement(updateForm);
        setData((prev) => [created, ...prev]);
        showToast('Announcement created successfully', 'success');
      }
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to save announcement', 'error');
    } finally {
      setSavingUpdate(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Announcement',
      message: 'Are you sure you want to delete this announcement?',
      onConfirm: async () => {
        try {
          await announcementsService.deleteAnnouncement(id);
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Announcement deleted successfully', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to delete announcement', 'error');
        }
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Header action */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex justify-end bg-zinc-50/50 dark:bg-black/20">
        <button
          onClick={handleOpenCreate}
          className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm transform hover:-translate-y-0.5 duration-200 cursor-pointer"
        >
          + Create Announcement
        </button>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading announcements...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">No announcements found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Title</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Category</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Published Date</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">{item.title}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-bold text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white mb-6">
              {editingUpdate ? 'Edit Announcement' : 'Create Announcement'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Title</label>
                <input
                  type="text"
                  required
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Announcement title"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Category</label>
                  <select
                    required
                    value={updateForm.category}
                    onChange={(e) => setUpdateForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white cursor-pointer"
                  >
                    <option value="PRODUCT UPDATE">Product Update</option>
                    <option value="INTEGRATION">Integration</option>
                    <option value="NEW FEATURE">New Feature</option>
                    <option value="GUIDE">Guide</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Publish Date</label>
                  <input
                    type="date"
                    required
                    value={updateForm.publishedAt}
                    onChange={(e) => setUpdateForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Excerpt / Brief Description</label>
                <textarea
                  required
                  rows={2}
                  value={updateForm.excerpt}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Short summary displayed on list card..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Detail Content (Optional)</label>
                <textarea
                  rows={4}
                  value={updateForm.content}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Full announcement content..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Featured Image</label>
                <div className="flex flex-col gap-3">
                  {imagePreviewUrl && (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 group">
                      <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span className="text-white text-xs font-semibold">Uploading...</span>
                        </div>
                      )}
                      {!uploadingImage && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="bg-white/90 text-zinc-800 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                          >
                            Change Image
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreviewUrl(null);
                              setUpdateForm((prev) => ({ ...prev, featuredImage: '' }));
                            }}
                            className="bg-red-600/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {!imagePreviewUrl && (
                    <div
                      className="relative flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors cursor-pointer group"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <svg className="w-8 h-8 text-zinc-400 mb-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        Click to upload image
                      </span>
                      <span className="text-[10px] text-zinc-400 mt-1">PNG, JPG, WEBP up to 10MB</span>
                    </div>
                  )}

                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </div>
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
                  disabled={savingUpdate}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {savingUpdate ? 'Saving...' : editingUpdate ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
