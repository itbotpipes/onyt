'use client';

import React, { useState, useEffect } from 'react';
import { leadsService } from '@/services/leads.service';
import { ConfirmModalData } from '../ConfirmModal';

interface LeadsTabProps {
  type: 'leads' | 'contacts';
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function LeadsTab({ type, showToast, setConfirmModal }: LeadsTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Editing state
  const [editingLead, setEditingLead] = useState<any>(null);
  const [leadForm, setLeadForm] = useState({ status: '', lastContactedDate: '', callNotes: '' });
  const [savingLead, setSavingLead] = useState(false);

  const loadData = async (clearFilters = false) => {
    setLoading(true);
    try {
      if (type === 'leads') {
        const rawDocs = await leadsService.getDemoRequests();
        const filtered = rawDocs.filter((item: any) => {
          if (!clearFilters && statusFilter && item.status !== statusFilter) return false;
          if (!clearFilters && startDate && new Date(item.createdAt) < new Date(startDate)) return false;
          if (!clearFilters && endDate && new Date(item.createdAt) > new Date(endDate + 'T23:59:59')) return false;
          if (!clearFilters && search) {
            const searchLower = search.toLowerCase();
            const servicesStr = Array.isArray(item.lookingFor || item.services)
              ? (item.lookingFor || item.services).join(' ').toLowerCase()
              : String(item.lookingFor || item.services || '').toLowerCase();
            return (
              item.name?.toLowerCase().includes(searchLower) ||
              item.email?.toLowerCase().includes(searchLower) ||
              item.phone?.toLowerCase().includes(searchLower) ||
              (item.companyName || item.businessName)?.toLowerCase().includes(searchLower) ||
              servicesStr.includes(searchLower)
            );
          }
          return true;
        });
        setData(filtered);
      } else {
        const rawDocs = await leadsService.getContactMessages();
        const filtered = rawDocs.filter((item: any) => {
          if (!clearFilters && statusFilter && item.status !== statusFilter) return false;
          if (!clearFilters && startDate && new Date(item.createdAt) < new Date(startDate)) return false;
          if (!clearFilters && endDate && new Date(item.createdAt) > new Date(endDate + 'T23:59:59')) return false;
          if (!clearFilters && search) {
            const searchLower = search.toLowerCase();
            const servicesStr = Array.isArray(item.services)
              ? item.services.join(' ').toLowerCase()
              : String(item.services || '').toLowerCase();
            return (
              item.name?.toLowerCase().includes(searchLower) ||
              item.email?.toLowerCase().includes(searchLower) ||
              item.phone?.toLowerCase().includes(searchLower) ||
              item.message?.toLowerCase().includes(searchLower) ||
              servicesStr.includes(searchLower)
            );
          }
          return true;
        });
        setData(filtered);
      }
    } catch (err: any) {
      console.error(err);
      showToast('Failed to load records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [type]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setStartDate('');
    setEndDate('');
    loadData(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingLead(item);
    setLeadForm({
      status: item.status || 'New',
      lastContactedDate: item.lastContactedDate ? new Date(item.lastContactedDate).toISOString().slice(0, 16) : '',
      callNotes: item.callNotes || ''
    });
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    setSavingLead(true);
    try {
      const parsedDate = leadForm.lastContactedDate ? new Date(leadForm.lastContactedDate) : null;
      const updates = {
        status: leadForm.status,
        lastContactedDate: parsedDate,
        callNotes: leadForm.callNotes || ''
      };

      if (type === 'leads') {
        await leadsService.updateDemoRequest(editingLead._id, updates);
      } else {
        await leadsService.updateContactMessage(editingLead._id, updates);
      }

      const updatedDoc = {
        ...editingLead,
        status: updates.status,
        lastContactedDate: parsedDate ? parsedDate.toISOString() : null,
        callNotes: updates.callNotes,
        updatedAt: new Date().toISOString()
      };

      setData((prev) => prev.map((item) => (item._id === editingLead._id ? updatedDoc : item)));
      setEditingLead(null);
      showToast('Record saved successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to update record', 'error');
    } finally {
      setSavingLead(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const foundItem = data.find((item) => item._id === id);
      if (!foundItem) return;

      const parsedDate = foundItem.lastContactedDate ? new Date(foundItem.lastContactedDate) : null;
      const updates = {
        status: newStatus,
        lastContactedDate: parsedDate,
        callNotes: foundItem.callNotes || ''
      };

      if (type === 'leads') {
        await leadsService.updateDemoRequest(id, updates);
      } else {
        await leadsService.updateContactMessage(id, updates);
      }

      setData((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item))
      );
      showToast('Status updated successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: type === 'leads' ? 'Delete Scan Request' : 'Delete Contact Message',
      message: 'Are you sure you want to permanently delete this entry? This action cannot be undone.',
      onConfirm: async () => {
        try {
          if (type === 'leads') {
            await leadsService.deleteDemoRequest(id);
          } else {
            await leadsService.deleteContactMessage(id);
          }
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Entry deleted successfully!', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to delete entry', 'error');
        }
      }
    });
  };

  const handleClearAll = () => {
    setConfirmModal({
      isOpen: true,
      title: type === 'leads' ? 'Clear All Scan Requests' : 'Clear All Contact Messages',
      message: 'Are you sure you want to permanently delete all previous entries? This action cannot be undone.',
      onConfirm: async () => {
        try {
          if (type === 'leads') {
            await leadsService.clearAllDemoRequests();
          } else {
            await leadsService.clearAllContactMessages();
          }
          setData([]);
          showToast('All previous entries deleted successfully!', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to clear entries', 'error');
        }
      }
    });
  };

  const handleExportCSV = () => {
    try {
      const headers = type === 'leads'
        ? ['Name', 'Phone', 'Email', 'Company Name', 'Looking For', 'Status', 'Created At', 'Last Contacted', 'Call Notes']
        : ['Name', 'Phone', 'Email', 'Services', 'Status', 'Message', 'Created At', 'Last Contacted', 'Call Notes'];

      const rows = data.map((item: any) => {
        const servicesStr = Array.isArray(item.lookingFor || item.services)
          ? (item.lookingFor || item.services).join('; ')
          : (item.lookingFor || item.services || '');
        const base = [
          `"${(item.name || '').replace(/"/g, '""')}"`,
          `"${(item.phone || '').replace(/"/g, '""')}"`,
          `"${(item.email || '').replace(/"/g, '""')}"`,
        ];
        if (type === 'leads') {
          base.push(
            `"${(item.companyName || item.businessName || '').replace(/"/g, '""')}"`,
            `"${servicesStr.replace(/"/g, '""')}"`,
            `"${(item.status || '').replace(/"/g, '""')}"`
          );
        } else {
          base.push(
            `"${servicesStr.replace(/"/g, '""')}"`,
            `"${(item.status || '').replace(/"/g, '""')}"`,
            `"${(item.message || '').replace(/"/g, '""')}"`
          );
        }
        base.push(
          `"${item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}"`,
          `"${item.lastContactedDate ? new Date(item.lastContactedDate).toLocaleString() : ''}"`,
          `"${(item.callNotes || '').replace(/"/g, '""')}"`
        );
        return base.join(',');
      });

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${type}_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Export failed', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Search & Action Bar */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/20">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-auto flex-1">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, phone, company, or services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Qualified">Qualified</option>
              <option value="Closed">Closed</option>
              <option value="Lost">Lost</option>
              <option value="Not Interested">Not Interested</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 mb-1">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
          <div className="w-full sm:w-auto flex gap-2">
            <button
              type="submit"
              className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="bg-emerald-600 hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Clear All Previous Entries
            </button>
            {(search || statusFilter || startDate || endDate) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading {type === 'leads' ? 'scan requests' : 'contact messages'}...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">
          No {type === 'leads' ? 'scan requests' : 'contact messages'} found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Name</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Email</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Phone</th>
                {type === 'leads' && (
                  <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Company</th>
                )}
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
                  {type === 'leads' ? 'Looking For' : 'Services'}
                </th>
                {type === 'contacts' && (
                  <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Message</th>
                )}
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Status</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Date</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">{item.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{item.email || 'N/A'}</td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{item.phone || 'N/A'}</td>
                  {type === 'leads' && (
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{item.companyName || item.businessName || '—'}</td>
                  )}
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 max-w-[200px] truncate">
                    {Array.isArray(item.lookingFor || item.services)
                      ? (item.lookingFor || item.services).join(', ')
                      : (item.lookingFor || item.services || '—')}
                  </td>
                  {type === 'contacts' && (
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400 max-w-[220px] truncate">
                      {item.message || '—'}
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <select
                      value={item.status || 'New'}
                      onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                      className="px-2 py-1 text-[11px] font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Closed">Closed</option>
                      <option value="Lost">Lost</option>
                      <option value="Not Interested">Not Interested</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-zinc-500 whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-bold text-xs"
                    >
                      Details
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

      {/* Edit / Details Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-xl shadow-2xl animate-scale-up">
            <h3 className="text-xl font-bold mb-4 text-[#111111] dark:text-white">
              {type === 'leads' ? 'Scan Request' : 'Contact Message'} Details
            </h3>

            {/* Readonly Info Section */}
            <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Name</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{editingLead.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Email</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{editingLead.email}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Phone</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{editingLead.phone}</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Submitted</span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {new Date(editingLead.createdAt).toLocaleString()}
                  </span>
                </div>
                {(editingLead.companyName || editingLead.businessName) && (
                  <div>
                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Company Name</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{editingLead.companyName || editingLead.businessName}</span>
                  </div>
                )}
                {(editingLead.services || editingLead.lookingFor) && (
                  <div className="col-span-2">
                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Looking For / Services</span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {Array.isArray(editingLead.lookingFor || editingLead.services)
                        ? (editingLead.lookingFor || editingLead.services).join(', ')
                        : (editingLead.lookingFor || editingLead.services)}
                    </span>
                  </div>
                )}
                {editingLead.message && (
                  <div className="col-span-2">
                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider block">Message</span>
                    <span className="font-medium text-zinc-900 dark:text-white">{editingLead.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Editable Form Section */}
            <form onSubmit={handleSaveLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Status</label>
                  <select
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Closed">Closed</option>
                    <option value="Lost">Lost</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Last Contacted</label>
                  <input
                    type="datetime-local"
                    value={leadForm.lastContactedDate}
                    onChange={(e) => setLeadForm({ ...leadForm, lastContactedDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">Call Notes / Updates</label>
                <textarea
                  rows={4}
                  value={leadForm.callNotes}
                  onChange={(e) => setLeadForm({ ...leadForm, callNotes: e.target.value })}
                  placeholder="Enter details from the call..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white font-normal resize-y"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="flex-1 px-4 py-2.5 font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={savingLead}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {savingLead ? 'Saving...' : 'Save Updates'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
