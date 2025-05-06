"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
  Scale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockDetailChartProps {
  symbol: string;
}

type TimeFrame = "1D" | "1M" | "3M" | "1Y" | "5Y" | "ALL";

export function StockDetailChart({ symbol }: StockDetailChartProps) {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("1Y");
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true);
      
      // In a real app, fetch data from API based on symbol and timeframe
      // Example: const data = await fetchStockChartData(symbol, selectedTimeFrame);
      
      // For demo, generate sample data
      const daysCount = selectedTimeFrame === "1D" ? 24 : 
                       selectedTimeFrame === "1M" ? 30 :
                       selectedTimeFrame === "3M" ? 90 :
                       selectedTimeFrame === "1Y" ? 365 :
                       selectedTimeFrame === "5Y" ? 1825 : 2500;
      
      const labels = Array.from({ length: daysCount }, (_, i) => {
        if (selectedTimeFrame === "1D") {
          return `${i}:00`;
        } else {
          const date = new Date();
          date.setDate(date.getDate() - (daysCount - i));
          return date.toLocaleDateString();
        }
      });
      
      // Generate random price data with a general trend
      const basePrice = 57000;
      const volatility = selectedTimeFrame === "1D" ? 0.002 : 
                        selectedTimeFrame === "1M" ? 0.01 :
                        selectedTimeFrame === "3M" ? 0.03 :
                        selectedTimeFrame === "1Y" ? 0.1 :
                        selectedTimeFrame === "5Y" ? 0.3 : 0.5;
      
      let currentPrice = basePrice;
      const data = labels.map(() => {
        const change = (Math.random() - 0.48) * volatility * basePrice;
        currentPrice += change;
        return Math.max(currentPrice, basePrice * 0.5);
      });
      
      setChartData({
        labels,
        datasets: [
          {
            label: `${symbol} Price`,
            data,
            borderColor: data[data.length - 1] >= data[0] ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
            backgroundColor: data[data.length - 1] >= data[0] ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      });
      
      setIsLoading(false);
    };

    fetchChartData();
  }, [symbol, selectedTimeFrame]);

  const timeFrames: TimeFrame[] = ["1D", "1M", "3M", "1Y", "5Y", "ALL"];

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            return `Price: ${context.parsed.y.toLocaleString()} VND`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
          maxRotation: 0,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        position: 'right' as const,
        ticks: {
          callback: function(this: Scale, value: number | string) {
            if (typeof value === 'number') {
              return value.toLocaleString();
            }
            return value;
          }
        },
      },
    },
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Biểu đồ giá {symbol}</CardTitle>
        <div className="flex space-x-1">
          {timeFrames.map((timeFrame) => (
            <button
              key={timeFrame}
              onClick={() => handleTimeFrameChange(timeFrame)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedTimeFrame === timeFrame
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent hover:bg-muted"
              }`}
            >
              {timeFrame}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[400px] w-full relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          )}
        </div>
      </CardContent>
    </Card>
  );
} 