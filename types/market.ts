export interface Market {
  id: string
  title: string
  creator: {
    name: string
    avatar: string
    isPremium: boolean
  }
  stats: {
    likes: number
    traders: number
    volume: string
    createdAt: string
  }
  probability: number
}

export type TimeFrame = '1D' | '1W' | '1M' | 'ALL'

export interface ChartData {
  timestamp: number
  probability: number
}

export interface MarketData extends Market {
  chartData: ChartData[]
}

export function generateMockChartData(
  days: number = 90,
  startProb: number = 65,
  volatility: number = 10
): ChartData[] {
  const data: ChartData[] = [];
  let currentProb = startProb;
  
  // Set end date to today at midnight UTC
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  const endTimestamp = endDate.getTime();
  const dayInMs = 86400000; // 24 hours in milliseconds

  for (let i = days - 1; i >= 0; i--) {
    // Random walk with mean reversion
    const change = (Math.random() - 0.5) * volatility;
    currentProb += change;
    // Keep probability between 1 and 99
    currentProb = Math.min(Math.max(currentProb, 1), 99);
    
    data.push({
      timestamp: Math.floor((endTimestamp - i * dayInMs) / 1000),
      probability: Math.round(currentProb)
    });
  }

  return data.sort((a, b) => a.timestamp - b.timestamp);
}

