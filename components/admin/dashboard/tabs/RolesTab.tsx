'use client';

import React, { useState, useEffect } from 'react';
import { rolesService } from '@/services/roles.service';
import { ConfirmModalData } from '../ConfirmModal';

interface RolesTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

const AVAILABLE_PERMISSIONS = [
  { val: 'manage_solutions', label: 'Manage Solutions' },
  { val: 'manage_blogs', label: 'Manage Announcements & Blogs' },
  { val: 'manage_comments', label: 'Manage Comments' },
  { val: 'manage_leads', label: 'Manage Leads & Demos' },
  { val: 'manage_contacts', label: 'Manage Contacts' },
  { val: 'manage_users', label: 'Manage Users & Roles' },
  { val: '*', label: 'Super Admin (All Access)' }
];

export default function RolesTab({ showToast, setConfirmModal }: RolesTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [roleForm, setRoleForm] = useState({ name: '', permissions: [] as string[] });
  const [savingRole, setSavingRole] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const items = await rolesService.getRoles();
      setData(items || []);
    } catch (err) {
      console.error(err);
      showToast('Failed to load roles', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingRole(null);
    setRoleForm({ name: '', permissions: [] });
    setShowModal(true);
  };

  const handleOpenEdit = (role: any) => {
    setEditingRole(role);
    setRoleForm({
      name: role.name || '',
      permissions: role.permissions || []
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingRole(true);
    try {
      if (editingRole) {
        const updated = await rolesService.updateRole(editingRole._id, roleForm);
        setData((prev) => prev.map((item) => (item._id === editingRole._id ? updated : item)));
        showToast('Role updated successfully', 'success');
      } else {
        const created = await rolesService.createRole(roleForm);
        setData((prev) => [...prev, created]);
        showToast('Role created successfully', 'success');
      }
      setShowModal(false);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to save role', 'error');
    } finally {
      setSavingRole(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Role',
      message: 'Are you sure you want to delete this role?',
      onConfirm: async () => {
        try {
          await rolesService.deleteRole(id);
          setData((prev) => prev.filter((item) => item._id !== id));
          showToast('Role deleted successfully', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to delete role', 'error');
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
          + Create New Role
        </button>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading roles...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">No roles found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Role Name</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Permissions</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">{item.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {(item.permissions || []).map((perm: string) => (
                        <span
                          key={perm}
                          className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                          {perm === '*' ? 'Full Access' : perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-bold text-xs cursor-pointer"
                    >
                      Edit
                    </button>
                    {item.name !== 'Admin' && (
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Role Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scale-up">
            <h3 className="text-xl font-bold mb-4 text-[#111111] dark:text-white">
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Role Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Content Writer"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Permissions</label>
                <div className="space-y-2 max-h-60 overflow-y-auto border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50 dark:bg-zinc-950/20">
                  {AVAILABLE_PERMISSIONS.map((perm) => (
                    <label key={perm.val} className="flex items-center gap-2.5 text-sm font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={roleForm.permissions.includes(perm.val)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          let nextPerms = [...roleForm.permissions];
                          if (checked) {
                            nextPerms.push(perm.val);
                          } else {
                            nextPerms = nextPerms.filter((p) => p !== perm.val);
                          }
                          setRoleForm({ ...roleForm, permissions: nextPerms });
                        }}
                        className="rounded text-zinc-900 dark:text-white focus:ring-zinc-900 dark:focus:ring-zinc-100"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
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
                  disabled={savingRole}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {savingRole ? 'Saving...' : editingRole ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
