"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  User,
  Bell,
  Grid,
  Star,
  PieChart,
  Sparkles,
  GraduationCap,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

export function Sidebar() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 flex flex-col bg-background border-r">
      <div className="flex-1 flex flex-col items-center justify-between py-4">
        {/* Top Icons */}
        <div className="flex flex-col items-center space-y-6 w-full">
          <Link href="#profile" className="p-2.5 rounded-full hover:bg-accent group">
            <User className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </Link>
          
          <Link href="#notifications" className="p-2.5 rounded-full hover:bg-accent group">
            <Bell className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </Link>
          
          {/* Grid with Beta label */}
          <div className="relative">
            <Link href="#dashboard" className="p-2.5 rounded-full hover:bg-accent group">
              <Grid className="w-6 h-6 text-orange-500 group-hover:text-orange-400" />
            </Link>
            <span className="absolute -right-2 -top-2 bg-gray-700 text-gray-200 text-[10px] px-1.5 py-0.5 rounded">Beta</span>
          </div>
          
          <Link href="#favorites" className="p-2.5 rounded-full hover:bg-accent group">
            <Star className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </Link>
          
          <Link href="#analytics" className="p-2.5 rounded-full hover:bg-accent group">
            <PieChart className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </Link>
          
          {/* Sparkles with New label */}
          <div className="relative">
            <Link href="#new-features" className="p-2.5 rounded-full hover:bg-accent group">
              <Sparkles className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
            </Link>
            <span className="absolute -right-2 -top-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded">New</span>
          </div>
          
          <Link href="#learning" className="p-2.5 rounded-full hover:bg-accent group">
            <GraduationCap className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </Link>
        </div>
        
        {/* Bottom Icons (Zap and Theme Toggle) */}
        <div className="flex flex-col items-center space-y-6 w-full">
          <Link href="#activity" className="p-2.5 rounded-full hover:bg-accent group">
            <Zap className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full hover:bg-accent"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-muted-foreground hover:text-foreground" />
            ) : (
              <Moon className="w-6 h-6 text-muted-foreground hover:text-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </aside>
  );
} 