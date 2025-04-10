'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"; // For the foreign selling bar chart
import Link from "next/link";
import { ArrowDown } from "lucide-react"; // Removed ArrowUp

// Placeholder Data (replace with actual data later)
const topLosers = [
  { code: 'L45', logo: '/placeholder-logo.png', change: -13.16, volume: 208000 },
  { code: 'KDM', logo: '/placeholder-logo.png', change: -9.74, volume: 90400 },
  { code: 'VTV', logo: '/placeholder-logo.png', change: -9.26, volume: 711700 },
  { code: 'PGN', logo: '/placeholder-logo.png', change: -9.09, volume: 1143600 },
  { code: 'CTP', logo: '/placeholder-logo.png', change: -8.97, volume: 1392000 },
];

const topForeignSelling = [
  { code: 'KBC', logo: '/placeholder-logo.png', netValue: -153 }, // Assuming value in Billions VND or similar unit
  { code: 'TLG', logo: '/placeholder-logo.png', netValue: -124 },
  { code: 'CTG', logo: '/placeholder-logo.png', netValue: -90 },
  { code: 'VNM', logo: '/placeholder-logo.png', netValue: -82 },
  { code: 'SSI', logo: '/placeholder-logo.png', netValue: -81 },
];

const fundActivity = [
  { code: 'VCB', logo: '/placeholder-logo.png', fund: 'BAOVIETFUND', shares: 7026 },
  { code: 'VCB', logo: '/placeholder-logo.png', fund: 'DFVN', shares: 27565 },
  { code: 'VCB', logo: '/placeholder-logo.png', fund: 'VINACAPITAL', shares: -387437 },
  { code: 'TCB', logo: '/placeholder-logo.png', fund: 'VINACAPITAL', shares: 578800 },
  { code: 'TCB', logo: '/placeholder-logo.png', fund: 'VINACAPITAL', shares: 3125920 },
];

// Helper to format numbers
const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
};

const formatCompact = (num: number) => {
    // Basic compact formatter for example
    return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
};

export function MarketActivity() {
  const maxNetSelling = Math.min(...topForeignSelling.map(item => item.netValue)); // Find the most negative value

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Diễn biến thị trường</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Top Price Decrease */}
        <Card className="bg-card text-card-foreground shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top giảm giá</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-border">
                  <TableHead className="text-muted-foreground text-xs font-medium w-[30%]">Mã cổ phiếu</TableHead>
                  <TableHead className="text-right text-muted-foreground text-xs font-medium w-[35%]">% thay đổi giá</TableHead>
                  <TableHead className="text-right text-muted-foreground text-xs font-medium w-[35%]">Khối lượng giao dịch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topLosers.map((stock) => (
                  <TableRow key={stock.code} className="border-none">
                    <TableCell className="font-medium py-2 flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                          <AvatarImage src={stock.logo} alt={stock.code} />
                          <AvatarFallback className="text-xs bg-muted">{stock.code.substring(0, 2)}</AvatarFallback>
                       </Avatar>
                       {stock.code}
                    </TableCell>
                    <TableCell className="text-right py-2 text-red-500 flex items-center justify-end gap-1">
                        <ArrowDown className="h-3 w-3"/>
                        {stock.change.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right py-2 text-muted-foreground">{formatNumber(stock.volume)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Card 2: Top Net Foreign Selling */}
        <Card className="bg-card text-card-foreground shadow-lg border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top khối ngoại bán ròng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
                 <div className="flex justify-between text-muted-foreground text-xs font-medium px-2 mb-2">
                    <span>Mã cổ phiếu</span>
                    <span>Giá trị giao dịch</span>
                </div>
                {topForeignSelling.map((stock) => {
                    const progressValue = (stock.netValue / maxNetSelling) * 100;
                    return (
                        <div key={stock.code} className="flex items-center gap-2 px-2 py-1">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={stock.logo} alt={stock.code} />
                                <AvatarFallback className="text-xs bg-muted">{stock.code.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium w-12 flex-shrink-0">{stock.code}</span>
                            <Progress value={progressValue} className="h-2 flex-grow bg-red-900/30 [&>*]:bg-red-500" />
                            <span className="text-right font-medium text-red-500 w-12 text-sm flex-shrink-0">{formatCompact(stock.netValue * 1_000_000_000)} T</span> {/* Assuming T stands for Trillion VND */}
                        </div>
                    );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Fund Activity */}
        <Card className="bg-card text-card-foreground shadow-lg border-border">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-lg font-semibold">Hoạt động quỹ</CardTitle>
                <Link href="#" className="text-sm text-primary hover:underline">
                    Xem thêm &gt;
                </Link>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow className="border-b-border">
                  <TableHead className="text-muted-foreground text-xs font-medium w-[25%]">Mã cổ phiếu</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-medium w-[40%]">Quỹ đầu tư</TableHead>
                  <TableHead className="text-right text-muted-foreground text-xs font-medium w-[35%]">Số lượng cổ phiếu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fundActivity.map((activity, index) => (
                  <TableRow key={index} className="border-none">
                    <TableCell className="font-medium py-2 flex items-center gap-2">
                       <Avatar className="h-6 w-6">
                          <AvatarImage src={activity.logo} alt={activity.code} />
                          <AvatarFallback className="text-xs bg-muted">{activity.code.substring(0, 2)}</AvatarFallback>
                       </Avatar>
                       {activity.code}
                    </TableCell>
                    <TableCell className="py-2 text-muted-foreground text-sm">{activity.fund}</TableCell>
                    <TableCell className={`text-right py-2 font-medium ${activity.shares >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {activity.shares >= 0 ? '+' : ''}{formatNumber(activity.shares)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 