'use client';

import { useState, useEffect } from 'react';
import Reader from '@/components/Reader';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import SettingsPanel from '@/components/SettingsPanel';
import mushafData from '@/data/index.json';

type Tab = 'sourates' | 'juzz' | 'hizb';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('sourates');
  const [playNextSura, setPlayNextSura] = useState(false);
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage) {
      const pageNum = parseInt(lastPage);
      if (pageNum >= 1 && pageNum <= 604) {
        setCurrentPage(pageNum);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lastPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === 'ArrowLeft' && currentPage < 604) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sourates = mushafData.sourates || [];
  const juzz = mushafData.juzz || [];
  const hizb = mushafData.hizb || [];

  return (
    <div className="flex h-screen overflow-hidden bg-amber-50" dir="rtl">
      {/* Sidebar coulissante */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-80 max-w-[85vw] transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar
          sourates={sourates}
          juzz={juzz}
          hizb={hizb}
          onNavigate={(p) => { handlePageChange(p); setShowSidebar(false); }}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/90 backdrop-blur shadow-sm px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Bouton menu (desktop et mobile) */}
              <button
                onClick={() => setShowSidebar(true)}
                className="p-2 rounded-lg hover:bg-amber-100"
                aria-label="Afficher sections"
              >
                <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Barre de recherche (masquée sur très petit écran) */}
              <div className="hidden xs:block w-full max-w-md">
                <SearchBar sourates={sourates} onNavigate={handlePageChange} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg hover:bg-amber-100"
                aria-label="Réglages"
              >
                <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.98.596 2.146.06 2.573-1.066z" />
                </svg>
              </button>
              <div className="text-right">
                <h1 className="text-xl sm:text-2xl font-bold text-amber-900">المصحف الشريف</h1>
                <p className="hidden sm:block text-sm text-amber-600">Mushaf Interactif</p>
              </div>
              <a href="/verses" className="ml-2 rounded-lg bg-amber-600 px-3 py-2 text-white hover:bg-amber-700">Versets</a>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <Reader currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>

      {/* Overlay pour fermer la sidebar */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Bouton flottant "+ Afficher sections" (visible quand sidebar fermée) */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed bottom-24 right-4 z-20 flex items-center gap-2 rounded-full bg-amber-700 px-4 py-3 text-white shadow-xl hover:bg-amber-800 active:scale-95"
          aria-label="Afficher sections"
        >
          <span className="hidden sm:inline">Afficher sections</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}

      {showSettings && (
        <SettingsPanel
          onClose={() => setShowSettings(false)}
          onOpenSura={() => { setActiveTab('sourates'); setShowSidebar(true); setShowSettings(false); }}
          onOpenJuz={() => { setActiveTab('juzz'); setShowSidebar(true); setShowSettings(false); }}
          onOpenHizb={() => { setActiveTab('hizb'); setShowSidebar(true); setShowSettings(false); }}
          onOpenSearch={() => { setShowSettings(false); }}
          playNextSura={playNextSura}
          onTogglePlayNextSura={setPlayNextSura}
          reminderEnabled={reminder}
          onToggleReminder={setReminder}
        />
      )}
    </div>
  );
}
