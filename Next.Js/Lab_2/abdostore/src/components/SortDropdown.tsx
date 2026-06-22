export default function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      className="w-full md:w-auto border border-gray-300 bg-white px-4 py-2.5 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer shadow-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      <option value="">Sort By: Recommended</option>
      <option value="price">Price: Low to High</option>
      <option value="rating">Rating: Highest First</option>
    </select>
  );
}
