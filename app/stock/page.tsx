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
      <MarketActivity/>
      <StockMarketTable />
    </div>
  );
}
