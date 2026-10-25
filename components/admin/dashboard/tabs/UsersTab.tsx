'use client';

import React, { useState, useEffect } from 'react';
import { usersService } from '@/services/users.service';
import { rolesService } from '@/services/roles.service';
import { ConfirmModalData } from '../ConfirmModal';

interface UsersTabProps {
  type: 'users' | 'admins';
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  setConfirmModal: (modal: ConfirmModalData | null) => void;
}

export default function UsersTab({ type, showToast, setConfirmModal }: UsersTabProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);

  // Create User Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', roleId: '' });
  const [creatingUser, setCreatingUser] = useState(false);

  // Edit User Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', roleId: '', password: '' });
  const [savingUser, setSavingUser] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [users, rolesList] = await Promise.all([
        usersService.getUsers(type === 'users' ? ['User'] : ['Admin', 'Editor']),
        rolesService.getRoles()
      ]);
      setData(users || []);
      setRoles(rolesList || []);
      if (rolesList && rolesList.length > 0 && !newUser.roleId) {
        setNewUser((prev) => ({ ...prev, roleId: rolesList[0]._id }));
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to load user accounts', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [type]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const created = await usersService.createUser(newUser);
      setData((prev) => [created, ...prev]);
      setShowCreateModal(false);
      setNewUser({ name: '', email: '', password: '', roleId: roles[0]?._id || '' });
      showToast('Admin created successfully', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to create user', 'error');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleOpenEdit = (user: any) => {
    setEditingUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      roleId: user.roleId?._id || user.roleId || '',
      password: ''
    });
    setShowEditModal(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSavingUser(true);
    try {
      const payload: any = {
        name: editForm.name,
        roleId: editForm.roleId
      };
      if (editForm.password) {
        payload.password = editForm.password;
      }
      const updated = await usersService.updateUser(editingUser._id, payload);
      setData((prev) => prev.map((item) => (item._id === editingUser._id ? updated : item)));
      setShowEditModal(false);
      showToast('User profile updated successfully', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to update user profile', 'error');
    } finally {
      setSavingUser(false);
    }
  };

  const handleDeleteUser = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Deactivate User',
      message: 'Are you sure you want to deactivate this account? They will lose access to the application.',
      onConfirm: async () => {
        try {
          const updated = await usersService.deleteUser(id);
          setData((prev) => prev.map((item) => (item._id === id ? updated : item)));
          showToast('User deactivated successfully!', 'success');
        } catch (err: any) {
          console.error(err);
          showToast(err.message || 'Failed to deactivate user', 'error');
        }
      }
    });
  };

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl shadow-sm overflow-hidden">
      {/* Header action */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-black/20">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {type === 'admins'
            ? 'Admin & staff accounts with panel access'
            : 'Public users who signed up via the blog comments section'}
        </p>
        {type === 'admins' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm transform hover:-translate-y-0.5 duration-200 cursor-pointer"
          >
            + Create New Admin
          </button>
        )}
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-3"></div>
          Loading accounts...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-xs">No accounts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/10">
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Name</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Email</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Role</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">Status</th>
                <th className="py-3 px-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-xs">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-white">{item.name}</td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{item.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.roleId?.name || item.role || 'Staff'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        item.status === 'Active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {item.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-bold text-xs cursor-pointer"
                    >
                      Edit
                    </button>
                    {item.status === 'Active' && (
                      <button
                        onClick={() => handleDeleteUser(item._id)}
                        className="text-red-500 hover:text-red-700 font-bold text-xs cursor-pointer"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white mb-2">Create New Admin</h2>
            <p className="text-xs text-zinc-500 mb-6">Create a staff account with access to the admin panel.</p>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Role</label>
                <select
                  required
                  value={newUser.roleId}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, roleId: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white cursor-pointer"
                >
                  <option value="" disabled>Select Role</option>
                  {roles.filter((role) => role.name !== 'User').map((role) => (
                    <option key={role._id} value={role._id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 font-bold text-sm text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 rounded-full text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {creatingUser ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 animate-scale-in">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white mb-2">Edit Account & Reset Password</h2>
            <p className="text-xs text-zinc-500 mb-6">Modify user profile info or input a new password to reset it.</p>
            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Reset Password</label>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Optional</span>
                </div>
                <input
                  type="password"
                  minLength={8}
                  value={editForm.password}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Role</label>
                <select
                  required
                  value={editForm.roleId}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, roleId: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[#F8F9FA] dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white cursor-pointer"
                >
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2.5 font-bold text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingUser}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 py-2.5 rounded-full text-xs font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {savingUser ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
