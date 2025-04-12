import { useState } from 'react';

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
}

const stocks: Stock[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 150.00, change: 1.5 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 2800.00, change: -0.5 },
  // Add more stock data
];

export const StockTable = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Stock; direction: string } | null>(null);

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof Stock) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th onClick={() => requestSort('ticker')} className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ticker
            </th>
            <th onClick={() => requestSort('name')} className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th onClick={() => requestSort('price')} className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th onClick={() => requestSort('change')} className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-200">{stock.ticker}</td>
              <td className="px-6 py-4 border-b border-gray-200">{stock.name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{stock.price}</td>
              <td className="px-6 py-4 border-b border-gray-200">{stock.change}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 