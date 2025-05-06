"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface StockBreadcrumbProps {
  symbol: string;
}

export function StockBreadcrumb({ symbol }: StockBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center hover:text-primary">
        <Home className="h-4 w-4 mr-1" />
        <span className="sr-only">Trang chủ</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/stock" className="hover:text-primary">
        Thị trường
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-foreground" aria-current="page">
        {symbol}
      </span>
    </nav>
  );
} 