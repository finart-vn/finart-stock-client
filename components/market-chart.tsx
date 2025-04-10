'use client';

import React, { useState } from 'react';
// import { Button } from "@/components/ui/button"; // Unused
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
  ChartData // Import ChartData type
} from 'chart.js';
// import { Line, Bar } from 'react-chartjs-2'; // Bar unused
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

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
type MarketChartOptions = ChartOptions<'line'>;

// --- Placeholder Data Generation ---
const generateTimeSeriesData = (numPoints: number, minY: number, maxY: number): TimeSeriesPoint[] => {
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
const marketCycleData: TimeSeriesPoint[] = generateTimeSeriesData(200, -500, 400);
const marketStructureData: TimeSeriesPoint[] = generateTimeSeriesData(200, 10, 500);
const bottomIndexData: TimeSeriesPoint[] = generateTimeSeriesData(200, 0, 100);

// --- Chart Options ---
const commonOptions: MarketChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'year' as const,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: 'hsl(var(--muted-foreground))',
        maxRotation: 0,
        autoSkip: true,
      }
    },
    y: {
      position: 'right' as const,
      grid: {
        color: 'hsl(var(--border))',
      },
      ticks: {
          color: 'hsl(var(--muted-foreground))',
      }
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
        enabled: true,
    }
  },
  elements: {
      point:{ radius: 0 }
  }
};

const vnIndexOptions: MarketChartOptions = {
  ...commonOptions,
  plugins: { ...commonOptions.plugins, title: { display: true, text: 'Chỉ số VN-Index', align: 'start' as const, color: 'hsl(var(--foreground))' } },
};
const marketCycleOptions: MarketChartOptions = {
  ...commonOptions,
  plugins: { ...commonOptions.plugins, title: { display: true, text: 'Simplize AI - Market Cycle Index', align: 'start' as const, color: 'hsl(var(--foreground))' } },
};
const marketStructureOptions: MarketChartOptions = {
  ...commonOptions,
  plugins: { ...commonOptions.plugins, title: { display: true, text: 'Simplize AI - Market Structure Index', align: 'start' as const, color: 'hsl(var(--foreground))' } },
};
const bottomIndexOptions: MarketChartOptions = {
    ...commonOptions,
    plugins: { ...commonOptions.plugins, title: { display: false } },
     scales: { ...commonOptions.scales, x: { ...commonOptions.scales?.x, ticks: { ...commonOptions.scales?.x?.ticks, display: false } } }
};

// --- Chart Data Definitions ---
// Specify 'line' chart type and the data point structure
const vnIndexChartData: ChartData<'line', TimeSeriesPoint[]> = {
  datasets: [
    {
      label: 'VN-Index',
      data: vnIndexData,
      borderColor: 'hsl(24 95% 53%)', // Direct HSL for orange
      borderWidth: 2,
      tension: 0.1,
    },
  ],
};

const marketCycleChartData: ChartData<'line', TimeSeriesPoint[]> = {
  datasets: [
    {
      label: 'Market Cycle',
      data: marketCycleData,
      borderColor: 'hsl(142 71% 45%)', // Direct HSL for green
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

const marketStructureChartData: ChartData<'line', TimeSeriesPoint[]> = {
  datasets: [
    {
      label: 'Market Structure',
      data: marketStructureData,
      borderColor: 'hsl(142 71% 45%)', // Direct HSL for green
      borderWidth: 1,
      tension: 0.1,
    },
  ],
};

const bottomIndexChartData: ChartData<'line', TimeSeriesPoint[]> = {
  datasets: [
    {
      label: 'Bottom Index',
      data: bottomIndexData,
      borderColor: 'hsl(217 91% 60%)', // Direct HSL for blue
      backgroundColor: 'hsla(217 91% 60% / 0.3)',
      borderWidth: 1,
      fill: true,
      tension: 0.1,
    },
  ],
};

// --- Legend Data ---
const legendItems = [
    { label: 'Giá VN-Index', color: 'bg-orange-500' },
    { label: 'Downturn', color: 'bg-red-500', icon: 'D' },
    { label: 'Recovery', color: 'bg-yellow-500', icon: 'R' },
    { label: 'Booming', color: 'bg-green-500', icon: 'B' },
    { label: 'Event', color: 'bg-purple-500', icon: 'E' },
    { label: 'Cảnh báo', color: 'bg-pink-500', icon: '!' },
];

export function MarketChart() {
  const [timeRange, setTimeRange] = useState('5y');

  // TODO: Filter data based on timeRange state

  return (
    <div className="w-full bg-card p-4 rounded-lg border border-border shadow-sm">
      {/* Time Range Selector */}
      <div className="mb-4">
        <ToggleGroup
            type="single"
            defaultValue="5y"
            variant="outline"
            value={timeRange}
            onValueChange={(value: string) => { if (value) setTimeRange(value) }} // Add type for value
            className="justify-start"
            >
            <ToggleGroupItem value="1m" aria-label="1 Month">1M</ToggleGroupItem>
            <ToggleGroupItem value="3m" aria-label="3 Months">3M</ToggleGroupItem>
            <ToggleGroupItem value="1y" aria-label="1 Year">1Y</ToggleGroupItem>
            <ToggleGroupItem value="5y" aria-label="5 Years">5Y</ToggleGroupItem>
            <ToggleGroupItem value="all" aria-label="All Time">Tất cả</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Chart Area */}
      <div className="space-y-2">
          {/* VN-Index Chart */}
          <div className="h-[300px]">
              <Line options={vnIndexOptions} data={vnIndexChartData} />
          </div>
          {/* Market Cycle Chart */}
          <div className="h-[150px]">
              <Line options={marketCycleOptions} data={marketCycleChartData} />
          </div>
          {/* Market Structure Chart */}
          <div className="h-[150px]">
              <Line options={marketStructureOptions} data={marketStructureChartData} />
          </div>
          {/* Bottom Index Chart */}
          <div className="h-[100px]">
              <Line options={bottomIndexOptions} data={bottomIndexChartData} />
          </div>
      </div>

      {/* Legend */}
       <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
         {legendItems.map(item => (
           <div key={item.label} className="flex items-center gap-1.5">
             {item.icon ? (
                 <span className={`inline-flex items-center justify-center h-4 w-4 rounded-sm text-xs font-bold text-white ${item.color}`}>{item.icon}</span>
             ) : (
                <span className={`inline-block h-2.5 w-4 rounded-sm ${item.color}`}></span>
             )}
             <span>{item.label}</span>
           </div>
         ))}
       </div>
    </div>
  );
} 