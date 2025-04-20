import { api } from "../api-client";
import { MarketChartRequest, MarketChartResponse } from "@/types/api/stock";

export const getMarketChart = async (request: MarketChartRequest) => {
  const response = await api.post<MarketChartResponse>(
    "/stock/chart/market",
    request
  );
  return response;
};
