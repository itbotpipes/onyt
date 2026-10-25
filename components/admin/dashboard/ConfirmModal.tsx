'use client';

import React from 'react';

export interface ConfirmModalData {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

interface ConfirmModalProps {
  modal: ConfirmModalData | null;
  onClose: () => void;
}

export default function ConfirmModal({ modal, onClose }: ConfirmModalProps) {
  if (!modal || !modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl z-10 animate-scale-in">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white mb-2">
          {modal.title}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          {modal.message}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 font-bold text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              modal.onConfirm();
              onClose();
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-full text-xs font-bold transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
