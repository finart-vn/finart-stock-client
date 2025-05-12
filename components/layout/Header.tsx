// components/layout/Header.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Search,
  TrendingUp,
  BarChart,
  Briefcase,
  Settings,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { LoginModal } from '@/components/auth/LoginModal';
import { signOut, useSession } from 'next-auth/react';
export const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="border-b">
      <nav className="sticky top-0 z-40 flex h-16 items-center gap-4 bg-background px-4 md:px-6 container">
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
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl mr-4">FinArt</span>
          </Link>
          <Link
            href="/stock"
            className="text-foreground transition-colors hover:text-foreground font-medium"
          >
            Chứng khoán
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground font-medium"
          >
            Thị trường
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Biểu đồ kỹ thuật
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Công cụ
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
          {session?.user?.name ? (
            <div>
              <span>{session?.user?.name}</span>
              <Button onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <LoginModal />
          )}
        </div>
      </nav>
    </header>
  );
};
