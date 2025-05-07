"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils/format-number";
import { AlertTriangle, ChevronDown, ChevronUp, Share2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  volume: number;
  evEbitda: number;
  riskLevel: "Cao" | "Trung bình" | "Thấp";
  rating: string;
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
        volume: 1250000,
        evEbitda: 0,
        riskLevel: "Thấp",
        rating: "Khả quan"
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
        volume: 51500,
        evEbitda: 0,
        riskLevel: "Cao",
        rating: "Không hấp dẫn"
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
      volume: 850000,
      evEbitda: 8.2,
      riskLevel: "Trung bình",
      rating: "Trung lập"
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

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
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
                <span className="text-sm text-muted-foreground">({stockData.exchange})</span>
              </div>
              <p className="text-xs text-muted-foreground">{stockData.name}</p>
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
              className="p-1.5 rounded-full hover:bg-muted" 
              aria-label="Share"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                }
              }}
            >
              <Share2 className="h-5 w-5 text-muted-foreground" />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-muted" 
              aria-label="Warning"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                }
              }}
            >
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </button>
          </div>
        </div>
        
        {/* Price Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-1">
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
                  <span className="text-lg font-medium">
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
                  <div className="relative flex-1 h-1 bg-gray-200 rounded-full">
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
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Vốn hóa
                <div className="text-muted-foreground cursor-help" title="Giá trị vốn hóa thị trường">ⓘ</div>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.marketCap / 1000000000, 0)}T
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                P/E
                <div className="text-muted-foreground cursor-help" title="Chỉ số giá trên thu nhập">ⓘ</div>
              </span>
              <span className="font-medium">
                {stockData.pe.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                EPS
                <div className="text-muted-foreground cursor-help" title="Thu nhập trên mỗi cổ phiếu">ⓘ</div>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.eps, 2)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Chất lượng doanh nghiệp
                <div className="text-muted-foreground cursor-help" title="Đánh giá chất lượng doanh nghiệp">ⓘ</div>
              </span>
              <span className="font-medium text-amber-500">
                Không ổn định
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                P/B
                <div className="text-muted-foreground cursor-help" title="Chỉ số giá trên giá trị sổ sách">ⓘ</div>
              </span>
              <span className="font-medium">
                {stockData.pb.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Khối lượng giao dịch
                <div className="text-muted-foreground cursor-help" title="Khối lượng giao dịch trung bình">ⓘ</div>
              </span>
              <span className="font-medium">
                {formatNumber(stockData.volume, 0)}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                EV/EBITDA
                <div className="text-muted-foreground cursor-help" title="Chỉ số giá trị doanh nghiệp trên lợi nhuận trước thuế">ⓘ</div>
              </span>
              <span className="font-medium">
                {stockData.evEbitda || 0}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Rủi ro
                <div className="text-muted-foreground cursor-help" title="Mức độ rủi ro đầu tư">ⓘ</div>
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
          Linh hoạt tùy chỉnh mọi thông tin bạn cần tất cả trên 1 trang.
        </p>
      </CardContent>
    </Card>
  );
} 