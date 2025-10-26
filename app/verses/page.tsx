'use client';

import { useState } from 'react';

const SAMPLE_VERSES = [
  'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
  'الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ',
  'الرَّحْمٰنِ الرَّحِيمِ',
  'مَالِكِ يَوْمِ الدِّينِ',
  'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
  'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
  'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
];

export default function VersesPage() {
  const [highlighted, setHighlighted] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setHighlighted((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6" dir="rtl">
      <h1 className="mb-4 text-2xl font-bold text-amber-900">Versets (sélection multiple)</h1>
      <p className="mb-4 text-amber-700">Touchez/cliquez un verset pour le surligner, re‑cliquez pour désactiver. Vous pouvez en surligner plusieurs.</p>

      <div className="space-y-3">
        {SAMPLE_VERSES.map((text, idx) => {
          const active = !!highlighted[idx];
          return (
            <button
              key={idx}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(idx)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(idx); } }}
              className={`w-full cursor-pointer select-none rounded-xl border px-4 py-3 text-right transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                active
                  ? 'bg-yellow-100 border-yellow-200 ring-2 ring-yellow-300'
                  : 'bg-white hover:bg-amber-50 border-amber-200'
              }`}
            >
              <span className="arabic-text text-lg leading-8">{text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
