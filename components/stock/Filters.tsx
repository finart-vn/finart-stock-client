export const Filters = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sector</label>
          <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <input type="range" className="mt-1 block w-full" />
        </div>
      </div>
    </div>
  );
}; 