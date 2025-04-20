export interface MarketChartRequest {
  symbols: string[];
  fromDate: string;
  toDate: string;
}

export interface MarketChartData {
  symbol: string;
  accumulatedVolume: number[];
  accumulatedValue: number[];
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: string[];
  v: number[];
}
export interface MarketChartResponse {
  data: MarketChartData[];
}
