"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils/format-number";
import { ChevronRight, Info, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface StockFinancialsProps {
  symbol: string;
}

interface FinancialData {
  change7d: number;
  change1m: number;
  changeYtd: number;
  change1y: number;
  avgVolume10d: number;
  beta5y: number;
  peTtm: number;
  pbFq: number;
  evEbitda: number;
  dividendYield: number | null;
  hasIntrinsicValue: boolean;
}

export function StockFinancials({ symbol }: StockFinancialsProps) {
  const getDefaultFinancialData = (stockSymbol: string): FinancialData => {
    if (stockSymbol === "VIC") {
      return {
        change7d: 12.50,
        change1m: 34.21,
        changeYtd: 88.66,
        change1y: 68.50,
        avgVolume10d: 10062320,
        beta5y: 0.8,
        peTtm: 26.72,
        pbFq: 2.03,
        evEbitda: 7.1,
        dividendYield: null,
        hasIntrinsicValue: true
      };
    }
    
    return {
      change7d: 5.32,
      change1m: 15.67,
      changeYtd: 22.45,
      change1y: 30.18,
      avgVolume10d: 5250000,
      beta5y: 1.2,
      peTtm: 15.8,
      pbFq: 1.75,
      evEbitda: 8.5,
      dividendYield: 2.5,
      hasIntrinsicValue: false
    };
  };
  
  const [financialData, setFinancialData] = useState<FinancialData>(() => 
    getDefaultFinancialData(symbol)
  );
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setFinancialData(getDefaultFinancialData(symbol));
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [symbol]);

  const renderPercentageChange = (value: number) => {
    const isPositive = value > 0;
    const color = isPositive ? "text-green-500" : "text-red-500";
    
    return (
      <span className={`font-medium ${color}`}>
        {isPositive && "+"}{formatPercent(value)}
      </span>
    );
  };

  return (
    <Card className="border-0 bg-background shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-3">
          Tài chính của {symbol}
        </h2>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Lịch sử giá
          </span>
          <Link 
            href={`/stock/${symbol}/history`}
            className="text-sm text-blue-500 flex items-center hover:underline"
          >
            Xem lịch sử giá <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">% 7D</span>
            {isLoading ? (
              <span className="h-5 w-16 animate-pulse bg-muted rounded"></span>
            ) : renderPercentageChange(financialData.change7d)}
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">% 1M</span>
            {isLoading ? (
              <span className="h-5 w-16 animate-pulse bg-muted rounded"></span>
            ) : renderPercentageChange(financialData.change1m)}
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">% YTD</span>
            {isLoading ? (
              <span className="h-5 w-16 animate-pulse bg-muted rounded"></span>
            ) : renderPercentageChange(financialData.changeYtd)}
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">% 1Y</span>
            {isLoading ? (
              <span className="h-5 w-16 animate-pulse bg-muted rounded"></span>
            ) : renderPercentageChange(financialData.change1y)}
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">Khối lượng giao dịch TB 10 phiên</span>
            <span className="font-medium">{formatNumber(financialData.avgVolume10d, 0)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">Beta 5 năm</span>
            <span className="font-medium">{financialData.beta5y.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="text-base font-semibold mb-2">Định giá</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">P/E (TTM)</span>
            <span className="font-medium">{financialData.peTtm.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">P/B (FQ)</span>
            <span className="font-medium">{financialData.pbFq.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">EV/EBITDA</span>
            <span className="font-medium">{financialData.evEbitda.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <span className="text-sm">Tỷ suất cổ tức</span>
            <span className="font-medium">
              {financialData.dividendYield ? `${financialData.dividendYield}%` : "-"}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800">
            <div className="flex items-center gap-1">
              <span className="text-sm">Giá trị nội tại</span>
              <span className="text-muted-foreground cursor-help" title="Giá trị nội tại được tính toán dựa trên mô hình định giá">
                <Info className="h-3 w-3" />
              </span>
            </div>
            {financialData.hasIntrinsicValue ? (
              <span className="inline-flex items-center text-amber-500">
                <Lock className="h-4 w-4" />
              </span>
            ) : (
              <span className="font-medium">-</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/stock/${symbol}/financials`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center text-sm"
        >
          Xem chi tiết
        </Link>
      </CardFooter>
    </Card>
  );
} 