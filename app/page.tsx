'use client'; // Required for Chart.js interaction

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, TrendingUp, User, Briefcase, BarChart, Settings } from "lucide-react"; // Added more relevant icons
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { NewsSection } from "@/components/ui/news-section"; // Import the new component
import { MarketActivity } from "@/components/market-activity"; // Import the new component
import { MarketChart } from "@/components/market-chart"; // Import the new chart component
import { Sidebar } from "@/components/sidebar"; // Import Sidebar

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
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Stock Price', // Placeholder label
      data: [65, 59, 80, 81, 56, 55, 40], // Placeholder data
      borderColor: 'rgb(75, 192, 192)',
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
      position: 'top' as const, // Ensure position is typed correctly
    },
    title: {
      display: true,
      text: 'Stock Performance Over Time', // Placeholder title
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content with margin to accommodate the sidebar */}
      <div className="ml-16 flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <TrendingUp className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">FinArt Stock</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                   <BarChart className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                   <Briefcase className="h-5 w-5" />
                  Analysis
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                   <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
             <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                  <TrendingUp className="h-6 w-6 text-primary" />
                   <span className="font-bold text-xl mr-4">FinArt Stock</span>
                </Link>
              <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground font-medium"
              >
              Dashboard
              </Link>
              <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              >
              Analysis
              </Link>
               <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              >
              Settings
              </Link>
          </nav>

          {/* Header Right Section: Search and User */}
           <div className="flex items-center gap-4 ml-auto">
               <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search stocks..."
                  className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                   <User className="h-5 w-5"/>
                   <span className="sr-only">User Menu</span>
              </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
          {/* Market Chart */}
          <MarketChart />

          {/* Dashboard Overview Cards */}
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard Overview</h1>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
             <Card className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">Bullish</div>
                    <p className="text-xs text-muted-foreground">
                    +2.1% change today
                    </p>
                </CardContent>
            </Card>
             <Card className="border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Watchlist: AAPL</CardTitle>
                     <BarChart className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$175.30</div>
                    <p className="text-xs text-red-500">
                    -0.5% ($0.88)
                    </p>
                </CardContent>
            </Card>
             <Card className="border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                     <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">MSFT</div>
                    <p className="text-xs text-green-500">
                    +3.2% today
                    </p>
                </CardContent>
            </Card>
              <Card className="border shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                     <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$125,430.50</div>
                    <p className="text-xs text-green-500">
                    +1.8% all time
                    </p>
                </CardContent>
            </Card>
          </div>

          {/* News Section */}
          <NewsSection />

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
                    <div><span className="text-muted-foreground">Market Cap:</span> $2.7T</div>
                    <div><span className="text-muted-foreground">P/E Ratio:</span> 28.5</div>
                    <div><span className="text-muted-foreground">Dividend Yield:</span> 0.6%</div>
                    <div><span className="text-muted-foreground">52 Week High:</span> $198.23</div>
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
                        <div className="bg-muted rounded-md h-10 w-10"></div> {/* Image Placeholder */}
                        <div>
                            <p className="text-sm font-medium leading-none">Analyst upgrades stock rating</p>
                            <p className="text-xs text-muted-foreground">Source - 2h ago</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <div className="bg-muted rounded-md h-10 w-10"></div> {/* Image Placeholder */}
                        <div>
                            <p className="text-sm font-medium leading-none">New product announcement boosts shares</p>
                            <p className="text-xs text-muted-foreground">Source - 5h ago</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <div className="bg-muted rounded-md h-10 w-10"></div> {/* Image Placeholder */}
                        <div>
                            <p className="text-sm font-medium leading-none">Company reports strong earnings</p>
                            <p className="text-xs text-muted-foreground">Source - 1d ago</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t bg-background p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FinArt Stock. All rights reserved.
        </footer>
      </div>
    </div>
  );
} 