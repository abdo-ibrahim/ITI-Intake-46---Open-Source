export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <input
        className="w-full border-2 border-gray-200 bg-white h-14 px-6 rounded-2xl text-lg focus:outline-none focus:border-gray-900 transition-colors shadow-sm"
        placeholder="Search for amazing products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
