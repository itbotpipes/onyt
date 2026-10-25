'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, profile, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user && profile && profile.status === 'Active') {
      window.location.href = '/admin/seo';
    }
  }, [user, profile, authLoading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(email, password);
      window.location.href = '/admin/seo';
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-white transition-colors duration-200">
      <div className="bg-white dark:bg-[#121214] p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/logo.png"
            alt="ONYT Logo"
            width={140}
            height={36}
            className="object-contain h-8 w-auto invert dark:invert-0"
            priority
          />
        </div>

        <h2 className="text-2xl font-extrabold mb-1.5 text-center text-zinc-900 dark:text-white tracking-tight">Welcome back</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-6 font-medium">Sign in to your admin panel</p>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 p-3.5 rounded-xl mb-5 text-sm font-semibold flex items-center gap-2.5">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm"
              required
              placeholder="admin@digitory.io"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold py-3.5 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-md hover:-translate-y-0.5 active:translate-y-0 text-sm cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
