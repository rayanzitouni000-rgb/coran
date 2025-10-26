'use client';

import { useState, useMemo } from 'react';

type Tab = 'sourates' | 'juzz' | 'hizb';

interface Sourate {
  id: number;
  nom: string;
  nom_arabe: string;
  debut_page: number;
  fin_page: number;
}

interface RangeItem { id: number; debut_page: number; fin_page: number }

interface SidebarProps {
  sourates: Sourate[];
  juzz: RangeItem[];
  hizb: RangeItem[];
  onNavigate: (page: number) => void;
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export default function Sidebar({ sourates, juzz, hizb, onNavigate, activeTab, onTabChange }: SidebarProps) {
  const [internalTab, setInternalTab] = useState<Tab>('sourates');
  const currentTab = activeTab ?? internalTab;

  const setTab = (t: Tab) => {
    setInternalTab(t);
    onTabChange?.(t);
  };

  const headerTitle = useMemo(() => {
    if (currentTab === 'sourates') return 'السور';
    if (currentTab === 'juzz') return 'الأجزاء';
    return 'الأحزاب';
  }, [currentTab]);

  return (
    <div className="w-80 bg-amber-50 h-screen overflow-y-auto border-l border-amber-200">
      <div className="p-4 border-b border-amber-200">
        <h2 className="text-2xl font-bold text-right text-amber-900 mb-3">المصحف</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTab('sourates')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentTab === 'sourates' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            Sourates
          </button>
          <button
            onClick={() => setTab('juzz')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentTab === 'juzz' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            Juzz
          </button>
          <button
            onClick={() => setTab('hizb')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentTab === 'hizb' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            Hizb
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-amber-700 font-semibold mb-2 text-right">{headerTitle}</div>
        {currentTab === 'sourates' && (
          <div className="space-y-1">
            {sourates.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.debut_page)}
                className="w-full text-right p-3 rounded-lg hover:bg-amber-100 transition-colors border border-transparent hover:border-amber-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-bold text-amber-900 text-lg">{s.nom_arabe}</div>
                    <div className="text-sm text-amber-600 mt-1">{s.nom}</div>
                    <div className="text-xs text-amber-500 mt-1">Page {s.debut_page} - {s.fin_page}</div>
                  </div>
                  <div className="text-amber-700 font-bold text-xl ml-2">{s.id}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentTab === 'juzz' && (
          <div className="space-y-1">
            {juzz.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.debut_page)}
                className="w-full text-right p-3 rounded-lg hover:bg-amber-100 transition-colors border border-transparent hover:border-amber-200"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-amber-900">Juzz {item.id}</div>
                  <div className="text-sm text-amber-600">{item.debut_page} - {item.fin_page}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentTab === 'hizb' && (
          <div className="space-y-1">
            {hizb.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.debut_page)}
                className="w-full text-right p-3 rounded-lg hover:bg-amber-100 transition-colors border border-transparent hover:border-amber-200"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-amber-900">Hizb {item.id}</div>
                  <div className="text-sm text-amber-600">{item.debut_page} - {item.fin_page}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
