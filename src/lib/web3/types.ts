export interface Web3State {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

export interface SafeAccount {
  address: string;
  chainId: number;
  isDeployed: boolean;
  owners: string[];
  threshold: number;
}

export interface AIStrategy {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'paused' | 'stopped';
  performance: {
    totalReturn: number;
    apy: number;
    lastUpdated: Date;
  };
}