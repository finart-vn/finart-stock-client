"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeTabs from "@/components/ui/time-tabs";
import { InfoCircle } from "iconsax-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

type SectorData = {
  name: string;
  performance: number;
};

export const SectorPerformance = () => {
  const [timeFrame, setTimeFrame] = useState("7D");
  const [sectorData, setSectorData] = useState<SectorData[]>([
    { name: "Nguyên vật liệu", performance: 14.3 },
    { name: "Bất động sản", performance: 12.7 },
    { name: "Năng lượng", performance: 11.9 },
    { name: "Tài chính", performance: 10.4 },
    { name: "Công nghiệp", performance: 10.1 },
    { name: "Hàng hóa không thiết yếu", performance: 9.3 },
    { name: "Hàng hóa thiết yếu", performance: 6.7 },
    { name: "Chăm sóc sức khỏe", performance: 6.2 },
    { name: "Công nghệ", performance: 5.5 },
    { name: "Tiện ích", performance: 5.1 }
  ]);
  
  // In a real app, we would fetch data based on the time frame
  useEffect(() => {
    // This is a placeholder for real data fetching logic
    console.log(`Fetching sector data for time frame: ${timeFrame}`);
    
    // For demo purposes, simulate different data for different time periods
    if (timeFrame === "1M") {
      setSectorData([
        { name: "Nguyên vật liệu", performance: 10.5 },
        { name: "Bất động sản", performance: 15.2 },
        { name: "Năng lượng", performance: 12.1 },
        { name: "Tài chính", performance: 8.7 },
        { name: "Công nghiệp", performance: 9.6 },
        { name: "Hàng hóa không thiết yếu", performance: 7.8 },
        { name: "Hàng hóa thiết yếu", performance: 5.9 },
        { name: "Chăm sóc sức khỏe", performance: 7.3 },
        { name: "Công nghệ", performance: 6.4 },
        { name: "Tiện ích", performance: 4.7 }
      ]);
    }
  }, [timeFrame]);
  
  const timeOptions = [
    { label: "7D", value: "7D" },
    { label: "1M", value: "1M" },
    { label: "YTD", value: "YTD" },
    { label: "1Y", value: "1Y" },
    { label: "3Y", value: "3Y" },
    { label: "5Y", value: "5Y" }
  ];

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-xl font-semibold">Xu hướng ngành</CardTitle>
        <Tabs defaultValue="profitability" className="mt-2 mb-0">
          <TabsList className="bg-transparent p-0 border-b w-fit">
            <TabsTrigger 
              value="profitability" 
              className="px-0 pb-2 pt-0 rounded-none font-medium text-base data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent mr-4"
            >
              Tỷ suất lợi nhuận
            </TabsTrigger>
            <TabsTrigger 
              value="valuation" 
              className="px-0 pb-2 pt-0 rounded-none font-medium text-base data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Định giá
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profitability" className="mt-4 py-0">
            <div className="flex space-x-5 mb-2">
              <div className="flex items-center space-x-2 py-1">
                <TimeTabs 
                  options={timeOptions} 
                  defaultValue="7D"
                  onValueChange={(value) => setTimeFrame(value)}
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {sectorData.map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{sector.name}</span>
                  <div className="flex items-center space-x-2 w-[58%]">
                    <span className="text-sm font-medium">{sector.performance.toFixed(1)}%</span>
                    <div className="relative w-full h-6">
                      <div 
                        className="absolute h-6 bg-emerald-500 rounded" 
                        style={{ width: `${sector.performance * 5}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center text-gray-500 text-xs">
                    <InfoCircle size={16} className="mr-1" />
                    <div className="text-left">
                      <p className="text-xs">Nhà đầu tư đang rất kỳ vọng về tăng trưởng ngành Bất động sản, chỉ số P/E hiện tại của ngành vào khoảng 19.6 lần, cao nhất trong tất cả các ngành và cao hơn cả P/E bình quân toàn thị trường, khoảng 12.32 lần.</p>
                      <p className="text-xs mt-1">Ở chiều ngược lại, nhà tư đang kém kỳ vọng về tăng trưởng ngành Tài chính nhất, chỉ số P/E của ngành chỉ vào khoảng 10.2 lần thấp nhất trong tất cả các ngành</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-md p-3">
                    <p>Nhà đầu tư đang rất kỳ vọng về tăng trưởng ngành Bất động sản, chỉ số P/E hiện tại của ngành vào khoảng 19.6 lần, cao nhất trong tất cả các ngành và cao hơn cả P/E bình quân toàn thị trường, khoảng 12.32 lần.</p>
                    <p className="mt-2">Ở chiều ngược lại, nhà tư đang kém kỳ vọng về tăng trưởng ngành Tài chính nhất, chỉ số P/E của ngành chỉ vào khoảng 10.2 lần thấp nhất trong tất cả các ngành</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>
          
          <TabsContent value="valuation">
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500">Định giá data (will be implemented)</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}; 