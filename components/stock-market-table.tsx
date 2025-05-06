"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FinartTable, { ColumnDefinition } from "@/components/ui/finart-table";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import Image from "next/image";
import { getStockMarketData } from "@/lib/apis/stock";
import { StockMarketDataItem } from "@/types/api/stock";
import { sampleStockData } from "@/lib/mocks/stock";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/utils/format-number";

// Define the type for stock data, extending Record<string, unknown> to make it compatible
export interface StockData extends StockMarketDataItem, Record<string, unknown> {}

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
            <a 
              href={`/stock/${stockRow.code}`} 
              className="font-medium text-primary hover:underline"
            >
              {stockRow.code}
            </a>
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
            pagination={true}
            pageSize={10}
            defaultPage={1}
            onPageChange={(page) => console.log("Page changed to", page)}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default StockMarketTable; 