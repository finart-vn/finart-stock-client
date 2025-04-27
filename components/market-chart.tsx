"use client";

import React, { useState, useEffect, useMemo } from "react";
// import { Button } from "@/components/ui/button"; // Unused
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // BarElement, // Unused
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
  ChartOptions, // Import ChartOptions type
  ChartData, // Import ChartData type
} from "chart.js";
// import { Line, Bar } from 'react-chartjs-2'; // Bar unused
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import TimeTabs from "@/components/ui/time-tabs";
import { getMarketChart } from "@/lib/apis";
import { MarketChartData } from "@/types/api/stock";
import { parseISO } from "date-fns";
import { getDateRange, parseUnixTimestamp } from "@/lib/utils/format-datetime";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // BarElement, // Unused
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale
);

// --- Define Types ---
type TimeSeriesPoint = { x: string; y: number };
// Specify 'line' chart type and the data point structure
type MarketChartOptions = ChartOptions<"line">;

// --- Placeholder Data Generation ---
const generateTimeSeriesData = (
  numPoints: number,
  minY: number,
  maxY: number
): TimeSeriesPoint[] => {
  const data = [];
  let value = (minY + maxY) / 2;
  const startDate = new Date(2021, 0, 1).getTime();
  const timeStep = (new Date(2024, 6, 1).getTime() - startDate) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const date = new Date(startDate + i * timeStep);
    value += (Math.random() - 0.5) * (maxY - minY) * 0.1;
    value = Math.max(minY, Math.min(maxY, value));
    data.push({ x: date.toISOString(), y: value });
  }
  return data;
};

const vnIndexData: TimeSeriesPoint[] = generateTimeSeriesData(200, 900, 1500);
const marketCycleData: TimeSeriesPoint[] = generateTimeSeriesData(
  200,
  -500,
  400
);
const marketStructureData: TimeSeriesPoint[] = generateTimeSeriesData(
  200,
  10,
  500
);
const bottomIndexData: TimeSeriesPoint[] = generateTimeSeriesData(200, 0, 100);

// --- Chart Options ---
const commonOptions: MarketChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time" as const,
      time: {
        unit: "day" as const,
      },
      grid: {
        display: false,
      },
      ticks: {
        // color: 'oklch(var(--foreground))',
        color: "gray",
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    y: {
      position: "right" as const,
      grid: {
        color: "oklch(var(--border))",
      },
      ticks: {
        // color: 'oklch(var(--foreground))',
        color: "gray",
        maxTicksLimit: 10,
      },
      beginAtZero: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  elements: {
    point: { radius: 0 },
  },
};

const vnIndexOptions: MarketChartOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    title: {
      display: true,
      text: "Chỉ số VN-Index",
      align: "start" as const,
      color: "white",
    },
  },
};
// const marketCycleOptions: MarketChartOptions = {
//   ...commonOptions,
//   plugins: {
//     ...commonOptions.plugins,
//     title: {
//       display: true,
//       text: "FiNart AI - Market Cycle Index",
//       align: "start" as const,
//       color: "white",
//     },
//   },
// };
// const marketStructureOptions: MarketChartOptions = {
//   ...commonOptions,
//   plugins: {
//     ...commonOptions.plugins,
//     title: {
//       display: true,
//       text: "FiNart AI - Market Structure Index",
//       align: "start" as const,
//       color: "white",
//     },
//   },
// };
const bottomIndexOptions: MarketChartOptions = {
  ...commonOptions,
  plugins: { ...commonOptions.plugins, title: { display: false } },
  scales: {
    ...commonOptions.scales,
    x: {
      ...commonOptions.scales?.x,
      ticks: { ...commonOptions.scales?.x?.ticks, display: false },
    },
  },
};

// --- Chart Data Definitions ---
// Specify 'line' chart type and the data point structure
const vnIndexChartData: ChartData<"line", TimeSeriesPoint[]> = {
  datasets: [
    {
      label: "VN-Index",
      data: vnIndexData,
      borderColor: "hsl(24 95% 53%)", // Direct HSL for orange
      borderWidth: 2,
      tension: 0.1,
    },
  ],
};

const marketCycleChartData: ChartData<"line", TimeSeriesPoint[]> = {
  datasets: [
    {
      label: "Market Cycle",
      data: marketCycleData,
      borderColor: "hsl(142 71% 45%)", // Direct HSL for green
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

const marketStructureChartData: ChartData<"line", TimeSeriesPoint[]> = {
  datasets: [
    {
      label: "Market Structure",
      data: marketStructureData,
      borderColor: "hsl(142 71% 45%)", // Direct HSL for green
      borderWidth: 1,
      tension: 0.1,
    },
  ],
};

const bottomIndexChartData: ChartData<"line", TimeSeriesPoint[]> = {
  datasets: [
    {
      label: "Bottom Index",
      data: bottomIndexData,
      borderColor: "hsl(217 91% 60%)", // Direct HSL for blue
      backgroundColor: "hsla(217 91% 60% / 0.3)",
      borderWidth: 1,
      fill: true,
      tension: 0.1,
    },
  ],
};

// --- Legend Data ---
const legendItems = [
  { label: "Giá VN-Index", color: "bg-orange-500" },
  { label: "Downturn", color: "bg-red-500", icon: "D" },
  { label: "Recovery", color: "bg-yellow-500", icon: "R" },
  { label: "Booming", color: "bg-green-500", icon: "B" },
  { label: "Event", color: "bg-purple-500", icon: "E" },
  { label: "Cảnh báo", color: "bg-pink-500", icon: "!" },
];

export const MarketChart = () => {
  const [timeRange, setTimeRange] = useState("3m");
  const [marketChartData, setMarketChartData] =
    useState<MarketChartData | null>(null);
  // Update chart data based on timeRange
  const vnIndexChartData = useMemo(() => {
    if (!marketChartData) return null;
    return {
      datasets: [
        {
          label: "VN-Index",
          data: marketChartData.c.map((c, index) => ({
            x: parseUnixTimestamp(marketChartData.t[index]),
            y: c,
          })),
          borderColor: "hsl(24 95% 53%)", // Direct HSL for orange
          borderWidth: 2,
          tension: 1,
        },
      ],
    };
  }, [marketChartData, setMarketChartData]);
  useEffect(() => {
    console.log(`Chart data updated for timeRange: ${timeRange}`);
    // In a real app, we would fetch or filter data based on the time range
    // This is a placeholder for the actual implementation
    setMarketChartData(marketChartData);
  }, []);

  const fetchMarketChart = async () => {
    try {
      const { startDate, endDate } = getDateRange(timeRange as "3m" | "1y" | "5y" | "all");
      const response = await getMarketChart({
        symbols: ["VNINDEX"],
        fromDate: startDate,
        toDate: endDate,
      });
      setMarketChartData(response.data[0]);
    } catch (error) {
      console.error("Error fetching market chart:", error);
    }
  };
  useEffect(() => {
    fetchMarketChart();
  }, []);
  return (
    <div className="w-full bg-card p-4 rounded-lg border border-border shadow-sm">
      {/* Time Range Selector */}
      <div className="mb-4">
        <TimeTabs
          options={[
            { label: "1M", value: "1m" },
            { label: "3M", value: "3m" },
            { label: "1Y", value: "1y" },
            { label: "5Y", value: "5y" },
            { label: "Tất cả", value: "all" },
          ]}
          defaultValue="5y"
          onValueChange={(value) => {
            setTimeRange(value);
            fetchMarketChart();
          }}
          buttonStyle="minimal"
        />
      </div>

      {/* Chart Area */}
      <div className="space-y-2">
        {/* VN-Index Chart */}
        <div className="h-[300px]">
          {vnIndexChartData && (
            <Line options={vnIndexOptions} data={vnIndexChartData} />
          )}
        </div>
        {/* Market Cycle Chart */}
        {/* <div className="h-[150px]">
          <Line options={marketCycleOptions} data={marketCycleChartData} />
        </div> */}
        {/* Market Structure Chart */}
        {/* <div className="h-[150px]">
          <Line
            options={marketStructureOptions}
            data={marketStructureChartData}
          />
        </div> */}
        {/* Bottom Index Chart */}
        <div className="h-[100px]">
          <Line options={bottomIndexOptions} data={bottomIndexChartData} />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.icon ? (
              <span
                className={`inline-flex items-center justify-center h-4 w-4 rounded-sm text-xs font-bold text-muted-foreground ${item.color}`}
              >
                {item.icon}
              </span>
            ) : (
              <span
                className={`inline-block h-2.5 w-4 rounded-sm ${item.color}`}
              ></span>
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
