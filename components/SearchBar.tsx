'use client';

export default function SearchBar({ sourates, onNavigate }: any) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3">
      <input type="text" placeholder="البحث..." className="flex-1 outline-none" />
    </div>
  );
}
