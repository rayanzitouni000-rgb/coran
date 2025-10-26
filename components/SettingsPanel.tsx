"use client";

import { useState } from "react";

interface SettingsPanelProps {
  onClose: () => void;
  onOpenSura: () => void;
  onOpenJuz: () => void;
  onOpenHizb: () => void;
  onOpenSearch: () => void;
  onTogglePlayNextSura?: (enabled: boolean) => void;
  playNextSura?: boolean;
  reminderEnabled?: boolean;
  onToggleReminder?: (enabled: boolean) => void;
}

export default function SettingsPanel({
  onClose,
  onOpenSura,
  onOpenJuz,
  onOpenHizb,
  onOpenSearch,
  onTogglePlayNextSura,
  playNextSura = false,
  reminderEnabled = false,
  onToggleReminder,
}: SettingsPanelProps) {
  const [tajwidLevel, setTajwidLevel] = useState(50);

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/50">
      <div className="mt-8 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-amber-800 px-5 py-4 text-white">
          <h2 className="text-xl font-bold">Réglages</h2>
          <button onClick={onClose} className="text-white/90 hover:text-white">Terminé</button>
        </div>

        {/* Navigation */}
        <Section title="Navigation">
          <MenuButton label="Sourate" onClick={onOpenSura} />
          <MenuButton label="Juzz" onClick={onOpenJuz} />
          <MenuButton label="Hizb" onClick={onOpenHizb} />
          <MenuButton label="Recherche" onClick={onOpenSearch} />
        </Section>

        {/* Audio */}
        <Section title="Audio">
          <MenuButton label="Récitateurs" />
          <MenuButton label="Traduction audio" />
          {/* Pas de téléchargement comme demandé */}
          <ToggleRow
            label="Lire la sourate suivante"
            enabled={playNextSura}
            onToggle={(v) => onTogglePlayNextSura?.(v)}
          />
        </Section>

        {/* Other */}
        <Section title="Autres">
          <LabeledSlider
            label="Taille police (arabe)"
            value={tajwidLevel}
            onChange={setTajwidLevel}
          />
          <ToggleRow
            label="Rappel"
            enabled={reminderEnabled}
            onToggle={(v) => onToggleReminder?.(v)}
          />
        </Section>

        {/* Restore */}
        <Section title="Restauration">
          <MenuButton label="Réinitialiser" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-amber-800/90 px-5 py-2 text-white font-semibold">{title}</div>
      <div className="divide-y divide-amber-100">
        {children}
      </div>
    </div>
  );
}

function MenuButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-5 py-4 text-right hover:bg-amber-50"
    >
      <span className="text-amber-900 font-medium">{label}</span>
      <svg className="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function ToggleRow({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="text-amber-900 font-medium">{label}</span>
      <button
        onClick={() => onToggle(!enabled)}
        className={`relative h-7 w-12 rounded-full transition-colors ${enabled ? 'bg-amber-700' : 'bg-amber-200'}`}
        aria-pressed={enabled}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : ''}`}
        />
      </button>
    </div>
  );
}

function LabeledSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="px-5 py-4">
      <div className="mb-3 text-amber-900 font-medium">{label}</div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-amber-700"
      />
    </div>
  );
}
