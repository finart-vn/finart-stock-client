import { api } from "../api-client";
import {
  MarketChartRequest,
  MarketChartResponse,
  StockMarketData,
  StockMarketDataItem,
  FinancialData,
  FinancialMetricsResponse,
} from "@/types/api/stock";

export const getMarketChart = async (request: MarketChartRequest) => {
  const response = await api.post<MarketChartResponse>(
    "/stock/chart/market",
    request
  );
  return response;
};

/**
 * Fetches stock market data from the API and transforms it to the format needed for StockMarketTable
 *
 * @param symbols Array of stock symbols to fetch data for
 * @returns Promise with transformed stock market data for the table
 */
export const getStockMarketData = async (
  symbols: string[]
): Promise<StockMarketDataItem[]> => {
  try {
    // Using the existing API endpoint
    const response = await api.post<StockMarketData[]>("/stock/prices", {
      symbols,
    });
    console.log({ response });
    // Transform the API response to match the StockMarketTable component's data structure
    const transformedData: StockMarketDataItem[] = response.map(
      (stockData: StockMarketData) => {
        const { listingInfo, matchPrice } = stockData;

        const defaultPE = 0;
        const defaultPB = 0;
        const defaultROE = 0;
        const defaultGrowth = 0;
        const defaultYield = 0;
        const defaultSector = "Unknown";
        const defaultIndustry = "Unknown";

        // Calculate price change
        const priceChange = matchPrice.matchPrice - listingInfo.refPrice;
        const priceChangePercent = (priceChange / listingInfo.refPrice) * 100;

        // Calculate market cap (if listedShare is available)
        const marketCap = listingInfo.listedShare
          ? listingInfo.listedShare * matchPrice.matchPrice
          : 0;

        return {
          code: listingInfo.symbol,
          name: listingInfo.organName || listingInfo.enOrganName,
          logo: undefined, // Logo not available in the API
          marketCap,
          price: matchPrice.matchPrice,
          priceChange,
          priceChangePercent,
          pe: defaultPE,
          pb: defaultPB,
          roe: defaultROE,
          threeYearGrowth: defaultGrowth,
          dividendYield: defaultYield,
          sector: defaultSector,
          industry: defaultIndustry,
        };
      }
    );

    return transformedData;
  } catch (error) {
    console.error("Error fetching stock market data:", error);
    throw error;
  }
};

/**
 * Fetches financial data and calculates PE, PB, and ROE metrics
 *
 * @param symbols Array of stock symbols to fetch financial metrics for
 * @returns Promise with financial metrics for each stock
 */
export const getFinancialMetrics = async (
  symbols: string[]
): Promise<FinancialMetricsResponse> => {
  try {
    // Fetch financial data from the API
    const response = await api.post<FinancialData[]>("/stock/financials", {
      symbols,
    });

    // Calculate financial metrics for each stock
    const metricsMap: Record<string, { pe: number; pb: number; roe: number }> =
      {};

    response.forEach((data: FinancialData) => {
      const {
        symbol,
        price,
        eps,
        bookValuePerShare,
        netIncome,
        shareholdersEquity,
      } = data;

      // Calculate PE (Price to Earnings ratio)
      // PE = Current Share Price / Earnings Per Share (EPS)
      const pe = eps > 0 ? price / eps : 0;

      // Calculate PB (Price to Book ratio)
      // PB = Current Share Price / Book Value Per Share
      const pb = bookValuePerShare > 0 ? price / bookValuePerShare : 0;

      // Calculate ROE (Return on Equity)
      // ROE = Net Income / Shareholders' Equity
      const roe =
        shareholdersEquity > 0 ? (netIncome / shareholdersEquity) * 100 : 0;

      metricsMap[symbol] = {
        pe: Number(pe.toFixed(2)),
        pb: Number(pb.toFixed(2)),
        roe: Number(roe.toFixed(2)),
      };
    });

    return {
      metrics: metricsMap,
    };
  } catch (error) {
    console.error("Error fetching financial metrics:", error);
    throw error;
  }
};

/**
 * Utility function to calculate financial metrics from raw data
 * Use this when you have the financial data but need to calculate the metrics
 */
export const calculateFinancialMetrics = (
  price: number,
  eps: number,
  bookValuePerShare: number,
  netIncome: number,
  shareholdersEquity: number
) => {
  // Calculate PE (Price to Earnings ratio)
  const pe = eps > 0 ? price / eps : 0;

  // Calculate PB (Price to Book ratio)
  const pb = bookValuePerShare > 0 ? price / bookValuePerShare : 0;

  // Calculate ROE (Return on Equity)
  const roe =
    shareholdersEquity > 0 ? (netIncome / shareholdersEquity) * 100 : 0;

  return {
    pe: Number(pe.toFixed(2)),
    pb: Number(pb.toFixed(2)),
    roe: Number(roe.toFixed(2)),
  };
};
