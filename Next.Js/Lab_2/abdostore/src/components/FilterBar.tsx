export default function FilterBar({ categories, value, onChange }: { categories: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => onChange("")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${value === "" ? "bg-gray-900 text-white shadow-md" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${value === c ? "bg-gray-900 text-white shadow-md" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
          {c.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
