"use client"; // Required for Chart.js interaction

import { MarketActivity } from "@/components/market-activity"; // Import the new component
import { MarketChart } from "@/components/market-chart"; // Import the new chart component
import { ProposeInvest } from "@/components/ProposeInvest"; // Import the ProposeInvest component
import { SectorPerformance } from "@/components/sector-performance"; // Import the Sector Performance component
import StockMarketTable from "@/components/stock-market-table"; // Import the Stock Market Table component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsSection } from "@/components/ui/news-section"; // Import the new component
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { BarChart, Briefcase, TrendingUp } from "lucide-react"; // Added more relevant icons
import { Line } from "react-chartjs-2";

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

// Sample Chart Data
const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Stock Price", // Placeholder label
      data: [65, 59, 80, 81, 56, 55, 40], // Placeholder data
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Sample Chart Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allow chart to fill container height
  plugins: {
    legend: {
      position: "top" as const, // Ensure position is typed correctly
    },
    title: {
      display: true,
      text: "Stock Performance Over Time", // Placeholder title
    },
  },
};

export default function HomePage() {
  return (
    <main className="grid grid-cols-1 gap-6 p-4 md:gap-8 md:p-6 w-full max-w-screen-2xl mx-auto">
      {/* News Section */}
      <NewsSection />

      {/* Market Chart and Investment Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        <div className="lg:col-span-2">
          <MarketChart />
        </div>
        <div className="lg:col-span-1">
          <ProposeInvest />
        </div>
      </div>

      {/* Sector Performance */}
      {/* <div className="mt-6 grid grid-cols-2 justify-end">
        <div className="col-start-2">
          <SectorPerformance />
        </div>
      </div> */}

      {/* Dashboard Overview Cards */}
      <h1 className="text-lg font-semibold md:text-2xl">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Sentiment
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Bullish</div>
            <p className="text-xs text-muted-foreground">+2.1% change today</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Watchlist: AAPL
            </CardTitle>
            <BarChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$175.30</div>
            <p className="text-xs text-red-500">-0.5% ($0.88)</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MSFT</div>
            <p className="text-xs text-green-500">+3.2% today</p>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,430.50</div>
            <p className="text-xs text-green-500">+1.8% all time</p>
          </CardContent>
        </Card>
      </div>

      {/* Market Activity Section */}
      <MarketActivity />

      {/* Stock Market Table */}
      <div className="mt-6">
        <StockMarketTable />
      </div>
    </main>
  );
}
