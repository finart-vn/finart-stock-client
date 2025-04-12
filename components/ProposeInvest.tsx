"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  LockIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  InfoIcon,
} from "lucide-react";

// Type for stock investment proposal
type StockProposal = {
  stockCode: string;
  logoUrl: string;
  currentPrice: number;
  changePercent: number;
  totalProfit: number;
  avgProfitRate: number;
  avgLossRate: number;
};

// Sample data for demo purposes - to be replaced with real data fetching
const demoStockProposals: StockProposal[] = [
  {
    stockCode: "CTG",
    logoUrl: "https://cdn.simplize.vn/simplizevn/logo/CTG.jpeg",
    currentPrice: 38400,
    changePercent: 6.22,
    totalProfit: 22.2,
    avgProfitRate: 5.9,
    avgLossRate: -3.7,
  },
  {
    stockCode: "ACB",
    logoUrl: "https://cdn.simplize.vn/simplizevn/logo/ACB.jpeg",
    currentPrice: 24850,
    changePercent: 6.65,
    totalProfit: 51.0,
    avgProfitRate: 6.2,
    avgLossRate: -5.9,
  },
  {
    stockCode: "VND",
    logoUrl: "https://cdn.simplize.vn/simplizevn/logo/VND.jpeg",
    currentPrice: 14400,
    changePercent: 6.67,
    totalProfit: 80.5,
    avgProfitRate: 51.6,
    avgLossRate: -10.2,
  },
];

export function ProposeInvest() {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const handleStockSelect = (stockCode: string) => {
    setSelectedStock(stockCode === selectedStock ? null : stockCode);
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4 absolute -top-10 left-0 gap-x-2">
        <h2 className="text-2xl font-bold">Đề xuất từ FiNart AI</h2>
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-muted cursor-pointer hover:bg-muted/80 transition-colors">
          <InfoIcon className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="space-y-4">
        {demoStockProposals.map((stock) => (
          <Card
            key={stock.stockCode}
            className={`border-border transition-all duration-200 ${
              selectedStock === stock.stockCode
                ? "ring-2 ring-primary/50"
                : "hover:border-primary/30"
            }`}
            onClick={() => handleStockSelect(stock.stockCode)}
          >
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden bg-muted mr-3 flex items-center justify-center">
                  {/* Fallback to text if image fails */}
                  <img
                    src={stock.logoUrl}
                    alt={stock.stockCode}
                    className="w-full object"
                  />
                  {/* <div className="text-lg font-bold">{stock.stockCode}</div> */}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold mr-2">
                      {stock.stockCode}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`${
                        stock.changePercent > 0
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {stock.changePercent > 0 ? "↑" : "↓"}{" "}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </Badge>
                  </div>
                  <p className="text-xl">
                    {stock.currentPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tổng lợi nhuận</span>
                  <span className="text-green-500 font-semibold">
                    {stock.totalProfit}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">
                      Tỷ lệ lãi bình quân
                    </span>
                    <div className="flex items-center">
                      <TrendingUpIcon className="w-3.5 h-3.5 text-green-500 mr-1" />
                      <span className="text-green-500 font-semibold">
                        {stock.avgProfitRate}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">
                      Tỷ lệ lỗ bình quân
                    </span>
                    <div className="flex items-center">
                      <TrendingDownIcon className="w-3.5 h-3.5 text-red-500 mr-1" />
                      <span className="text-red-500 font-semibold">
                        {stock.avgLossRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-center items-center py-2 px-4 bg-muted/50 rounded-md">
                <LockIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Số lượng cổ phiếu</span>
              </div>

              {selectedStock === stock.stockCode && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button className="bg-green-500 hover:bg-green-600">
                    Mua
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-600">Bán</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
