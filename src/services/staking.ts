import { create } from 'zustand';
import { useWalletStore } from './wallet';
import { ethers } from 'ethers';

interface StakeTransaction {
  hash: string;
  amount: number;
  type: 'STAKE' | 'UNSTAKE';
  timestamp: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

interface StakingState {
  isStaking: boolean;
  stakedAmount: number;
  stakingError: string | null;
  transactions: StakeTransaction[];
  stake: (amount: number) => Promise<void>;
  unstake: (amount: number) => Promise<void>;
}

export const useStakingStore = create<StakingState>((set, get) => ({
  isStaking: false,
  stakedAmount: 0,
  stakingError: null,
  transactions: [],

  stake: async (amount: number) => {
    const wallet = useWalletStore.getState();
    if (!wallet.isConnected) {
      set({ stakingError: 'Please connect your wallet first' });
      return;
    }

    set({ isStaking: true, stakingError: null });
    try {
      // Simulate staking transaction
      const tx: StakeTransaction = {
        hash: ethers.hexlify(ethers.randomBytes(32)),
        amount,
        type: 'STAKE',
        timestamp: Date.now(),
        status: 'PENDING'
      };

      set(state => ({
        transactions: [tx, ...state.transactions]
      }));

      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      set(state => ({
        stakedAmount: state.stakedAmount + amount,
        transactions: state.transactions.map(t => 
          t.hash === tx.hash ? { ...t, status: 'COMPLETED' } : t
        ),
        isStaking: false,
      }));
    } catch (error) {
      set({ 
        stakingError: error instanceof Error ? error.message : 'Failed to stake',
        isStaking: false 
      });
    }
  },

  unstake: async (amount: number) => {
    const wallet = useWalletStore.getState();
    if (!wallet.isConnected) {
      set({ stakingError: 'Please connect your wallet first' });
      return;
    }

    set({ isStaking: true, stakingError: null });
    try {
      const tx: StakeTransaction = {
        hash: ethers.hexlify(ethers.randomBytes(32)),
        amount,
        type: 'UNSTAKE',
        timestamp: Date.now(),
        status: 'PENDING'
      };

      set(state => ({
        transactions: [tx, ...state.transactions]
      }));

      await new Promise(resolve => setTimeout(resolve, 2000));

      set(state => ({
        stakedAmount: Math.max(0, state.stakedAmount - amount),
        transactions: state.transactions.map(t => 
          t.hash === tx.hash ? { ...t, status: 'COMPLETED' } : t
        ),
        isStaking: false,
      }));
    } catch (error) {
      set({ 
        stakingError: error instanceof Error ? error.message : 'Failed to unstake',
        isStaking: false 
      });
    }
  },
}));