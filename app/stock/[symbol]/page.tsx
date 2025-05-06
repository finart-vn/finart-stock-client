"use client";

import { useParams } from "next/navigation";
import { StockBreadcrumb } from "@/components/stock/StockBreadcrumb";
import { Suspense } from "react";
import { StockDetailHeader } from "@/components/stock/StockDetailHeader";
import { StockDetailChart } from "@/components/stock/StockDetailChart";
import { StockDetailTabs } from "@/components/stock/StockDetailTabs";
import { StockOrderBook } from "@/components/stock/StockOrderBook";

export default function StockDetailPage() {
  const params = useParams<{ symbol: string }>();
  const symbol = params?.symbol as string || "";

  return (
    <div className="flex flex-col gap-4 mt-5 px-4">
      <StockBreadcrumb symbol={symbol} />
      
      <Suspense fallback={<div className="h-20 w-full animate-pulse bg-muted rounded-md"></div>}>
        <StockDetailHeader symbol={symbol} />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Suspense fallback={<div className="h-80 w-full animate-pulse bg-muted rounded-md"></div>}>
            <StockDetailChart symbol={symbol} />
          </Suspense>
          
          <Suspense fallback={<div className="h-80 w-full animate-pulse bg-muted rounded-md"></div>}>
            <StockDetailTabs symbol={symbol} />
          </Suspense>
        </div>
        
        <div className="space-y-4">
          <Suspense fallback={<div className="h-80 w-full animate-pulse bg-muted rounded-md"></div>}>
            <StockOrderBook symbol={symbol} />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 