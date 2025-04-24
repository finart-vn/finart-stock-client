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

// Represents the structure of the full stock data package
export interface StockMarketData {
  listingInfo: ListingInfo;  // Static info about the stock
  bidAsk: BidAsk;            // Real-time bid/ask prices
  matchPrice: MatchPrice;    // Matching (traded) prices and volumes
};

// Information about the stock listing
export interface ListingInfo {
  code: string;                     // Internal stock code (not always same as symbol)
  symbol: string;                   // Stock ticker (e.g. "HPG")
  ceiling: number;                  // Ceiling price for the day (sàn trần)
  floor: number;                    // Floor price for the day (sàn sàn)
  refPrice: number;                 // Reference price (giá tham chiếu)
  stockType: string;                // Type of stock ("STOCK", "ETF", etc.)
  board: string;                    // Exchange board (e.g. "HSX" - HoSE)
  exercisePrice: number;            // Used for derivatives/warrants (0 if not applicable)
  exerciseRatio: string;            // Ratio of conversion if applicable
  maturityDate: string;            // Expiry (for warrants/derivatives)
  lastTradingDate: string;         // Last trade date before expiry
  underlyingSymbol: string;        // Underlying asset (for derivatives)
  issuerName: string;              // Issuer of the instrument
  listedShare: number;             // Total listed shares
  receivedTime: string;            // Time this data was received
  messageType: string;             // Internal message type identifier
  type: string;                     // Same as stockType
  id: number;                       // Internal ID
  enOrganName: string;             // English full name
  enOrganShortName: string;        // English short name
  organName: string;               // Vietnamese full name
  organShortName: string;          // Vietnamese short name
  ticker: string;                  // Ticker symbol (usually same as symbol)
  priorClosePrice: number;         // Previous session's closing price
  benefit: string;                 // Dividend or bonus info (if any)
  tradingDate: string;             // Date of the trading session
};

// Bid/Ask data from order book
export interface BidAsk {
  code: string;
  symbol: string;
  session: string;                 // Session status ("OPEN", "CLOSED", etc.)
  bidPrices: PriceVolume[];       // Top 3 bid prices and volumes
  askPrices: PriceVolume[];       // Top 3 ask prices and volumes
  receivedTime: string;
  messageType: string;
  time: string;                    // Timestamp for this snapshot
};

// Real-time matching price info (giao dịch khớp lệnh)
export interface MatchPrice {
  code: string;
  symbol: string;
  matchPrice: number;             // Most recent match price
  matchVol: number;               // Volume of most recent matched order
  receivedTime: string;
  messageType: string;
  accumulatedVolume: number;      // Cumulative matched volume
  accumulatedValue: number;       // Cumulative value in million VND
  avgMatchPrice: number;          // Average match price
  highest: number;                // Session high
  lowest: number;                 // Session low
  time: string;                   // Time of this data
  session: string;                // Session status
  matchType: string;              // Match type (can be used for special types of trades)
  foreignSellVolume: number;      // Foreign investors' sell volume
  foreignBuyVolume: number;       // Foreign investors' buy volume
  currentRoom: number;            // Current room left for foreign investors
  totalRoom: number;              // Max room for foreign ownership
  totalAccumulatedValue: number;  // Total matched value
  totalAccumulatedVolume: number; // Total matched volume
  referencePrice: number;         // Same as refPrice above
};

// Simple price-volume pair used in bid/ask arrays
export interface PriceVolume {
  price: number;
  volume: number;
};

// Stock Market Data interface
export interface StockMarketDataRequest {
  sector?: string;
  industry?: string;
  limit?: number;
  page?: number;
}

export interface StockMarketDataItem {
  code: string;
  name: string;
  logo?: string;
  marketCap: number;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  pe: number;
  pb: number;
  roe: number;
  threeYearGrowth: number;
  dividendYield: number;
  sector: string;
  industry: string;
}

export interface StockMarketDataResponse {
  data: StockMarketDataItem[];
  total: number;
  page: number;
  limit: number;
}

// Financial data interfaces
export interface FinancialData {
  symbol: string;
  price: number;
  eps: number;              // Earnings Per Share
  bookValuePerShare: number;
  netIncome: number;
  shareholdersEquity: number;
  quarterlyResults?: {
    quarter: string;        // e.g., 'Q1 2023'
    revenue: number;
    netIncome: number;
    eps: number;
  }[];
  annualResults?: {
    year: string;           // e.g., '2022'
    revenue: number;
    netIncome: number;
    eps: number;
    shareholdersEquity: number;
  }[];
}

export interface FinancialMetricsResponse {
  metrics: Record<string, {
    pe: number;
    pb: number;
    roe: number;
  }>;
}
