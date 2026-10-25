'use client';

import React, { useState, useEffect } from 'react';
import { solutionsPageService, SolutionsPageData } from '@/services/solutionsPage.service';

interface SolutionsPageTabProps {
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export default function SolutionsPageTab({ showToast }: SolutionsPageTabProps) {
  const [solutionsPageData, setSolutionsPageData] = useState<SolutionsPageData | null>(null);
  const [savingSolutionsPage, setSavingSolutionsPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    solutionsPageService
      .getPageData(true)
      .then((data) => {
        if (data) setSolutionsPageData(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solutionsPageData) return;
    setSavingSolutionsPage(true);
    try {
      await solutionsPageService.savePageData(solutionsPageData);
      showToast('Solutions Page settings updated successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to update page settings', 'error');
    } finally {
      setSavingSolutionsPage(false);
    }
  };

  if (loading || !solutionsPageData) {
    return (
      <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center py-32 text-zinc-400 font-semibold animate-pulse flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full animate-spin mb-4"></div>
          Loading Solutions Page Content...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8 text-left max-w-5xl">
        <div>
          <h2 className="text-xl font-extrabold text-zinc-955 dark:text-white mb-1">Solutions Landing Page Editor</h2>
          <p className="text-xs text-zinc-500">Edit content for all sections on the Solutions Landing Page.</p>
        </div>

        {/* Section 1: Hero */}
        <div className="p-6 bg-zinc-50/50 dark:bg-black/10 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 dark:border-zinc-850 pb-2">
            1. Hero Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Eyebrow Tagline</label>
              <input
                type="text"
                value={solutionsPageData.hero?.eyebrow || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    hero: { ...solutionsPageData.hero, eyebrow: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Hero Main Title</label>
              <input
                type="text"
                value={solutionsPageData.hero?.title || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    hero: { ...solutionsPageData.hero, title: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Hero Description</label>
              <textarea
                rows={3}
                value={solutionsPageData.hero?.desc || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    hero: { ...solutionsPageData.hero, desc: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm text-zinc-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Primary Button CTA Text</label>
                <input
                  type="text"
                  value={solutionsPageData.hero?.ctaPrimaryText || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      hero: { ...solutionsPageData.hero, ctaPrimaryText: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Secondary Button CTA Text</label>
                <input
                  type="text"
                  value={solutionsPageData.hero?.ctaSecondaryText || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      hero: { ...solutionsPageData.hero, ctaSecondaryText: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Connected Ecosystem */}
        <div className="p-6 bg-zinc-50/50 dark:bg-black/10 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 dark:border-zinc-850 pb-2">
            2. Connected Solutions Section
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Badge Label</label>
                <input
                  type="text"
                  value={solutionsPageData.connected?.badge || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      connected: { ...solutionsPageData.connected, badge: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">CTA Text</label>
                <input
                  type="text"
                  value={solutionsPageData.connected?.ctaText || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      connected: { ...solutionsPageData.connected, ctaText: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Title</label>
              <input
                type="text"
                value={solutionsPageData.connected?.title || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    connected: { ...solutionsPageData.connected, title: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Description</label>
              <textarea
                rows={2}
                value={solutionsPageData.connected?.desc || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    connected: { ...solutionsPageData.connected, desc: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase text-zinc-400">Goal Scenarios:</h4>
              <div className="space-y-3">
                {(solutionsPageData.connected?.scenarios || []).map((sc, idx) => (
                  <div
                    key={sc.id || idx}
                    className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">Scenario Title</label>
                        <input
                          type="text"
                          value={sc.title}
                          onChange={(e) => {
                            const newSc = [...(solutionsPageData.connected?.scenarios || [])];
                            newSc[idx] = { ...sc, title: e.target.value };
                            setSolutionsPageData({
                              ...solutionsPageData,
                              connected: { ...solutionsPageData.connected, scenarios: newSc }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">Description</label>
                        <input
                          type="text"
                          value={sc.description}
                          onChange={(e) => {
                            const newSc = [...(solutionsPageData.connected?.scenarios || [])];
                            newSc[idx] = { ...sc, description: e.target.value };
                            setSolutionsPageData({
                              ...solutionsPageData,
                              connected: { ...solutionsPageData.connected, scenarios: newSc }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Our Approach */}
        <div className="p-6 bg-zinc-50/50 dark:bg-black/10 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 dark:border-zinc-850 pb-2">
            3. Our Approach Section
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Badge Label</label>
                <input
                  type="text"
                  value={solutionsPageData.approach?.badge || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      approach: { ...solutionsPageData.approach, badge: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Title</label>
                <input
                  type="text"
                  value={solutionsPageData.approach?.title || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      approach: { ...solutionsPageData.approach, title: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Description</label>
              <textarea
                rows={2}
                value={solutionsPageData.approach?.desc || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    approach: { ...solutionsPageData.approach, desc: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase text-zinc-400">Process Steps (6 Steps):</h4>
              <div className="space-y-3">
                {(solutionsPageData.approach?.steps || []).map((step, idx) => (
                  <div
                    key={step.number || idx}
                    className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">{step.number}</span>
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{step.name}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">Step Name</label>
                        <input
                          type="text"
                          value={step.name}
                          onChange={(e) => {
                            const newSteps = [...(solutionsPageData.approach?.steps || [])];
                            newSteps[idx] = { ...step, name: e.target.value };
                            setSolutionsPageData({
                              ...solutionsPageData,
                              approach: { ...solutionsPageData.approach, steps: newSteps }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">Description</label>
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...(solutionsPageData.approach?.steps || [])];
                            newSteps[idx] = { ...step, description: e.target.value };
                            setSolutionsPageData({
                              ...solutionsPageData,
                              approach: { ...solutionsPageData.approach, steps: newSteps }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Why Quest For Tech */}
        <div className="p-6 bg-zinc-50/50 dark:bg-black/10 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 dark:border-zinc-850 pb-2">
            4. Why Quest For Tech Section
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Badge Label</label>
                <input
                  type="text"
                  value={solutionsPageData.whyUs?.badge || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      whyUs: { ...solutionsPageData.whyUs, badge: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Title</label>
                <input
                  type="text"
                  value={solutionsPageData.whyUs?.title || ''}
                  onChange={(e) =>
                    setSolutionsPageData({
                      ...solutionsPageData,
                      whyUs: { ...solutionsPageData.whyUs, title: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-zinc-650 dark:text-zinc-400">Section Description</label>
              <textarea
                rows={2}
                value={solutionsPageData.whyUs?.desc || ''}
                onChange={(e) =>
                  setSolutionsPageData({
                    ...solutionsPageData,
                    whyUs: { ...solutionsPageData.whyUs, desc: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase text-zinc-400">Pillars & Values (5 Pillars):</h4>
              <div className="space-y-3">
                {(solutionsPageData.whyUs?.pillars || []).map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">Pillar Title</label>
                        <input
                          type="text"
                          value={pillar.title}
                          onChange={(e) => {
                            const newPillars = [...(solutionsPageData.whyUs?.pillars || [])];
                            newPillars[idx] = { ...pillar, title: e.target.value };
                            setSolutionsPageData({
                              ...solutionsPageData,
                              whyUs: { ...solutionsPageData.whyUs, pillars: newPillars }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-950 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-zinc-500 mb-0.5">Description</label>
                        <input
                          type="text"
                          value={pillar.description}
                          onChange={(e) => {
                            const newPillars = [...(solutionsPageData.whyUs?.pillars || [])];
                            newPillars[idx] = { ...pillar, description: e.target.value };
                            setSolutionsPageData({
                              ...solutionsPageData,
                              whyUs: { ...solutionsPageData.whyUs, pillars: newPillars }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs bg-zinc-50 dark:bg-zinc-950"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-150 dark:border-zinc-850 flex justify-end">
          <button
            type="submit"
            disabled={savingSolutionsPage}
            className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all shadow-sm disabled:opacity-60 transform hover:-translate-y-0.5 duration-200 cursor-pointer"
          >
            {savingSolutionsPage ? 'Saving Changes...' : 'Save Solutions Page Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
