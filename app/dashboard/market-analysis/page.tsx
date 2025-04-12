'use client';

import { MarketChart } from "@/components/market-chart";
import { ProposeInvest } from "@/components/ProposeInvest";

export default function MarketAnalysisPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Phân tích thị trường</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketChart />
        </div>
        <div className="lg:col-span-1">
          <ProposeInvest />
        </div>
      </div>
    </div>
  );
} 