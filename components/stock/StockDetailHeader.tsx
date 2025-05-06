"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils/format-number";
import { ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

interface StockDetailHeaderProps {
  symbol: string;
}

interface StockHeaderData {
  name: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  previousClose: number;
  exchange: string;
}

export function StockDetailHeader({ symbol }: StockDetailHeaderProps) {
  // Create default stock data based on the symbol
  const getDefaultStockData = (stockSymbol: string): StockHeaderData => {
    if (stockSymbol === "VCB") {
      return {
        name: "Ngân hàng TMCP Ngoại Thương Việt Nam",
        price: 57000,
        priceChange: -100,
        priceChangePercent: -0.18,
        previousClose: 57100,
        exchange: "HOSE"
      };
    }
    
    return {
      name: `${stockSymbol} Corporation`,
      price: 50000,
      priceChange: 1000,
      priceChangePercent: 2.0,
      previousClose: 49000,
      exchange: "HOSE"
    };
  };
  
  const [stockData, setStockData] = useState<StockHeaderData>(() => 
    getDefaultStockData(symbol)
  );
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, fetch stock data from API
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      // Update stock data based on symbol
      setStockData(getDefaultStockData(symbol));
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [symbol]);

  const isPositive = stockData.priceChange > 0;
  const isNegative = stockData.priceChange < 0;
  
  const priceChangeColor = isPositive 
    ? "text-green-500" 
    : isNegative 
      ? "text-red-500" 
      : "text-gray-500";

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{symbol}</h1>
              <span className="text-sm text-muted-foreground">({stockData.exchange})</span>
              <button className="p-1.5 rounded-full hover:bg-muted" aria-label="Share">
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{stockData.name}</p>
          </div>
          
          <div className="flex flex-col items-end mt-2 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold">
                {isLoading ? "..." : formatNumber(stockData.price, 0)}
              </span>
              <div className={`flex items-center ${priceChangeColor}`}>
                {isNegative && <ChevronDown className="h-5 w-5" />}
                {isPositive && <ChevronUp className="h-5 w-5" />}
                <span className="text-lg font-medium">
                  {isLoading ? "..." : formatNumber(Math.abs(stockData.priceChange), 0)}
                </span>
              </div>
              <div className={priceChangeColor}>
                <span className="text-lg font-medium">
                  {isLoading ? "..." : formatPercent(stockData.priceChangePercent)}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Linh hoạt tùy chỉnh mọi thông tin bạn cần tất cả trên 1 trang.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 