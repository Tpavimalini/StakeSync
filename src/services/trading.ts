import { create } from 'zustand';

interface TradingState {
  price: number;
  volume24h: number;
  marketCap: number;
  stakedAmount: number;
  stakingAPY: number;
  totalValueLocked: number;
  totalUsers: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  updatePrice: () => void;
  updateStakingInfo: () => void;
  setRiskLevel: (level: 'High' | 'Medium' | 'Low') => void;
}

const MIN_PRICE = 0.95;
const MAX_PRICE = 1.05;
const BASE_VOLUME = 12500000;
const BASE_MARKET_CAP = 50000000;
const BASE_TVL = 12500000;
const BASE_USERS = 2400;

export const useTradingStore = create<TradingState>((set) => ({
  price: 1.00,
  volume24h: BASE_VOLUME,
  marketCap: BASE_MARKET_CAP,
  stakedAmount: 0,
  stakingAPY: 12.8,
  totalValueLocked: BASE_TVL,
  totalUsers: BASE_USERS,
  riskLevel: 'Medium',
  
  updatePrice: () => {
    set((state) => {
      const priceChange = (Math.random() - 0.5) * 0.02;
      const newPrice = Math.max(MIN_PRICE, Math.min(MAX_PRICE, state.price * (1 + priceChange)));
      const volumeChange = (Math.random() - 0.5) * 0.05;
      const newVolume = state.volume24h * (1 + volumeChange);
      const newMarketCap = newPrice * (BASE_MARKET_CAP / 1.00);
      
      return {
        price: Number(newPrice.toFixed(4)),
        volume24h: Number(newVolume.toFixed(2)),
        marketCap: Number(newMarketCap.toFixed(2)),
      };
    });
  },

  updateStakingInfo: () => {
    set((state) => {
      const apyChange = (Math.random() - 0.5) * 0.5;
      const tvlChange = (Math.random() - 0.5) * 0.02;
      const usersChange = Math.floor(Math.random() * 10) - 5;
      
      return {
        stakingAPY: Number((state.stakingAPY + apyChange).toFixed(2)),
        totalValueLocked: Number((state.totalValueLocked * (1 + tvlChange)).toFixed(2)),
        totalUsers: Math.max(2000, state.totalUsers + usersChange),
      };
    });
  },

  setRiskLevel: (level) => set({ riskLevel: level }),
}));