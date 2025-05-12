"use client";

import { formatNumber, formatPercent } from "@/lib/utils/format-number";
import { useState, useEffect } from "react";

interface StockMarketDepthProps {
  symbol: string;
}

interface PriceLevel {
  price: number;
  volume: number;
  percentage: number;
  isBuySide: boolean;
}

export function StockMarketDepth({ symbol }: StockMarketDepthProps) {
  const getDefaultPriceLevels = (stockSymbol: string): PriceLevel[] => {
    if (stockSymbol === "VIC") {
      return [
        { price: 78500, volume: 42500, percentage: 2.40, isBuySide: false },
        { price: 78400, volume: 297200, percentage: 16.81, isBuySide: false },
        { price: 78300, volume: 112200, percentage: 6.35, isBuySide: false },
        { price: 78200, volume: 25200, percentage: 1.43, isBuySide: false },
        { price: 78100, volume: 19500, percentage: 1.10, isBuySide: false },
        { price: 78000, volume: 391100, percentage: 22.13, isBuySide: false },
        { price: 77900, volume: 107700, percentage: 6.09, isBuySide: false },
        { price: 77800, volume: 188500, percentage: 10.66, isBuySide: false },
        { price: 77700, volume: 97700, percentage: 5.53, isBuySide: false },
        { price: 77600, volume: 62500, percentage: 3.54, isBuySide: true },
        { price: 77500, volume: 153700, percentage: 8.70, isBuySide: true },
        { price: 77400, volume: 36700, percentage: 2.08, isBuySide: true },
        { price: 77300, volume: 60800, percentage: 3.44, isBuySide: true },
        { price: 77200, volume: 67000, percentage: 3.79, isBuySide: true },
        { price: 77100, volume: 105200, percentage: 5.95, isBuySide: true }
      ];
    }
    
    // Default data for other symbols
    return [
      { price: 51000, volume: 12500, percentage: 3.40, isBuySide: false },
      { price: 50900, volume: 18200, percentage: 5.81, isBuySide: false },
      { price: 50800, volume: 22200, percentage: 7.35, isBuySide: false },
      { price: 50700, volume: 15200, percentage: 5.43, isBuySide: false },
      { price: 50600, volume: 9500, percentage: 3.10, isBuySide: false },
      { price: 50500, volume: 31100, percentage: 10.13, isBuySide: false },
      { price: 50400, volume: 17700, percentage: 5.09, isBuySide: false },
      { price: 50300, volume: 18500, percentage: 6.66, isBuySide: false },
      { price: 50200, volume: 27700, percentage: 8.53, isBuySide: false },
      { price: 50100, volume: 22500, percentage: 7.54, isBuySide: true },
      { price: 50000, volume: 33700, percentage: 12.70, isBuySide: true },
      { price: 49900, volume: 16700, percentage: 6.08, isBuySide: true },
      { price: 49800, volume: 20800, percentage: 7.44, isBuySide: true },
      { price: 49700, volume: 17000, percentage: 6.79, isBuySide: true },
      { price: 49600, volume: 15200, percentage: 4.95, isBuySide: true }
    ];
  };
  
  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>(() => 
    getDefaultPriceLevels(symbol)
  );
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setPriceLevels(getDefaultPriceLevels(symbol));
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [symbol]);

  // Find the current price (theoretically the middle index where buy and sell sides meet)
  const currentPriceIndex = priceLevels.findIndex(level => !level.isBuySide) - 1;
  const currentPrice = currentPriceIndex >= 0 ? priceLevels[currentPriceIndex].price : priceLevels[0].price;

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="h-6 bg-muted animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-12 text-xs text-muted-foreground mb-2">
        <div className="col-span-3 text-center">Khối lượng</div>
        <div className="col-span-2 text-center">%</div>
        <div className="col-span-4 text-center">Giá</div>
        <div className="col-span-3 text-center">Khối lượng</div>
      </div>
      
      <div className="space-y-0.5">
        {priceLevels.map((level, index) => {
          const isCurrentPrice = level.price === currentPrice;
          const barWidth = Math.min(100, Math.max(5, level.percentage * 1.8)); // Scale percentage for visual appeal
          
          return (
            <div key={index} className={`grid grid-cols-12 items-center h-7 text-xs ${isCurrentPrice ? 'bg-primary/10' : ''}`}>
              {/* For sell side (above current price) */}
              {!level.isBuySide && (
                <>
                  <div className="col-span-3 text-right pr-1">{formatNumber(level.volume, 0)}</div>
                  <div className="col-span-2 text-center">{formatPercent(level.percentage / 100)}</div>
                  <div className="col-span-4 relative">
                    <div className="absolute h-full right-0 bg-red-500/20" style={{ width: `${barWidth}%` }}></div>
                    <div className="relative z-10 text-center font-medium">{formatNumber(level.price, 0)}</div>
                  </div>
                  <div className="col-span-3"></div>
                </>
              )}
              
              {/* For buy side (below current price) */}
              {level.isBuySide && (
                <>
                  <div className="col-span-3"></div>
                  <div className="col-span-4 relative">
                    <div className="absolute h-full left-0 bg-green-500/20" style={{ width: `${barWidth}%` }}></div>
                    <div className="relative z-10 text-center font-medium">{formatNumber(level.price, 0)}</div>
                  </div>
                  <div className="col-span-2 text-center">{formatPercent(level.percentage / 100)}</div>
                  <div className="col-span-3 text-left pl-1">{formatNumber(level.volume, 0)}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 