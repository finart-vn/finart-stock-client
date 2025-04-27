import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subMonths, subYears } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseUnixTimestamp(timestamp: string) {
  return new Date(parseInt(timestamp) * 1000).toISOString();
}
export function parseDateToUnixTimestamp(date: string) {
  return Math.floor(new Date(date).getTime() / 1000);
}
export function getDateRange(timeRange: "3m" | "1y" | "5y" | "all") {
  const now = new Date();
  switch (timeRange) {
    case "3m":
      return {
        startDate: parseDateToUnixTimestamp(subMonths(now, 3).toISOString()),
        endDate: parseDateToUnixTimestamp(now.toISOString()),
      };
    case "1y":
      return {
        startDate: parseDateToUnixTimestamp(subYears(now, 1).toISOString()),
        endDate: parseDateToUnixTimestamp(now.toISOString()),
      };
    case "5y":
      return {
        startDate: parseDateToUnixTimestamp(subYears(now, 5).toISOString()),
        endDate: parseDateToUnixTimestamp(now.toISOString()),
      };
    case "all":
      return {
        startDate: parseDateToUnixTimestamp(subYears(now, 10).toISOString()),
        endDate: parseDateToUnixTimestamp(now.toISOString()),
      };
  }
}
