"use client"; // Required for Chart.js interaction

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Briefcase, BarChart } from "lucide-react"; // Added more relevant icons
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { NewsSection } from "@/components/ui/news-section"; // Import the new component
import { MarketActivity } from "@/components/market-activity"; // Import the new component
import { MarketChart } from "@/components/market-chart"; // Import the new chart component
import { ProposeInvest } from "@/components/ProposeInvest"; // Import the ProposeInvest component

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
    <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6 w-full max-w-screen-2xl mx-auto">
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

      {/* Main Analysis Area */}
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2 border shadow-sm">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Stock Analysis & Valuation</CardTitle>
              <CardDescription>
                Sample stock data shown below. Select a stock to update.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart Container */}
            <div className="h-[400px] w-full relative">
              <Line options={chartOptions} data={chartData} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Market Cap:</span> $2.7T
              </div>
              <div>
                <span className="text-muted-foreground">P/E Ratio:</span> 28.5
              </div>
              <div>
                <span className="text-muted-foreground">Dividend Yield:</span>{" "}
                0.6%
              </div>
              <div>
                <span className="text-muted-foreground">52 Week High:</span>{" "}
                $198.23
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Placeholder for News/Watchlist Details etc. */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-md h-10 w-10"></div>{" "}
              {/* Image Placeholder */}
              <div>
                <p className="text-sm font-medium leading-none">
                  Analyst upgrades stock rating
                </p>
                <p className="text-xs text-muted-foreground">Source - 2h ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-md h-10 w-10"></div>{" "}
              {/* Image Placeholder */}
              <div>
                <p className="text-sm font-medium leading-none">
                  New product announcement boosts shares
                </p>
                <p className="text-xs text-muted-foreground">Source - 5h ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-md h-10 w-10"></div>{" "}
              {/* Image Placeholder */}
              <div>
                <p className="text-sm font-medium leading-none">
                  Company reports strong earnings
                </p>
                <p className="text-xs text-muted-foreground">Source - 1d ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
