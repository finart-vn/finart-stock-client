"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils/format-number";
import { useState, useEffect } from "react";
import Link from "next/link";

interface StockAnalysisReportsProps {
  symbol: string;
}

interface AnalysisReport {
  title: string;
  source: string;
  date: string;
  targetPrice: number;
  recommendation: "MUA" | "BÁN" | "TRUNG LẬP" | "NẮM GIỮ";
}

export function StockAnalysisReports({ symbol }: StockAnalysisReportsProps) {
  const getDefaultReports = (stockSymbol: string): AnalysisReport[] => {
    if (stockSymbol === "VIC") {
      return [
        {
          title: "Mảng BĐS vững chắc; doanh số bán giao xe điện tăng; Khoản tài trợ của Chủ tịch HĐQT và thoái vốn thúc đẩy lợi nhuận năm 2025",
          source: "Vietcap",
          date: "05/03/2025",
          targetPrice: 43700,
          recommendation: "TRUNG LẬP"
        },
        {
          title: "Mảng bất động sản khả quan; giá tăng doanh số xe điện",
          source: "Vietcap",
          date: "21/03/2024",
          targetPrice: 49500,
          recommendation: "MUA"
        },
        {
          title: "Lực đỡ từ bất động sản",
          source: "MAS",
          date: "19/12/2023",
          targetPrice: 55500,
          recommendation: "MUA"
        }
      ];
    }
    
    return [
      {
        title: "Triển vọng tích cực từ các mảng kinh doanh cốt lõi",
        source: "SSI Research",
        date: "15/05/2024",
        targetPrice: 65000,
        recommendation: "MUA"
      },
      {
        title: "Kết quả kinh doanh quý 1 vượt kỳ vọng",
        source: "VNDirect",
        date: "10/04/2024",
        targetPrice: 63500,
        recommendation: "MUA"
      }
    ];
  };
  
  const [reports, setReports] = useState<AnalysisReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setReports(getDefaultReports(symbol));
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [symbol]);

  const getRecommendationClass = (recommendation: string) => {
    switch (recommendation) {
      case "MUA": return "text-green-500";
      case "BÁN": return "text-red-500";
      case "TRUNG LẬP": return "text-amber-500";
      case "NẮM GIỮ": return "text-blue-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-0 bg-background shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-3">
          Báo cáo phân tích
        </h2>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Báo cáo
          </span>
          <span className="text-sm text-muted-foreground">
            Giá mục tiêu / Khuyến nghị
          </span>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="h-24 w-full animate-pulse bg-muted rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div 
                key={index} 
                className="border-b border-gray-800 pb-3"
              >
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-8">
                    <p className="text-sm font-medium mb-1 line-clamp-2">{report.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Nguồn: {report.source}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col items-end justify-center">
                    <p className="text-base font-semibold">{formatNumber(report.targetPrice, 0)}</p>
                    <span className={`text-sm font-medium ${getRecommendationClass(report.recommendation)}`}>
                      {report.recommendation}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/stock/${symbol}/analysis`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center text-sm"
        >
          Xem chi tiết
        </Link>
      </CardFooter>
    </Card>
  );
} 