'use client';

import React from 'react';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  message: ToastMessage | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] max-w-sm w-full animate-slide-in">
      <div
        className={`p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-4 ${
          message.type === 'error'
            ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            : message.type === 'success'
            ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
        }`}
      >
        <span className="text-xs font-bold">{message.text}</span>
        <button
          onClick={onClose}
          className="text-xs font-bold hover:opacity-70 cursor-pointer shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
