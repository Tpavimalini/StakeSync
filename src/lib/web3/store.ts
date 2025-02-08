import { atom } from 'recoil';
import { Web3State, SafeAccount, AIStrategy } from './types';

export const web3State = atom<Web3State>({
  key: 'web3State',
  default: {
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
    error: null,
  },
});

export const safeAccountState = atom<SafeAccount | null>({
  key: 'safeAccountState',
  default: null,
});

export const aiStrategiesState = atom<AIStrategy[]>({
  key: 'aiStrategiesState',
  default: [],
});