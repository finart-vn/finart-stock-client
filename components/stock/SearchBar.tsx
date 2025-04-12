export const SearchBar = () => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search stocks..."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}; 