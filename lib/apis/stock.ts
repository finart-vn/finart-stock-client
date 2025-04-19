import { api } from "../api-client";

interface MarketChartRequest {
  symbols: ["VN30", "VNINDEX"];
  fromDate: string;
  toDate: string;
}
export const getMarketChart = async (request: MarketChartRequest) => {
  const response = await api.post("/stock/chart/market", request);
  return response;
};
