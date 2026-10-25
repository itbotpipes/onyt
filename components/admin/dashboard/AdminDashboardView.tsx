'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Toast, { ToastMessage } from '@/components/admin/dashboard/Toast';
import ConfirmModal, { ConfirmModalData } from '@/components/admin/dashboard/ConfirmModal';

import LeadsTab from '@/components/admin/dashboard/tabs/LeadsTab';
import UpdatesTab from '@/components/admin/dashboard/tabs/UpdatesTab';
import BlogsTab from '@/components/admin/dashboard/tabs/BlogsTab';
import SolutionsTab from '@/components/admin/dashboard/tabs/SolutionsTab';
import SolutionsPageTab from '@/components/admin/dashboard/tabs/SolutionsPageTab';
import CommentsTab from '@/components/admin/dashboard/tabs/CommentsTab';
import UsersTab from '@/components/admin/dashboard/tabs/UsersTab';
import RolesTab from '@/components/admin/dashboard/tabs/RolesTab';
import PagesTab from '@/components/admin/dashboard/tabs/PagesTab';

export type AdminTab =
  | 'leads'
  | 'contacts'
  | 'updates'
  | 'blogs'
  | 'solutions'
  | 'solutionsPage'
  | 'comments'
  | 'users'
  | 'admins'
  | 'roles'
  | 'pages';

const VALID_TABS: AdminTab[] = [
  'leads',
  'contacts',
  'updates',
  'blogs',
  'solutions',
  'solutionsPage',
  'comments',
  'users',
  'admins',
  'roles',
  'pages'
];

export default function AdminDashboardView({ activeTabProp }: { activeTabProp?: AdminTab } = {}) {
  const searchParams = useSearchParams();
  const rawTab = activeTabProp || (searchParams?.get('tab') as AdminTab) || 'leads';
  const activeTab: AdminTab = VALID_TABS.includes(rawTab) ? rawTab : 'leads';

  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalData | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    // Verify tab permissions
    const cachedPerms = localStorage.getItem('admin_permissions');
    const cachedRoleName = localStorage.getItem('admin_role_name');
    const isAdmin = cachedRoleName === 'Admin';
    if (cachedPerms && !isAdmin) {
      try {
        const perms: string[] = JSON.parse(cachedPerms);
        if (!perms.includes('*')) {
          const tabPermissions: Record<AdminTab, string> = {
            leads: 'manage_leads',
            contacts: 'manage_contacts',
            updates: 'manage_blogs',
            blogs: 'manage_blogs',
            solutions: 'manage_solutions',
            solutionsPage: 'manage_solutions',
            comments: 'manage_comments',
            users: 'manage_users',
            admins: 'manage_users',
            roles: 'manage_users',
            pages: 'manage_blogs'
          };
          const required = tabPermissions[activeTab];
          if (required && !perms.includes(required)) {
            const allowedTab = (Object.keys(tabPermissions) as AdminTab[]).find((tab) =>
              perms.includes(tabPermissions[tab])
            );
            if (allowedTab) {
              const directSlug =
                allowedTab === 'leads' ? 'leads' : allowedTab === 'contacts' ? 'contacts' : allowedTab;
              window.location.href = `/admin/${directSlug}`;
              return;
            }
          }
        }
      } catch (_) {}
    }
  }, [activeTab]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Monitor your leads, content, and engagement metrics.
          </p>
        </div>
      </div>

      {/* Render Active Tab */}
      {(activeTab === 'leads' || activeTab === 'contacts') && (
        <LeadsTab
          key={activeTab}
          type={activeTab}
          showToast={showToast}
          setConfirmModal={setConfirmModal}
        />
      )}

      {activeTab === 'updates' && (
        <UpdatesTab showToast={showToast} setConfirmModal={setConfirmModal} />
      )}

      {activeTab === 'blogs' && (
        <BlogsTab showToast={showToast} setConfirmModal={setConfirmModal} />
      )}

      {activeTab === 'solutions' && (
        <SolutionsTab showToast={showToast} setConfirmModal={setConfirmModal} />
      )}

      {activeTab === 'solutionsPage' && (
        <SolutionsPageTab showToast={showToast} />
      )}

      {activeTab === 'comments' && (
        <CommentsTab showToast={showToast} setConfirmModal={setConfirmModal} />
      )}

      {(activeTab === 'users' || activeTab === 'admins') && (
        <UsersTab
          key={activeTab}
          type={activeTab}
          showToast={showToast}
          setConfirmModal={setConfirmModal}
        />
      )}

      {activeTab === 'roles' && (
        <RolesTab showToast={showToast} setConfirmModal={setConfirmModal} />
      )}

      {activeTab === 'pages' && (
        <PagesTab showToast={showToast} setConfirmModal={setConfirmModal} />
      )}

      {/* Global Notifications & Confirmation Dialog */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      <ConfirmModal modal={confirmModal} onClose={() => setConfirmModal(null)} />
    </div>
  );
}
