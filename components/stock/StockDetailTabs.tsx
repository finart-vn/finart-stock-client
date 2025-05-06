"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { formatNumber, formatPercent } from "@/lib/utils/format-number";

interface StockDetailTabsProps {
  symbol: string;
}

export function StockDetailTabs({ symbol }: StockDetailTabsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [symbol]);

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full flex bg-muted/20 p-0 h-auto">
            <TabsTrigger 
              value="overview" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-background"
            >
              Tổng quan
            </TabsTrigger>
            <TabsTrigger 
              value="financials" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-background"
            >
              Tài chính
            </TabsTrigger>
            <TabsTrigger 
              value="technical" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-background"
            >
              Phân tích kỹ thuật
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className="flex-1 py-3 rounded-none data-[state=active]:bg-background"
            >
              Tin tức
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-6 bg-muted animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Thông tin công ty</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted-foreground">Vốn hóa</dt>
                      <dd className="font-medium text-right">{formatNumber(476273000000000, 0)} VND</dd>
                      
                      <dt className="text-muted-foreground">Khối lượng giao dịch</dt>
                      <dd className="font-medium text-right">{formatNumber(2992900, 0)}</dd>
                      
                      <dt className="text-muted-foreground">P/E</dt>
                      <dd className="font-medium text-right">{formatNumber(14.03, 2)}</dd>
                      
                      <dt className="text-muted-foreground">P/B</dt>
                      <dd className="font-medium text-right">{formatNumber(2.33, 2)}</dd>
                    </dl>
                    
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted-foreground">EPS</dt>
                      <dd className="font-medium text-right">{formatNumber(4062, 0)}</dd>
                      
                      <dt className="text-muted-foreground">ROE</dt>
                      <dd className="font-medium text-right">{formatPercent(0.17)}</dd>
                      
                      <dt className="text-muted-foreground">ROA</dt>
                      <dd className="font-medium text-right">{formatPercent(0.013)}</dd>
                      
                      <dt className="text-muted-foreground">Giá trị sổ sách</dt>
                      <dd className="font-medium text-right">{formatNumber(24515, 0)}</dd>
                    </dl>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Chỉ số định giá</h3>
                  <p className="text-sm text-muted-foreground">
                    {symbol} đang được giao dịch ở mức P/E 14.03, cao hơn trung bình ngành ngân hàng (12.5).
                    Với lợi nhuận dự kiến tăng trưởng 15% năm 2023, cổ phiếu này có định giá hợp lý.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Thông tin giao dịch</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Giá thấp nhất</div>
                      <div className="font-medium">57,000</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Giá cao nhất</div>
                      <div className="font-medium">58,000</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Mở cửa</div>
                      <div className="font-medium">57,100</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Đóng cửa trước</div>
                      <div className="font-medium">57,100</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="financials" className="p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Báo cáo tài chính</h3>
              <p className="text-sm text-muted-foreground">
                Tính năng hiển thị báo cáo tài chính của {symbol} đang được phát triển.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="technical" className="p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Chỉ báo kỹ thuật</h3>
              <p className="text-sm text-muted-foreground">
                Tính năng phân tích kỹ thuật của {symbol} đang được phát triển.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Tin tức gần đây</h3>
              <p className="text-sm text-muted-foreground">
                Không có tin tức mới về {symbol}.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 