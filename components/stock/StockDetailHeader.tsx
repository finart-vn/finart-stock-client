"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils/format-number";
import { Building2, ChevronDown, ChevronUp, ExternalLink, Info, Share2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
  logoUrl?: string;
  lowPrice: number;
  highPrice: number;
  marketCap: number;
  pe: number;
  eps: number;
  pb: number;
  bookValue: number;
  volume: number;
  evEbitda: number;
  riskLevel: "Cao" | "Trung bình" | "Thấp";
  rating: "Không hấp dẫn" | "Trung lập" | "Khả quan" | "Không ổn định" | "Không đánh giá";
  categories: string[];
  outstandingShares: number;
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
        exchange: "HOSE",
        logoUrl: `/images/stocks/${stockSymbol.toLowerCase()}.png`,
        lowPrice: 55100,
        highPrice: 57200,
        marketCap: 268512000000000,
        pe: 15.9,
        eps: 3580,
        pb: 2.4,
        bookValue: 23750,
        volume: 1250000,
        evEbitda: 0,
        riskLevel: "Thấp",
        rating: "Khả quan",
        categories: ["Ngân hàng"],
        outstandingShares: 4709800000
      };
    } else if (stockSymbol === "VIC") {
      return {
        name: "Tập đoàn Vingroup - Công ty Cổ phần",
        price: 77500,
        priceChange: 1000,
        priceChangePercent: 1.31,
        previousClose: 76500,
        exchange: "HOSE",
        logoUrl: `/images/stocks/${stockSymbol.toLowerCase()}.png`,
        lowPrice: 77000,
        highPrice: 78500,
        marketCap: 292510000000000,
        pe: 26.72,
        eps: 2863,
        pb: 2.03,
        bookValue: 37771,
        volume: 1773200,
        evEbitda: 7.1,
        riskLevel: "Trung bình",
        rating: "Trung lập",
        categories: ["Bất động sản", "Quản lý và phát triển bất động sản"],
        outstandingShares: 3823861570
      };
    } else if (stockSymbol === "HU6") {
      return {
        name: "CTCP Đầu tư Phát triển nhà và đô thị HUD6",
        price: 5200,
        priceChange: 600,
        priceChangePercent: 13.04,
        previousClose: 4600,
        exchange: "UPCOM",
        logoUrl: `/images/stocks/${stockSymbol.toLowerCase()}.png`,
        lowPrice: 5100,
        highPrice: 5200,
        marketCap: 39000000000,
        pe: 840.35,
        eps: 0,
        pb: 0.67,
        bookValue: 7761,
        volume: 51500,
        evEbitda: 0,
        riskLevel: "Cao",
        rating: "Không hấp dẫn",
        categories: ["Bất động sản"],
        outstandingShares: 7500000
      };
    }
    
    return {
      name: `${stockSymbol} Corporation`,
      price: 50000,
      priceChange: 1000,
      priceChangePercent: 2.0,
      previousClose: 49000,
      exchange: "HOSE",
      logoUrl: `/images/stocks/${stockSymbol.toLowerCase()}.png`,
      lowPrice: 48500,
      highPrice: 50500,
      marketCap: 120000000000,
      pe: 12.5,
      eps: 4000,
      pb: 1.5,
      bookValue: 33333,
      volume: 850000,
      evEbitda: 8.2,
      riskLevel: "Trung bình",
      rating: "Trung lập",
      categories: ["Công nghiệp"],
      outstandingShares: 2400000
    };
  };
  
  const [stockData, setStockData] = useState<StockHeaderData>(() => 
    getDefaultStockData(symbol)
  );
  
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, fetch stock data from API
    setIsLoading(true);
    setImageError(false);
    
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
      
  const handleImageError = () => {
    setImageError(true);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Calculate the percentage position for the current price in the range
  const priceRangePosition = Math.min(
    100,
    Math.max(
      0,
      ((stockData.price - stockData.lowPrice) / 
      (stockData.highPrice - stockData.lowPrice)) * 100
    )
  );

  const renderRatingColor = (rating: string) => {
    switch (rating) {
      case "Khả quan": return "text-green-500";
      case "Trung lập": return "text-amber-500";
      case "Không hấp dẫn": return "text-red-500";
      case "Không ổn định": return "text-amber-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-0 bg-background shadow-sm">
      <CardContent className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {!imageError && stockData.logoUrl && (
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={stockData.logoUrl}
                    alt={`${symbol} logo`}
                    fill
                    sizes="32px"
                    className="object-cover"
                    onError={handleImageError}
                    priority
                  />
                </div>
              )}
              {imageError && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-primary">{symbol.substring(0, 2)}</span>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{symbol}</h1>
                  <button 
                    className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded"
                    tabIndex={0}
                  >
                    {stockData.exchange}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{stockData.name}</p>
              </div>
            </div>
            
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {stockData.categories.map((category, index) => (
                <Link 
                  href={`/category/${encodeURIComponent(category)}`} 
                  key={index}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 hover:bg-muted px-2 py-1 rounded"
                >
                  <Building2 className="h-3 w-3" />
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className={`p-1.5 rounded-full hover:bg-muted ${isFavorite ? 'text-yellow-400' : 'text-muted-foreground'}`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              tabIndex={0}
              onClick={toggleFavorite}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFavorite();
                }
              }}
            >
              <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground" 
              aria-label="Share"
              tabIndex={0}
            >
              <Share2 className="h-5 w-5" />
            </button>
            <Link 
              href={`https://simx.vn/stocks/${symbol}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-4 text-sm rounded"
              tabIndex={0}
            >
              <span className="flex items-center gap-1">
                Không gian đầu tư Finart
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
        
        {/* Price Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
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
                  <span className="text-base px-2 font-medium rounded-md bg-opacity-10 bg-current">
                    {isLoading ? "..." : formatPercent(stockData.priceChangePercent)}
                  </span>
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Giá thấp nhất</span>
                  <span>Giá cao nhất</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{formatNumber(stockData.lowPrice, 0)}</span>
                  <div className="relative flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="absolute h-1 bg-primary rounded-full" 
                      style={{ 
                        width: `${priceRangePosition}%`, 
                        left: 0 
                      }}
                    />
                    <div 
                      className="absolute h-3 w-3 bg-primary rounded-full -top-1 -mt-px -ml-1.5 shadow-sm" 
                      style={{ 
                        left: `${priceRangePosition}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{formatNumber(stockData.highPrice, 0)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>24h</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Financial Metrics Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Vốn hóa
                <span className="text-muted-foreground cursor-help" title="Giá trị vốn hóa thị trường">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.marketCap / 1000000000000, 1)}T
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Khối lượng giao dịch
                <span className="text-muted-foreground cursor-help" title="Khối lượng giao dịch">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.volume, 0)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Số lượng cổ phiếu lưu hành
                <span className="text-muted-foreground cursor-help" title="Số lượng cổ phiếu lưu hành">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.outstandingShares, 0)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                P/E
                <span className="text-muted-foreground cursor-help" title="Chỉ số giá trên thu nhập">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {stockData.pe.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                P/B
                <span className="text-muted-foreground cursor-help" title="Chỉ số giá trên giá trị sổ sách">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {stockData.pb.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Giá trị sổ sách
                <span className="text-muted-foreground cursor-help" title="Giá trị sổ sách">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.bookValue, 0)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                EPS
                <span className="text-muted-foreground cursor-help" title="Thu nhập trên mỗi cổ phiếu">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.eps, 0)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                EV/EBITDA
                <span className="text-muted-foreground cursor-help" title="Chỉ số giá trị doanh nghiệp trên lợi nhuận trước thuế">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className="font-medium">
                {stockData.evEbitda.toFixed(1)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Chất lượng doanh nghiệp
                <span className="text-muted-foreground cursor-help" title="Đánh giá chất lượng doanh nghiệp">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className={`font-medium ${renderRatingColor(stockData.rating)}`}>
                {stockData.rating}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Định giá
                <span className="text-muted-foreground cursor-help" title="Đánh giá định giá cổ phiếu">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className={`font-medium ${
                stockData.rating === "Khả quan" ? "text-green-500" : 
                stockData.rating === "Không hấp dẫn" ? "text-red-500" : "text-green-500"
              }`}>
                {stockData.rating === "Khả quan" ? "Hấp dẫn" : 
                 stockData.rating === "Không hấp dẫn" ? "Không hấp dẫn" : "Hấp dẫn"}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Rủi ro
                <span className="text-muted-foreground cursor-help" title="Mức độ rủi ro đầu tư">
                  <Info className="h-3 w-3" />
                </span>
              </span>
              <span className={`font-medium ${
                stockData.riskLevel === "Cao" ? "text-red-500" : 
                stockData.riskLevel === "Trung bình" ? "text-amber-500" : "text-green-500"
              }`}>
                {stockData.riskLevel}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground text-right">
          Linh hoạt tùy chỉnh mọi thông tin bạn cần, tất cả trên 1 trang.
        </p>
      </CardContent>
    </Card>
  );
} 