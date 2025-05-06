"use client"; // Required for Chart.js interaction

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import StockMarketTable from "@/components/stock-market-table";
import { MarketActivity } from "@/components/market-activity";
import { Suspense } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockPage() {
  return (
    <div className="flex flex-col min-h-screen gap-4 mt-5 px-4" >
      <h1 className="text-2xl font-bold">Thị trường chứng khoán</h1>
      <MarketActivity/>
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-muted rounded-md">Loading Stock Market Table...</div>}>
        <StockMarketTable />
      </Suspense>
    </div>
  );
}
