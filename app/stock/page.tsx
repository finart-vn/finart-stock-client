'use client'; // Required for Chart.js interaction

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { StockTable } from '@/components/stock/StockTable';
import { SearchBar } from '@/components/stock/SearchBar';
import { Filters } from '@/components/stock/Filters';
import { StockChart } from '@/components/stock/StockChart';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function StockPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-xl font-bold">FinArt Stock</div>
          <SearchBar />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <StockChart />
            <StockTable />
          </div>
          <div className="lg:col-span-1">
            <Filters />
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; 2023 FinArt Stock. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 