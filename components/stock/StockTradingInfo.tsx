"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils/format-number";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { StockMarketDepth } from "./StockMarketDepth";

interface StockTradingInfoProps {
  symbol: string;
}

interface OrderBookEntry {
  price: number;
  buyVolume: number;
  sellVolume: number;
}

interface TradingData {
  orders: OrderBookEntry[];
  totalBuyVolume: number;
  totalSellVolume: number;
  foreignInvestors: {
    buy: {
      volume: number;
      value: number;
    };
    sell: {
      volume: number;
      value: number;
    };
    netBuy: {
      volume: number;
      value: number;
    };
  };
  lastTransactions: {
    type: "buy" | "sell";
    message: string;
    value: number;
  }[];
}

export function StockTradingInfo({ symbol }: StockTradingInfoProps) {
  const getDefaultTradingData = (stockSymbol: string): TradingData => {
    if (stockSymbol === "VIC") {
      return {
        orders: [
          { price: 77700, buyVolume: 1000, sellVolume: 16900 },
          { price: 77600, buyVolume: 1400, sellVolume: 22300 },
          { price: 77500, buyVolume: 6400, sellVolume: 104000 },
          { price: 77500, buyVolume: 0, sellVolume: 0 }, // Current price marker
          { price: 78000, buyVolume: 8600, sellVolume: 143200 }
        ],
        totalBuyVolume: 17400,
        totalSellVolume: 286400,
        foreignInvestors: {
          buy: {
            volume: 611842,
            value: 47000000000 // 47T
          },
          sell: {
            volume: 128549,
            value: 10000000000 // 10T
          },
          netBuy: {
            volume: 483293,
            value: 37000000000 // 37T
          }
        },
        lastTransactions: [
          {
            type: "buy",
            message: "Nhà đầu tư nước ngoài đã mua ròng 24.8 tỷ đồng trong phiên giao dịch gần nhất",
            value: 24800000000
          },
          {
            type: "sell",
            message: "Lũy kế 10 phiên giao dịch gần nhất, nhà đầu tư nước ngoài đã bán ròng 91.5 tỷ đồng",
            value: 91500000000
          }
        ]
      };
    }
    
    // Default data for other symbols
    return {
      orders: [
        { price: 50500, buyVolume: 2000, sellVolume: 5000 },
        { price: 50200, buyVolume: 1800, sellVolume: 3200 },
        { price: 50000, buyVolume: 3500, sellVolume: 8000 },
        { price: 50000, buyVolume: 0, sellVolume: 0 }, // Current price marker
        { price: 49800, buyVolume: 5600, sellVolume: 9500 }
      ],
      totalBuyVolume: 12900,
      totalSellVolume: 25700,
      foreignInvestors: {
        buy: {
          volume: 252000,
          value: 12600000000
        },
        sell: {
          volume: 185000,
          value: 9200000000
        },
        netBuy: {
          volume: 67000,
          value: 3400000000
        }
      },
      lastTransactions: [
        {
          type: "buy",
          message: "Nhà đầu tư nước ngoài đã mua ròng 5.2 tỷ đồng trong phiên giao dịch gần nhất",
          value: 5200000000
        },
        {
          type: "sell",
          message: "Lũy kế 10 phiên giao dịch gần nhất, nhà đầu tư nước ngoài đã bán ròng 15.8 tỷ đồng",
          value: 15800000000
        }
      ]
    };
  };
  
  const [tradingData, setTradingData] = useState<TradingData>(() => 
    getDefaultTradingData(symbol)
  );
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"orderBook" | "depth">("orderBook");

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setTradingData(getDefaultTradingData(symbol));
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [symbol]);

  // Helper to get the maximum volume for bar scaling
  const getMaxVolume = () => {
    const volumes = tradingData.orders.flatMap(order => [order.buyVolume, order.sellVolume]);
    return Math.max(...volumes);
  };

  // Calculate scaling factor for volume bars
  const maxVolume = getMaxVolume();

  // Helper to get percentage width for volume bars
  const getVolumeBarWidth = (volume: number) => {
    if (maxVolume === 0) return 0;
    return (volume / maxVolume) * 100;
  };

  const renderOrderBook = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-muted animate-pulse rounded"></div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <div className="grid grid-cols-12 text-xs text-muted-foreground mb-2">
          <div className="col-span-3">Khối lượng mua</div>
          <div className="col-span-3 text-center">Giá mua</div>
          <div className="col-span-3 text-center">Giá bán</div>
          <div className="col-span-3 text-right">Khối lượng bán</div>
        </div>
        
        {tradingData.orders.map((order, index) => {
          const isCurrent = index === Math.floor(tradingData.orders.length / 2);
          
          // For the current price marker row
          if (isCurrent) {
            return (
              <div 
                key={`price-${index}`} 
                className="grid grid-cols-12 items-center h-10 py-1 relative"
              >
                <div className="col-span-12 flex justify-center items-center">
                  <div className="bg-muted/20 h-0.5 w-full absolute"></div>
                  <div className="bg-amber-500 text-black text-sm px-3 py-0.5 rounded absolute">
                    {formatNumber(order.price, 0)}
                  </div>
                </div>
              </div>
            );
          }
          
          // For buy orders (below current price)
          if (index > Math.floor(tradingData.orders.length / 2)) {
            return (
              <div 
                key={`order-${index}`}
                className="grid grid-cols-12 items-center h-8 text-sm mb-1"
              >
                <div className="col-span-3 relative">
                  <div 
                    className="absolute right-0 h-full bg-green-500/20 rounded-l"
                    style={{ width: `${getVolumeBarWidth(order.buyVolume)}%` }}
                  ></div>
                  <span className="relative z-10 pl-1">{formatNumber(order.buyVolume, 0)}</span>
                </div>
                <div className="col-span-3 text-center text-green-500">{formatNumber(order.price, 0)}</div>
                <div className="col-span-6"></div>
              </div>
            );
          }
          
          // For sell orders (above current price)
          return (
            <div 
              key={`order-${index}`}
              className="grid grid-cols-12 items-center h-8 text-sm mb-1"
            >
              <div className="col-span-6"></div>
              <div className="col-span-3 text-center text-red-500">{formatNumber(order.price, 0)}</div>
              <div className="col-span-3 relative">
                <div 
                  className="absolute left-0 h-full bg-red-500/20 rounded-r"
                  style={{ width: `${getVolumeBarWidth(order.sellVolume)}%` }}
                ></div>
                <span className="relative z-10 pr-1 text-right block">{formatNumber(order.sellVolume, 0)}</span>
              </div>
            </div>
          );
        })}
        
        <div className="grid grid-cols-12 border-t border-gray-800 pt-2 mt-2">
          <div className="col-span-6 text-sm">
            <div>Tổng khối lượng đặt mua</div>
            <div className="font-semibold">{formatNumber(tradingData.totalBuyVolume, 0)}</div>
          </div>
          <div className="col-span-6 text-sm text-right">
            <div>Tổng khối lượng đặt bán</div>
            <div className="font-semibold">{formatNumber(tradingData.totalSellVolume, 0)}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderMarketDepth = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-muted animate-pulse rounded"></div>
          ))}
        </div>
      );
    }

    return <StockMarketDepth symbol={symbol} />;
  };

  const renderForeignInvestors = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-muted animate-pulse rounded"></div>
          ))}
        </div>
      );
    }

    const { foreignInvestors } = tradingData;
    const isNetBuy = foreignInvestors.netBuy.volume > 0;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Mua</div>
            <div className="font-medium">{formatNumber(foreignInvestors.buy.volume, 0)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Bán</div>
            <div className="font-medium">{formatNumber(foreignInvestors.sell.volume, 0)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Mua bán ròng</div>
            <div className={`font-medium ${isNetBuy ? 'text-green-500' : 'text-red-500'}`}>
              {formatNumber(foreignInvestors.netBuy.volume, 0)}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center pb-2">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Giá trị giao dịch</div>
            <div className="font-medium">{formatNumber(foreignInvestors.buy.value / 1000000000, 0)}T</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Giá trị giao dịch</div>
            <div className="font-medium">{formatNumber(foreignInvestors.sell.value / 1000000000, 0)}T</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Giá trị giao dịch</div>
            <div className={`font-medium ${isNetBuy ? 'text-green-500' : 'text-red-500'}`}>
              {formatNumber(Math.abs(foreignInvestors.netBuy.value) / 1000000000, 0)}T
            </div>
          </div>
        </div>
        
        {/* Foreign Investors Chart Placeholder */}
        <div className="h-20 bg-muted/20 rounded flex items-center justify-center mb-4">
          <span className="text-xs text-muted-foreground">Biểu đồ giao dịch nhà đầu tư nước ngoài</span>
        </div>
        
        <h3 className="text-sm font-medium mb-2">Giá trị giao dịch nhà đầu tư nước ngoài 10 phiên gần nhất</h3>
        
        <div className="space-y-2">
          {tradingData.lastTransactions.map((transaction, idx) => (
            <div key={idx} className="flex items-start gap-2">
              {transaction.type === "buy" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-muted-foreground">{transaction.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-0 bg-background shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <h2 className="text-lg font-semibold">Thông tin giao dịch</h2>
      </CardHeader>
      
      <CardContent className="px-4 pt-0 pb-4">
        <div className="mb-4">
          <div className="flex border-b border-gray-800">
            <button
              className={`py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === "orderBook" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-gray-700 text-muted-foreground"
              }`}
              onClick={() => setActiveTab("orderBook")}
            >
              Lệnh mua bán
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === "depth" 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-gray-700 text-muted-foreground"
              }`}
              onClick={() => setActiveTab("depth")}
            >
              Chi tiết khớp lệnh
            </button>
          </div>
          
          <div className="pt-4">
            {activeTab === "orderBook" ? renderOrderBook() : renderMarketDepth()}
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-base font-semibold mb-3">Giao dịch nhà đầu tư nước ngoài</h3>
          {renderForeignInvestors()}
        </div>
      </CardContent>
    </Card>
  );
} 