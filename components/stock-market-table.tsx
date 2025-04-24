"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FinartTable, { ColumnDefinition } from "@/components/ui/finart-table";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import Image from "next/image";
import { getStockMarketData } from "@/lib/apis/stock";
import { StockMarketDataItem } from "@/types/api/stock";

// Define the type for stock data, extending Record<string, unknown> to make it compatible
export interface StockData extends StockMarketDataItem, Record<string, unknown> {}

// Utility functions
const formatNumber = (num: number, decimals = 2): string => {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

const formatCurrency = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    return formatNumber(num / 1_000_000_000_000) + "T";
  }
  if (num >= 1_000_000_000) {
    return formatNumber(num / 1_000_000_000) + "B";
  }
  if (num >= 1_000_000) {
    return formatNumber(num / 1_000_000) + "M";
  }
  if (num >= 1_000) {
    return formatNumber(num / 1_000) + "K";
  }
  return formatNumber(num);
};

const formatPercent = (num: number): string => {
  return formatNumber(num) + "%";
};

// Sample data for fallback
const sampleStockData: StockData[] = [
  {
    code: "VCB",
    name: "Ngân hàng TMCP Ngoại thương Việt Nam",
    marketCap: 495491000000000,
    price: 59300,
    priceChange: -700,
    priceChangePercent: -1.17,
    pe: 14.65,
    pb: 2.53,
    roe: 18.56,
    threeYearGrowth: 10.39,
    dividendYield: 0.8,
    sector: "Tài chính",
    industry: "Ngân hàng"
  },
  {
    code: "VIC",
    name: "Tập đoàn Vingroup - CTCP",
    marketCap: 259626000000000,
    price: 67900,
    priceChange: -2600,
    priceChangePercent: -3.69,
    pe: 21.81,
    pb: 1.89,
    roe: 3.5,
    threeYearGrowth: -59.63,
    dividendYield: 0,
    sector: "Bất động sản",
    industry: "Bất động sản"
  },
  {
    code: "BID",
    name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
    marketCap: 252769000000000,
    price: 36000,
    priceChange: -500,
    priceChangePercent: -1.37,
    pe: 10.05,
    pb: 1.81,
    roe: 19.12,
    threeYearGrowth: 11.8,
    dividendYield: 2.4,
    sector: "Tài chính",
    industry: "Ngân hàng"
  },
  {
    code: "VHM",
    name: "Công ty Cổ phần Vinhomes",
    marketCap: 232068000000000,
    price: 56500,
    priceChange: -1000,
    priceChangePercent: -1.74,
    pe: 7.3,
    pb: 1.15,
    roe: 17.4,
    threeYearGrowth: 3.42,
    dividendYield: 1.5,
    sector: "Bất động sản",
    industry: "Bất động sản"
  },
  {
    code: "CTG",
    name: "Ngân hàng TMCP Công Thương Việt Nam",
    marketCap: 199763000000000,
    price: 37200,
    priceChange: -550,
    priceChangePercent: -1.46,
    pe: 7.88,
    pb: 1.35,
    roe: 18.46,
    threeYearGrowth: 16.55,
    dividendYield: 2.1,
    sector: "Tài chính",
    industry: "Ngân hàng"
  }
];

// Default stock symbols to fetch if none provided
const defaultStockSymbols = ["VCB", "VIC", "BID", "VHM", "CTG", "FPT", "MBB", "MSN", "HPG", "VNM"];

interface StockMarketTableProps {
  title?: string;
  initialData?: StockData[];
  symbols?: string[];
  className?: string;
}

export function StockMarketTable({ 
  title = "Bảng giá cổ phiếu", 
  initialData,
  symbols = defaultStockSymbols,
  className 
}: StockMarketTableProps) {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [data, setData] = useState<StockData[]>(initialData || sampleStockData);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const stockData = await getStockMarketData(symbols);
        
        if (stockData && stockData.length > 0) {
          // Cast the API response to StockData which is compatible with FinartTable
          setData(stockData as unknown as StockData[]);
        }
      } catch (err) {
        console.error("Failed to fetch stock data:", err);
        setError("Failed to load stock data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();

    // Set up polling to refresh data every 60 seconds
    const intervalId = setInterval(fetchStockData, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [symbols]);

  const filteredData = data.filter(stock => {
    if (selectedSector && stock.sector !== selectedSector) return false;
    if (selectedIndustry && stock.industry !== selectedIndustry) return false;
    return true;
  });

  // Define unique sectors and industries for filtering
  const sectors = Array.from(new Set(data.map(stock => stock.sector)));
  const industries = Array.from(new Set(data.map(stock => stock.industry)));

  // Define columns
  const columns: ColumnDefinition<Record<string, unknown>>[] = [
    {
      id: "code",
      header: "Mã cổ phiếu",
      accessorKey: "code",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return (
          <div className="flex items-center">
            {stockRow.logo && (
              <div className="mr-2 h-6 w-6 relative">
                <Image 
                  src={stockRow.logo} 
                  alt={stockRow.code} 
                  fill 
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="font-medium">{stockRow.code}</div>
          </div>
        );
      }
    },
    {
      id: "name",
      header: "Tên",
      accessorKey: "name",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return (
          <div className="max-w-[250px] truncate text-xs text-muted-foreground">
            {stockRow.name}
          </div>
        );
      }
    },
    {
      id: "marketCap",
      header: "Vốn hóa",
      accessorKey: "marketCap",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return <div>{formatCurrency(stockRow.marketCap)}</div>;
      }
    },
    {
      id: "price",
      header: "Giá hiện tại",
      accessorKey: "price",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return <div>{formatNumber(stockRow.price, 0)}</div>;
      }
    },
    {
      id: "priceChangePercent",
      header: "Biến động giá",
      accessorKey: "priceChangePercent",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return (
          <div className={`flex items-center justify-end ${
            stockRow.priceChangePercent < 0 
              ? "text-red-500" 
              : stockRow.priceChangePercent > 0 
                ? "text-green-500" 
                : ""
          }`}>
            {stockRow.priceChangePercent < 0 ? (
              <ChevronDown className="mr-1 h-4 w-4" />
            ) : stockRow.priceChangePercent > 0 ? (
              <ChevronUp className="mr-1 h-4 w-4" />
            ) : null}
            {formatPercent(Math.abs(stockRow.priceChangePercent))}
          </div>
        );
      }
    },
    {
      id: "pe",
      header: "P/E",
      accessorKey: "pe",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return <div>{formatNumber(stockRow.pe)}</div>;
      }
    },
    {
      id: "pb",
      header: "P/B",
      accessorKey: "pb",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return <div>{formatNumber(stockRow.pb)}</div>;
      }
    },
    {
      id: "roe",
      header: "ROE",
      accessorKey: "roe",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return <div>{formatPercent(stockRow.roe)}</div>;
      }
    },
    {
      id: "threeYearGrowth",
      header: "TT LNST 3 năm",
      accessorKey: "threeYearGrowth",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return (
          <div className={`${
            stockRow.threeYearGrowth < 0 
              ? "text-red-500" 
              : stockRow.threeYearGrowth > 0 
                ? "text-green-500" 
                : ""
          }`}>
            {formatPercent(stockRow.threeYearGrowth)}
          </div>
        );
      }
    },
    {
      id: "dividendYield",
      header: "Tỷ suất cổ tức",
      accessorKey: "dividendYield",
      align: "right",
      cell: (row: Record<string, unknown>) => {
        const stockRow = row as unknown as StockData;
        return <div>{formatPercent(stockRow.dividendYield)}</div>;
      }
    },
    {
      id: "sector",
      header: "Ngành",
      accessorKey: "sector",
    }
  ] as unknown as ColumnDefinition<Record<string, unknown>>[];
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        
        <div className="flex space-x-2">
          <select 
            className="text-sm bg-muted rounded px-2 py-1 border border-border"
            value={selectedSector || ""}
            onChange={(e) => setSelectedSector(e.target.value || null)}
            disabled={isLoading}
          >
            <option value="">Tất cả ngành</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          
          <select 
            className="text-sm bg-muted rounded px-2 py-1 border border-border"
            value={selectedIndustry || ""}
            onChange={(e) => setSelectedIndustry(e.target.value || null)}
            disabled={isLoading}
          >
            <option value="">Tất cả lĩnh vực</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-0">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <FinartTable
            data={filteredData}
            columns={columns}
            striped={true}
            onRowClick={(stock) => console.log("Clicked on", (stock as unknown as StockData).code)}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default StockMarketTable; 