'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ReaderProps { currentPage: number; onPageChange: (p: number) => void }

export default function Reader({ currentPage, onPageChange }: ReaderProps) {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const pageStr = Math.max(1, Math.min(604, currentPage)).toString().padStart(3, '0');
    const src = `/mushaf/page${pageStr}.png`;
    setLoading(true);
    setImageSrc(src);
  }, [currentPage]);

  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(604, currentPage + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) handlePrev(); else handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="w-full max-w-[900px] px-3 pt-4 pb-28 mx-auto">
        <div className="mb-3 flex justify-center">
          <span className="rounded-full bg-amber-600 px-4 py-1 text-white shadow">Page {currentPage}</span>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white shadow">
          {loading && (
            <div className="aspect-[2/3] w-full animate-pulse bg-amber-100" />
          )}
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={`Page ${currentPage}`}
              width={900}
              height={1350}
              className={`h-auto w-full select-none ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
              priority
              onLoadingComplete={() => setLoading(false)}
            />
          )}
        </div>
      </div>

      {/* Action bar mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-amber-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 px-3 py-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex w-full max-w-[900px] items-center justify-between gap-3 py-3">
          <button onClick={handlePrev} disabled={currentPage === 1} className={`rounded-xl px-4 py-2 font-bold text-white shadow ${currentPage===1?'bg-gray-300':'bg-amber-600 hover:bg-amber-700'}`}>Précédente</button>
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-amber-900 shadow">
            <input
              type="number"
              min={1}
              max={604}
              value={currentPage}
              onChange={(e) => {
                const v = parseInt(e.target.value || '1', 10);
                if (!Number.isNaN(v)) onPageChange(Math.max(1, Math.min(604, v)));
              }}
              className="w-24 appearance-none bg-transparent text-center outline-none"
            />
            <span className="text-sm text-amber-600">/ 604</span>
          </div>
          <button onClick={handleNext} disabled={currentPage === 604} className={`rounded-xl px-4 py-2 font-bold text-white shadow ${currentPage===604?'bg-gray-300':'bg-amber-600 hover:bg-amber-700'}`}>Suivante</button>
        </div>
      </div>
    </div>
  );
}
