"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { formatNumber } from "@/lib/utils/format-number";

interface StockOrderBookProps {
  symbol: string;
}

interface OrderBookEntry {
  price: number;
  quantity: number;
  accumulatedQuantity: number;
  percentOfTotal: number;
}

interface TradeEntry {
  time: string;
  price: number;
  quantity: number;
  type: "buy" | "sell";
}

export function StockOrderBook({ symbol }: StockOrderBookProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [buyOrders, setBuyOrders] = useState<OrderBookEntry[]>([]);
  const [sellOrders, setSellOrders] = useState<OrderBookEntry[]>([]);
  const [tradeHistory, setTradeHistory] = useState<TradeEntry[]>([]);

  useEffect(() => {
    // Simulated data loading
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate mock data for the order book
      const mockBuyOrders: OrderBookEntry[] = [
        { price: 57000, quantity: 277800, accumulatedQuantity: 277800, percentOfTotal: 0.25 },
        { price: 56900, quantity: 120700, accumulatedQuantity: 398500, percentOfTotal: 0.35 },
        { price: 56800, quantity: 200, accumulatedQuantity: 398700, percentOfTotal: 0.35 },
        { price: 56700, quantity: 400, accumulatedQuantity: 399100, percentOfTotal: 0.36 },
        { price: 56600, quantity: 10000, accumulatedQuantity: 409100, percentOfTotal: 0.37 },
      ];
      
      const mockSellOrders: OrderBookEntry[] = [
        { price: 57100, quantity: 200, accumulatedQuantity: 200, percentOfTotal: 0.05 },
        { price: 57200, quantity: 1500, accumulatedQuantity: 1700, percentOfTotal: 0.09 },
        { price: 57300, quantity: 23700, accumulatedQuantity: 25400, percentOfTotal: 0.22 },
        { price: 57400, quantity: 200, accumulatedQuantity: 25600, percentOfTotal: 0.23 },
        { price: 57500, quantity: 500, accumulatedQuantity: 26100, percentOfTotal: 0.24 },
      ];
      
      // Generate mock trade history
      const mockTradeHistory: TradeEntry[] = [
        { time: "14:45:21", price: 57000, quantity: 277800, type: "sell" },
        { time: "14:45:20", price: 57000, quantity: 120700, type: "sell" },
        { time: "14:29:54", price: 57300, quantity: 200, type: "buy" },
        { time: "14:29:36", price: 57300, quantity: 400, type: "sell" },
        { time: "14:29:09", price: 57500, quantity: 10000, type: "buy" },
        { time: "14:29:07", price: 57300, quantity: 2900, type: "buy" },
        { time: "14:29:06", price: 57200, quantity: 400, type: "buy" },
        { time: "14:29:02", price: 57200, quantity: 1000, type: "buy" },
        { time: "14:28:56", price: 57200, quantity: 1500, type: "buy" },
        { time: "14:28:45", price: 57200, quantity: 23700, type: "buy" },
      ];
      
      setBuyOrders(mockBuyOrders);
      setSellOrders(mockSellOrders);
      setTradeHistory(mockTradeHistory);
      setIsLoading(false);
    }, 800);
  }, [symbol]);
  
  return (
    <Card className="border-0 shadow-sm">
      <Tabs defaultValue="orderBook" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-10 rounded-none bg-muted/20">
          <TabsTrigger value="orderBook" className="rounded-none data-[state=active]:bg-background">
            Sổ lệnh
          </TabsTrigger>
          <TabsTrigger value="tradeHistory" className="rounded-none data-[state=active]:bg-background">
            Lịch sử khớp lệnh
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="orderBook" className="p-0 mt-0">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm font-medium">Chi tiết khớp lệnh</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-6 bg-muted animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
                  <div>KL</div>
                  <div className="text-center">Giá</div>
                  <div className="text-right">KL</div>
                </div>
                
                <div className="space-y-1">
                  {/* Sell orders (reversed to show highest price at the top) */}
                  {sellOrders.map((order) => (
                    <div key={`sell-${order.price}`} className="grid grid-cols-3 text-xs">
                      <div></div>
                      <div className="text-center font-medium text-red-500">{formatNumber(order.price, 0)}</div>
                      <div className="text-right relative">
                        <div 
                          className="absolute top-0 right-0 bottom-0 bg-red-100" 
                          style={{ width: `${order.percentOfTotal * 100}%` }}
                        />
                        <span className="relative z-10">{formatNumber(order.quantity, 0)}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Best price indicator */}
                  <div className="h-px bg-muted-foreground/20 my-2" />
                  
                  {/* Buy orders */}
                  {buyOrders.map((order) => (
                    <div key={`buy-${order.price}`} className="grid grid-cols-3 text-xs">
                      <div className="relative">
                        <div 
                          className="absolute top-0 left-0 bottom-0 bg-green-100" 
                          style={{ width: `${order.percentOfTotal * 100}%` }}
                        />
                        <span className="relative z-10">{formatNumber(order.quantity, 0)}</span>
                      </div>
                      <div className="text-center font-medium text-green-500">{formatNumber(order.price, 0)}</div>
                      <div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="tradeHistory" className="p-0 mt-0">
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-sm font-medium">Lịch sử khớp lệnh</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-6 bg-muted animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2">
                  <div>Thời gian</div>
                  <div className="text-center">Giá</div>
                  <div className="text-right">KL</div>
                </div>
                
                <div className="space-y-1">
                  {tradeHistory.map((trade, index) => (
                    <div key={index} className="grid grid-cols-3 text-xs">
                      <div className="text-muted-foreground">{trade.time}</div>
                      <div className={`text-center font-medium ${
                        trade.type === "buy" ? "text-green-500" : "text-red-500"
                      }`}>
                        {formatNumber(trade.price, 0)}
                      </div>
                      <div className="text-right">{formatNumber(trade.quantity, 0)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
} 