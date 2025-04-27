/**
 * Utility functions for formatting numbers, currencies, and percentages
 */

/**
 * Format a number with the specified number of decimal places
 */
export const formatNumber = (num: number, decimals = 2): string => {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Format a number as currency with appropriate suffixes (T, B, M, K)
 */
export const formatCurrency = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    return formatNumber(num / 1_000_000_000_000) + "T";
  }
  if (num >= 1_000_000_000) {
    return formatNumber(num / 1_000_000_000) + "B";
  }
  if (num >= 1_000_000) {
    return formatNumber(num / 1_000_000) + "M";
  }
  if (num >= 1_000) {
    return formatNumber(num / 1_000) + "K";
  }
  return formatNumber(num);
};

/**
 * Format a number as a percentage
 */
export const formatPercent = (num: number): string => {
  return formatNumber(num) + "%";
}; 